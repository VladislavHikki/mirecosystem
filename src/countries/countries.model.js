import { DataTypes } from "sequelize";
import dbTogether from "../../db/db.js";

export const Country = dbTogether.define(
  "countries",
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      attributes: {
        attributes: ["id", "label", "slug"],
      },
    },
  }
);

export const Region = dbTogether.define(
  "regions",
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      attributes: {
        attributes: ["id", "label", "slug"],
      },
    },
  }
);

export const Cities = dbTogether.define(
  "cities",
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    scopes: {
      attributes: {
        attributes: ["id", "label", "slug"],
      },
    },
  }
);

// ASSOCIATIONS

Country.hasMany(Region, { onDelete: "CASCADE" });
Region.belongsTo(Country, { foreignKey: { name: "countryId", allowNull: false } });

Region.hasMany(Cities, { onDelete: "CASCADE" });
Cities.belongsTo(Region, { foreignKey: { name: "regionId", allowNull: false } });
