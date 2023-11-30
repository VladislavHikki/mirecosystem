import { DataTypes } from "sequelize";
import dbTogether from "../../db/db.js";
import fs from "fs";
import { User } from "../users/users.model.js";

export const Service = dbTogether.define(
  "services",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  { paranoid: false }
);

export const ServiceTypes = dbTogether.define(
  "services_types",
  {
    id: {
      type: DataTypes.BIGINT,
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
  },
  { paranoid: false }
);

export const ServiceSaves = dbTogether.define("services_saves", {}, { paranoid: false, createdAt: true, updatedAt: false, deletedAt: false });

Service.beforeDestroy(async (service) => {
  try {
    if (service?.picture) {
      if (fs.existsSync(service.picture)) {
        fs.unlinkSync(service.picture);
        console.log("Изображение удалено");
      }
    }
  } catch (e) {
    console.log("Ошибка при удалении изображения");
  }
});

ServiceTypes.beforeDestroy(async (type) => {
  try {
    const deleted = await Service.destroy({
      where: {
        typeId: type.id,
      },
      individualHooks: true,
    });
    if (!deleted) console.log("Ошибка при удалении сервисов");
    else console.log("Сервисы у типа успешно удалены");
  } catch (e) {
    console.log("Ошибка при удалении сервисов по типу");
  }
});

Service.belongsTo(ServiceTypes, { foreignKey: "typeId", hooks: true });
ServiceTypes.hasMany(Service, { foreignKey: "typeId", onDelete: "CASCADE", hooks: true });

Service.belongsToMany(User, { through: ServiceSaves });
User.belongsToMany(Service, { through: ServiceSaves });
