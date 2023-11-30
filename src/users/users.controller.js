import { Background, Role, Team, Transaction, TransactionEntity, User, UserSponsor, user_roles } from "./users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../../index.js";
import { NOW, Op, Sequelize, ValidationError } from "sequelize";
import uniqid from "uniqid";
import { Cities, Country, Region } from "../countries/countries.model.js";
import { Resource } from "../resources/resources.model.js";
import { Category, Franchise, Subsection } from "../categories/categories.model.js";
import dbTogether from "../../db/db.js";
import fs, { cp } from "fs";
import { User_Chat } from "../chats/chats.model.js";
import { roles_notification, sponsors_notification, transactions_notification } from "../notifications/notifications.model.js";
import { deleteFileArr, throwError, validateError } from "../../utils/customValidation.js";
import { usersStatuses } from "../../utils/dbQueries.js";

const issetRoles = {
  1: { label: "Админ" },
  2: { label: "Тренер" },
  3: { label: "Пользователь" },
  4: { label: "Куратор" },
  5: { label: "Банкир" },
  6: { label: "Кассир" },
};

const transactionsTypes = {
  0: { label: "Все типы" },
  1: { label: "Реферальная награда" },
  2: { label: "Перевод/вывод" },
  3: { label: "Спонсорское вознаграждение" },
};

const issetOrders = {
  levels: { order: "ORDER BY levels DESC" },
  forward: { order: "ORDER BY forwardCount DESC" },
  indirect: { order: "ORDER BY indirectCount DESC" },
  cpd: { order: "ORDER BY cpd DESC" },
  ucpd: { order: "ORDER BY ucpd DESC" },
};

const lemonPayments = {
  0: {
    label: "user",
    amount: 5,
  },
  1: {
    label: "starter",
    amount: 10,
  },
  2: {
    label: "profi",
    amount: 20,
  },
  3: {
    label: "expert",
    amount: 50,
  },
  4: {
    label: "guru",
    amount: 100,
  },
};

function orderByDate(str, start, finish) {
  if (!start) return "";
  const today = new Date();
  const [y, m, d] = [today.getFullYear(), (today.getMonth() + 1).toString().padStart(2, "0"), today.getDate().toString().padStart(2, "0")];
  return `${str} BETWEEN '${start}' AND '${finish ? finish : `${y}-${m}-${d}`}'`;
}

