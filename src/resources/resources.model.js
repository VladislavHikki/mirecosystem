import { DataTypes, Sequelize } from "sequelize";
import dbTogether from "../../db/db.js";
import { Category, Franchise, Project, Coverage } from "../categories/categories.model.js";
import { Cities, Country, Region } from "../countries/countries.model.js";
import { Team, User } from "../users/users.model.js";
import fs from "fs";

export const Resource = dbTogether.define(
  "resources",
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
    picture: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
    },
  },
  {
    indexes: [{ type: "FULLTEXT", fields: ["label", "description"] }],
    scopes: {
      fullSearch(search) {
        const settings = { where: [{}], replacements: {} };
        if (search.length >= 3) {
          settings.where.push(Sequelize.literal("MATCH (`resources`.`label`, `resources`.`description`) AGAINST (:search IN BOOLEAN MODE)"));
          settings.replacements = { search: search + "*" };
          return settings;
        } else {
          return true;
        }
      },
    },
  }
);

export const ResType = dbTogether.define(
  "restypes",
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
  },
  { indexes: [{ unique: true, fields: ["label"] }] }
);

Resource.beforeDestroy(async (deletedRes) => {
  try {
    if (deletedRes?.picture && fs.existsSync(`public${deletedRes.picture}`)) {
      fs.unlinkSync(`public${deletedRes.picture}`);
      console.log(`Удалено ${deletedRes.picture}`);
    } else console.log("Files to delete were not found");
  } catch (e) {
    console.log(e);
  }
});

Resource.belongsTo(ResType);
ResType.hasMany(Resource);

Resource.belongsTo(Country);
Country.hasMany(Resource);
Resource.belongsTo(Cities);
Cities.hasMany(Resource);
Resource.belongsTo(Region);
Region.hasMany(Resource);

Resource.belongsTo(Team, { onDelete: "CASCADE", hooks: true });
Team.hasMany(Resource);
Resource.belongsTo(User, { as: "user", onDelete: "CASCADE", hooks: true });
User.hasMany(Resource);
Resource.belongsTo(Franchise);
Franchise.hasMany(Resource);
Resource.belongsTo(Project);
Project.hasMany(Resource);
Resource.belongsTo(Category);
Category.hasMany(Resource);
Coverage.hasMany(Resource);
Resource.belongsTo(Coverage);

Resource.belongsTo(User, { as: "curator", foreignKey: { name: "curatorId" } });
