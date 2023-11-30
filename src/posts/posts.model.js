import { DATE, DataTypes, Sequelize } from "sequelize";
import dbTogether from "../../db/db.js";
import { User } from "../users/users.model.js";
import { Rubric } from "../categories/categories.model.js";
import { deleteFileByPath } from "../../utils/customValidation.js";
import fs from "fs";
import { Profile } from "../profiles/profiles.model.js";

export const Post = dbTogether.define(
  "posts",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [{ type: "FULLTEXT", fields: ["title", "text"] }],
    scopes: {
      fullSearch(search) {
        const settings = { where: [{}], replacements: {} };
        if (search.length >= 3) {
          settings.where.push(Sequelize.literal("MATCH (`posts`.`title`, `posts`.`text`) AGAINST (:search IN BOOLEAN MODE)"));
          settings.replacements = { search: search + "*" };
          return settings;
        } else {
          return true;
        }
      },
      minAttributes: {
        attributes: ["id", "title", "text", "preview"],
      },
    },
  }
);

export const Attachment = dbTogether.define(
  "attachments",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    attach: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // 0 - undefined, 1 - file, 2 - img, 3 - video, 4 - audio
    type: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    updatedAt: false,
    paranoid: false,
    indexes: [{ unique: true, fields: ["attach"] }],
  }
);

export const ProfileAttachment = dbTogether.define(
  "profile_attachments",
  {
    type: {
      type: DataTypes.TINYINT(2).UNSIGNED,
      allowNull: false,
    },
  },
  { createdAt: false, updatedAt: false, deletedAt: false, paranoid: false }
);

// Замена удаленной рубрики на "Прочее" в посте
Rubric.afterDestroy(async (rub, options) => {
  try {
    const posts = await Post.update(
      { rubricId: 1 },
      {
        where: {
          rubricId: rub.id,
        },
      }
    );
    if (!posts) throw new Error("Нет постов с заменой");
    console.log(`Все посты с рубрикой: "${rub.label}" заменены на "Прочее"`);
  } catch (e) {
    console.error(e);
    throw new Error(`Ошибка при замене удаленной рубрики: "${rub.label}" на "Прочее" в посте`);
  }
});

// Файлы постов
export const Post_Attachment = dbTogether.define("post_attachment", {}, { timestamps: false, paranoid: false });

Post_Attachment.afterDestroy(async (attachment) => {
  try {
    const destroyAttachments = await Attachment.destroy({ where: { id: attachment.attachmentId }, force: true });
    if (!destroyAttachments) throw new Error("Ошибка при удалении вложений");
    console.log(`Все вложения удалены`);
  } catch (e) {
    console.error(e);
    throw new Error(`Ошибка при удалении вложений`);
  }
});

Post.beforeDestroy(async (post) => {
  try {
    const result = await dbTogether.transaction(async (t) => {
      let result = true;
      const findAttachments = await Post_Attachment.findAll({ where: { postId: post.id } });
      const filesToDelete = await Attachment.findAll({ where: { id: findAttachments.map(({ attachmentId }) => attachmentId) } });
      if (post?.preview) {
        if (fs.existsSync(post.preview)) fs.unlinkSync(post.preview);
      }
      if (filesToDelete?.length > 0) {
        deleteFileByPath(filesToDelete.map(({ attach }) => attach));
        result = await Attachment.destroy({ where: { id: filesToDelete?.map(({ id }) => id) }, force: true, hooks: true, transaction: t });
      }
      return result;
    });

    if (!result) throw new Error(`Error when deleting a post. post name: ${post.title}, post id: "${post.id}"`);
    console.log(`Attachments post deleted. post id: "${post.id}"`);
  } catch (e) {
    console.error(e);
  }
});

Post.belongsTo(Rubric);
Rubric.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Post);
Attachment.belongsTo(User);
User.hasMany(Attachment);

Post.belongsToMany(Attachment, { through: Post_Attachment });
Attachment.belongsToMany(Post, { through: Post_Attachment });

Profile.belongsToMany(Attachment, { through: ProfileAttachment, foreignKey: "profileId" });
Attachment.belongsToMany(Profile, { through: ProfileAttachment });
