import { DataTypes } from "sequelize";
import dbTogether from "../../db/db.js";

export const Profile = dbTogether.define(
  "profiles",
  {
    // Цель и смысл жизни
    meaningLife: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 5,
      },
    },
    importantAchievements: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 5,
      },
    },
    birthPlace: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 5,
      },
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    zodiacSing: {
      type: DataTypes.TINYINT(2).UNSIGNED,
      allowNull: true,
    },
    horoscopeDate: {
      type: DataTypes.TINYINT(2).UNSIGNED,
      allowNull: true,
    },
    height: {
      type: DataTypes.DECIMAL(5, 2).UNSIGNED,
      allowNull: true,
    },
    weight: {
      type: DataTypes.DECIMAL(5, 2).UNSIGNED,
      allowNull: true,
    },
    bodyType: {
      type: DataTypes.TINYINT(2).UNSIGNED,
      allowNull: true,
    },
    eyesColor: {
      type: DataTypes.TINYINT(2).UNSIGNED,
      allowNull: true,
    },
    hairColor: {
      type: DataTypes.TINYINT(10).UNSIGNED,
      allowNull: true,
    },
    religion: {
      type: DataTypes.TINYINT(1).UNSIGNED,
      allowNull: true,
    },
    education: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    profession: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Род занятий, должность
    occupation: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Курсы, семинары, тренинги
    training: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Опыт, знания, навыки
    competencies: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    foreignLanguages: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Достижения, заслуги, награды
    accomplishments: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Интересы, хобби, увлечения
    hobbies: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Принципы
    principles: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Неприязни
    distastes: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
      validate: {
        max: 500,
      },
    },
    // Достоинства
    dignities: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
    },
    // Недостатки
    disadvantages: {
      type: DataTypes.STRING(500) + " COLLATE utf8mb4_unicode_ci",
      allowNull: true,
    },
    // Моя семья
    family: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Мои питомцы
    pets: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Мои авто / мото
    transport: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Мои кумиры
    idols: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Любимы каналы, паблики, блогеры
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // Я в соцсетях
    networks: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // Пожелания гостям страницы
    wish: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  { indexes: [{ unique: true, fields: ["userId"] }] }
);
