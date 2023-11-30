import { Attachment, Post, Post_Attachment } from "./posts.model.js";
import { deleteFileByPath, deleteFileArr, validateError } from "../../utils/customValidation.js";
import path from "path";
import dbTogether from "../../db/db.js";
import { Sequelize, where } from "sequelize";
import { replaceXSS } from "../../utils/replaceXSS.js";
import fs from "fs";
import { User } from "../users/users.model.js";
import { Post_Like } from "../activities/activities.model.js";
import { Rubric } from "../categories/categories.model.js";
import { posts_notifications } from "../notifications/notifications.model.js";

const checkImg = {
  ext: [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"],
  type: ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/gif"],
};
const checkVid = {
  ext: [".avi", ".mp4", ".webm", ".wmv", ".mkv", ".mov", ".flv", ".m4v", ".mpg", ".mpeg", ".ogv", ".3gp", ".3g2"],
  type: [
    "video/x-msvideo",
    "video/mp4",
    "video/webm",
    "video/x-ms-wmv",
    "video/x-matroska",
    "video/quicktime",
    "video/x-flv",
    "video/x-m4v",
    "video/mpeg",
    "video/mp2t",
    "video/ogg",
    "video/3gpp",
    "video/3gpp2",
  ],
};
const checkAud = {
  ext: [".mp3", ".wav", ".aac", ".ogg"],
  type: ["audio/mpeg", "audio/x-wav", "audio/x-aac", "audio/ogg"],
};

class PostsController {
  async createPost(req, res) {
    try {
      const { title, rubricId, attachIds } = req.body;
      const text = replaceXSS(req.body.text);
      const { user, files } = req;
      const attachments = [];
      if (files.attachments) {
        for (const file of files.attachments) {
          let type = 1;
          if (checkImg.ext.includes(path.extname(file.filename.toLowerCase())) && checkImg.type.includes(file.mimetype)) type = 2;
          else if (checkVid.ext.includes(path.extname(file.filename.toLowerCase())) && checkVid.type.includes(file.mimetype)) type = 3;
          else if (checkAud.ext.includes(path.extname(file.filename.toLowerCase())) && checkAud.type.includes(file.mimetype)) type = 4;
          attachments.push({
            label: file.originalname,
            attach: `${file.destination}/${file.filename}`,
            type,
            userId: user.id,
          });
        }
      }

      let attaches = attachIds;
      if (attaches) {
        if (!Array.isArray(attachIds)) attaches = [attachIds];
        const dist = [...new Set(attaches)];
        const check = await Attachment.count({
          where: {
            id: dist,
            userId: user.id,
          },
        });
        if (check != dist.length) throw new Error("Несуществующие вложения");
        if (attachments.length + check > 10) throw new Error("Слишком много вложений");
      }

      let preview = null;
      if (files.preview) preview = `${files?.preview[0]?.destination}/${files?.preview[0]?.filename}`;
      const result = await dbTogether.transaction(async (t) => {
        const created = await Post.create(
          {
            text: Sequelize.fn("REGEXP_REPLACE", Sequelize.fn("REGEXP_REPLACE", text, "^[\r\n\t ]+", ""), "[\r\n\t ]+$", ""),
            userId: user.id,
            attachments,
            title,
            preview,
            rubricId,
          },
          {
            include: [Attachment],
            transaction: t,
          }
        );
        if (!created) throw new Error("Ошибка создания");
        if (attaches) await created.addAttachments(attaches, { transaction: t });

        const users = await User.findAll({
          where: {
            id: {
              [Sequelize.Op.ne]: user.id,
            },
          },
          attributes: ["id"],
        });
        const toCreateNotify = [];
        users.forEach((user) => toCreateNotify.push({ userId: user.id, postId: created.id }));
        const createNotify = posts_notifications.bulkCreate(toCreateNotify);

        return created;
      });
      if (!result) throw new Error("Ошибка создания");
      return res.status(201).json({ msg: "Создано", id: result.id });
    } catch (e) {
      const { files } = req;
      console.error(e);
      deleteFileArr(files?.attachments);
      deleteFileArr(files?.preview);
      return res.status(500).json(validateError(e));
    }
  }

  async editPost(req, res) {
    try {
      const { id } = req.params;
      const { files, user } = req;
      let { title, rubricId, attachIds, text } = req.body;
      // const text = replaceXSS(req.body.text);

      const toUpdate = await Post.findOne({
        where: {
          id,
        },
      });
      if (!toUpdate) throw new Error("Post not found!");

      let filesToDel = [];
      if (attachIds) {
        if (!Array.isArray(attachIds)) attachIds = [attachIds];
        attachIds = attachIds.map((x) => Number(x));
      }
      const foundAttachments = await Post_Attachment.findAll({
        where: {
          postId: toUpdate.id,
        },
        attributes: ["attachmentId"],
      });
      filesToDel = attachIds ? foundAttachments.filter(({ attachmentId }) => !attachIds.includes(attachmentId)) : foundAttachments;

      const attachments = [];
      if (files?.attachments) {
        for (const file of files?.attachments) {
          let type = 1;
          if (checkImg.ext.includes(path.extname(file.filename)) && checkImg.type.includes(file.mimetype)) type = 2;
          else if (checkVid.ext.includes(path.extname(file.filename)) && checkVid.type.includes(file.mimetype)) type = 3;
          else if (checkAud.ext.includes(path.extname(file.filename)) && checkAud.type.includes(file.mimetype)) type = 4;
          attachments.push({
            label: file.originalname,
            attach: `${file.destination}/${file.filename}`,
            type,
            userId: toUpdate.userId,
          });
        }
      }
      if (foundAttachments.length - filesToDel.length + attachments.length > 10) throw new Error("Слишком много вложений");

      const updObj = {};
      if (files.preview) {
        updObj.preview = `${files.preview[0].destination}/${files.preview[0].filename}`;
      }
      updObj.title = title;
      updObj.rubricId = rubricId;
      if (text) updObj.text = Sequelize.fn("REGEXP_REPLACE", Sequelize.fn("REGEXP_REPLACE", text, "^[\r\n\t ]+", ""), "[\r\n\t ]+$", "");

      const result = await dbTogether.transaction(async (t) => {
        let attaches = [];
        if (attachments.length) {
          attaches = await Attachment.bulkCreate(attachments, { transaction: t });
        }
        if (files.preview) {
          if (fs.existsSync(toUpdate.preview)) {
            fs.unlinkSync(toUpdate.preview);
          }
          updObj.preview = `${files.preview[0].destination}/${files.preview[0].filename}`;
        }
        if (filesToDel.length) {
          const toDelete = await Attachment.findAll({
            where: {
              id: filesToDel.map(({ attachmentId }) => attachmentId),
            },
          });
          deleteFileByPath(toDelete.map(({ attach }) => attach));
          await Post_Attachment.destroy({
            where: {
              attachmentId: filesToDel.map(({ attachmentId }) => attachmentId),
            },
            individualHooks: true,
          });
        }
        const upd = await toUpdate.update(updObj, { transaction: t });
        await Post_Attachment.bulkCreate(
          attaches.map(({ id }) => {
            return { attachmentId: id, postId: toUpdate.id };
          }),
          { transaction: t }
        );
        return upd;
      });
      if (!result) throw new Error("Ошибка обновления");

      return res.status(200).json({ msg: "Updated!" });
    } catch (e) {
      return res.status(500).json(validateError(e));
    }
  }

  async deletePost(req, res) {
    try {
      const { user } = req;
      const { id } = req.params;

      const toDelete = await Post.findOne({
        where: {
          id,
        },
        paranoid: false,
      });
      if (!toDelete) throw new Error("Пост не найден!");

      const deleted = await toDelete.destroy({ force: true });
      if (!deleted) throw new Error("Ошибка при удалении поста!");

      return res.status(200).json("Пост удален!");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async getAllPosts(req, res) {
    try {
      const page = Number(req.params.page) ? Number(req.params.page) : 1;
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 10;
      const { rubricId } = req.query;
      let where = {};
      if (rubricId) where.rubricId = rubricId;
      let rubric;
      if (rubricId) {
        rubric = await Rubric.findOne({
          where: {
            id: rubricId,
          },
        });
      }
      const posts = await Post.findAndCountAll({
        limit: limit,
        where,
        order: [["createdAt", "DESC"]],
        offset: limit * (page - 1),
      });
      const pages = Math.ceil(posts.count / limit);
      return res.status(200).json({ pages, posts, rubric });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async getOnePost(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      let attributes = {
        include: [
          [Sequelize.literal("(SELECT COUNT(`post_likes`.`userId`) FROM `post_likes` WHERE `post_likes`.`postId` = `posts`.`id`)"), "likesCount"],
          [Sequelize.literal("(SELECT COUNT(`comments`.`id`) FROM `comments` WHERE `comments`.`postId` = `posts`.`id`)"), "commentsCount"],
        ],
      };
      if (user) {
        attributes.include.push([Sequelize.literal(`(SELECT createdAt FROM post_likes WHERE postId = posts.id AND userId = ${user.id})`), "liked"]);
      }
      const post = await Post.findOne({
        where: { id },
        attributes,
        include: [{ model: Attachment, through: { attributes: [] } }],
      });
      if (!post) throw new Error("Не найдено");
      return res.status(200).json(post);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async getPopPosts(req, res) {
    try {
      let attributes = {
        include: [[Sequelize.literal("(SELECT COUNT(`post_likes`.`userId`) FROM `post_likes` WHERE `post_likes`.`postId` = `posts`.`id`)"), "likesCount"]],
      };
      const posts = await Post.findAll({
        attributes,
        order: [["likesCount", "DESC"]],
        limit: 5,
      });
      return res.status(200).json(posts);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new PostsController();
