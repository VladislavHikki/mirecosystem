import * as XLSX from "xlsx/xlsx.mjs";
import { validateError } from "../../utils/customValidation.js";
import { Coverage } from "../categories/categories.model.js";
import { Cities, Country, Region } from "./countries.model.js";
import { Resource } from "../resources/resources.model.js";

class CountriesController {
  async getCountries(req, res) {
    try {
      const { list } = req.query;
      let countries = [];
      countries = await Country.findAll({
        order: [["label", "ASC"]],
      });
      if (list == "true") {
        const resources = await Resource.findAll({
          attributes: ["id", "countryId"],
        });
        countries = await Country.findAll({
          where: {
            id: resources.map((x) => x.countryId),
          },
          order: [["label", "ASC"]],
        });
      }
      return res.status(200).json(countries);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getRegions(req, res) {
    try {
      const { id } = req.params;
      const regions = await Region.findAll({
        where: {
          countryId: id,
        },
        order: [["label", "ASC"]],
      });
      return res.status(200).json(regions);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async getCities(req, res) {
    try {
      const { id } = req.params;
      const cities = await Cities.findAll({
        where: {
          regionId: id,
        },
        order: [["label", "ASC"]],
      });
      return res.status(200).json(cities);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async createCountry(req, res) {
    try {
      const { label, slug } = req.body;
      const created = await Country.create({
        label,
        slug,
      });
      if (!created) return res.status(400).end();
      const createCoverageWorld = await Coverage.create({
        label: label + " и Мир",
        countryId: created.id,
        nationality: 1,
      });
      const createCoverageRegion = await Coverage.create({
        label: label + " и регионы",
        countryId: created.id,
        nationality: 0,
      });
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async createRegion(req, res) {
    try {
      const { label, slug, countryId } = req.body;
      const created = await Region.create({
        label,
        slug,
        countryId,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async createCity(req, res) {
    try {
      const { label, slug, regionId } = req.body;
      const created = await Cities.create({
        label,
        slug,
        regionId,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async deleteCountry(req, res) {
    try {
      const { ids } = req.body;
      const deleted = await Country.destroy({
        where: {
          id: ids,
        },
        force: true,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async deleteRegion(req, res) {
    try {
      const { ids } = req.body;
      const deleted = await Region.destroy({
        where: {
          id: ids,
        },
        force: true,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async deleteCity(req, res) {
    try {
      const { ids } = req.body;
      const deleted = await Cities.destroy({
        where: {
          id: ids,
        },
        force: true,
      });
      if (!deleted) return res.status(404).end();
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }

  async updateCountry(req, res) {
    try {
      const { id } = req.params;
      const { label, slug } = req.body;
      const toUpdate = await Country.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        slug,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async updateRegion(req, res) {
    try {
      const { id } = req.params;
      const { label, slug, countryId } = req.body;
      const toUpdate = await Region.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        slug,
        countryId,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async updateCity(req, res) {
    try {
      const { id } = req.params;
      const { label, slug, regionId } = req.body;
      const toUpdate = await Cities.findByPk(id);
      if (!toUpdate) return res.status(404).end();
      const updated = await toUpdate.update({
        label,
        slug,
        regionId,
      });
      if (!updated) return res.status(404).end();
      return res.status(200).json("Обновлено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async excelCountry(req, res) {
    try {
      const { file } = req;

      if (file) {
        if (file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") return res.status(400).json("Неверный формат файла");
      }
      const workbook = XLSX.read(file.buffer);

      let [toCreateCountry, toCreateRegion, toCreateCity, uniqueLabels, uniqueRegions, uniqueCities] = [[], [], [], new Set(), new Set(), new Set()];

      for (const key in workbook.Sheets["Лист1"]) {
        if (key.startsWith("A")) {
          const label = workbook.Sheets["Лист1"][key].v;
          const lowercaseLabel = label.toLowerCase();

          if (!uniqueLabels.has(label)) {
            toCreateCountry.push({
              label: label,
              slug: lowercaseLabel,
            });
            uniqueLabels.add(label);
          }
        }
      }

      const findCountries = [];
      for await (const c of toCreateCountry) {
        const country = await Country.findOrCreate({
          where: c,
        });
        findCountries.push({
          id: country[0].id,
          label: country[0].label,
        });
      }

      let [j, i] = [1, 0];
      const rowRegions = [];
      for (const key in workbook.Sheets["Лист1"]) {
        if (key == "!ref" || key == "!margins") continue;
        i++;
        rowRegions.push({
          label: workbook.Sheets["Лист1"][key].v,
          num: j,
        });
        if (i % 3 === 0) {
          j++;
        }
      }

      const middleRegions = rowRegions.reduce((res, item) => {
        if (!res[item.num]) res[item.num] = [];
        res[item.num].push(item.label);
        return res;
      }, {});

      const middlePlace = Object.values(middleRegions);

      const createRegions = [];
      for await (const reg of middlePlace) {
        findCountries.forEach((x) => {
          if (!uniqueRegions.has(reg[1]) && reg[0] === x.label && reg[1] !== undefined) {
            uniqueRegions.add(reg[1]);
            createRegions.push({
              label: reg[1],
              slug: reg[1].toLowerCase(),
              countryId: x.id,
            });
          }
        });
      }

      const findRegions = [];
      for await (const r of createRegions) {
        const region = await Region.findOrCreate({
          where: r,
        });
        findRegions.push({
          id: region[0].id,
          label: region[0].label,
        });
      }

      const createCities = [];
      for await (const city of middlePlace) {
        findRegions.filter((x) => {
          if (!uniqueCities.has(city[2]) && city[1] === x.label && city[2] !== undefined) {
            uniqueCities.add(city[2]);
            createCities.push({
              label: city[2],
              slug: city[2].toLowerCase(),
              regionId: x.id,
            });
          }
        });
      }

      for await (const city of createCities) {
        await Cities.findOrCreate({
          where: city,
        });
      }

      return res.status(200).json("Все записи были перенесены в Базу данных");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new CountriesController();