class UsersController {
  async auth(req, res) {
    try {
      const { email, password, rememberCheck } = req.body;
      const user = await User.scope("country").findOne({
        where: {
          email: email,
          verified: 1,
        },
      });
      if (!user) return res.status(403).end();

      const roles = await user.getRoles({ joinTableAttributes: [] });
      user.dataValues.roles = roles;

      const decrypt = await bcrypt.compare(password, user.password);
      if (!decrypt) return res.status(403).end();
      const accessToken = await jwt.sign(
        {
          id: user.id,
          email: user.email,
          roles: user.dataValues.roles.map((role) => role.id),
        },
        SECRET,
        {
          expiresIn: rememberCheck ? "7d" : "24h",
        }
      );
      const refreshToken = await jwt.sign(
        {
          id: user.id,
          email: user.email,
          roles: user.dataValues.roles.map((role) => role.id),
        },
        SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({ user, accessToken, refreshToken });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateProfile(req, res) {
    try {
      const { user, file } = req;
      const { name, cityId, email, password } = req.body;
      const toUpdate = await User.findByPk(user.id);
      const decrypt = await bcrypt.compare(password, toUpdate.password);
      if (!decrypt) return res.status(403).json("Пароли не совпадают");
      const toDelete = toUpdate.avatar;
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        name,
        cityId,
        email,
        avatar: file?.filename ? `/avatars/${file.filename}` : undefined,
      });
      if (!updated) return res.status(404).end();
      if (toDelete) {
        if (file?.filename && fs.existsSync(`public${toDelete}`)) fs.unlinkSync(`public${toDelete}`);
      }
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async verifyUser(req, res) {
    try {
      const { file } = req;
      const { verificationURL, name, cityId, rememberCheck } = req.body;

      const toVerify = await User.findOne({
        where: {
          verificationURL: verificationURL,
        },
      });
      if (!toVerify) return res.status(404).end();

      const updated = await toVerify.update({
        name,
        cityId,
        avatar: file?.filename ? `/avatars/${file.filename}` : undefined,
        verified: 1,
        verificationURL: null,
      });

      if (!updated) return res.status(400).json({ msg: "Ошибка верификации" });
      await updated.setRoles(3);

      const roles = await toVerify.getRoles({ joinTableAttributes: [] });
      toVerify.dataValues.roles = roles;

      let [referrers] = await dbTogether.query(
        `WITH RECURSIVE ref AS( SELECT id,referrerId,0 as level FROM users WHERE id = :userId UNION ALL SELECT m.id,m.referrerId, level+1 as level FROM users AS m JOIN ref AS t ON m.id = t.referrerId) SELECT * FROM ref WHERE ref.id != :userId`,
        {
          replacements: { userId: toVerify.id },
        }
      );

      let points = 10;

      referrers = await usersStatuses(referrers);

      for await (let referrer of referrers) {
        const transactions = [];
        for (let i = 0; i < referrer.level; i++) {
          if (referrer.referrerId === null) continue;
          const payment = lemonPayments[i];
          if (payment) {
            const transaction = {
              status: i,
              senderId: referrer.id,
              recipientId: referrer.referrerId,
              amount: payment.amount,
              type: 1,
              entityId: 2,
            };
            transactions.push(transaction);
          }
        }
        if (transactions.length > 0) {
          for await (const tr of transactions) {
            const payments = await Transaction.findOrCreate({ where: tr });
            if (payments[1] === false) continue;
            await User.increment("lemons", {
              by: payments[0].dataValues.amount,
              where: {
                id: payments[0].dataValues.recipientId,
              },
            });
          }
        }

        await Transaction.create({
          recipientId: referrer.id,
          senderId: toVerify.id,
          type: 1,
          amount: 2,
          entityId: 1,
        });
        const sponsors = await UserSponsor.findAll({
          where: {
            userId: referrer.id,
          },
        });
        await User.increment("points", {
          by: 2,
          where: { id: referrer.id },
        });
        await User.increment("points", {
          by: points * 0.1,
          where: { id: sponsors.map((sponsor) => sponsor.sponsorId) },
        });
        for await (const sponsor of sponsors) {
          Transaction.create({
            recipientId: sponsor.sponsorId,
            senderId: sponsor.userId,
            type: 3,
            amount: points * 0.1,
            entityId: 1,
          });
        }
        if (referrer.level > 1 && referrer.level < 10) {
          const sponsorsLemon = await UserSponsor.findAll({
            where: {
              userId: referrer.id,
            },
          });
          await Transaction.create({
            recipientId: referrer.id,
            senderId: toVerify.id,
            type: 1,
            amount: 2,
            entityId: 2,
          });
          await User.increment("lemons", {
            by: 2,
            where: { id: referrer.id },
          });
          await User.increment("lemons", {
            by: 2 * 0.1,
            where: { id: sponsorsLemon.map((sponsor) => sponsor.sponsorId) },
          });
          for await (const sponsor of sponsorsLemon) {
            Transaction.create({
              recipientId: sponsor.sponsorId,
              senderId: sponsor.userId,
              type: 3,
              amount: 2 * 0.1,
              entityId: 2,
            });
          }
        } else if (referrer.level == 10) {
          const sponsorsLemon = await UserSponsor.findAll({
            where: {
              userId: referrer.id,
            },
          });
          await Transaction.create({
            recipientId: referrer.id,
            senderId: toVerify.id,
            type: 1,
            amount: 17,
            entityId: 2,
          });
          await User.increment("lemons", {
            by: 17,
            where: { id: referrer.id },
          });
          await User.increment("lemons", {
            by: 17 * 0.1,
            where: { id: sponsorsLemon.map((sponsor) => sponsor.sponsorId) },
          });
          for await (const sponsor of sponsorsLemon) {
            Transaction.create({
              recipientId: sponsor.sponsorId,
              senderId: sponsor.userId,
              type: 3,
              amount: 17 * 0.1,
              entityId: 2,
            });
          }
        }
        points = points > 1 ? --points : points;
      }

      const accessToken = jwt.sign(
        {
          id: toVerify.id,
          email: toVerify.email,
          roles: toVerify.dataValues.roles.map((role) => role.id),
        },
        SECRET,
        {
          expiresIn: rememberCheck ? "7d" : "24h",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: toVerify.id,
          email: toVerify.email,
          roles: toVerify.dataValues.roles.map((role) => role.id),
        },
        SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({
        msg: "Пользователь верифицирован!",
        accessToken,
        refreshToken,
      });
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/avatars/${file.filename}`);
      if (e.errors) return res.status(500).json(e.errors[0].message);
      return res.status(500).json(e.message);
    }
  }

  async checkVerify(req, res) {
    try {
      const { verificationURL } = req.body;
      const check = await User.findOne({
        where: {
          verificationURL: verificationURL,
        },
      });
      if (!check) return res.status(404).end();
      return res.status(200).json(check);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async userCheck(req, res) {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getAdmins(req, res) {
    try {
      const { page } = req.params;
      const adminsId = await user_roles.findAndCountAll({
        where: {
          roleId: 1,
        },
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const users = await User.findAndCountAll({
        where: {
          id: adminsId.rows.map((role) => role.userId),
        },
        order: [["name"]],
      });
      const pages = Math.ceil(users.count / 25);
      return res.status(200).json({ pages, users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getTrainers(req, res) {
    try {
      const { page } = req.params;
      const limit = 25;
      const users = await User.scope("allAttributes").findAndCountAll({
        include: [{ model: Role, where: { id: 2 }, attributes: [] }],
        limit: limit,
        offset: limit * (page - 1),
        order: [["name"]],
      });
      for await (const user of users.rows) {
        const roles = await user.getRoles({ joinTableAttributes: [] });
        user.dataValues.roles = roles;
      }
      const pages = Math.ceil(users.count / limit);
      return res.status(200).json({ pages, users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getUsers(req, res) {
    try {
      const { page } = req.params;
      const limit = 5;
      const users = await User.scope("minAttributes").findAndCountAll({
        include: [{ model: Role, where: { roleId: 3 }, attributes: [] }],
        where: {
          verified: 1,
        },
        limit: limit,
        offset: limit * (Number(page ? page : 1) - 1),
        order: [["name"]],
      });
      const pages = Math.ceil(users.count / limit);
      return res.status(200).json({ pages, users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        where: {
          verified: 1,
        },
        attributes: ["id", "email", "name"],
      });
      return res.status(200).json({ users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async reg(req, res) {
    try {
      const { file } = req;
      const { password, referral, email, cityId, name, rememberCheck } = req.body;
      const encrypt = await bcrypt.hash(password, 12);
      const refCheck = await User.findOne({
        where: {
          referral: referral,
          referralExpiration: {
            [Op.gte]: new Date(),
          },
        },
      });
      if (!refCheck) return res.status(403).json("Отсутствует реферальный код!");
      const created = await User.create({
        password: encrypt,
        email,
        cityId,
        name,
        referrerId: refCheck.id,
        avatar: file?.filename ? `/avatars/${file.filename}` : "",
        account: uniqid("acc", new Date().getFullYear()),
      });
      if (!created) return res.status(400).end();
      return res.status(200).json({ created });
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/avatars/${file.filename}`);
      if (e.errors) return res.status(500).json(e.errors[0].message);
      return res.status(500).json(e.message);
    }
  }
  async createUser(req, res) {
    try {
      const { file, user } = req;
      const { name, email, password, cityId } = req.body;
      const encrypt = await bcrypt.hash(password, 12);
      const created = await User.create({
        password: encrypt,
        email,
        cityId,
        name,
        referrerId: user.id,
        avatar: `/avatars/${file.filename}`,
        account: uniqid("acc", new Date().getFullYear()),
      });
      if (!created) throw new Error("Ошибка при создании пользователя");
      created.setRoles(3);
      return res.status(201).json({ msg: "Пользователь создан" });
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/avatars/${file.filename}`);
      if (e.errors) return res.status(500).json(e.errors[0].message);
      return res.status(500).json(validateError(e));
    }
  }
  async sendPoints(req, res) {
    try {
      const { account, amount, entityId } = req.body;
      const { user } = req;
      if (amount < 1) return res.status(403).json({ message: "Нельзя отправить меньше 1 роллара!" });
      const sender = await User.findOne({
        where: {
          id: user.id,
          points: { [Op.gte]: amount },
        },
      });
      if (!sender) return res.status(403).json({ message: "У отправителя нет столько баллов!" });
      if (sender.account == account) return res.status(403).json({ message: "Отправка баллов самому себе!" });
      const recipient = await User.findOne({ where: { account } });
      if (!recipient) return res.status(404).json({ message: "Получатель не найден!" });
      const result = await dbTogether.transaction(async (t) => {
        await sender.decrement("points", { by: amount, transaction: t });
        await recipient.increment("points", { by: amount, transaction: t });
        const created = await Transaction.create(
          {
            recipientId: recipient.id,
            senderId: user.id,
            amount,
            type: 2,
            entityId,
          },
          { transaction: t }
        );
        const checkNotif = await transactions_notification.findOne({
          where: {
            senderId: user.id,
            recipientId: recipient.id,
          },
          transaction: t,
        });
        if (checkNotif) {
          await checkNotif.increment(
            {
              amount: amount,
              repeats: 1,
            },
            { transaction: t }
          );
        } else {
          await transactions_notification.create(
            {
              senderId: user.id,
              recipientId: recipient.id,
              amount: amount,
            },
            { transaction: t }
          );
        }
        return created;
      });
      if (!result) return res.status(400).json({ message: "Ошибка при отправке ролларов!" });
      return res.status(200).json({
        message: `${recipient.name} получил от вас ${amount} RLR!`,
        userId: recipient.id,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getAllPoints(req, res) {
    try {
      const { page } = req.params;
      const { entityId, type } = req.query;
      const strsearch = req.query.strsearch ?? "";
      const where = [{}];
      if (strsearch) {
        Object.assign(where[0], {
          [Op.or]: [
            Sequelize.where(Sequelize.col("sender.account"), {
              [Op.startsWith]: strsearch,
            }),
            Sequelize.where(Sequelize.col("sender.name"), {
              [Op.startsWith]: strsearch,
            }),
            Sequelize.where(Sequelize.col("recipient.account"), {
              [Op.startsWith]: strsearch,
            }),
            Sequelize.where(Sequelize.col("recipient.name"), {
              [Op.startsWith]: strsearch,
            }),
          ],
        });
      }
      if (entityId) where[0].entityId = entityId;
      if (type) where[0].type = type;

      const transactions = await Transaction.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
        where,
        include: [
          {
            model: User,
            as: "sender",
            attributes: ["name", "account"],
            // where: {
            //   [Op.or]: [
            //     {account: {
            //       [Op.startsWith]: strsearch,
            //     }},
            //     {name: {
            //       [Op.startsWith]: strsearch,
            //     }},
            //   ],
            // },
          },
          {
            model: User,
            as: "recipient",
            attributes: ["name", "account"],
            // where: {
            //   [Op.or]: [
            //     {account: {
            //       [Op.startsWith]: strsearch,
            //     }},
            //     {name: {
            //       [Op.startsWith]: strsearch,
            //     }},
            //   ],
            // },
          },
        ],
      });
      const pages = Math.ceil(transactions.count / 25);
      return res.status(200).json({ pages, transactions });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getMyPoints(req, res) {
    try {
      const { page, role } = req.params;
      const { type, entityId, strsearch } = req.query;
      const { user } = req;
      const limit = 25;
      let where = [{}];
      let include = {};

      if (!transactionsTypes[type]) throw new Error("Несуществующий тип");
      if (!(await TransactionEntity.findByPk(entityId))) throw new Error("Несуществующий тип транзакции");

      if (role === "recipient") {
        Object.assign(where[0], { recipientId: user.id });
        include = { model: User.scope("minAttributes"), as: "sender" };
      } else if (role === "sender") {
        Object.assign(where[0], {
          [Op.and]: {
            senderId: user.id,
            type: 2,
          },
        });
        include = { model: User.scope("minAttributes"), as: "recipient" };
      } else {
        Object.assign(where[0], {
          [Op.or]: {
            [Op.and]: {
              senderId: user.id,
              type: 2,
            },
            recipientId: user.id,
          },
        });
        include = [
          { model: User.scope("minAttributes"), as: "recipient" },
          { model: User.scope("minAttributes"), as: "sender" },
        ];
      }
      let trWhere = { income: [{ recipientId: user.id }], decome: [{ senderId: user.id, type: 2 }], points: [{ id: user.id }] };

      if (Number(type)) Object.assign(where[0], { type: Number(type) });
      if (Number(entityId)) Object.assign(where[0], { entityId: Number(entityId) });
      if (strsearch && strsearch.length >= 3) {
        where.push([Sequelize.where(Sequelize.col("sender.name"), { [Op.substring]: strsearch })]);
        trWhere.income.push([Sequelize.where(Sequelize.col("sender.name"), { [Op.substring]: strsearch })]);
        trWhere.decome.push([Sequelize.where(Sequelize.col("sender.name"), { [Op.substring]: strsearch })]);
      }
      const transactions = await Transaction.findAndCountAll({
        where,
        include,
        order: [["createdAt", "DESC"]],
        limit,
        offset: limit * (Number(page ? page : 1) - 1),
      });

      if (type && type != 0) {
        trWhere.income[0].type = type;
      }
      if (entityId) {
        trWhere.income[0].entityId = entityId;
        trWhere.decome[0].entityId = entityId;
      }

      let [income, decome, points] = await Promise.all([
        Transaction.sum("amount", {
          where: trWhere.income,
          include: [
            {
              model: User.scope("minAttributes"),
              as: "sender",
            },
          ],
        }),
        Transaction.sum("amount", {
          where: trWhere.decome,
          include: [
            {
              model: User.scope("minAttributes"),
              as: "sender",
            },
          ],
        }),
        User.findAll({
          where: trWhere.points,
          attributes: ["points", "lemons"],
        }),
      ]);
      if (role === "recipient") {
        const ids = [];
        for await (const tr of transactions.rows) {
          ids.push(tr.id);
        }
        if (ids.length > 0) {
          await dbTogether.query(`UPDATE transactions SET updatedAt = CURRENT_TIMESTAMP WHERE id IN (:ids)`, {
            replacements: { ids: ids },
          });
        }
      }

      // Получение рефералов и уровней
      if (type != 2) {
        const [refs] = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :id AND verified = 1 UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.id, ref.level FROM ref WHERE ref.verified = 1;`,
          {
            replacements: { id: user.id },
          }
        );
        for await (const ref of refs) {
          transactions.rows
            .filter((u) => u?.sender?.id == ref.id)
            .map((u) => {
              u.sender.dataValues.level = ref.level;
            });
        }
      }

      const pages = Math.ceil(transactions.count / limit);
      return res.status(200).json({ pages, income: income ?? 0, decome: decome ?? 0, transactions, points });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async createAdmin(req, res) {
    try {
      const { file } = req;
      const { password, email, cityId, name } = req.body;
      const encrypt = await bcrypt.hash(password, 12);
      const created = await User.create({
        password: encrypt,
        email,
        cityId,
        name,
        referrerId: 1,
        avatar: `/avatars/${file.filename}`,
        verified: 1,
        account: uniqid("acc", new Date().getFullYear()),
      });
      if (!created) throw new Error("Не удалось создать администратора");
      created.setRoles(1);
      return res.status(201).json({ msg: "Админ создан" });
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/avatars/${file.filename}`);
      return res.status(500).json(validateError(e));
    }
  }
  async refreshReferral(req, res) {
    try {
      const { user } = req;
      const token = uniqid("2-geza");
      const updated = await User.update(
        {
          referral: token,
          referralExpiration: Sequelize.literal("NOW() + INTERVAL 1 DAY"),
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      if (!updated) return res.status(404).end();
      return res.status(200).json("Новый реферальный код сгенерирован!");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async refreshDeleteToken(req, res) {
    try {
      const { user } = req;
      const token = uniqid();
      if (!user.isAdminHelper) return res.status(403).end();
      const updated = await User.update(
        {
          deleteToken: token,
          deleteTokenExpiration: Sequelize.literal("NOW() + INTERVAL 1 DAY"),
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      if (!updated) return res.status(404).end();
      return res.status(200).json(token);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getDelToken(req, res) {
    try {
      const { user } = req;
      const token = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: ["deleteToken"],
      });
      if (!token) return res.status(404).end();
      return res.status(200).json(token);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getReferral(req, res) {
    try {
      const { user } = req;
      const selUser = await User.findByPk(user.id, {
        attributes: ["referral", "referralExpiration"],
      });
      return res.status(200).json(selUser);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getAdminsList(req, res) {
    try {
      const adminsId = await user_roles.findAll({
        where: {
          roleId: 1,
        },
      });
      const users = await User.findAll({
        where: {
          id: adminsId.map((role) => role.userId),
        },
        order: [["name"]],
        attributes: [["name", "label"], ["id", "value"], "email"],
      });
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getTrainerList(req, res) {
    try {
      const trainersId = await user_roles.findAll({
        where: {
          roleId: 2,
        },
      });
      const users = await User.findAll({
        where: {
          id: trainersId.map((role) => role.userId),
        },
        order: [["name"]],
        attributes: [["name", "label"], ["id", "value"], "email"],
      });
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getUserList(req, res) {
    try {
      const usersId = await user_roles.findAll({
        where: {
          roleId: 3,
        },
      });
      const users = await User.findAll({
        where: {
          id: usersId.map((role) => role.userId),
        },
        attributes: [["name", "label"], ["id", "value"], "email"],
        order: [["name"]],
      });
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async toAdminHelper(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      if (!user.isAdminHelper) return res.status(403).json("Нестаточно прав");
      const toUpdate = await User.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = toUpdate.update({
        isAdminHelper: 1,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлен");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async delAdminHelper(req, res) {
    try {
      const { id } = req.params;
      const toUpdate = await User.findByPk(id);
      if (id != 1) {
        if (!toUpdate) return res.status(404).end();
        const updated = toUpdate.update({
          isAdminHelper: 0,
        });
        if (!updated) return res.status(404).end();
      } else {
        return res.status(403).json("Нельзя понизить главного админа!");
      }
      return res.status(200).json("Обновлен");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async changeRole(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;
      const { role } = req.body;
      if (id == 1 && user.id != 1) return res.status(403).json("Недостаточно прав!");
      if (role == 5) {
        const findBank = await user_roles.findOne({ where: { roleId: role } });
        if (findBank) return res.status(400).json("Банкир уже есть");
      }
      const toUpdate = await User.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const existRole = await user_roles.findOne({
        where: {
          userId: id,
          roleId: role,
        },
      });
      if (existRole) return res.status(400).json("Такая роль уже есть");

      const updated = toUpdate.addRoles(role);
      if (!updated) return res.status(400).json("Ошибка при добавлении роли");

      const createNotif = await roles_notification.create({
        userId: id,
        roleId: role,
      });
      return res.status(200).json(`Пользователю ${toUpdate.name} добавлена роль: ${issetRoles[role].label}`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async delRole(req, res) {
    try {
      const { role, id } = req.params;
      const findUser = await User.findByPk(id);
      if (!findUser) return res.status(404).end();
      if (id == 1 || role == 3) return res.status(403).json("Недостаточно прав!");
      const toDelete = await user_roles.findOne({
        where: {
          userId: id,
          roleId: role,
        },
      });
      if (!toDelete) return res.status(404).end();
      const deleted = await toDelete.destroy();
      if (!deleted) return res.status(400).json("Ошибка при удалении роли");

      const createNotif = await roles_notification.create({
        userId: id,
        roleId: role,
        isDel: true,
      });
      return res.status(200).json(`Пользователь ${findUser.name} лишен прав: ${issetRoles[role].label}`);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createTeam(req, res) {
    try {
      const { file } = req;
      const { label, userId, description, subsectionId, type } = req.body;
      const coach = await User.findByPk(userId);
      if (!coach) return res.status(404).end();
      const checkRole = await user_roles.findOne({
        where: {
          userId: userId,
          roleId: 2,
        },
      });
      if (!checkRole) return res.status(404).json("Пользователь не имеет статус тренера");
      const created = await Team.create({
        label,
        picture: `/teamspics/${file.filename}`,
        subsectionId,
        userId,
        description,
        type,
      });
      if (!created) return res.status(400).end();
      return res.status(200).json("Команда создана!");
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/teamspics/${file.filename}`);
      return res.status(500).json(e.message);
    }
  }
  async getTeamsSubsection(req, res) {
    try {
      const { id } = req.params;
      const subsection = await Subsection.findByPk(id);
      if (!subsection) return res.status(404).end();
      const teams = await Team.findAll({
        where: {
          subsectionId: id,
        },
        attributes: [["label", "label"], ["id", "value"], "type"],
        include: [
          {
            model: User.scope("minAttributes"),
          },
        ],
      });

      if (teams) {
        const [userInfo] = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:users) UNION ALL SELECT m.id, t.referrerId, m.verified = 1 FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count, (SELECT COUNT(resources.id) FROM resources WHERE resources.deletedAt IS NULL AND resources.userId = ref.id) AS resourceCount FROM ref GROUP BY ref.referrerId`,
          {
            replacements: { users: teams.map((t) => t.userId) },
          }
        );
        for await (const team of teams) {
          const info = userInfo.find((u) => u.referrerId == team.userId);
          team.dataValues.userCount = info?.count ? info.count : 0;
          team.dataValues.resourceCount = info?.resourceCount ? info.resourceCount : 0;
        }
      }
      return res.status(200).json({ subsection, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getLastTeams(req, res) {
    try {
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 6;
      const teams = await Team.scope(["include", "info"]).findAll({
        limit,
        order: [["createdAt", "DESC"]],
        include: [{ model: User, attributes: ["id", "name", "avatar", "email"] }, { model: Subsection }],
      });
      // if (!teams) return res.status(204).end();
      // const [userInfo] = await dbTogether.query(
      //   `WITH RECURSIVE ref AS( SELECT id, referrerId FROM users WHERE referrerId IN(:users) UNION ALL SELECT m.id, t.referrerId FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count, (SELECT COUNT(resources.id) FROM resources WHERE resources.deletedAt IS NULL AND resources.userId = ref.id) AS resourceCount FROM ref GROUP BY ref.referrerId`,
      //   { replacements: { users: teams.map((t) => t.userId) } }
      // );

      // for await (const team of teams) {
      //   const info = userInfo.find((u) => u.referrerId == team.userId);
      //   team.dataValues.resourceCount = info?.resourceCount ? info.resourceCount : 0;
      //   team.dataValues.userCount = info?.count ? info.count : 0;
      // }
      return res.status(200).json(teams);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async getOneTeam(req, res) {
    try {
      const { id } = req.params;
      const team = await Team.scope(["include", "info"]).findOne({
        where: {
          id: id,
        },
      });
      if (!team) return res.status(404).json({ err: "Такой команды нет" });

      [team.dataValues.user] = await usersStatuses([team.user]);

      // const checkReferrers = await User.findOne({
      //   where: {
      //     referrerId: team.dataValues.coachId,
      //   },
      //   attributes: ["id"],
      // });

      let users = [];
      // if (checkReferrers) {
      const [userInfo] = await dbTogether.query(
        `WITH RECURSIVE ref AS( SELECT * FROM users WHERE referrerId = :userId AND deletedAt IS NULL UNION ALL SELECT m.* FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.id, ref.name, ref.email, ref.avatar, ref.createdAt, c.label as city, r.label as region, con.label as country, COUNT(res.id) as resourceCount, (SELECT roleId FROM user_roles WHERE userId = ref.id AND roleId = 2) AS roleId FROM ref LEFT JOIN resources res ON res.userId = ref.id LEFT JOIN cities c ON c.id = ref.cityId LEFT JOIN regions r ON r.id = c.regionId LEFT JOIN countries con ON con.id = r.countryId WHERE res.deletedAt IS NULL AND ref.verified = 1 GROUP BY ref.id`,
        {
          replacements: { userId: team.dataValues.coachId },
        }
      );
      users = await usersStatuses(userInfo);
      // }

      return res.status(200).json({ team, users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async teamSearch(req, res) {
    try {
      const strsearch = req.query.strsearch;
      const type = req.query.type;
      const amount = Number(req.query.amount) ? Number(req.query.amount) : 5;
      const { page } = req.params;
      let where = [{}];
      let and = [];
      let replacements = {};
      if (strsearch) {
        and.push({
          [Op.or]: [
            {
              label: {
                [Op.startsWith]: strsearch,
              },
            },
            {
              description: {
                [Op.startsWith]: strsearch,
              },
            },
            Sequelize.where(Sequelize.col("user.name"), {
              [Op.substring]: strsearch,
            }),
            Sequelize.where(Sequelize.col("user.email"), {
              [Op.substring]: strsearch,
            }),
          ],
        });
      }
      if (type) Object.assign(where[0], { type: type });
      if (and.length) Object.assign(where[0], { [Op.and]: and });
      const teams = await Team.scope("info").findAndCountAll({
        where,
        replacements,
        limit: amount,
        offset: amount * (page - 1),
        include: [
          {
            model: User.scope("minAttributes"),
          },
          { model: Subsection, attributes: ["id", "label"] },
        ],
      });
      if (teams.length > 0) {
        if (teams.count) {
          const [userCount] = await dbTogether.query(
            `WITH RECURSIVE ref AS( SELECT id, referrerId FROM users WHERE referrerId IN(:users) UNION ALL SELECT m.id, t.referrerId FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref GROUP BY ref.referrerId`,
            {
              replacements: { users: teams.rows.map((x) => x.userId) },
            }
          );
          for await (const team of teams.rows) {
            const count = userCount.find((u) => u.referrerId == team.userId);
            team.dataValues.userCount = count ? count.count : 0;
          }
        }
      }
      const pages = Math.ceil(teams.count / amount);
      return res.status(200).json({ pages, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async teamInfo(req, res) {
    try {
      const { user } = req;
      const { page } = req.params;
      const amount = req.query.amount ? Number(req.query.amount) : 30;
      const myTeams = await Team.scope("info").findAndCountAll({
        where: {
          userId: user.id,
        },
        limit: amount,
        offset: amount * (Number(page ? page : 1) - 1),
      });

      let limit = `LIMIT ${amount * (Number(page ? page : 1) - 1)}, ${amount}`;
      // Получение команд пользователя
      let teams = { count: 0, rows: [] };
      [[[teams.count]], [teams.rows]] = await Promise.all([
        dbTogether.query(
          `WITH RECURSIVE ref AS (SELECT id,referrerId,name FROM users WHERE id = ${Number(
            user.referrerId
          )} UNION ALL SELECT m.id,m.referrerId,m.name as userCount FROM users AS m JOIN ref AS t ON m.id = t.referrerId) SELECT COUNT(t.id) AS count FROM ref LEFT JOIN teams t ON ref.id = t.userId LEFT JOIN subsections d ON t.subsectionId = d.id`
        ),
        dbTogether.query(
          `WITH RECURSIVE ref AS (SELECT id,referrerId,name FROM users WHERE id = ${Number(
            user.referrerId
          )} UNION ALL SELECT m.id,m.referrerId,m.name as userCount FROM users AS m JOIN ref AS t ON m.id = t.referrerId) SELECT t.id, t.label, t.description, t.picture, t.type, t.createdAt, ref.name, ref.id AS coachId, d.id AS subsectionId, d.label AS subsectionLabel, (WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = ref.id UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(teamRef.id) FROM teamRef WHERE teamRef.verified = 1) AS userCount, COUNT(r.id) as resourcesCount FROM ref LEFT JOIN teams t ON ref.id = t.userId LEFT JOIN subsections d ON t.subsectionId = d.id LEFT JOIN resources r ON r.teamId = t.id WHERE t.id IS NOT NULL AND r.deletedAt IS NULL GROUP BY t.id ORDER BY t.createdAt ${limit};`
        ),
      ]);
      teams.count = teams.count.count || 0;
      let myPages = Math.ceil(myTeams.count / amount);
      let pages = Math.ceil(teams.count / amount);
      return res.status(200).json({ myPages, myTeams, pages, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getTeams(req, res) {
    try {
      const { page } = req.params;
      const { deleted, search } = req.query;
      const amount = req.query.amount ? Number(req.query.amount) : 25;
      const where = {};
      if (search) {
        Object.assign(where, {
          [Op.or]: [
            {
              label: {
                [Op.startsWith]: search,
              },
            },
            {
              description: {
                [Op.startsWith]: search,
              },
            },
            Sequelize.where(Sequelize.col("user.name"), {
              [Op.substring]: search,
            }),
            Sequelize.where(Sequelize.col("user.email"), {
              [Op.substring]: search,
            }),
          ],
        });
      }
      const teams = await Team.scope(["include", "info"]).findAndCountAll({
        where,
        order: [["label", "ASC"]],
        limit: amount,
        offset: amount * (Number(page ? page : 1) - 1),
        paranoid: deleted ? false : true,
        // include: [{ model: Subsection, attributes: ["id", "label"] }],
      });

      // if (!teams.count) return res.status(204).end();

      // const [userCount] = await dbTogether.query(
      //   `WITH RECURSIVE ref AS( SELECT id, referrerId FROM users WHERE referrerId IN(:users) UNION ALL SELECT m.id, t.referrerId FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref GROUP BY ref.referrerId`,
      //   {
      //     replacements: { users: teams.rows.map((x) => x.userId) },
      //   }
      // );

      // for await (const team of teams.rows) {
      //   let count;
      //   count = userCount.find((u) => u.referrerId == team.userId);
      //   team.dataValues.userCount = count ? count.count : 0;
      // }

      const pages = Math.ceil(teams.count / amount);
      return res.status(200).json({ pages, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async updateTeam(req, res) {
    try {
      const { file } = req;
      const { id } = req.params;
      const { label, userId, subsectionId, description, type } = req.body;

      const toUpdate = await Team.findByPk(id);
      if (!toUpdate) return res.status(404).json({ msg: "Команда не найдена" });

      const coach = await User.findByPk(userId);
      if (!coach) return res.status(404).json({ msg: "Тренер не найден" });

      const checkRole = await user_roles.findOne({
        where: {
          userId: userId,
          roleId: 2,
        },
      });
      if (!checkRole) return res.status(403).json("Пользователь не имеет статус тренера");

      const toDelete = toUpdate?.picture;
      const updated = await toUpdate.update({
        label,
        userId,
        description,
        subsectionId,
        picture: file?.filename ? `/teamspics/${file.filename}` : undefined,
        type,
      });
      if (!updated) return res.status(400).end();
      if (toDelete) {
        if (file?.filename && fs.existsSync(`public${toDelete}`)) fs.unlinkSync(`public${toDelete}`);
      }
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: {
          id: id,
          verified: 1,
        },
        attributes: ["id", "name"],
      });
      if (!user) return res.status(404).json("Пользователь не найден");
      return res.status(200).json(user);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getLastUsers(req, res) {
    try {
      let users = await User.scope(["allAttributes", "country"]).findAll({
        where: {
          verified: 1,
        },
        limit: 6,
        order: [["createdAt", "DESC"]],
      });

      users = await usersStatuses(users);

      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getAdminSponsors(req, res) {
    try {
      const { page } = req.params;
      const strsearch = req.query.strsearch || "";
      const limit = 25;
      const spCount = await UserSponsor.count({
        where: {
          userId: { [Op.ne]: Sequelize.col("sponsorId") },
        },
        distinct: true,
      });
      const sponsors = await UserSponsor.findAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset: limit * (Number(page ? page : 1) - 1),
        where: {
          userId: { [Op.ne]: Sequelize.col("sponsorId") },
        },
        group: ["sponsorId"],
      });
      const sponsorProfile = await User.scope("allAttributes").findAll({
        where: {
          id: sponsors.map((sponsor) => sponsor.sponsorId),
          [Op.or]: {
            name: {
              [Op.substring]: strsearch,
            },
          },
        },
        include: [
          {
            model: User.scope("allAttributes"),
            as: "sponsor",
          },
        ],
        order: [["name", "ASC"]],
      });
      const pages = Math.ceil(spCount / limit);
      return res.status(200).json({ spCount, pages, sponsorProfile });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getAdminSponsorsStudents(req, res) {
    try {
      const { id, page } = req.params;
      const foundStudents = await UserSponsor.findAndCountAll({
        where: {
          sponsorId: id,
          userId: { [Op.ne]: Sequelize.col("sponsorId") },
        },
      });
      const students = await User.scope("minAttributes").findAll({
        where: {
          id: foundStudents.rows.map((st) => st.userId),
        },
      });
      const pages = Math.ceil(foundStudents.count / 25);
      return res.status(200).json({ count: foundStudents.count, pages, students });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getStudents(req, res) {
    try {
      const strsearch = req.query.strsearch ?? "";
      const page = Number(req.query.page) ? Number(req.query.page) : 1;
      const limit = 25;
      const studentIds = await UserSponsor.findAndCountAll({
        attributes: ["userId", "sponsorId"],
        limit,
        offset: limit * (page - 1),
      });

      const count = await UserSponsor.count();

      const students = await User.scope("allAttributes").findAll({
        where: {
          id: studentIds.rows.map((stud) => stud.userId),
          [Op.or]: {
            name: {
              [Op.startsWith]: strsearch,
            },
            email: {
              [Op.startsWith]: strsearch,
            },
          },
        },
        include: [
          {
            model: User.scope("allAttributes"),
            as: "user",
            through: { attributes: ["createdAt"] },
          },
        ],
      });

      const pages = Math.ceil(count / limit);

      return res.status(200).json({ pages, count, students });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getAllSponsors(req, res) {
    try {
      const { page } = req.params;
      const sponsCount = await UserSponsor.count({
        attributes: ["sponsorId", [Sequelize.fn("COUNT", Sequelize.col("userId")), "count"]],
        group: "sponsorId",
        order: [["count", "DESC"]],
      });
      const sponsors = await UserSponsor.findAll({
        attributes: ["sponsorId", [Sequelize.fn("COUNT", Sequelize.col("userId")), "count"]],
        group: "sponsorId",
        order: [["count", "DESC"]],
        limit: 25,
        offset: 25 * Number((page ?? 1) - 1),
      });

      const where = { id: sponsors.map((x) => x.sponsorId) };

      // const sponsors = await User.scope(["minAttributes", "country"]).findAll({
      //   where: {
      //     id: sponsors.map((x) => x.sponsorId),
      //   },
      // });
      // for await (const user of sponsors) {
      //   const data = sponsors.filter((spons) => spons.sponsorId == user.id)[0];
      //   user.dataValues.count = data.dataValues.count;
      // }
      const users = await User.scope(["allAttributes", "country", "role"]).findAll({
        where,
      });
      /* for await (const user of users) {
        const data = sponsors.filter((spons) => spons.sponsorId == user.id)[0];
        user.dataValues.count = data.dataValues.count;
      } */
      for await (const sponsor of sponsors) {
        const data = users.filter((user) => user.id == sponsor.sponsorId)[0];
        Object.assign(sponsor.dataValues, data.dataValues);
      }

      const sponsorStat = await usersStatuses(sponsors);

      const pages = Math.ceil(sponsCount.length / 25);
      return res.status(200).json({ pages, sponsors: sponsorStat });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getUserSponsors(req, res) {
    try {
      const { id } = req.params;
      const userData = req.user;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json("Пользователь не найден");

      // Спонсоры
      let where = {
        userId: id,
        [Op.not]: {
          sponsorId: id,
        },
      };

      const sponsors = await UserSponsor.findAll({
        where,
      });
      // кол-во спонсоров
      const sponsorCount = await UserSponsor.findAll({
        where: {
          userId: sponsors.map((sponsor) => sponsor.sponsorId),
        },
        attributes: ["sponsorId", "userId", [Sequelize.fn("COUNT", Sequelize.col("userId")), "count"]],
        group: "userId",
      });
      // Спонсоры пользователя
      where = {};
      where.id = sponsors.map((x) => x.sponsorId);

      const sponsorsUser = await User.scope(["minAttributes", "country"]).findAll({
        where,
      });
      for await (const user of sponsorsUser) {
        const data = sponsorCount.filter((spons) => spons.userId == user.id)[0];
        user.dataValues.count = data?.dataValues?.count ?? 0;
      }

      // Студенты
      const students = await UserSponsor.findAll({
        where: {
          sponsorId: id,
          [Op.not]: {
            userId: id,
          },
        },
      });
      const studentCount = await UserSponsor.findAll({
        where: {
          userId: students.map((student) => student.userId),
        },
        attributes: ["sponsorId", "userId", [Sequelize.fn("COUNT", Sequelize.col("userId")), "count"]],
        group: "userId",
      });
      where.id = students.map((x) => x.userId);
      const studentsUser = await User.scope(["minAttributes", "country"]).findAll({
        where,
      });
      for await (const user of studentsUser) {
        const data = studentCount.filter((spons) => spons.userId == user.id)[0];
        user.dataValues.count = data?.dataValues?.count ?? 0;
      }
      return res.status(200).json({ user, sponsors: sponsorsUser, students: studentsUser });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getSponsorLeaders(req, res) {
    try {
      const { user } = req;
      const amount = Number(req.query.amount) ? Number(req.query.amount) : 6;
      let [users] = await dbTogether.query(
        "SELECT users.id, users.name, users.email, users.avatar, users.account, users.createdAt, COUNT(user_sponsors.userId) AS count, countries.label AS county, regions.label AS region, cities.label AS city, (SELECT roleId FROM user_roles WHERE userId = users.id AND roleId = 2) AS roleId FROM user_sponsors LEFT JOIN users ON users.id = user_sponsors.sponsorId LEFT JOIN cities ON cities.id = users.cityId LEFT JOIN regions ON regions.id = cities.regionId LEFT JOIN countries ON countries.id = regions.countryId GROUP BY user_sponsors.sponsorId ORDER BY count DESC LIMIT :amount",
        {
          replacements: {
            amount: amount,
          },
        }
      );

      users = await usersStatuses(users);

      return res.status(200).json({ sponsors: users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getLastSponsors(req, res) {
    try {
      const { user } = req;
      const sponsors = await UserSponsor.findAll({
        limit: 6,
        group: "sponsorId",
        order: [["createdAt", "DESC"]],
      });
      const where = {
        id: sponsors.map((x) => x.sponsorId),
      };

      let users = await User.scope(["country", "role", "allAttributes"]).findAll({
        where,
      });
      const student = await UserSponsor.findAll({
        where: {
          sponsorId: sponsors.map((x) => x.sponsorId),
        },
        attributes: ["sponsorId", [Sequelize.fn("COUNT", Sequelize.col("userId")), "count"]],
        group: "sponsorId",
      });
      for await (const user of users) {
        const data = student.filter((spons) => spons.sponsorId == user.id)[0];
        user.dataValues.count = data.dataValues.count;
      }

      users = await usersStatuses(users);

      return res.status(200).json({ sponsors: users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async createSponsor(req, res) {
    try {
      const { sponsor, user } = req.params;

      const sponsorCheck = await User.findByPk(sponsor);
      if (!sponsorCheck) return res.status(404).json("Спонсор не найден");

      const userCheck = await User.findByPk(user);
      if (!userCheck) return res.status(404).json("Пользователь не найден");

      const issetRow = await UserSponsor.findOne({
        where: {
          userId: user,
        },
      });
      if (issetRow) return res.status(400).json("У пользователя есть спонсор");

      const created = await UserSponsor.findOrCreate({
        where: {
          userId: user,
          sponsorId: sponsor,
        },
      });
      if (!created) return res.status(400).json("Ошибка при добавлении спонсора");

      if (sponsor != user) {
        const notifSponsor = await sponsors_notification.bulkCreate([
          {
            sponsorId: sponsor,
            userId: user,
          },
          {
            sponsorId: sponsor,
            userId: user,
            isSponsor: true,
          },
        ]);
      } else {
        const notifSponsor = await sponsors_notification.create({
          sponsorId: sponsor,
          userId: user,
        });
      }

      return res.status(200).json("Спонсор добавлен");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async deleteSponsor(req, res) {
    try {
      const { userId } = req.body;
      const find = await UserSponsor.findOne({
        where: {
          userId,
        },
      });
      if (!find) throw new Error("Не найдено");
      const deleted = await find.destroy();
      if (!deleted) throw new Error("Ошибка удаления");
      return res.status(200).json("Связь удалена");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async getFranLeaders(req, res) {
    try {
      const { user } = req;
      const where = {
        referrerId: {
          [Op.not]: null,
        },
      };

      const users = await User.findAll({
        where,
        include: [{ model: Franchise }],
        // include: [{ model: Resource }, { model: Cities, include: { model: Region, include: { model: Country } } }],
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.col("franchises.userId")), "francount"]],
        },
        subQuery: false,
        group: ["franchises.userId"],
        order: [["francount", "DESC"]],
        limit: 6,
        having: Sequelize.literal("francount > 0"),
      });
      return res.status(200).json(users);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getRefLeaders(req, res) {
    try {
      let { amount, order, startedAt, finishedAt } = req.query;

      if (!order) order = "";
      if (!issetOrders[order] && order != "") throw new Error("Несуществующая сортировка");
      const orderBy = issetOrders[order]?.order ? issetOrders[order]?.order : "ORDER BY total DESC";

      const refs = await dbTogether.query(
        `WITH RECURSIVE cte(referrerId, level, hidden, verified, createdAt) AS( SELECT referrerId, 1 as level, hidden, verified, createdAt FROM users WHERE referrerId IS NOT NULL AND verified = 1 AND hidden = 0 UNION ALL SELECT u.referrerId, c.level + 1 as level, u.hidden, u.verified, u.createdAt FROM cte c INNER JOIN users u ON c.referrerId = u.id WHERE u.referrerId > 0 AND u.hidden = 0 ${orderByDate(
          "AND u.createdAt",
          startedAt,
          finishedAt
        )}) SELECT u.id, c.referrerId, u.name, u.avatar, u.email, city.label, reg.label, con.label, (SELECT COUNT(*) FROM cte WHERE referrerId = u.id AND verified = 1  ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )}) AS total, MAX(c.level) AS levels, (SELECT COUNT(*) FROM users WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )}) AS forwardCount, ((SELECT COUNT(*) FROM cte WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )}) - (SELECT COUNT(*) FROM users WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )})) AS indirectCount, ROUND((((SELECT COUNT(*) FROM cte WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )}) - (SELECT COUNT(*) FROM users WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )})) / (SELECT COUNT(*) FROM users WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )})), 1) AS cpd, ROUND(((((SELECT COUNT(*) FROM cte WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )}) - (SELECT COUNT(*) FROM users WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )})) / (SELECT COUNT(*) FROM users WHERE referrerId = u.id AND verified = 1 ${orderByDate(
          "AND createdAt",
          startedAt,
          finishedAt
        )})) / DATEDIFF(CURDATE(), u.createdAt)), 1) AS ucpd, (SELECT roleId FROM user_roles WHERE userId = c.referrerId AND roleId = 2) AS roleId FROM cte c LEFT JOIN users u ON c.referrerId = u.id LEFT JOIN cities city ON u.cityId = city.id LEFT JOIN regions reg ON city.regionId = reg.id LEFT JOIN countries con ON reg.countryId = con.id WHERE u.verified = 1 AND c.hidden = 0 GROUP BY referrerId ${orderBy} LIMIT 1, :limit;`,
        {
          replacements: {
            limit: amount ? Number(amount) : 6,
          },
        }
      );
      const pages = 1;
      let referers = refs[0];

      await usersStatuses(referers);

      for await (const ref of referers) {
        if (!ref?.total) ref.total = 0;
        if (!ref?.forwardCount) ref.forwardCount = 0;
        if (!ref?.indirectCount) ref.indirectCount = 0;
        if (!ref?.cpd) ref.cpd = (0.0).toFixed(1);
        if (!ref?.ucpd) ref.ucpd = (0.0).toFixed(1);
      }

      return res.status(200).json({ pages, referers });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getProfileReferalls(req, res) {
    try {
      const { id } = req.params;
      const { level, page } = req.query;
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 30;
      let strLevel = level ? `WHERE level = ${Number(level)} AND ref.verified = 1 AND ref.hidden = 0` : "WHERE ref.verified = 1 AND ref.hidden = 0";

      let [total, count, pointsAmount] = await Promise.all([
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(*) as count, MAX(level) as levels FROM ref WHERE ref.verified = 1 AND ref.hidden = 0`,
          {
            replacements: { userId: id },
          }
        ),
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(*) AS count FROM ref ${strLevel}`,
          {
            replacements: { userId: id },
          }
        ),
        Transaction.sum("amount", {
          where: {
            recipientId: id,
            type: 1,
            entityId: 1,
          },
        }),
      ]);
      const pages = Math.ceil(count[0][0].count / limit);
      const strPage = `LIMIT ${limit * (Number(page ? page : 1) - 1)}, ${limit}`;
      strLevel = level ? `WHERE ref.level = ${Number(level)} AND ref.verified = 1 AND ref.hidden = 0` : "WHERE ref.verified = 1 AND ref.hidden = 0";
      const refs = await dbTogether.query(
        `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.id, ref.email, ref.name, ref.avatar, ref.createdAt, ref.level, c.label, (SELECT COUNT(*) FROM resources WHERE userId = ref.id AND resources.deletedAt IS NULL) AS resourcesCount, (SELECT roleId FROM user_roles WHERE userId = ref.id AND roleId = 2) AS roleId FROM ref LEFT JOIN cities c ON ref.cityId = c.id ${strLevel} GROUP BY ref.id ORDER BY ref.createdAt DESC ${strPage};`,
        {
          replacements: {
            userId: id,
          },
        }
      );
      const refCount = [];
      for await (const countRef of refs[0]) {
        const result = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(*) AS refsCount FROM ref WHERE ref.verified = 1 AND ref.hidden = 0`,
          {
            replacements: { userId: countRef.id },
          }
        );
        refCount.push(result[0][0]);
      }
      for await (const ref of refs[0]) {
        ref.refsCount = refCount[refs[0].indexOf(ref)].refsCount;
      }

      let countInLevel;
      if (level) {
        [[countInLevel]] = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(*) as count FROM ref WHERE ref.verified = 1 AND ref.hidden = 0 AND ref.level = :level`,
          {
            replacements: { userId: id, level: level },
          }
        );

        const [refsIds] = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT id FROM ref WHERE ref.verified = 1 AND ref.hidden = 0 AND ref.level = :level`,
          {
            replacements: { userId: id, level: level },
          }
        );

        pointsAmount = await Transaction.sum("amount", {
          where: {
            recipientId: id,
            type: 1,
            entityId: 1,
            senderId: refsIds.map(({ id }) => id),
          },
        });
      }

      const referals = await usersStatuses(refs[0]);

      return res.status(200).json({
        pages,
        total: total[0][0],
        count: countInLevel?.count,
        pointsAmount,
        refs: referals,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getProfileReferrers(req, res) {
    try {
      const { id } = req.params;
      const referrers = await dbTogether.query(
        `WITH RECURSIVE ref AS( SELECT * FROM users WHERE id = :userId UNION ALL SELECT m.* FROM users AS m JOIN ref AS t ON m.id = t.referrerId) SELECT u.id, u.email, u.name, u.avatar, u.createdAt, c.label, COUNT(r.id) AS resourcesCount FROM ref LEFT JOIN users u ON ref.id = u.id LEFT JOIN cities c ON u.cityId = c.id LEFT JOIN resources r ON ref.id = r.userId WHERE r.deletedAt IS NULL AND ref.verified = 1 GROUP BY u.id ORDER BY u.createdAt`,
        {
          replacements: { userId: id },
        }
      );
      const referralCount = [];
      for await (const countRef of referrers[0]) {
        const result = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(*) AS refsCount FROM ref WHERE ref.verified = 1`,
          {
            replacements: { userId: countRef.id },
          }
        );
        referralCount.push(result[0][0]);
      }
      for await (const ref of referrers[0]) {
        ref.refsCount = referralCount[referrers[0].indexOf(ref)].refsCount;
      }
      return res.status(200).json({ referrers: referrers[0] });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getProfile(req, res) {
    try {
      const { id } = req.params;
      const userData = req.user;
      const attributes = {
        include: [
          [Sequelize.literal("(SELECT COUNT(resources.id) FROM resources WHERE resources.userId = users.id AND resources.deletedAt IS NULL)"), "resourceCount"],
        ],
      };
      let user = await User.scope(["country", "allAttributes"]).findOne({
        attributes,
        where: {
          id,
          verified: 1,
        },
      });
      if (!user) throw new Error("Не найдено!");
      user.dataValues.roles = await user.getRoles({ joinTableAttributes: [] });
      let total = { teams: {} },
        resources,
        curators,
        myCurators,
        students,
        sponsors,
        franchises,
        userCount,
        referrals,
        teams = {},
        forwards;

      [
        resources,
        curators,
        myCurators,
        students,
        sponsors,
        franchises,
        [teams.referrers],
        [teams.referrals],
        teams.user,
        [[userCount]],
        [referrals],
        forwards,
      ] = await Promise.all([
        // ресурсы
        Resource.findAll({
          where: {
            userId: id,
          },
        }),
        // Кураторы
        Resource.findAll({
          where: {
            curatorId: id,
            userId: { [Op.ne]: null },
          },
          include: { model: User.scope("minAttributes"), as: "user", where: { verified: 1 } },
          group: `user.id`,
        }),
        // Мои кураторы
        Resource.findAll({
          where: {
            userId: id,
            curatorId: { [Op.not]: null },
          },
          include: { model: User.scope("minAttributes"), as: "curator" },
          group: `curator.id`,
        }),
        // Студенты
        UserSponsor.findAll({
          where: {
            sponsorId: id,
            [Op.not]: {
              userId: id,
            },
          },
        }),
        // Спонсоры
        UserSponsor.findAll({
          where: {
            userId: id,
            [Op.not]: {
              sponsorId: id,
            },
          },
        }),
        // Франшизы
        Resource.findAll({
          include: {
            model: Franchise,
          },
          where: {
            userId: id,
          },
          group: ["resources.franchiseId"],
        }),
        // Команды рефереров
        dbTogether.query(
          `SELECT id, label, description, picture, type, createdAt, (SELECT name FROM users WHERE users.id = teams.userId) as name, userId AS coachId, subsectionId, (SELECT subsections.label FROM subsections WHERE subsections.id = teams.subsectionId) AS subsectionLabel, (WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = teams.userId UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(teamRef.id) FROM teamRef WHERE teamRef.verified = 1) AS userCount FROM teams WHERE userId IN((WITH RECURSIVE ref AS( SELECT * FROM users WHERE id = :userId UNION ALL SELECT m.* FROM users AS m JOIN ref AS t ON m.id = t.referrerId) SELECT ref.id FROM ref WHERE ref.verified = 1 AND ref.id != :userId))`,
          { replacements: { userId: id } }
        ),
        // команды рефералов
        dbTogether.query(
          `WITH RECURSIVE ref AS (SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.level, t.id, t.label, t.description, t.picture, t.type, t.createdAt, ref.name, ref.id AS coachId, subs.id AS subsectionId, subs.label AS subsectionLabel, (WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = ref.id UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(teamRef.id) FROM teamRef WHERE teamRef.verified = 1) AS userCount FROM ref JOIN teams AS t ON t.userId = ref.id JOIN subsections AS subs ON subs.id = t.subsectionId WHERE ref.verified = 1 AND ref.hidden = 0 AND t.deletedAt IS NULL AND ref.level BETWEEN 1 AND 10 ORDER BY ref.level ASC`,
          {
            replacements: { userId: id },
          }
        ),
        // Команды пользователя
        Team.scope("info").findAll({
          where: {
            userId: id,
          },
        }),
        dbTogether.query(
          `WITH RECURSIVE ref AS (SELECT id, verified, hidden FROM users WHERE referrerId = :userId UNION ALL SELECT m.id, m.verified, m.hidden FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(ref.id) AS userCount FROM ref WHERE ref.verified = 1 AND ref.hidden = 0`,
          { replacements: { userId: id } }
        ),
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 1 AS level FROM users WHERE referrerId = :userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.level, ref.id, ref.email, ref.name, ref.avatar, ref.createdAt, cities.label AS city, regions.label AS region, countries.label AS country, (SELECT roleId FROM user_roles WHERE userId = ref.id AND roleId = 2) AS roleId FROM ref LEFT JOIN cities ON cities.id = ref.cityId LEFT JOIN regions ON regions.id = cities.regionId LEFT JOIN countries ON countries.id = regions.countryId WHERE ref.verified = 1 AND ref.hidden = 0`,
          { replacements: { userId: id } }
        ),
        User.count({
          where: {
            verified: 1,
            referrerId: id,
          },
        }),
      ]);
      total.resources = resources.length || 0;
      total.referrals = referrals.length || 0;
      total.teams.user = teams.user.length || 0;
      total.teams.referrers = teams.referrers.length || 0;
      total.teams.referrals = teams.referrals.length || 0;
      total.students = students.length || 0;
      total.sponsors = sponsors.length || 0;
      total.curators = curators.length || 0;
      total.myCurators = myCurators.length || 0;

      let cpd = ((referrals.length - forwards) / forwards).toFixed(1);
      if (cpd == "NaN") cpd = (0.0).toFixed(1);
      user.dataValues.cpd = cpd;

      let createdAt = new Date(user.createdAt);
      let currentDate = new Date();
      let timeDifference = currentDate - createdAt;
      let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      let ucpd = ((referrals.length - forwards) / forwards / daysDifference).toFixed(1);
      if (ucpd == "NaN") ucpd = (0.0).toFixed(1);
      user.dataValues.ucpd = ucpd;

      [user] = await usersStatuses([user]);

      referrals = await usersStatuses(referrals);

      return res.status(200).json({ total, user, resources, teams, franchises, referrals, curators, myCurators, students, sponsors });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async search(req, res) {
    try {
      let roleFilter = {};
      let where = { verified: 1 };
      const { page } = req.params;
      const { strsearch } = req.query;
      const role = Number(req.query.role);
      if (role) {
        Object.assign(roleFilter, {
          roleId: {
            [Op.eq]: role,
          },
        });
      }
      const roles = await user_roles.findAll({
        where: roleFilter,
      });

      if (strsearch) {
        Object.assign(where, {
          [Op.or]: [
            {
              name: {
                [Op.substring]: strsearch,
              },
            },
            {
              email: {
                [Op.substring]: strsearch,
              },
            },
          ],
        });
      }
      Object.assign(where, {
        id: {
          [Op.in]: roles.map((role) => role.userId),
        },
      });
      const users = await User.scope("allAttributes").findAndCountAll({
        where: where,
        order: [["createdAt", "DESC"]],
        limit: 25,
        offset: 25 * (Number(page ?? 1) - 1),
      });
      const pages = Math.ceil(users.count / 25);

      return res.status(200).json({ pages, users });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteTeams(req, res) {
    try {
      const { ids } = req.body;
      const deleted = await Team.destroy({
        where: {
          id: ids,
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
  async restoreTeams(req, res) {
    try {
      const { ids } = req.body;
      const restored = await Team.restore({
        where: {
          id: ids,
        },
      });
      if (!restored) return res.status(404).end();
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { ids, delToken } = req.body;
      let force = /true/i.test(req.body.force);
      // const delTokenCheck = await User.findOne({
      //   where: {
      //     deleteToken: delToken,
      //     deleteTokenExpiration: {
      //       [Op.gte]: new Date(),
      //     },
      //   },
      // });
      if (ids == 1) return res.status(403).end();
      // if (!delTokenCheck) return res.status(403).json("Отсутствует код удаления!");
      const foundUser = await User.findAll({
        where: {
          id: ids,
        },
        paranoid: !force,
      });
      if (foundUser.length == 0) throwError(404, "Пользователь не найден!");
      const params = { force: false };
      if (force) {
        params.force = force;
        params.individualHooks = true;
        params.hooks = true;
      }
      const deleted = foundUser.map(async (x) => {
        await x.destroy(params);
      });
      if (!deleted) throwError(400, "Ошибка при удалении пользователя");
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(e.code || 500).json(e.message);
    }
  }

  /**
   * Получение кураторов с пагинацией и поиском
   *
   * @param {*} req
   * @param {*} res
   * @param {String} req.query.strsearch
   *
   * @returns {pages, curators}
   */
  async getAllCurators(req, res) {
    try {
      const strsearch = req.query.strsearch ?? "";
      const { page } = req.params;
      const roles = await user_roles.findAndCountAll({
        where: {
          roleId: 4,
        },
        limit: 25,
        offset: 25 * (Number(page ?? 1) - 1),
      });
      const curators = {};
      const count = await User.count({
        where: {
          id: roles.rows.map((role) => role.userId),
        },
      });
      if (count) curators.count = count;
      const curatorsRows = await User.scope("allAttributes").findAll({
        where: {
          id: roles.rows.map((role) => role.userId),
          [Op.or]: {
            name: {
              [Op.startsWith]: strsearch,
            },
            email: {
              [Op.startsWith]: strsearch,
            },
          },
        },
        order: ["name"],
      });
      if (curatorsRows) curators.rows = curatorsRows;
      const pages = Math.ceil(roles.count / 25);
      return res.status(200).json({ pages, curators });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   * Получение списка кураторов
   *
   * @param {*} req
   * @param {*} res
   *
   * @returns {curators}
   */
  async getListCurators(req, res) {
    try {
      const roles = await user_roles.findAll({
        where: {
          roleId: 4,
        },
      });
      const curators = await User.findAll({
        where: {
          id: roles.map((role) => role.userId),
        },
        attributes: [["name", "label"], ["id", "value"], "email"],
      });
      return res.status(200).json({ curators });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getNotifications(req, res) {
    try {
      const { user } = req;
      let notifications = {};

      // Транзакции
      notifications.transactions = await Transaction.findAll({
        where: {
          recipientId: user.id,
          checked: 0,
        },
      });

      // Изменение роли
      notifications.changeRole = await user_roles.findAll({
        where: {
          userId: user.id,
          checked: 0,
          roleId: {
            [Op.ne]: 3,
          },
        },
      });

      // Выпускник
      notifications.student = await UserSponsor.findAll({
        where: {
          userId: user.id,
        },
      });

      // Спонсор
      notifications.sponsor = await UserSponsor.findAll({
        where: {
          sponsorId: user.id,
        },
      });

      return res.status(200).json({ notifications });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async hideUser(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      if (!user.isAdminHelper) throw new Error("Недостаточно прав!");

      const toUpdate = await User.findOne({
        where: {
          id,
        },
      });
      if (!toUpdate) throw new Error("Не найден!");

      const updated = await toUpdate.update({
        hidden: !toUpdate.hidden,
      });
      if (!updated) throw new Error("Ошибка при редактировании");
      return res.status(200).json({ msg: `Пользователь ${!toUpdate.hidden ? "виден" : "скрыт"}!` });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async createBackground(req, res) {
    try {
      const { user, file } = req;
      const { background } = req.body;
      const toCreate = {
        background,
        type: 1,
        userId: user.id,
      };
      if (file) {
        toCreate.background = `${file.destination}/${file.filename}`;
        toCreate.type = 0;
      }
      const result = await dbTogether.transaction(async (t) => {
        const created = await Background.create(toCreate);
        const userBg = await User.update(
          { backgroundId: created.id },
          {
            where: {
              id: user.id,
            },
          },
          { transction: t }
        );
        return [created, userBg];
      });
      if (!result) throw new Error("Ошибка при создании");
      return res.status(200).json("Создано");
    } catch (e) {
      const { file } = req;
      if (file) deleteFileArr([file]);
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async updateUserBackground(req, res) {
    try {
      const { id } = req.body;
      const { user } = req;
      if (id == 0) {
        const reset = await User.update({ backgroundId: null }, { where: { id: user.id } });
        if (!reset) return res.status(500).json("Ошибка при редактировании");
        return res.status(200).json("Изменено");
      }
      const find = await Background.findOne({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!find) return res.status(404).json("Не найдено");
      const upd = await User.update({ backgroundId: id }, { where: { id: user.id } });
      if (!upd) return res.status(500).json("Ошибка при редактировании");
      return res.status(200).json("Изменено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async UpdateOneBackground(req, res) {
    try {
      const { file, user } = req;
      const { id } = req.params;
      const { background } = req.body;
      const find = await Background.findOne({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!find) return res.status(404).json("Не найдено");
      const toUpdate = { type: 1, background };
      if (file) {
        toUpdate.type = 0;
        toUpdate.background = `${file.destination}/${file.filename}`;
      }
      const result = dbTogether.transaction(async (t) => {
        if (file || background) {
          if (fs.existsSync(find.background)) fs.unlinkSync(find.background);
        }
        const upd = await find.update(toUpdate);
        return upd;
      });
      if (!result) return res.status(500).json("Ошибка при редактировании");
      return res.status(200).json("Изменено");
    } catch (e) {
      const { file } = req;
      if (file) deleteFileArr([file]);
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async getUserBackground(req, res) {
    try {
      const { user } = req;
      const backgrounds = await Background.findAll({
        where: {
          userId: user.id,
        },
      });
      if (!backgrounds) return res.status(404).json("Не найдено");
      backgrounds.map((bg) => {
        if (bg.id === user.backgroundId) bg.dataValues.active = true;
      });
      return res.status(200).json(backgrounds);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async deleteBackground(req, res) {
    try {
      const { ids } = req.body;
      const { user } = req;
      let idsArr = [ids];
      const find = await Background.findAll({
        where: {
          id: idsArr.map((id) => id),
          userId: user.id,
        },
      });
      for await (const back of find) {
        if (back.type === 0) {
          if (fs.existsSync(back.background)) fs.unlinkSync(back.background);
        }
      }
      const deleted = await Background.destroy({ where: { id: ids }, force: true });
      if (!deleted) throw new Error("Ошибка удаления");
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async lemonsRelease(req, res) {
    try {
      const { amount } = req.body;
      if (amount > 100000) return res.status(400).json("Сумма должна быть меньше 100000");
      const userIsBankir = await user_roles.findOne({ where: { roleId: 5 } });
      if (!userIsBankir) return res.status(400).json("Банкира не существет");
      const result = await dbTogether.transaction(async (t) => {
        const transaction = await Transaction.create(
          {
            type: 5,
            amount,
            recipientId: userIsBankir.userId,
            entityId: 2,
          },
          { transaction: t }
        );

        const userLemons = await User.increment("lemons", {
          by: amount,
          where: { id: userIsBankir.userId },
          transaction: t,
        });

        return [transaction, userLemons];
      });
      if (!result) throw new Error("Ошибка при эмиссии");
      return res.status(200).json("Успешно");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new UsersController();
