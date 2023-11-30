import { DataTypes } from "sequelize";
import dbTogether from "../../db/db.js";

export const Currency = dbTogether.define(
  "currencys",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    scopes: {
      minAttributes: {
        attributes: ["id", "label", "image"],
      },
    },
  }
  //   { indexes: [{ unique: true, fields: ["label"] }] }
);

export const Exchange_Rate = dbTogether.define("exchanges_rates", {
  exchange_rate: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Exchange_Rate.belongsTo(Currency);
Currency.hasMany(Exchange_Rate);
