import { DataTypes, NOW, Sequelize } from "sequelize";
import dbTogether from "../../db/db.js";
import { Cities, Country, Region } from "../countries/countries.model.js";
import fs from "fs";
import { Franchise, Subsection, Triad } from "../categories/categories.model.js";
import { Profile } from "../profiles/profiles.model.js";

export const Role = dbTogether.define(
  "roles",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ["label"] }] }
);

export const User = dbTogether.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    // Ссылка на телеграмм
    // login: {
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    lemons: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0,
    },
    referral: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralExpiration: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    deleteToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleteTokenExpiration: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    resetURL: {
      type: DataTypes.STRING,
    },
    resetExpiration: {
      type: DataTypes.DATE,
      defaultValue: NOW,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    account: {
      type: DataTypes.STRING,
    },
    isAdminHelper: {
      type: DataTypes.BOOLEAN,
      // allowNull: true,
      defaultValue: 0,
    },
    verificationURL: {
      type: DataTypes.STRING,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["account"],
      },
      {
        unique: true,
        fields: ["verificationURL"],
      },
    ],
    scopes: {
      country: {
        include: {
          model: Cities.scope("attributes"),
          include: {
            model: Region.scope("attributes"),
            include: { model: Country.scope("attributes") },
          },
        },
      },
      role: {
        attributes: {
          include: [[Sequelize.literal("(SELECT roleId FROM user_roles WHERE userId = users.id AND roleId = 2)"), "roleId"]],
        },
      },
      minAttributes: {
        attributes: ["id", "name", "email", "avatar", "account", "createdAt"],
      },
      exclude: {
        attributes: {
          exclude: ["password", "updatedAt", "deletedAt"],
        },
      },
      allAttributes: {
        attributes: {
          exclude: ["password", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: Role,
          },
          { model: Profile },
        ],
      },
    },
  }
);

User.beforeDestroy(async (deletedUser, options) => {
  try {
    if (options.force === false) return false;
    if (deletedUser?.avatar && fs.existsSync(`public${deletedUser?.avatar}`)) {
      fs.unlinkSync(`public${deletedUser.avatar}`);
      console.log(`Удалено ${deletedUser.avatar}`);
    }
    const backgroundsOfDel = await Background.findAll({
      where: {
        userId: deletedUser.id,
      },
    });
    if (backgroundsOfDel) {
      for await (const back of backgroundsOfDel) {
        if (back.type === 0) {
          if (fs.existsSync(back.background)) fs.unlinkSync(back.background);
        }
      }
      const result = await Background.destroy({ where: { userId: deletedUser.id }, force: true });
      if (result) console.log("Фоны пользователя удалены");
    }

    const referralsOfDel = await User.update(
      {
        referrerId: deletedUser.referrerId,
      },
      {
        where: {
          referrerId: deletedUser.id,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
});

export const TransactionEntity = dbTogether.define(
  "transactions_entities",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { indexes: [{ unique: true, fields: ["label"] }], paranoid: false, createdAt: true, updatedAt: false, deletedAt: false }
);

export const Transaction = dbTogether.define("transactions", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // 1 - Реферальная награда 2 - перевод  3 - спонсорская система 4 - вывод 5 - эмиссия
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  checked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  status: {
    type: DataTypes.BIGINT(1),
    allowNull: true,
  },
});

export const Team = dbTogether.define(
  "teams",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    label: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER(1),
      defaultValue: 0,
    },
  },
  {
    indexes: [
      // {
      // unique: true,
      // fields: ["userId"],
      // },
      {
        type: "FULLTEXT",
        fields: ["label", "description"],
      },
    ],
    scopes: {
      include: {
        include: [
          {
            model: User.scope("minAttributes"),
          },
        ],
      },
      info: {
        attributes: [
          "id",
          "label",
          "description",
          "picture",
          "type",
          "createdAt",
          [Sequelize.literal("(SELECT `users`.`name` FROM `users` WHERE `users`.`id` = `teams`.`userId`)"), "name"],
          ["userId", "coachId"],
          "subsectionId",
          [Sequelize.literal("(SELECT `label` FROM `subsections` WHERE `subsections`.`id` = `teams`.`subsectionId`)"), "subsectionLabel"],
          [
            Sequelize.literal(
              "(WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = teams.userId UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(teamRef.id) FROM teamRef WHERE teamRef.verified = 1)"
            ),
            "userCount",
          ],
          [
            Sequelize.literal(
              "(WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = teams.userId UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(r.id) FROM teamRef JOIN resources AS r ON r.userId = teamRef.id WHERE teamRef.verified = 1 AND r.deletedAt IS NULL)"
            ),
            "resourceCount",
          ],
        ],
      },
      triadInfo: {
        attributes: [
          "id",
          "label",
          "description",
          "picture",
          "type",
          "createdAt",
          [Sequelize.literal("(SELECT `users`.`name` FROM `users` WHERE `users`.`id` = `subsections->teams`.`userId`)"), "name"],
          ["userId", "coachId"],
          "subsectionId",
          [Sequelize.literal("(SELECT `label` FROM `subsections` WHERE `subsections`.`id` =`subsections->teams`.`subsectionId`)"), "subsectionLabel"],
          [
            Sequelize.literal(
              "(WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = `subsections->teams`.`userId` UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(teamRef.id) FROM teamRef WHERE teamRef.verified = 1)"
            ),
            "userCount",
          ],
          [
            Sequelize.literal(
              "(WITH RECURSIVE teamRef AS (SELECT id, verified FROM users WHERE referrerId = `subsections->teams`.`userId` UNION ALL SELECT u.id, u.verified FROM users AS u JOIN teamRef AS tr ON u.referrerId = tr.id) SELECT COUNT(r.id) FROM teamRef JOIN resources AS r ON r.userId = teamRef.id WHERE teamRef.verified = 1 AND r.deletedAt IS NULL)"
            ),
            "resourceCount",
          ],
        ],
      },
    },
  }
);

export const UserSponsor = dbTogether.define(
  "user_sponsors",
  {
    /* checkedSponsor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    checkedUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }, */
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId"],
      },
    ],
    paranoid: false,
    timestamps: true,
    updatedAt: false,
    deletedAt: false,
  }
);

