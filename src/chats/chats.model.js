import { DataTypes } from "sequelize";
import dbTogether from "../../db/db.js";
import { User } from "../users/users.model.js";

export const Chat = dbTogether.define("chats", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

export const Message = dbTogether.define("messages", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export const User_Chat = dbTogether.define("user_chat", {
  isAuthor: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.belongsToMany(Chat, { through: User_Chat });
Chat.belongsToMany(User, { through: User_Chat });
User_Chat.hasMany(Chat);

Message.belongsTo(User);
User.hasMany(Message);

Message.belongsTo(Chat);
Chat.hasMany(Message);
