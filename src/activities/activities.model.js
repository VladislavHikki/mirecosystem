import { DataTypes } from "sequelize";
import dbTogether from "../../db/db.js";
import { Post } from "../posts/posts.model.js";
import { User } from "../users/users.model.js";

export const Comment = dbTogether.define(
  "comments",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    paranoid: false,
    deletedAt: false,
  }
);
Comment.belongsTo(Comment, { onDelete: "CASCADE", foreignKey: { allowNull: true } });
Comment.belongsTo(Post, { foreignKey: { allowNull: true }, onDelete: "CASCADE" });
Comment.belongsTo(User, { foreignKey: { allowNull: true }, onDelete: "CASCADE" });

// Лайки комментов
export const Comment_Like = dbTogether.define("comment_like", {}, { timestamps: true, updatedAt: false, deletedAt: false, paranoid: false });
Comment.belongsToMany(User, { through: Comment_Like });
User.belongsToMany(Comment, { through: Comment_Like });

// Лайки постов
export const Post_Like = dbTogether.define("post_like", {}, { timestamps: true, updatedAt: false, deletedAt: false, paranoid: false });
Post.belongsToMany(User, { through: Post_Like });
User.belongsToMany(Post, { through: Post_Like });

// // Комменты постов
// export const Post_Comment = dbTogether.define("post_comment", {}, { timestamps: true, updatedAt: false, deletedAt: false, paranoid: false });
// Comment.belongsToMany(Post, { through: Post_Comment });
// Post.belongsToMany(Comment, { through: Post_Comment });
