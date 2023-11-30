import { Op, QueryTypes, Sequelize, json, where } from "sequelize";
import dbTogether from "../../db/db.js";
import { Category, Franchise, Project, Subsection, Coverage, Subcategory } from "../categories/categories.model.js";
import { Cities, Country, Region } from "../countries/countries.model.js";
import { Team, User } from "../users/users.model.js";
import { ResType, Resource } from "./resources.model.js";
import fs from "fs";

const locationTypes = {
  city: { model: Cities, name: "city", typeId: "cityId", fields: ["label"] },
  region: { model: Region, name: "region", typeId: "regionId", fields: ["label"] },
  country: { model: Country, name: "country", typeId: "countryId", fields: ["label"] },
};

const resourceSearch = {
  resource: { model: Resource, fields: ["label", "description"] },
  user: { model: User, fields: ["name", "email"] },
};

class ResourcesController {
  async getResTypes(req, res) {
    try {
      const resTypes = await ResType.findAll();
      return res.status(200).json(resTypes);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getResources(req, res) {
    try {
      const { page } = req.params;
      const { deleted, search, type } = req.query;
      const amount = Number(req.query.amount) ? Number(req.query.amount) : 25;
      const where = {};
      if (search) {
        Object.assign(where, {
          [Op.or]: [
            {
              label: {
                [Op.startsWith]: search,
              },
            },
            {
              description: {
                [Op.startsWith]: search,
              },
            },
            Sequelize.where(Sequelize.col("user.name"), { [Op.startsWith]: search }),
            // Sequelize.where(Sequelize.col("user.login"), { [Op.startsWith]: search }),
            Sequelize.where(Sequelize.col("user.email"), { [Op.startsWith]: search }),
          ],
        });
      }
      const resources = await Resource.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: "user",
          },
          { model: Category, attributes: ["id", "label"] },
          { model: Franchise, attributes: ["id", "label"] },
          { model: Project, attributes: ["id", "label"] },
          { model: Country, attributes: ["id", "label"] },
          { model: Region, attributes: ["id", "label"] },
          { model: Cities, attributes: ["id", "label"] },
          { model: Coverage },
          { model: Team, attributes: ["id", "label"], include: { model: Subsection } },
          { model: ResType, attributes: ["id", "label"] },
        ],
        where,
        order: [["label", "ASC"]],
        limit: amount,
        offset: amount * (Number(page ? page : 1) - 1),
        paranoid: deleted ? false : true,
      });
      const pages = Math.ceil(resources.count / amount);
      return res.status(200).json({ pages, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getAllResources(req, res) {
    try {
      const resources = await Resource.findAll({
        attributes: ["label", ["id", "value"]],
        order: [["label", "ASC"]],
      });
      return res.status(200).json({ resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getOneResource(req, res) {
    try {
      const { id } = req.params;
      const resource = await Resource.findByPk(id, {
        include: [{ model: Category }, { model: User, as: "user", attributes: ["name", "email", "avatar"] }],
      });
      if (!resource) return res.status(404).json({ err: "Такого ресурса нет" });
      return res.status(200).json({ resource });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async search(req, res) {
    try {
      const { page } = req.params;
      const { projectId, franchiseId, categoryId, countryId, regionId, cityId, teamId, strsearch, amount, coverageId } = req.query;
      const where = [{}];
      const and = [];
      const replacements = {};
      if (projectId) where[0].projectId = projectId;
      if (franchiseId) where[0].franchiseId = franchiseId;
      if (categoryId) where[0].categoryId = categoryId;
      if (teamId) where[0].teamId = teamId;
      if (countryId) where[0].countryId = countryId;
      if (regionId) where[0].regionId = regionId;
      if (cityId) where[0].cityId = cityId;
      if (coverageId) where[0].coverageId = coverageId;
      // if (countryId) {
      //   and.push({
      //     countryId: {
      //       [Op.or]: [countryId],
      //     },
      //   });
      // }
      // if (regionId) {
      //   and.push({
      //     regionId: {
      //       [Op.or]: [regionId],
      //     },
      //   });
      // }
      // if (cityId) {
      //   and.push({
      //     cityId: {
      //       [Op.or]: [cityId],
      //     },
      //   });
      // }
      if (strsearch) {
        where.push(Sequelize.literal("MATCH (`resources`.`label`, `resources`.`description`) AGAINST (:search IN BOOLEAN MODE)"));
        replacements.search = strsearch + "*";
      }
      if (and.length) Object.assign(where[0], { [Op.and]: and });
      const resources = await Resource.findAndCountAll({
        where,
        replacements,
        include: [{ model: Category }, { model: User, as: "user" }],
        limit: Number(amount),
        offset: Number(amount) * (Number(page ? page : 1) - 1),
        order: [["label", "ASC"]],
      });
      const countries = await Country.findAll();
      let regions, cities;
      if (regionId) {
        regions = await Region.findAll({
          where: {
            id: regionId,
          },
        });
      }
      if (regionId) {
        cities = await Cities.findAll({
          where: {
            regionId: regionId,
          },
        });
      }
      const pages = Math.ceil(resources.count / Number(amount));
      const data = {};
      if (pages) data.pages = pages;
      if (resources) data.resources = resources;
      if (countries) data.countries = countries;
      if (regions) data.regions = regions;
      if (cities) data.cities = cities;
      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getStat(req, res) {
    try {
      const statistics = await dbTogether.query(
        "SELECT (DATE(NOW()) - INTERVAL `day` DAY) AS `DayDate`, COUNT(DISTINCT `users`.`id`) AS `users.count`, COUNT(DISTINCT `resources`.`id`) AS `resources.count` FROM ( SELECT 0 AS `day` UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 ) AS `range` LEFT JOIN `users` ON DATE(`users`.`createdAt`) = DATE(NOW()) - INTERVAL `day` DAY LEFT JOIN `resources` ON DATE(`resources`.`createdAt`) = DATE(NOW()) - INTERVAL `day` DAY GROUP BY `DayDate` ORDER By `DayDate` ASC;",
        {
          nest: true,
        }
      );
      const usersTotal = await User.count();
      const resourceTotal = await Resource.count();
      return res.status(200).json({ statistics, usersTotal, resourceTotal });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getFranChats(req, res) {
    try {
      const { id, page } = req.params;
      const franchise = await Franchise.findOne({
        where: {
          id: id,
        },
        attributes: ["label"],
      });
      if (!franchise) return res.status(404).json("Такой франшизы нет");
      const chats = await Resource.findAndCountAll({
        where: {
          franchiseId: id,
          restypeId: 1,
        },
        include: [{ model: Category }, { model: User, as: "user", attributes: ["name", "email", "avatar"] }],
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const pages = Math.ceil(chats.count / 25);
      return res.status(200).json({ pages, franchise, chats });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getFranChannels(req, res) {
    try {
      const { id, page } = req.params;
      const franchise = await Franchise.findOne({
        where: {
          id: id,
        },
        attributes: ["label"],
      });
      if (!franchise) return res.status(404).json("Такой франшизы нет");
      const channels = await Resource.findAndCountAll({
        where: {
          franchiseId: id,
          restypeId: 3,
        },
        include: [{ model: Category }, { model: User, as: "user", attributes: ["name", "email", "avatar"] }],
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const pages = Math.ceil(channels.count / 25);
      return res.status(200).json({ pages, franchise, channels });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getTeamResources(req, res) {
    try {
      const { id, page } = req.params;
      const team = await Team.findByPk(id);
      if (!team) return res.status(404).end();
      const resources = await Resource.findAndCountAll({
        where: {
          teamId: id,
        },
        include: [{ model: Category }, { model: User, as: "user", attributes: ["name", "email", "avatar"] }],
        limit: 25,
        offset: 25 * (Number(page ? page : 1) - 1),
      });
      const pages = Math.ceil(resources.count / 25);
      return res.status(200).json({ pages, team, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getResourcesByLocation(req, res) {
    try {
      const id = Number(req.params.id);
      const { type, page } = req.params;
      const { search } = req.query;
      const where = {};
      const data = {};
      const limit = 24;

      if (!locationTypes[type]) return res.status(404).end();

      const findLocation = await locationTypes[type].model.findByPk(id);
      if (!findLocation) return res.status(404).end();

      where[locationTypes[type].typeId] = id;
      if (search) {
        Object.assign(where, {
          [Op.or]: locationTypes[type].fields.map((el) => {
            const r = {};
            r[el] = { [Op.substring]: search };
            return r;
          }),
        });
      }
      const resources = await Resource.findAndCountAll({
        where,
        limit,
        offset: limit * Number((page ? page : 1) - 1),
      });

      const pages = Math.ceil(resources.count / limit);

      data[locationTypes[type].name] = findLocation;
      data.pages = pages;
      data.resources = resources;

      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getNationalCat(req, res) {
    try {
      const page = Number(req.params.page);
      const limit = 24;
      const nat = await Subcategory.findOne({ where: { label: "Национальные" } });
      const categories = await Category.findAll({ where: { subcategoryId: nat.id } });
      const resources = await Resource.findAndCountAll({
        where: { categoryId: categories.map((x) => x.id) },
        limit,
        offset: limit * Number((page ? page : 1) - 1),
      });

      const pages = Math.ceil(resources.count / limit);

      return res.status(200).json({ pages, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async getResourcesCity(req, res) {
    try {
      const { page } = req.params;
      const limit = 45;
      const cities = await Cities.findAll({
        include: [
          {
            model: Resource,
            where: {
              id: { [Op.not]: null },
            },
            attributes: [],
            include: [{ model: Category }, { model: User, as: "user", attributes: ["name", "email", "avatar"] }],
          },
          { model: Region, include: { model: Country, attributes: ["label", ["id", "value"]] }, attributes: ["label", ["id", "value"]] },
        ],
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.col("resources.id")), "rescount"]],
        },
        limit,
        offset: limit * (Number(page ? page : 1) - 1),
        order: [["label"]],
        subQuery: false,
        group: ["id"],
      });
      const [{ citycount }] = await dbTogether.query(
        "SELECT COUNT(*) as citycount FROM (SELECT `cities`.`id` FROM `cities` AS `cities` INNER JOIN `resources` AS `resources` ON `cities`.`id` = `resources`.`cityId` AND (`resources`.`deletedAt` IS NULL AND `resources`.`id` IS NOT NULL) WHERE (`cities`.`deletedAt` IS NULL) GROUP BY `id`) da",
        { type: QueryTypes.SELECT }
      );
      /* const cities = await Cities.findAll({
        include: {
          model: Resource,
          attributes: [],
        },
        having: Sequelize.where(Sequelize.fn("COUNT", Sequelize.col("resources.id")), {
          [Op.gt]: 0,
        }),
        attributes: ["label", [Sequelize.fn("COUNT", Sequelize.col("resources.id")), "count"]],
        group: ["id"],
      }); */
      const pages = Math.ceil(citycount / limit);
      return res.status(200).json({ pages, citycount, cities });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async lastResources(req, res) {
    try {
      const amount = req.query.amount ? Number(req.query.amount) : 6;
      const resources = await Resource.findAndCountAll({
        order: [["createdAt", "DESC"]],
        include: [{ model: Category }, { model: User, as: "user", attributes: ["name", "email", "avatar"] }],
        limit: amount,
      });
      return res.status(200).json(resources);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async createResource(req, res) {
    try {
      const { file, user } = req;
      const { restypeId, label, url, description, countryId, regionId, cityId, projectId, teamId, franchiseId, categoryId, coverageId, curatorId } = req.body;
      const created = await Resource.create({
        restypeId,
        label,
        url,
        description,
        coverageId,
        countryId,
        regionId,
        cityId,
        projectId,
        teamId,
        franchiseId,
        categoryId,
        userId: user.id,
        curatorId,
        picture: `/resourcespics/${file.filename}`,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      const { file } = req;
      console.error(e);
      if (file?.filename) fs.unlinkSync(`public/resourcespics/${file.filename}`);
      return res.status(500).json(e.message);
    }
  }

  async updateResource(req, res) {
    try {
      const { id } = req.params;
      const { label, url, description, coverageId, countryId, regionId, cityId, franchiseId, projectId, teamId, categoryId, restypeId, curatorId } = req.body;
      const { file, user } = req;
      let where = { id: id };
      const roles = await user.getRoles({ joinTableAttributes: [] });
      if (!roles.map((x) => x.accessLevel).includes(1)) Object.assign(where, { userId: user.id });
      const toUpdate = await Resource.findOne({
        where,
      });
      if (!toUpdate) return res.status(404).end();
      const toDelete = toUpdate.picture;
      const updated = await toUpdate.update({
        picture: file?.filename ? `/resourcespics/${file.filename}` : undefined,
        label,
        url,
        description,
        coverageId,
        countryId,
        regionId,
        cityId,
        franchiseId,
        projectId,
        teamId,
        categoryId,
        restypeId,
        curatorId,
      });
      if (!updated) return res.status(404).end();
      if (file?.filename && fs.existsSync(`public${toDelete}`)) fs.unlinkSync(`public${toDelete}`);
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteResources(req, res) {
    try {
      const { ids, force } = req.body;
      const { user } = req;
      let where = { id: ids };
      const roles = await user.getRoles({ joinTableAttributes: [] });
      if (!roles.map((x) => x.accessLevel).includes(1)) Object.assign(where, { userId: user.id });
      const deleted = await Resource.destroy({
        where,
        force,
        individualHooks: true,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async restoreResources(req, res) {
    try {
      const { ids } = req.body;
      const { user } = req;
      let where = { id: ids };
      const roles = await user.getRoles({ joinTableAttributes: [] });
      if (!roles.map((x) => x.accessLevel).includes(1)) Object.assign(where, { userId: user.id });
      const restored = await Resource.restore({
        where,
      });
      if (!restored) return res.status(404).end();
      return res.status(200).json("Восстановлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async getResourceByCategory(req, res) {
    try {
      const id = Number(req.params.id);
      const page = Number(req.params.page);
      const limit = 24;
      const { search } = req.query;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({ msg: "Категория не найдена" });
      const where = { categoryId: id };
      if (search) {
        Object.assign(where, {
          [Op.or]: [
            {
              label: {
                [Op.substring]: search,
              },
            },
            {
              description: {
                [Op.substring]: search,
              },
            },
          ],
        });
      }
      const resources = await Resource.findAndCountAll({
        where,
        limit,
        offset: limit * ((page ? page : 1) - 1),
        include: { model: Cities, attributes: ["id", "label"] },
      });
      for await (const res of resources.rows) {
        res.dataValues.categoryLabel = category.label;
      }
      const pages = Math.ceil(resources.count / limit);
      return res.status(200).json({ category, pages, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async getResourcesBySubcategory(req, res) {
    try {
      const id = Number(req.params.id);
      const page = Number(req.params.page);
      const { search } = req.query;
      const limit = 24;
      const subcategory = await Subcategory.findByPk(id);
      if (!subcategory) return res.status(404).json({ msg: "Подкатегория не найдена" });

      const categories = await Category.findAll({
        where: {
          subcategoryId: id,
        },
      });
      if (!categories) return res.status(404).json({ msg: "Категорий нет" });

      const where = { categoryId: categories.map((cat) => cat.id) };
      if (search) {
        Object.assign(where, {
          [Op.or]: [
            {
              label: {
                [Op.substring]: search,
              },
            },
            {
              description: {
                [Op.substring]: search,
              },
            },
          ],
        });
      }

      const resources = await Resource.findAndCountAll({
        where,
        limit,
        offset: limit * Number((page ? page : 1) - 1),
      });
      const pages = Math.ceil(resources.count / limit);
      return res.status(200).json({ subcategory, pages, resources });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
}

export default new ResourcesController();
