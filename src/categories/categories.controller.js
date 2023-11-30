import { Op, QueryTypes, Sequelize } from "sequelize";
import { ResType, Resource } from "../resources/resources.model.js";
import { Category, Franchise, Project, Subsection, Coverage, Subcategory, Links, Rubric, Triad } from "./categories.model.js";
import dbTogether from "../../db/db.js";
import { Team, User } from "../users/users.model.js";
import { Cities, Country, Region } from "../countries/countries.model.js";
import fs from "fs";
import { log } from "console";
import { deleteFileArr, validateError } from "../../utils/customValidation.js";

const nationalTypes = {
  1: { model: Subcategory, name: "НАЦИОНАЛЬНЫЕ" },
  2: { model: Subcategory, name: "РЕГИОНАЛЬНЫЕ" },
};

class CategoriesController {
  async getCategories(req, res) {
    try {
      const { page } = req.params;
      const { deleted } = req.query;
      const categories = await Category.findAndCountAll({
        limit: 25,
        order: [["label", "ASC"]],
        offset: 25 * (Number(page ? page : 1) - 1),
        paranoid: deleted ? false : true,
      });
      const pages = Math.ceil(categories.count / 25);
      return res.status(200).json({ pages, categories });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async categoriesList(req, res) {
    try {
      const type = req.query.type ? Number(req.query.type) : "";
      const where = {};
      if (nationalTypes[type]) {
        const category = await Subcategory.findOne({
          where: {
            label: nationalTypes[type].name,
          },
        });
        Object.assign(where, {
          [Op.or]: [
            {
              subcategoryId: category?.id ? category?.id : "",
            },
            {
              subcategoryId: 10 ? type == 1 : 8,
            },
          ],
        });
      }
      const categories = await Category.findAll({
        where,
        attributes: ["label", ["id", "value"]],
      });
      const projects = await Project.findAll({
        attributes: ["label", ["id", "value"]],
      });
      const franchises = await Franchise.findAll({
        attributes: ["label", ["id", "value"]],
      });
      const teams = await Team.findAll({
        attributes: ["label", ["id", "value"], ["subsectionId", "subsection"]],
      });
      return res.status(200).json({ categories, projects, franchises, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async main(req, res) {
    try {
      const projects = await Project.findAll({
        include: {
          model: Resource,
          attributes: [],
        },
        attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      });
      const franchises = await Franchise.findAll({
        include: {
          model: Resource,
          attributes: [],
        },
        attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      });
      //   const resources = await ResType.findAll({
      //     include: {
      //       model: Resource,
      //       attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("announcements.id")), "count"]],
      //       group: ["id"],
      //       include: {
      //         model: Announcement,
      //         attributes: [],
      //       },
      //     },
      //   });
      const chats = await Resource.findAndCountAll({
        where: {
          restypeId: 1,
        },
      });
      const bots = await Resource.findAndCountAll({
        where: {
          restypeId: 2,
        },
      });
      const channels = await Resource.findAndCountAll({
        where: {
          restypeId: 3,
        },
      });
      const teams = await Team.findAll({
        include: [
          {
            model: Resource,
            attributes: [],
          },
          {
            model: Subsection,
            attributes: ["id", "label"],
          },
        ],
        attributes: ["id", "label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      });
      const cities = await Cities.findAll({
        include: {
          model: Resource,
          attributes: [],
        },
        having: Sequelize.where(Sequelize.fn("COUNT", Sequelize.col("resources.id")), {
          [Op.gt]: 0,
        }),
        attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      });
      const regions = await Region.findAll({
        include: {
          model: Resource,
          attributes: [],
        },
        having: Sequelize.where(Sequelize.fn("COUNT", Sequelize.col("resources.id")), {
          [Op.gt]: 0,
        }),
        attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      });
      const countries = await Country.findAll({
        include: {
          model: Resource,
          attributes: [],
        },
        having: Sequelize.where(Sequelize.fn("COUNT", Sequelize.col("resources.id")), {
          [Op.gt]: 0,
        }),
        attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      });
      return res.status(200).json({ projects, franchises, chats, bots, channels, teams, cities, regions, countries });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getFranchises(req, res) {
    try {
      const { page } = req.params;
      const { deleted } = req.query;
      const franchises = await Franchise.findAndCountAll({
        limit: 25,
        order: [["label", "ASC"]],
        offset: 25 * (Number(page ? page : 1) - 1),
        paranoid: deleted ? false : true,
      });
      const pages = Math.ceil(franchises.count / 25);
      return res.status(200).json({ pages, franchises });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getOneFranchise(req, res) {
    try {
      const { id, page } = req.params;
      const franchise = await Franchise.findByPk(id);
      if (!franchise) return res.status(404).json({ err: "Такой франшизы нет" });
      const resources = await Resource.findAndCountAll({
        include: [{ model: User, where: { verified: 1 } }],
        where: {
          franchiseId: id,
        },
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const pages = Math.ceil(resources.count / 25);
      return res.status(200).json({ pages, franchise, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getOneProject(req, res) {
    try {
      const { id, page } = req.params;
      const project = await Project.findByPk(id);
      if (!project) return res.status(404).json({ err: "Такого проекта нет" });
      const resources = await Resource.findAndCountAll({
        include: [{ model: User, verified: 1 }],
        where: {
          projectId: id,
        },
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const pages = Math.ceil(resources.count / 25);
      return res.status(200).json({ pages, project, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getLastFranchises(req, res) {
    try {
      /* const franchises = await Resource.findAll({
        include: [
              {
                model: Franchise,
              },
              { model: Category },
              { model: Country },
              {
                model: User,
                include: {
                  model: Cities,
                  include: { model: Region, include: { model: Country } },
                },
              },
            ],
        order: [["createdAt", "DESC"]],
        group: ["franchiseId"],
        limit: 5,
      }); */
      const franchises = await dbTogether.query(
        "SELECT * FROM ( SELECT `resources`.`id`, `resources`.`label`, `resources`.`picture`, `resources`.`url`, `resources`.`description`, `resources`.`createdAt`, `resources`.`updatedAt`, `resources`.`deletedAt`, `resources`.`restypeId`, `resources`.`countryId`, `resources`.`cityId`, `resources`.`regionId`, `resources`.`teamId`, `resources`.`userId`, `resources`.`franchiseId`, `resources`.`projectId`, `resources`.`categoryId`, `franchise`.`id` AS `franchise.id`, `franchise`.`label` AS `franchise.label`, `franchise`.`picture` AS `franchise.picture`, `franchise`.`createdAt` AS `franchise.createdAt`, `franchise`.`updatedAt` AS `franchise.updatedAt`, `franchise`.`deletedAt` AS `franchise.deletedAt`, `category`.`id` AS `category.id`, `category`.`label` AS `category.label`, `category`.`createdAt` AS `category.createdAt`, `category`.`updatedAt` AS `category.updatedAt`, `category`.`deletedAt` AS `category.deletedAt`, `country`.`id` AS `country.id`, `country`.`label` AS `country.label`, `country`.`slug` AS `country.slug`, `country`.`createdAt` AS `country.createdAt`, `country`.`updatedAt` AS `country.updatedAt`, `country`.`deletedAt` AS `country.deletedAt`, `user`.`id` AS `user.id`, `user`.`name` AS `user.name`, `user`.`email` AS `user.email`, `user`.`points` AS `user.points`, `user`.`referral` AS `user.referral`, `user`.`referralExpiration` AS `user.referralExpiration`, `user`.`resetURL` AS `user.resetURL`, `user`.`resetExpiration` AS `user.resetExpiration`, `user`.`avatar` AS `user.avatar`, `user`.`account` AS `user.account`, `user`.`createdAt` AS `user.createdAt`, `user`.`updatedAt` AS `user.updatedAt`, `user`.`deletedAt` AS `user.deletedAt`, `user`.`cityId` AS `user.cityId`, `user`.`referrerId` AS `user.referrerId`, `user->city`.`id` AS `user.city.id`, `user->city`.`label` AS `user.city.label`, `user->city`.`slug` AS `user.city.slug`, `user->city`.`createdAt` AS `user.city.createdAt`, `user->city`.`updatedAt` AS `user.city.updatedAt`, `user->city`.`deletedAt` AS `user.city.deletedAt`, `user->city`.`regionId` AS `user.city.regionId`, `user->city->region`.`id` AS `user.city.region.id`, `user->city->region`.`label` AS `user.city.region.label`, `user->city->region`.`slug` AS `user.city.region.slug`, `user->city->region`.`createdAt` AS `user.city.region.createdAt`, `user->city->region`.`updatedAt` AS `user.city.region.updatedAt`, `user->city->region`.`deletedAt` AS `user.city.region.deletedAt`, `user->city->region`.`countryId` AS `user.city.region.countryId`, `user->city->region->country`.`id` AS `user.city.region.country.id`, `user->city->region->country`.`label` AS `user.city.region.country.label`, `user->city->region->country`.`slug` AS `user.city.region.country.slug`, `user->city->region->country`.`createdAt` AS `user.city.region.country.createdAt`, `user->city->region->country`.`updatedAt` AS `user.city.region.country.updatedAt`, `user->city->region->country`.`deletedAt` AS `user.city.region.country.deletedAt` FROM `resources` AS `resources` LEFT OUTER JOIN `franchises` AS `franchise` ON `resources`.`franchiseId` = `franchise`.`id` AND(`franchise`.`deletedAt` IS NULL) LEFT OUTER JOIN `categories` AS `category` ON `resources`.`categoryId` = `category`.`id` AND(`category`.`deletedAt` IS NULL) LEFT OUTER JOIN `countries` AS `country` ON `resources`.`countryId` = `country`.`id` AND(`country`.`deletedAt` IS NULL) LEFT OUTER JOIN `users` AS `user` ON `resources`.`userId` = `user`.`id` AND(`user`.`deletedAt` IS NULL) LEFT OUTER JOIN `cities` AS `user->city` ON `user`.`cityId` = `user->city`.`id` AND(`user->city`.`deletedAt` IS NULL) LEFT OUTER JOIN `regions` AS `user->city->region` ON `user->city`.`regionId` = `user->city->region`.`id` AND( `user->city->region`.`deletedAt` IS NULL ) LEFT OUTER JOIN `countries` AS `user->city->region->country` ON `user->city->region`.`countryId` = `user->city->region->country`.`id` AND( `user->city->region->country`.`deletedAt` IS NULL ) WHERE (`resources`.`deletedAt` IS NULL) ORDER BY `resources`.`createdAt` DESC LIMIT 6 ) `x` GROUP BY `x`.`franchiseId`",
        {
          nest: true,
        }
      );
      return res.status(200).json(franchises);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getProjects(req, res) {
    try {
      const { page } = req.params;
      const { deleted } = req.query;
      const projects = await Project.findAndCountAll({
        limit: 25,
        order: [["label", "ASC"]],
        offset: 25 * (Number(page ? page : 1) - 1),
        paranoid: deleted ? false : true,
      });
      const pages = Math.ceil(projects.count / 25);
      return res.status(200).json({ pages, projects });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createProject(req, res) {
    try {
      const { file } = req;
      const { label } = req.body;
      const created = await Project.create({
        label,
        picture: `/projectspics/${file.filename}`,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/projectspics/${file.filename}`);
      return res.status(500).json(e.message);
    }
  }

  async updateProject(req, res) {
    try {
      const { file } = req;
      const { id } = req.params;
      const { label } = req.body;
      const toUpdate = await Project.findByPk(id);
      const toDelete = toUpdate.picture;
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        picture: file?.filename ? `/projectspics/${file.filename}` : undefined,
      });
      if (!updated) return res.status(404).end();
      if (toDelete) {
        if (file?.filename && fs.existsSync(`public${toDelete}`)) fs.unlinkSync(`public${toDelete}`);
      }
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteProject(req, res) {
    try {
      const { ids, force } = req.body;
      const deleted = await Project.destroy({
        where: {
          id: ids,
        },
        force,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async restoreProject(req, res) {
    try {
      const { ids } = req.body;
      const restored = await Project.restore({
        where: {
          id: ids,
        },
      });
      if (!restored) return res.status(404).end();
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createFranchise(req, res) {
    try {
      const { file } = req;
      const { label, description } = req.body;
      const created = await Franchise.create({
        label,
        description: description,
        picture: `/franchisespics/${file.filename}`,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/franchisespics/${file.filename}`);
      return res.status(500).json(e.message);
    }
  }

  async updateFranchise(req, res) {
    try {
      const { file } = req;
      const { id } = req.params;
      const { label, description } = req.body;
      const toUpdate = await Franchise.findByPk(id);
      const toDelete = toUpdate.picture;
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        description: description,
        picture: file?.filename ? `/franchisespics/${file.filename}` : undefined,
      });
      if (!updated) return res.status(404).end();
      if (toDelete) {
        if (file?.filename && fs.existsSync(`public${toDelete}`)) fs.unlinkSync(`public${toDelete}`);
      }
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteFranchise(req, res) {
    try {
      const { ids, force } = req.body;
      const deleted = await Franchise.destroy({
        where: {
          id: ids,
        },
        force,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async restoreFranchise(req, res) {
    try {
      const { ids } = req.body;
      const restored = await Franchise.restore({
        where: {
          id: ids,
        },
      });
      if (!restored) return res.status(404).end();
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /* async getResourcesByCategory(req, res) {
    try {
      const categories = await Category.findAndCountAll({
        include: {model: Resource, where: {restypeId: 3}}
      });
      return res.status(200).json(categories);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  } */

  async createCategory(req, res) {
    try {
      const { label, subcategoryId } = req.body;
      const created = await Category.create({
        label,
        subcategoryId,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { label, subcategoryId } = req.body;
      const toUpdate = await Category.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        subcategoryId,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { ids, force } = req.body;
      const deleted = await Category.destroy({
        where: {
          id: ids,
        },
        force,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async restoreCategory(req, res) {
    try {
      const { ids } = req.body;
      const restored = await Category.restore({
        where: {
          id: ids,
        },
      });
      if (!restored) return res.status(404).end();
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  // async getOneSubsection(req, res) {
  //   try {
  //     const { id, page } = req.params;
  //     const subsection = await Subsection.findByPk(id, {
  //       include: { model: User, attributes: ["id", "name", "email", "createdAt", "avatar"] },
  //     });
  //     if (!subsection) return res.status(404).end();
  //     const teams = await Team.findAndCountAll({
  //       where: {
  //         subsectionId: id,
  //       },
  //       include: { model: User, attributes: ["id", "name", "email", "createdAt", "avatar"] },
  //       limit: 25,
  //       offset: 25 * (Number(page ? page : 1) - 1),
  //     });
  //     subsection.dataValues.userCount = 0;
  //     subsection.dataValues.teamCount = teams.count;
  //     if (teams.count) {
  //       const [userInfo] = await dbTogether.query(
  //         `WITH RECURSIVE ref AS( SELECT * FROM users WHERE referrerId IN(:users) UNION ALL SELECT m.* FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count, (SELECT COUNT(resources.id) FROM resources WHERE resources.deletedAt IS NULL AND resources.userId = ref.id) AS resourceCount FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
  //         { replacements: { users: teams.rows.map(({ userId }) => userId) } }
  //       );

  //       for await (const team of teams.rows) {
  //         const info = userInfo.find(({ referrerId }) => referrerId == team.userId);
  //         team.dataValues.resourceCount = info?.resourceCount ? info.resourceCount : 0;
  //         team.dataValues.userCount = info?.count ? info.count : 0;
  //         subsection.dataValues.userCount += info?.count ? info.count : 0;
  //       }
  //     }

  //     const pages = Math.ceil(teams?.count / 25);
  //     return res.status(200).json({ subsection, pages, teams });
  //   } catch (e) {
  //     console.error(e);
  //     return res.status(500).json(e.message);
  //   }
  // }

  async getOneSubsection(req, res) {
    try {
      const id = Number(req.params.id);
      const subsection = await Subsection.findByPk(id, {
        include: [{ model: User.scope("minAttributes") }],
        attributes: ["id", "label", "picture"],
      });
      if (!subsection) return res.status(404).end();

      // Кол-во игроков в дивизионе и все рефералы лидера дивизиона
      const [[teamsLeader], [refCount], [referrals]] = await Promise.all([
        dbTogether.query(
          "SELECT 1 AS level, `teams`.`id`, `teams`.`label`, `teams`.`description`, `teams`.`picture`, `teams`.`type`, `teams`.`createdAt`, `teams`.`userId`, (SELECT name FROM `users` WHERE `users`.`id` = `teams`.`userId`) AS `name`, `teams`.`subsectionId`, (SELECT label FROM `subsections` WHERE `subsections`.`id` = `teams`.`subsectionId`) AS `subsectionLabel`, (SELECT COUNT(resources.id) FROM `resources` WHERE `resources`.`deletedAt` IS NULL AND `resources`.`userId` = `teams`.`userId`) AS `resourceCount`, ((WITH RECURSIVE refer AS( SELECT *, 1 AS level FROM users WHERE referrerId = teams.userId AND verified = 1 UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN refer AS t ON m.referrerId = t.id) SELECT COUNT(refer.id) FROM refer WHERE refer.verified = 1)) AS `userCount` FROM teams WHERE userId = :userId AND teams.deletedAt IS NULL",
          {
            replacements: {
              userId: subsection.user.id,
            },
          }
        ),
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT *, 2 AS level FROM users WHERE referrerId = :userId AND verified = 1 UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT COUNT(ref.id) AS count, MAX(ref.level) AS levels FROM ref WHERE ref.verified = 1`,
          { replacements: { userId: subsection.user.id } }
        ),
        dbTogether.query(
          "WITH RECURSIVE ref AS( SELECT *, 2 AS level FROM users WHERE referrerId = :userId AND verified = 1 UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT level, t.id, t.label, t.description, t.picture, t.type, t.createdAt, t.userId AS coachId, ref.name, t.subsectionId, sub.label AS subsectionLabel, (SELECT COUNT(resources.id) FROM resources WHERE resources.userId = ref.id) AS resourceCount, (WITH RECURSIVE refer AS( SELECT *, 2 AS level FROM users WHERE referrerId = ref.id AND verified = 1 UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN refer AS t ON m.referrerId = t.id) SELECT COUNT(refer.id) FROM refer) AS userCount FROM ref INNER JOIN teams AS t ON t.userId = ref.id JOIN subsections AS sub ON sub.id = t.subsectionId WHERE t.deletedAt IS NULL",
          { replacements: { userId: subsection.user.id } }
        ),
      ]);
      subsection.dataValues.userCount = refCount[0].count ?? 0;
      subsection.dataValues.levels = refCount[0].levels ?? 0;

      // Последовательность уровней
      // const levels = new Array(subsection.dataValues.levels).fill(1).map((_, i) => i + 1);

      const teams = teamsLeader.concat(referrals);
      subsection.dataValues.teamsCount = teams.length;

      return res.status(200).json({ subsection, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getSubsections(req, res) {
    try {
      const { page } = req.params;
      const amount = req.query.amount ? Number(req.query.amount) : 25;
      const { search, deleted } = req.query;
      const where = {};
      if (search) {
        Object.assign(where, {
          [Op.or]: [
            {
              label: {
                [Op.startsWith]: search,
              },
            },
            Sequelize.where(Sequelize.col("user.name"), { [Op.startsWith]: search }),
            Sequelize.where(Sequelize.col("user.email"), { [Op.startsWith]: search }),
          ],
        });
      }
      const subsections = await Subsection.findAndCountAll({
        where,
        limit: amount,
        order: [["label", "ASC"]],
        offset: amount * (Number(page ? page : 1) - 1),
        include: [{ model: User.scope("minAttributes") }],
        paranoid: deleted ? false : true,
        subQuery: false,
      });
      if (!subsections.count) return res.status(204).end();
      subsections.count = subsections.rows.length;

      const [[userCount], [teamsLeader], [refCount], [referrals]] = await Promise.all([
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
          {
            replacements: {
              userId: subsections.rows.map(({ userId }) => userId),
            },
          }
        ),
        dbTogether.query(
          "SELECT 1 AS level, `teams`.`id`, `teams`.`label`, `teams`.`description`, `teams`.`picture`, `teams`.`type`, `teams`.`createdAt`, `teams`.`userId`, (SELECT name FROM `users` WHERE `users`.`id` = `teams`.`userId`) AS `name`, `teams`.`subsectionId`, (SELECT label FROM `subsections` WHERE `subsections`.`id` = `teams`.`subsectionId`) AS `subsectionLabel`, (SELECT COUNT(resources.id) FROM `resources` WHERE `resources`.`deletedAt` IS NULL AND `resources`.`userId` = `teams`.`userId`) AS `resourceCount`, ((WITH RECURSIVE refer AS( SELECT *, 1 AS level FROM users WHERE referrerId = teams.userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN refer AS t ON m.referrerId = t.id) SELECT COUNT(refer.id) FROM refer)) AS `userCount` FROM teams WHERE userId IN(:userId)",
          {
            replacements: {
              userId: subsections.rows.map(({ userId }) => userId),
            },
          }
        ),
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT id, verified, referrerId, 2 AS level FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, m.verified, t.referrerId, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
          {
            replacements: {
              userId: subsections.rows.map(({ userId }) => userId),
            },
          }
        ),
        dbTogether.query(
          "WITH RECURSIVE ref AS( SELECT id, name, referrerId, 2 AS level FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, m.name, t.referrerId, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, level, t.id, t.label, t.description, t.picture, t.type, t.createdAt, t.userId AS coachId, ref.name, t.subsectionId, sub.label AS subsectionLabel, (SELECT COUNT(resources.id) FROM resources WHERE resources.userId = ref.id) AS resourceCount, (WITH RECURSIVE refer AS( SELECT *, 2 AS level FROM users WHERE referrerId = ref.id UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN refer AS t ON m.referrerId = t.id) SELECT COUNT(refer.id) FROM refer) AS userCount FROM ref INNER JOIN teams AS t ON t.userId = ref.id JOIN subsections AS sub ON sub.id = t.subsectionId WHERE t.deletedAt IS NULL",
          {
            replacements: {
              userId: subsections.rows.map(({ userId }) => userId),
            },
          }
        ),
      ]);
      for await (const subsection of subsections.rows) {
        const count = refCount.find((u) => u.referrerId == subsection.userId);
        const userc = userCount.find((u) => u.referrerId == subsection.userId);
        const filteredReferralsTeams = referrals.filter((ref) => ref.referrerId == subsection.userId);
        const filteredLeaderRefTeams = teamsLeader.filter((team) => team.userId == subsection.userId);

        const teams = filteredReferralsTeams.concat(filteredLeaderRefTeams);

        subsection.dataValues.userCount = userc ? userc.count : 0;
        subsection.dataValues.teamCount = teams ? teams.length : 0;
        subsection.dataValues.teams = undefined;
      }

      const pages = Math.ceil(subsections.count / amount);
      return res.status(200).json({ pages, subsections });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getLastSubsections(req, res) {
    try {
      const [subsections, count] = await Promise.all([
        Subsection.findAll({
          include: [User.scope("minAttributes")],
          limit: 6,
          order: [["createdAt", "DESC"]],
        }),
        Subsection.count(),
      ]);

      if (!subsections) return res.status(204).end();

      const [[userCount], [teamsLeader], [refCount], [referrals]] = await Promise.all([
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
          {
            replacements: {
              userId: subsections.map(({ userId }) => userId),
            },
          }
        ),
        dbTogether.query(
          "SELECT 1 AS level, `teams`.`id`, `teams`.`label`, `teams`.`description`, `teams`.`picture`, `teams`.`type`, `teams`.`createdAt`, `teams`.`userId`, (SELECT name FROM `users` WHERE `users`.`id` = `teams`.`userId`) AS `name`, `teams`.`subsectionId`, (SELECT label FROM `subsections` WHERE `subsections`.`id` = `teams`.`subsectionId`) AS `subsectionLabel`, (SELECT COUNT(resources.id) FROM `resources` WHERE `resources`.`deletedAt` IS NULL AND `resources`.`userId` = `teams`.`userId`) AS `resourceCount`, ((WITH RECURSIVE refer AS( SELECT *, 1 AS level FROM users WHERE referrerId = teams.userId UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN refer AS t ON m.referrerId = t.id) SELECT COUNT(refer.id) FROM refer)) AS `userCount` FROM teams WHERE userId IN(:userId)",
          {
            replacements: {
              userId: subsections.map(({ userId }) => userId),
            },
          }
        ),
        dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT id, verified, referrerId, 2 AS level FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, m.verified, t.referrerId, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
          {
            replacements: {
              userId: subsections.map(({ userId }) => userId),
            },
          }
        ),
        dbTogether.query(
          "WITH RECURSIVE ref AS( SELECT id, name, referrerId, 2 AS level FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, m.name, t.referrerId, level+1 AS level FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, level, t.id, t.label, t.description, t.picture, t.createdAt, t.userId AS coachId, ref.name, t.subsectionId, sub.label AS subsectionLabel, (SELECT COUNT(resources.id) FROM resources WHERE resources.userId = ref.id) AS resourceCount, (WITH RECURSIVE refer AS( SELECT *, 2 AS level FROM users WHERE referrerId = ref.id UNION ALL SELECT m.*, level+1 AS level FROM users AS m JOIN refer AS t ON m.referrerId = t.id) SELECT COUNT(refer.id) FROM refer) AS userCount FROM ref INNER JOIN teams AS t ON t.userId = ref.id JOIN subsections AS sub ON sub.id = t.subsectionId WHERE t.deletedAt IS NULL",
          {
            replacements: {
              userId: subsections.map(({ userId }) => userId),
            },
          }
        ),
      ]);
      for await (const subsection of subsections) {
        const count = refCount.find((u) => u.referrerId == subsection.userId);
        const userc = userCount.find((u) => u.referrerId == subsection.userId);
        const filteredReferralsTeams = referrals.filter((ref) => ref.referrerId == subsection.userId);
        const filteredLeaderRefTeams = teamsLeader.filter((team) => team.userId == subsection.userId);

        const teams = filteredReferralsTeams.concat(filteredLeaderRefTeams);

        subsection.dataValues.userCount = userc ? userc.count : 0;
        subsection.dataValues.teamCount = teams ? teams.length : 0;
        subsection.dataValues.teams = undefined;
      }
      return res.status(200).json({ count, subsections });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getListSubsections(req, res) {
    try {
      const subsections = await Subsection.findAll({
        order: [["label"]],
      });
      return res.status(200).json(subsections);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createSubsection(req, res) {
    try {
      const { file } = req;
      const { label, userId } = req.body;
      const created = await Subsection.create({
        label,
        picture: `/subsectionspics/${file.filename}`,
        userId,
      });
      if (!created) return res.status(400).end();
      return res.status(201).json("Создано");
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/subsectionspics/${file.filename}`);
      return res.status(500).json(e.message);
    }
  }

  async updateSubsection(req, res) {
    try {
      const { file } = req;
      const { id } = req.params;
      const { label, userId } = req.body;
      const toUpdate = await Subsection.findByPk(id);
      const toDelete = toUpdate.picture;
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        picture: file?.filename ? `/subsectionspics/${file.filename}` : undefined,
        userId,
      });
      if (!updated) return res.status(404).end();
      if (toDelete) {
        if (file?.filename && fs.existsSync(`public${toDelete}`)) fs.unlinkSync(`public${toDelete}`);
      }
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteSubsection(req, res) {
    try {
      const { ids } = req.body;
      const deleted = await Subsection.destroy({
        where: {
          id: ids,
        },
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getСoverage(req, res) {
    try {
      const { page } = req.params;
      const coverage = await Coverage.findAndCountAll({
        limit: 25,
        order: [["label", "ASC"]],
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const pages = Math.ceil(coverage.count / 25);
      return res.status(200).json({ pages, coverage });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getListCoverage(req, res) {
    try {
      const resources = await Resource.findAll({
        attributes: ["id", "coverageId"],
      });
      const coverage = await Coverage.findAll({
        where: {
          id: resources.map((x) => x.coverageId),
        },
        order: ["label"],
        attributes: ["label", ["id", "value"], "countryId", "nationality"],
      });

      return res.status(200).json(coverage);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createCoverage(req, res) {
    try {
      const { label } = req.body;
      const created = await Coverage.create({
        label,
      });
      if (!created) return res.status(400).end();
      return res.status(201).json("Создано");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateCoverage(req, res) {
    try {
      const { id } = req.params;
      const { label } = req.body;
      const toUpdate = await Coverage.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteCoverage(req, res) {
    try {
      const { ids, force } = req.body;
      const deleted = await Coverage.destroy({
        where: {
          id: ids,
        },
        force,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async restoreCoverage(req, res) {
    try {
      const { ids } = req.body;
      const restored = await Coverage.restore({
        where: {
          id: ids,
        },
      });
      if (!restored) return res.status(404).end();
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getSubcategories(req, res) {
    try {
      const { page } = req.params;
      const paranoid = !(req.query.paranoid == "false") ?? true;
      const subcategories = await Subcategory.findAndCountAll({
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
        order: [["createdAt", "ASC"]],
        paranoid: paranoid,
      });

      const subcount = await Subcategory.findAll({
        paranoid: paranoid,
        attributes: ["id", [Sequelize.fn("COUNT", Sequelize.col("categories->resources.id")), "rescount"]],
        include: {
          model: Category,
          paranoid: paranoid,
          attributes: [],
          include: {
            model: Resource,
            paranoid: paranoid,
            attributes: [],
          },
        },
        paranoid: paranoid,
        where: { id: subcategories.rows.map((sub) => sub.id) },
        group: "categories.subcategoryId",
      });
      const categories = await Category.findAll({
        include: { model: Resource, attributes: [], paranoid: paranoid },
        where: {
          subcategoryId: subcategories.rows.map((sub) => sub.id),
        },
        attributes: ["label", ["id", "value"], "deletedAt", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "rescount"], "subcategoryId"],
        order: [["label"]],
        group: "value",
        paranoid: paranoid,
      });
      for await (const subcategory of subcategories.rows) {
        subcategory.dataValues.rescount = subcount.filter((sub) => sub.id == subcategory.id)[0]?.dataValues?.rescount || 0;
        subcategory.dataValues.categories = categories.filter((cata) => cata.subcategoryId == subcategory.id);
      }
      const pages = Math.ceil(subcategories.count / 25);
      return res.status(200).json({ pages, subcategories });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getOneSubcategory(req, res) {
    try {
      const subcategory = await Subcategory.findOne({
        include: [{ model: Category, includes: { model: Resource, where: { restypeId: 3 } } }],
      });
      if (!subcategory) return res.status(404).end();
      return res.status(200).json(subcategory);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getCategoriesBySubcategory(req, res) {
    try {
      const { search } = req.query;
      const subcategories = await Subcategory.findAll({
        include: {
          model: Category,
          attributes: ["label", ["id", "value"]],
          include: {
            model: Resource,
            where: { restypeId: 3 },
          },
        },
        attributes: ["label", ["id", "value"]],
      });
      return res.status(200).json({ subcategories });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getListSubcategories(req, res) {
    try {
      const subcategories = await Subcategory.findAll({
        attributes: ["label", ["id", "value"]],
        order: [["label"]],
      });
      return res.status(200).json(subcategories);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createSubcategory(req, res) {
    try {
      const { label } = req.body;
      const created = await Subcategory.create({
        label,
      });
      if (!created) return res.status(400).end();
      return res.status(201).json("Создано");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateSubcategory(req, res) {
    try {
      const { id } = req.params;
      const { label } = req.body;
      const toUpdate = await Subcategory.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteSubcategory(req, res) {
    try {
      const { ids, force } = req.body;
      const deleted = await Subcategory.destroy({
        where: {
          id: ids,
        },
        force,
      });
      if (!deleted) return res.status(404).end();
      if (!force) {
        const deleteCata = await Category.destroy({
          where: {
            subcategoryId: ids,
          },
        });
      }
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async restoreSubcategory(req, res) {
    try {
      const { ids } = req.body;
      const restored = await Subcategory.restore({
        where: {
          id: ids,
        },
      });
      if (!restored) return res.status(404).end();
      const restoreCata = await Category.restore({
        where: {
          subcategoryId: ids,
        },
      });
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /* ======== Ссылки ======== */

  async getAllLinks(req, res) {
    try {
      const { type } = req.query;
      let where = {};
      if (type) {
        Object.assign(where, {
          type: type,
        });
      }
      const links = await Links.findAndCountAll({
        where,
      });
      return res.status(200).json(links);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createLink(req, res) {
    try {
      const { label, url, type } = req.body;
      const created = await Links.create({
        label: label,
        url: url,
        type: type,
      });
      if (!created) return res.status(400).json("Ошибка при создании");
      return res.status(201).json("Успешно создано");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateLink(req, res) {
    try {
      const { id } = req.params;
      const { label, url, type } = req.body;
      const toUpdate = await Links.findByPk(id);
      if (!toUpdate) return res.status(404).json("Ссылка не найдена");
      const updated = toUpdate.update({
        label: label,
        url: url,
        type: type,
      });
      if (!updated) return res.status(400).json("Ошибка при редактировании");
      return res.status(200).json("Успешно обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteLink(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Links.destroy({
        where: {
          id: id,
        },
      });
      if (!deleted) return res.status(404).json("Ссылка не найдена");
      return res.status(200).json("Успешно удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /* ========== Рубрики ========== */

  async getAllRubrics(req, res) {
    try {
      const { list } = req.query;
      let rubrics = [];
      let pages = undefined;
      if (list != true) {
        const page = Number(req.params.page) ? Number(req.params.page) : 1;
        const limit = Number(req.params.limit) ? Number(req.params.limit) : 25;
        rubrics = await Rubric.findAndCountAll({
          limit: limit,
          offset: limit * (page - 1),
        });
        pages = Math.ceil(rubrics.count / limit);
      } else {
        rubrics = await Rubric.findAll({
          attributes: ["id", "label"],
        });
      }
      return res.status(200).json({ pages, rubrics });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createRubric(req, res) {
    try {
      const { label } = req.body;
      const created = await Rubric.create({
        label,
      });
      if (!created) return res.status(400).json("Ошибка при создании рубрики");
      return res.status(201).json("Рубрика успешно создана");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateRubric(req, res) {
    try {
      const { id } = req.params;
      const { label } = req.body;
      const { user } = req;
      if (id == 1 && !user.isAdminHelper) throw new Error("Нет доступа");
      const toUpdate = await Rubric.findByPk(id);
      if (!toUpdate) return res.status(404).json("Рубрика не найдена");
      const updated = toUpdate.update({
        label,
      });
      if (!updated) return res.status(400).json("Ошибка при редактировании");
      return res.status(200).json("Рубрика успешно обновлена");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteRubric(req, res) {
    try {
      const { id } = req.params;
      let force = /true/i.test(req.query.force);
      const { user } = req;
      if (id == 1) throw new Error("Нет доступа");
      const found = await Rubric.findOne({
        where: {
          id,
        },
        paranoid: !force,
      });
      if (!found) throw new Error("Рубрика не найдена");
      const deleted = await found.destroy({ hooks: true, force: force });
      if (!deleted) throw new Error("Рубрика не найдена");
      return res.status(200).json("Рубрика успешно удалена");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  // Триады
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async getAllTriads(req, res) {
    try {
      const page = Number(req.params.page) ? Number(req.params.page) : 1;
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 30;
      const type = Number(req.query.type);
      const list = req.query.list;

      if (list == "true") {
        const triads = await Triad.scope("min").findAndCountAll({
          include: [{ model: User.scope("minAttributes") }, { model: Subsection, attributes: ["id", "label"] }],
          limit: 25,
          offset: 25 * (page - 1),
          order: [["createdAt", "DESC"]],
        });
        triads.count = triads.rows.length;
        const pages = Math.ceil(triads.count / limit);
        return res.status(200).json({ pages, triads });
      }

      const triads = await Triad.scope(["min", "info"]).findAll({
        include: [
          { model: Subsection, include: [{ model: User.scope("minAttributes") }, { model: Team.scope("triadInfo") }] },
          { model: User.scope("minAttributes") },
        ],
        order: [["createdAt", "DESC"]],
      });

      const subsections = await Subsection.scope("info").findAll({
        include: { model: User.scope("minAttributes") },
        where: {
          triadId: triads.map(({ id }) => id),
        },
      });

      const subIds = [];

      for await (const triad of triads) {
        const subUsers = new Set();
        for await (const sub of triad.subsections) {
          const [queryUsers] = await dbTogether.query(
            `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, ref.id FROM ref WHERE ref.verified = 1`,
            {
              replacements: { userId: sub.userId },
            }
          );
          queryUsers?.forEach((x) => {
            if (!subUsers.has(x.id)) {
              subUsers.add(x.id);
            }
          });
          subIds.push(sub.id);
        }
        triad.dataValues.userCount = subUsers.size ? subUsers.size : 0;
        triad.dataValues.subsections = undefined;
      }

      for await (const sub of subsections) {
        const [[userCount]] = await dbTogether.query(
          `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
          {
            replacements: { userId: sub.userId },
          }
        );

        sub.dataValues.userCount = userCount?.count ? userCount?.count : 0;
      }

      let where = {
        subsectionId: subIds.map((id) => id),
      };

      if (type || type == 0) where.type = type;
      const teams = {};
      [teams.eliteCount, teams.usualCount, teams.totalCount, teams.count, teams.rows] = await Promise.all([
        Team.count({ where: { type: 1, subsectionId: subIds.map((id) => id) } }),
        Team.count({ where: { type: 0, subsectionId: subIds.map((id) => id) } }),
        Team.count({ where: { subsectionId: subIds.map((id) => id) } }),
        Team.count({ where }),
        Team.scope("info").findAll({
          where,
          limit,
          offset: limit * (page - 1),
          order: [["label", "ASC"]],
        }),
      ]);

      teams.pages = Math.ceil(teams.count / limit);

      return res.status(200).json({ triads, subsections, teams });
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async getOneTriads(req, res) {
    try {
      const id = Number(req.params.id);
      const limit = Number(req.query.limit) ? Number(req.query.limit) : 30;
      const page = Number(req.query.page) ? Number(req.query.page) : 1;
      const type = Number(req.query.type);

      const triad = await Triad.scope(["min", "info"]).findOne({
        where: {
          id,
        },
        include: [
          { model: Subsection.scope("info"), include: [{ model: Team.scope("triadInfo") }, { model: User.scope("minAttributes") }] },
          { model: User.scope("minAttributes") },
        ],
      });
      if (!triad) throw new Error("Не найдено");

      const ids = [];
      if (triad.subsections.length) {
        const subUsers = new Set();
        for await (const sub of triad.subsections) {
          if (sub.teams.length) {
            ids.push(sub.id);

            const [queryUsers] = await dbTogether.query(
              `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, ref.id FROM ref WHERE ref.verified = 1`,
              {
                replacements: { userId: sub.userId },
              }
            );
            queryUsers?.forEach((x) => {
              if (!subUsers.has(x.id)) {
                subUsers.add(x.id);
              }
            });

            triad.dataValues.userCount = subUsers.size ? subUsers.size : 0;
            sub.dataValues.teams = undefined;
          }

          const [[userCount]] = await dbTogether.query(
            `WITH RECURSIVE ref AS( SELECT id, referrerId, verified FROM users WHERE referrerId IN(:userId) UNION ALL SELECT m.id, t.referrerId, m.verified FROM users AS m JOIN ref AS t ON m.referrerId = t.id) SELECT ref.referrerId, COUNT(ref.id) AS count FROM ref WHERE ref.verified = 1 GROUP BY ref.referrerId`,
            {
              replacements: { userId: sub.userId },
            }
          );

          sub.dataValues.userCount = userCount?.count ? userCount?.count : 0;
        }
      }

      const where = { subsectionId: ids.map((id) => id) };
      if (type || type == 0) where.type = type;
      const teams = {};
      [teams.eliteCount, teams.usualCount, teams.totalCount, teams.count, teams.rows] = await Promise.all([
        Team.count({ where: { type: 1, subsectionId: ids.map((id) => id) } }),
        Team.count({ where: { type: 0, subsectionId: ids.map((id) => id) } }),
        Team.count({ where: { subsectionId: ids.map((id) => id) } }),
        Team.count({ where }),
        Team.scope("info").findAll({
          where,
          limit,
          offset: limit * (page - 1),
          order: [["label", "ASC"]],
        }),
      ]);

      triad.dataValues.teamsCount = teams.totalCount;
      triad.dataValues.page = Math.ceil(teams.count / limit);
      triad.dataValues.teams = teams;
      return res.status(200).json(triad);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async createTriads(req, res) {
    try {
      const { label, userId, ids } = req.body;
      const { file } = req;
      if (!file) throw new Error("Нет файла");

      const result = await dbTogether.transaction(async (t) => {
        const triad = await Triad.create(
          {
            label,
            picture: file?.destination + file?.filename,
            userId,
          },
          { transaction: t }
        );

        const where = {};
        if ([ids].length == 1) where.id = ids;

        const subs = await Subsection.update(
          { triadId: triad.id },
          {
            where,
            transaction: t,
          }
        );

        return [triad, subs];
      });

      if (!result) throw new Error("Ошибка создания");

      return res.status(200).json("Создано");
    } catch (e) {
      const { file } = req;
      if (file) deleteFileArr([file]);
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async updateTriads(req, res) {
    try {
      const { file } = req;
      const { id } = req.params;
      let { label, userId, ids } = req.body;
      const find = await Triad.findByPk(Number(id));
      if (!find) throw new Error("Не найдено");

      const toUpdate = {};

      if (file) {
        toUpdate.picture = file?.destination + file?.filename;
        if (fs.existsSync(find.picture)) fs.unlinkSync(find.picture);
      }

      if (label) toUpdate.label = label;
      if (userId) toUpdate.userId = userId;

      const result = await dbTogether.transaction(async (t) => {
        toUpdate.transaction = t;

        const updated = await find.update(toUpdate);

        const toSubs = await Subsection.update({ triadId: null }, { where: { triadId: id }, transaction: t });

        if (!Array.isArray(ids)) ids = [ids];
        const subs = await Subsection.update(
          { triadId: id },
          {
            where: {
              id: ids,
            },
            transaction: t,
          }
        );

        return [updated, subs];
      });

      if (!result) throw new Error("Ошибка при обновлении");

      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
  async deleteTriads(req, res) {
    try {
      const { id } = req.params;
      const find = await Triad.findByPk(id);
      if (!find) return res.status(404).json("Не найдено");
      if (fs.existsSync(find.picture)) fs.unlinkSync(find.picture);
      const deleted = await find.destroy({ force: true });
      if (!deleted) throw new Error("Ошибка удаления");
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new CategoriesController();
