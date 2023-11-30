import { DataTypes, Sequelize } from "sequelize";
import dbTogether from "../../db/db.js";
import { Country } from "../countries/countries.model.js";

export const Category = dbTogether.define("categories", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  label: {
    type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
    allowNull: false,
  },
});

export const Franchise = dbTogether.define("franchises", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
  },
});

export const Project = dbTogether.define("projects", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  label: {
    type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
  },
});

export const Subsection = dbTogether.define(
  "subsections",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
    },
  },
  {
    scopes: {
      info: {
        attributes: {
          include: [
            [Sequelize.literal("(SELECT COUNT(*) FROM teams WHERE teams.subsectionId = subsections.id AND deletedAt IS NULL)"), "teamCount"],
            // [
            //   Sequelize.literal(
            //     "(WITH RECURSIVE ref AS (SELECT id, referrerId, verified FROM users WHERE referrerId IN (SELECT userId FROM subsections WHERE id = subsections.id GROUP BY subsections.userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(ref.id) FROM ref WHERE ref.verified = 1)"
            //   ),
            //   "userCount",
            // ],
          ],
        },
      },
    },
  }
);

export const Coverage = dbTogether.define("coverage", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  label: {
    type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
    allowNull: false,
  },
  nationality: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export const Subcategory = dbTogether.define("subcategories", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  label: {
    type: DataTypes.TEXT + " COLLATE utf8mb4_unicode_ci",
    allowNull: false,
  },
});

export const Links = dbTogether.define(
  "links",
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
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    paranoid: false,
  }
);

// У постов
export const Rubric = dbTogether.define("rubrics", {
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
});

export const Triad = dbTogether.define(
  "triads",
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
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    scopes: {
      min: {
        attributes: ["id", "label", "picture", "createdAt"],
      },
      info: {
        attributes: [
          [Sequelize.literal("(SELECT COUNT(*) FROM `subsections` WHERE `triadId` = `triads`.`id` AND `deletedAt` IS NULL)"), "subsCount"],
          [
            Sequelize.literal("(SELECT COUNT(*) FROM `teams` WHERE `subsectionId` IN(SELECT `id` FROM `subsections` WHERE `triadId` = `triads`.`id`))"),
            "teamsCount",
          ],
          // [
          //   Sequelize.literal(
          //     "(WITH RECURSIVE ref AS (SELECT id, referrerId, verified FROM users WHERE referrerId IN (SELECT userId FROM teams WHERE subsectionId IN (SELECT `id` FROM `subsections` WHERE `triadId` = `triads`.`id`) GROUP BY teams.userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1)"
          //   ),
          //   "userCount",
          // ],
        ],
      },
    },
  }
);

Subcategory.hasMany(Category, { onDelete: "CASCADE" });
Category.belongsTo(Subcategory);
Country.hasMany(Coverage, { onDelete: "CASCADE" });
Coverage.belongsTo(Country);

Triad.hasMany(Subsection);
Subsection.belongsTo(Triad);