export const user_roles = dbTogether.define("user_roles", {}, { paranoid: false, timestamps: true, updatedAt: false, deletedAt: false });

export const Background = dbTogether.define("backgrounds", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  background: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 0 - картинка, 1 - цвет
  type: {
    type: DataTypes.INTEGER(1),
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

User.belongsTo(Background);
Background.hasMany(User, { onDelete: "CASCADE", onUpdate: "CASCADE", hooks: true });

Transaction.belongsTo(User, { as: "sender" });
Transaction.belongsTo(User, { as: "recipient" });

Transaction.belongsTo(TransactionEntity, { foreignKey: "entityId" });
TransactionEntity.hasMany(Transaction, { foreignKey: "entityId" });

User.belongsTo(Cities);

Triad.belongsTo(User);
User.hasMany(Triad);

Team.belongsTo(User, { onDelete: "CASCADE", hooks: true });
User.hasOne(Team);
Team.belongsTo(Subsection);

Subsection.hasMany(Team);
User.belongsTo(User, { foreignKey: "referrerId", as: "referrer" });

// Связь для спонсорства
User.belongsToMany(User, {
  through: UserSponsor,
  as: "sponsor",
  foreignKey: { name: "sponsorId" },
  onDelete: "CASCADE",
});
User.belongsToMany(User, {
  through: UserSponsor,
  as: "user",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
});

// Связь ролей
User.belongsToMany(Role, {
  through: user_roles,
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
});
Role.belongsToMany(User, {
  through: user_roles,
  foreignKey: { name: "roleId" },
  onDelete: "CASCADE",
});

User.hasMany(Subsection);
Subsection.belongsTo(User);

User.hasMany(Franchise);
Franchise.belongsTo(User);

// User.hasMany(Team);
// User.hasMany(User, { as: 'referral' })

User.hasOne(Profile, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});
Profile.belongsTo(User);
