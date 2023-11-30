import { Op, Sequelize } from "sequelize";
import { Chat, Message, User_Chat } from "./chats.model.js";
import { Transaction, User, UserSponsor } from "../users/users.model.js";
import { chats_notifications } from "../notifications/notifications.model.js";
import { usersStatuses } from "../../utils/dbQueries.js";
import dbTogether from "../../db/db.js";
import { validateError } from "../../utils/customValidation.js";

class ChatsController {
  async getMessages(req, res) {
    try {
      const { id, page } = req.params;
      const { user } = req;
      const update = await User_Chat.findOne({
        where: {
          chatId: id,
          userId: user.id,
        },
      });
      if (!update) return res.status(404).end();
      update.changed("updatedAt", true);
      await update.update({ updatedAt: new Date() });
      const users = await User.findAndCountAll({
        include: { model: Chat, where: { id: id }, attributes: [] },
        attributes: ["id", "name", "avatar"],
      });
      const messages = await Message.findAndCountAll({
        where: {
          chatId: id,
        },
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
        order: [["createdAt", "DESC"]],
      });
      const pages = Math.ceil(messages.count / 25);
      return res.status(200).json({ pages, users, messages });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async searchUsers(req, res) {
    try {
      const { strsearch } = req.query;
      if (strsearch.length < 3) return res.status(500).json("Поиск от 3 символов");
      const { page } = req.params;
      const { user } = req;
      const limit = 10;

      let users = await User.scope(["exclude", "role"]).findAndCountAll({
        where: {
          id: { [Op.ne]: user.id },
          [Op.or]: {
            name: { [Op.substring]: strsearch },
          },
        },
        limit,
        offset: limit * (Number(page ? page : 1) - 1),
      });

      if (!users) return res.status(404);

      const chatsIds = await User_Chat.findAll({
        where: {
          userId: users.rows.map(({ id }) => id),
        },
      });

      const chats = await User_Chat.findAll({
        where: {
          chatId: chatsIds.map(({ chatId }) => chatId),
          userId: user.id,
        },
      });

      for await (const userCh of users.rows) {
        let id = 0;
        chatsIds.forEach((chat) => {
          if (chat.userId === userCh.id) {
            chats.forEach((chatUs) => {
              if (chatUs.chatId === chat.chatId) {
                id = chatUs.chatId;
              }
            });
          }
        });
        userCh.dataValues.chatId = id;
        const [[lastMessage]] = await dbTogether.query(
          "SELECT `messages`.`text` AS `lastMessage` FROM `messages` WHERE `chatId` = :chatId ORDER BY `createdAt` DESC LIMIT 1",
          {
            replacements: { chatId: id },
          }
        );
        userCh.dataValues.lastMessage = lastMessage?.lastMessage;
      }

      users.rows = await usersStatuses(users.rows);

      const pages = Math.ceil(users.count / limit);
      return res.status(200).json({ pages, users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getChats(req, res) {
    try {
      const { user } = req;
      const page = req.query.page ? req.query.page : 1;
      const limit = 10;

      const ids = await User_Chat.findAll({
        where: {
          userId: user.id,
        },
        attributes: ["chatId"],
      });

      const chats = await Chat.findAndCountAll({
        where: {
          id: ids.map(({ chatId }) => chatId),
        },
        attributes: {
          include: [
            [
              Sequelize.literal(
                "(SELECT COUNT(*) FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` AND `messages`.`createdAt` > (SELECT `user_chats`.`updatedAt` FROM `user_chats` WHERE `user_chats`.`userId` = " +
                  user.id +
                  " AND `user_chats`.`chatId` = `chats`.`id` LIMIT 1))"
              ),
              "new",
            ],
            [
              Sequelize.literal("(SELECT `messages`.`text` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
              "lastMessage",
            ],
            [
              Sequelize.literal("(SELECT `messages`.`userId` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
              "lastUserId",
            ],
          ],
        },
        include: { model: User.scope("exclude", "role"), where: { id: { [Op.ne]: user.id } } },
        order: [
          [
            Sequelize.literal("(SELECT `messages`.`createdAt` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
            "DESC",
          ],
        ],
        limit,
        offset: (page - 1) * limit,
        subQuery: false,
      });

      // const chats = await User.findByPk(user.id, {
      //   include: {
      //     model: Chat,
      //     attributes: {
      //       include: [
      // [
      //   Sequelize.literal(
      //     "IF((SELECT `messages`.`createdAt` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1) > `chats->users->user_chat`.`updatedAt`, (SELECT COUNT(*) FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` AND `messages`.`createdAt` > `chats->users->user_chat`.`updatedAt` ), 0)"
      //   ),
      //   "new",
      // ];
      //         [
      //           Sequelize.literal("(SELECT `messages`.`text` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
      //           "lastMessage",
      //         ],
      //         [
      //           Sequelize.literal("(SELECT `messages`.`userId` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
      //           "lastUserId",
      //         ],
      //       ],
      //     },
      //     include: {
      //       model: User,
      //       attributes: {
      //         include: [[Sequelize.literal("(SELECT roleId FROM user_roles WHERE userId = users.id AND roleId = 2)"), "roleId"]],
      //       },
      //       where: { id: { [Op.ne]: user.id } },
      //     },
      //   },
      //   attributes: [],
      //   order: [
      //     [
      //       Sequelize.literal("(SELECT `messages`.`createdAt` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
      //       "DESC",
      //     ],
      //   ],
      //   logging: true,
      // });

      for await (const chat of chats.rows) {
        chat.dataValues.users = await usersStatuses(chat.users);
      }

      const pages = Math.ceil(chats.count / limit);

      return res.status(200).json({ pages, chats });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createChat(req, res) {
    try {
      const { name, ids } = req.body;
      const { user } = req;
      const created = await Chat.create({
        name,
      });
      if (!created) return res.status(400).end();
      const author = await User_Chat.create({
        chatId: created.id,
        userId: user.id,
        isAuthor: true,
      });
      const chatUsers = await User_Chat.findOrCreate({
        where: {
          chatId: created.id,
          userId: ids,
        },
      });
      return res.status(200).json("Создано");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async createMessage(req, res) {
    try {
      const { text, chatId } = req.body;
      const { user } = req;
      const check = await User_Chat.findOne({
        where: {
          userId: user.id,
          chatId: chatId,
        },
      });
      if (!check) return res.status(403).end();
      const created = await Message.create({
        text,
        userId: user.id,
        chatId,
      });
      if (!created) return res.status(400).end();
      const findNotif = await chats_notifications.findOne({
        where: {
          chatId: chatId,
        },
      });
      if (findNotif) {
        await findNotif.update({
          messageId: created.id,
          messageCount: findNotif.messageCount + 1,
        });
      } else {
        await chats_notifications.create({
          chatId,
          messageId: created.id,
        });
      }
      return res.status(200).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async updateMessage(req, res) {
    try {
      const { text } = req.body;
      const { id } = req.params;
      const { user } = req;
      const updated = await Message.update(
        { text },
        {
          where: {
            id,
            userId: user.id,
          },
        }
      );
      if (!updated) return res.status(400).end();
      return res.status(200).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async deleteMessage(req, res) {
    try {
      const { ids } = req.body;
      const { user } = req;
      const deleted = Message.destroy({
        where: {
          id: ids,
          userId: user.id,
        },
        force: true,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getNewMessages(req, res) {
    try {
      const { user } = req;
      // const messages = await Message.findAll({
      //   include: [{ model: Chat, include: { model: User, where: { id: user.id } } }, { model: User }],
      //   where: { createdAt: { [Op.gt]: Sequelize.col("chat.users.user_chat.updatedAt") }, userId: { [Op.ne]: user.id } },
      //   // where: { userId: { [Op.ne]: user.id } },
      // });
      const messages = await User.findByPk(user.id, {
        include: {
          model: Chat,
          include: [
            { model: User.scope("minAttributes"), where: { id: { [Op.ne]: user.id } } },
            {
              model: Message,
              where: { createdAt: { [Op.gt]: Sequelize.col("chats.users.user_chat.updatedAt") } },
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                Sequelize.literal("(SELECT `messages`.`text` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
                "lastMessage",
              ],
              [
                Sequelize.literal("(SELECT `messages`.`userId` FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` ORDER BY `createdAt` DESC LIMIT 1)"),
                "lastUserId",
              ],
              [
                Sequelize.literal(
                  "(SELECT COUNT(*) FROM `messages` WHERE `messages`.`chatId` = `chats`.`id` AND `messages`.`createdAt` > `chats->users->user_chat`.`updatedAt`)"
                ),
                "count",
              ],
            ],
          },
        },
        attributes: [],
      });
      const trNotifications = await Transaction.findAll({
        where: {
          recipientId: user.id,
          createdAt: {
            [Op.eq]: Sequelize.col("transactions.updatedAt"),
          },
        },
        include: { model: User.scope("minAttributes"), as: "sender" },
        order: [["createdAt", "DESC"]],
        limit: 5,
      });
      const foundSponsors = await UserSponsor.findAll({
        where: {
          userId: user.id,
        },
        order: [["createdAt", "DESC"]],
        limit: 5,
      });
      const newSponsors = await User.scope("minAttributes").findAll({
        where: {
          id: foundSponsors.map((sponsor) => sponsor.sponsorId),
        },
      });
      return res.status(200).json({ messages, trNotifications, newSponsors });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getChatByProfile(req, res) {
    try {
      const userId = Number(req.params.userId);
      const { user } = req;
      const chats = await User_Chat.findAll({
        where: {
          userId: [user.id, userId],
        },
      });

      const chatIdCounts = chats.reduce((acc, item) => {
        acc[item.chatId] = (acc[item.chatId] || 0) + 1;
        return acc;
      }, {});

      const duplicateChatIds = Object.keys(chatIdCounts).filter((chatId) => chatIdCounts[chatId] > 1);

      const userChats = chats.filter((item) => duplicateChatIds.includes(String(item.chatId)));
      const chat = userChats.find((chat) => chat.userId == userId);

      let result = chat;
      if (!chat) result = { userId: userId };

      return res.status(200).json(result);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new ChatsController();
