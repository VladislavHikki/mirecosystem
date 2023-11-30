import { Sequelize } from "sequelize";
import { User } from "../users/users.model.js";
import { chats_notifications, posts_notifications, roles_notification, sponsors_notification, transactions_notification } from "./notifications.model.js";
import { Message, User_Chat } from "../chats/chats.model.js";
import { validateError } from "../../utils/customValidation.js";
import { Post } from "../posts/posts.model.js";

class notificationController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Объект со всеми уведомлениями пользователя по ролям
   */
  async getRoleNotification(req, res) {
    try {
      const { id } = req.user;
      const rolesNotifications = await roles_notification.findAll({
        where: {
          userId: id,
        },
      });
      return res.status(200).json(rolesNotifications);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Сообщение о том, у какого пользователя были удалены уведомления
   */
  async deleteRoleNotification(req, res) {
    try {
      const { id } = req.user;
      const toDelete = await roles_notification.findAll({
        where: {
          userId: id,
        },
      });
      if (!toDelete) return res.status(404).json("Уведомлений нет");
      const deleted = await roles_notification.destroy({
        where: {
          userId: toDelete.map((notif) => notif.userId),
        },
      });
      return res.status(200).json(`Уведомления по ролям пользователя с id: ${id} удалены`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Уведомления по спонсорству
   */
  async getSponsorNotification(req, res) {
    try {
      const { id } = req.user;
      let attributes = {
        include: [
          [Sequelize.literal("(SELECT `users`.`name` FROM `users` WHERE `users`.`id` = `sponsors_notifications`.`sponsorId`)"), "sponsorName"],
          [Sequelize.literal("(SELECT `users`.`name` FROM `users` WHERE `users`.`id` = `sponsors_notifications`.`userId`)"), "studentName"],
        ],
      };
      const sponsor = await sponsors_notification.findAll({
        where: {
          sponsorId: id,
          isSponsor: 1,
        },
        attributes,
      });

      const student = await sponsors_notification.findAll({
        where: {
          userId: id,
          isSponsor: 0,
        },
        attributes,
      });
      return res.status(200).json({ sponsor, student });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Удаление уведомлений по спонсорству
   */
  async deleteSponsorNotification(req, res) {
    try {
      const { id } = req.user;
      const toDeleteSponsor = await sponsors_notification.findAll({
        where: {
          sponsorId: id,
          isSponsor: 1,
        },
        attributes: ["id"],
      });
      const toDeleteStudent = await sponsors_notification.findAll({
        where: {
          userId: id,
          isSponsor: 0,
        },
        attributes: ["id"],
      });
      if (toDeleteSponsor.length < 1 && toDeleteStudent.length < 1) return res.status(404).json("Уведомлений нет");

      let toDelete = toDeleteSponsor.concat(toDeleteStudent);

      const deleted = await sponsors_notification.destroy({
        where: {
          id: toDelete.map((user) => user.id),
        },
      });

      if (!deleted) return res.status(400).json("Ошибка при удалении уведомлений");

      return res.status(200).json(`Все уведомления по спонсорству пользователя с id: ${id} удалены`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Уведомления по транзакциям
   */
  async getTransactionsNotification(req, res) {
    try {
      const { id } = req.user;
      let attributes = {
        include: [
          [Sequelize.literal("(SELECT `users`.`name` FROM `users` WHERE `users`.`id` = `transactions_notifications`.`senderId`)"), "senderName"],
          [Sequelize.literal("(SELECT `users`.`name` FROM `users` WHERE `users`.`id` = `transactions_notifications`.`recipientId`)"), "recipientName"],
        ],
      };
      const transactions = await transactions_notification.findAll({
        where: {
          recipientId: id,
        },
        attributes,
      });
      return res.status(200).json(transactions);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Удаление уведомлений по транзакциям
   */
  async deleteTransactionsNotification(req, res) {
    try {
      const { id } = req.user;
      const toDelete = await transactions_notification.findAll({
        where: {
          recipientId: id,
        },
        attributes: ["id"],
      });

      if (toDelete < 1) return res.status(404).json("Уведомлений нет");

      const deleted = await transactions_notification.destroy({
        where: {
          id: toDelete.map((ids) => ids.id),
        },
      });
      if (!deleted) return res.status(400).end();

      return res.status(200).json(`Все уведомления по транзакциям пользователя с id: ${id} удалены`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Получение уведомлений в чатах
   */
  async getChatsNotification(req, res) {
    try {
      const { id } = req.user;
      const userChats = await User_Chat.findAll({
        where: {
          userId: id,
        },
      });
      const attributes = {
        include: [
          [Sequelize.literal("(SELECT `messages`.`userId` FROM messages WHERE `messages`.`id` = `chats_notifications`.`messageId`)"), "userId"],
          [Sequelize.literal("(SELECT `users`.`name` FROM users WHERE `users`.`id` = `userId`)"), "userName"],
          [Sequelize.literal("(SELECT `users`.`avatar` FROM users WHERE `users`.`id` = `userId`)"), "userAvatar"],
        ],
      };
      if (!userChats) return res.status(404).json("У пользователя нет чатов");
      const chatsNotifications = await chats_notifications.findAll({
        where: {
          chatId: userChats.map((chat) => chat.chatId),
        },
        attributes,
      });
      const messageCheck = await Message.findAll({
        where: {
          id: chatsNotifications.map((chat) => chat.messageId),
          userId: id,
        },
      });
      const filterNotif = chatsNotifications.filter((chat) => !messageCheck.some((mes) => mes.chatId === chat.chatId));
      return res.status(200).json({ chatsNotifications: filterNotif });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Удаление уведомлений по чатам
   */
  async deleteChatsNotification(req, res) {
    try {
      const { id } = req.user;
      const { chatId } = req.body;

      const userChats = await User_Chat.findAll({
        where: {
          userId: id,
          chatId: chatId,
        },
      });
      if (!userChats) return res.status(404).json("У пользователя нет такого чата");

      const toDelete = await chats_notifications.findOne({
        where: {
          chatId: chatId,
        },
      });
      if (!toDelete) return res.status(404).json("Уведомлений для чата нет");

      const deleted = await toDelete.destroy();
      if (!deleted) return res.status(400).json("Ошибка при удалении уведомления");

      return res.status(200).json(`Уведомления для чата с id: ${chatId} успешно удалены`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Получение уведомлений по постам
   */
  async getPostsNotification(req, res) {
    try {
      const { id } = req.user;
      let attributes = {
        include: [[Sequelize.literal("(SELECT `posts`.`title` FROM `posts` WHERE `posts`.`id` = `posts_notifications`.`postId`)"), "post"]],
      };
      const postsNotifications = await posts_notifications.findAll({
        where: {
          userId: id,
        },
        attributes,
      });
      if (!postsNotifications) return res.status(404).json("Нет уведомлений по постам");
      return res.status(200).json(postsNotifications);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Удаление уведомлений по постам
   */
  async deletePostsNotification(req, res) {
    try {
      const { id } = req.user;

      const deleted = await posts_notifications.destroy({
        where: { userId: id },
      });

      if (!deleted) return res.status(400).json("Ошибка при удалени");
      return res.status(200).json("Уведомления по постам успешно удалены");
    } catch (e) {
      console.error(e);
    }
  }
}

export default new notificationController();
