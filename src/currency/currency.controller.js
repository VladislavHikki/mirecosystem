import dbTogether from "../../db/db.js";
import { deleteFileArr, validateError } from "../../utils/customValidation.js";
import { Currency, Exchange_Rate } from "./currency.model.js";
import fs from "fs";

const currencyMain = [{ label: "Deriver" }, { label: "Oneder" }, { label: "Trill" }, { label: "Anva" }, { label: "Rutoken" }, { label: "Rollar" }];

class CurrencyController {
  async create(req, res) {
    try {
      const { file } = req;
      const { label, exchange_rate, description } = req.body;
      const result = await dbTogether.transaction(async (t) => {
        const currency = await Currency.create(
          {
            label,
            description,
            image: `${file.destination}/${file.filename}`,
          },
          { transaction: t }
        );
        const rate = await Exchange_Rate.create(
          {
            exchange_rate,
            currencyId: currency.id,
          },
          { transaction: t }
        );
        return [currency, rate];
      });
      if (!result) throw new Error("Ошибка создания");
      return res.status(200).json("Создано");
    } catch (e) {
      const { file } = req;
      console.error(e);
      deleteFileArr([file]);
      return res.status(500).json(validateError(e));
    }
  }

  async edit(req, res) {
    try {
      const { id } = req.params;
      const { file } = req;
      const { label, exchange_rate, description } = req.body;
      const find = await Currency.findByPk(id);
      if (!find) throw new Error("Не найдено");
      const toUpdate = {};
      if (label) toUpdate.label = label;
      if (description) toUpdate.description = description;
      if (file) {
        toUpdate.image = `${file.destination}/${file.filename}`;
      }
      const result = dbTogether.transaction(async (t) => {
        if (file) {
          if (fs.existsSync(find.image)) fs.unlinkSync(find.image);
        }

        const upd = await find.update(toUpdate);

        if (exchange_rate) await Exchange_Rate.create({ exchange_rate, currencyId: id });
        return upd;
      });
      if (!result) throw new Error("Ошибка при обновлении");
      return res.status(200).json("Обновлено");
    } catch (error) {
      const { file } = req;
      console.error(e);
      deleteFileArr([file]);
      return res.status(500).json(validateError(e));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const find = await Currency.findByPk(id);
      if (!find) throw new Error("Не найдено");
      const result = dbTogether.transaction(async (t) => {
        fs.unlinkSync(find.image);
        const delRate = await Exchange_Rate.destroy({
          where: {
            currencyId: id,
          },
          force: true,
        });
        const deleted = await find.destroy({ force: true });
        return deleted;
      });
      if (!result) throw new Error("Ошибка при удалении");
      return res.status(200).json("Удалено");
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }

  async getCurrencys(req, res) {
    try {
      let { count, type } = req.query;
      let countCyr;
      const limit = Number(req.query.limit) || null;
      const include = {
        model: Exchange_Rate,
        attributes: ["exchange_rate", "currencyId", "createdAt"],
        order: ["createdAt", "DESC"],
      };

      let where = {};
      if (type == "main") where.label = currencyMain.map((x) => x.label);

      const currency = await Currency.findAll({
        include,
        limit: limit,
        where,
      });
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      for await (const cur of currency) {
        const sort = cur.exchanges_rates.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const startYear = sort[sort.length - 1].exchange_rate;
        const currentRate = sort[0].exchange_rate;
        const difYear = currentRate - startYear;

        const dayRates = cur.exchanges_rates.filter((x) => {
          const createdAt = new Date(x.createdAt);
          return createdAt >= date;
        });

        let startDay = dayRates[dayRates?.length - 1]?.exchange_rate;
        let difDay = currentRate - startDay;

        if (dayRates.length == 1) {
          if (sort.length > 1) startDay = sort[1].exchange_rate;
          difDay = currentRate - startDay;
        }

        cur.dataValues.currentRate = currentRate;
        cur.dataValues.yearRate = Number(((difYear / startYear) * 100).toFixed(2));
        cur.dataValues.dayRates = Number(((difDay / startDay) * 100).toFixed(2)) ? Number(((difDay / startDay) * 100).toFixed(2)) : 0;
        cur.dataValues.exchanges_rates = undefined;
      }
      if (count) {
        countCyr = await Currency.count();
        if (type == "main") {
          currency.sort((a, b) => {
            const labelA = a.label;
            const labelB = b.label;

            const indexA = currencyMain.findIndex((x) => x.label === labelA);
            const indexB = currencyMain.findIndex((x) => x.label === labelB);

            return indexA - indexB;
          });
        }
        return res.status(200).json({ currency, countCyr });
      }
      return res.status(200).json(currency);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new CurrencyController();
