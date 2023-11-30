import { Sequelize } from "sequelize";
import dbTogether from "../../db/db.js";
import { validateError } from "../../utils/customValidation.js";
import { Attachment, Post } from "../posts/posts.model.js";
import { User, user_roles } from "../users/users.model.js";
import { Comment, Comment_Like, Post_Like } from "./activities.model.js";
import { replaceXSS } from "../../utils/replaceXSS.js";
import { usersStatuses } from "../../utils/dbQueries.js";

const toComment = {
  post: {
    model: Post,
    name: "Пост",
    comment: Comment,
    through: Comment,
    typeId: "postId",
  },
  comment: {
    model: Comment,
    name: "Комментарий",
    comment: Comment,
    through: Comment,
    typeId: "commentId",
  },
};

const likeTypes = {
  comment: {
    model: Comment,
    name: "Комментарий",
    table: Comment_Like,
    typeId: "commentId",
  },
  post: { model: Post, name: "Пост", table: Post_Like, typeId: "postId" },
};

class ActivitiesController {
  async createComment(req, res) {
    try {
      const { type, id } = req.params;
      const { user } = req;
      const text = replaceXSS(req.body.text);
      const where = { id };
      if (!toComment[type]) return res.status(400).json("Некорректный тип");

      const found = await toComment[type].model.findOne({
        where,
      });

      if (!found) throw new Error(`${toComment[type].name} не найден`);

      const toCreate = {};
      (toCreate.text = text), (toCreate.userId = user.id), (toCreate[toComment[type].typeId] = id);
      if (type == "comment") {
        const papa = await toComment[type].model.findOne({ where });
        if (papa.postId != null) toCreate.postId = papa.postId;
      }

      const created = await toComment[type].comment.create(toCreate);
      if (!created) throw new Error("Ошибка при создании");
      return res.status(200).json("Комментарий добавлен");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async createLike(req, res) {
    try {
      const { type, id } = req.params;
      const { user } = req;

      if (!likeTypes[type]) throw new Error("Некорректный тип");
      const found = await likeTypes[type].model.findOne({ where: { id } });
      if (!found) throw new Error(`${likeTypes[type].name} не найден`);

      const toLike = {};
      toLike.userId = user.id;
      toLike[likeTypes[type].typeId] = found.id;
      const findLike = await likeTypes[type].table.findOne({
        where: toLike,
      });
      let message = {};
      if (!findLike) {
        const created = await likeTypes[type].table.create(toLike);
        if (!created) throw new Error("Ошибка при создании");
        message = "Лайк добавлен";
      } else {
        const deleted = await likeTypes[type].table.destroy({ where: toLike });
        if (!deleted) throw new Error("Ошибка при удалении");
        message = "Лайк удален";
      }
      return res.status(200).json(message);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async editComment(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      if (!req.body.text) throw new Error("Заполните текст");
      const text = replaceXSS(req.body.text);

      const found = await Comment.findOne({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!found) throw new Error("Комментарий не найден");

      const update = await found.update({ text });
      if (!update) throw new Error("Ошибка при изменении");
      return res.status(200).json("Изменено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;

      const found = await Comment.findOne({
        where: {
          id,
          userId: user.id,
        },
      });
      if (!found) throw new Error("Комментарий не найден");

      const deleted = await found.destroy();
      if (!deleted) throw new Error("Ошибка удаления");
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async getComments(req, res) {
    try {
      const { type, id } = req.params;
      const { user } = req;
      const page = Number(req.params.page) ? Number(req.params.page) : 1;
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 25;

      if (!toComment[type]) throw new Error("Некорректный тип");

      let where = { id };

      const found = await toComment[type].model.findOne({ where });
      if (!found) throw new Error(`${toComment[type].name} не найден`);
      const include = [User.scope("allAttributes")];
      where = {
        [toComment[type].typeId]: id,
      };
      if (type != "comment") where.commentId = null;
      let attributes = {
        include: [
          [Sequelize.literal("(SELECT COUNT(`answers`.`id`) FROM `comments` AS `answers` WHERE `answers`.`commentId` = `comments`.`id`)"), "answersCount"],
          [
            Sequelize.literal("(SELECT COUNT(`comment_likes`.`userId`) FROM `comment_likes` WHERE `comment_likes`.`commentId` = `comments`.`id`)"),
            "likesCount",
          ],
        ],
      };
      if (user) {
        attributes.include.push([Sequelize.literal(`(SELECT createdAt FROM comment_likes WHERE commentId = comments.id AND userId = ${user.id})`), "liked"]);
      }

      let comments = await toComment[type].through.findAndCountAll({
        where,
        include,
        limit: limit,
        offset: limit * (page - 1),
        order: [["createdAt", "DESC"]],
        attributes,
      });
      if (!comments) throw new Error("Комментарии не найдены");
      const pages = Math.ceil(comments.count / limit);
      if (type == "comment") {
        comments = await toComment[type].through.findAndCountAll({
          where,
          include,
          order: [["createdAt", "DESC"]],
          attributes,
        });
      }
      for await (const com of comments.rows) {
        com.user.dataValues.roles = await com.user.getRoles({
          joinTableAttributes: [],
        });

        const [user] = await usersStatuses([com.user]);
        com.dataValues.user = user;
      }
      return res.status(200).json({ pages, comments });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new ActivitiesController();
