import { DataTypes, Transaction } from "sequelize";
import dbTogether from "../../db/db.js";
import { User, UserSponsor, user_roles } from "../users/users.model.js";
import { Post } from "../posts/posts.model.js";

export const roles_notification = dbTogether.define(
  "roles_notifications",
  {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      /* references: {
        model: user_roles,
        key: "userId",
      }, */
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      /* references: {
        model: user_roles,
        key: "roleId",
      }, */
    },
    isDel: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  { paranoid: false, timestamps: true, updatedAt: false, deletedAt: false }
);

export const sponsors_notification = dbTogether.define(
  "sponsors_notifications",
  {
    sponsorId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      /* references: {
        model: UserSponsor,
        key: "sponsorId",
      }, */
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      /* references: {
        model: UserSponsor,
        key: "userId",
      }, */
    },
    isSponsor: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  { paranoid: false, timestamps: true, updatedAt: false, deletedAT: false }
);

export const transactions_notification = dbTogether.define(
  "transactions_notifications",
  {
    senderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    repeats: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { paranoid: false, timestamps: true, updatedAt: false, deletedAt: false }
);

export const chats_notifications = dbTogether.define(
  "chats_notifications",
  {
    chatId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    messageId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    messageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  { paranoid: false, timestamps: true, updatedAt: false, deletedAt: false }
);

export const posts_notifications = dbTogether.define(
  "posts_notifications",
  {
    checked: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: false, paranoid: false }
);

User.belongsToMany(Post, { through: posts_notifications });
Post.belongsToMany(User, { through: posts_notifications });
