import { Op, Sequelize } from "sequelize";
import dbTogether from "../../db/db.js";
import { Letter } from "./letters.model.js";

class lettersController {
  async getLetters(req, res) {
    try {
      const { page } = req.params;
      const { deleted } = req.query;
      const letters = await Letter.findAndCountAll({
        limit: 25,
        order: [["username", "ASC"]],
        offset: 25 * (Number(page ? page : 1) - 1),
        paranoid: deleted ? false : true,
      });
      const pages = Math.ceil(letters.count / 25);
      return res.status(200).json({ pages, letters });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async createLetter(req, res) {
    try {
      const { username, whatsapp, url, message } = req.body;
      const created = await Letter.create({
        username,
        whatsapp,
        url,
        message,
      });
      if (!created) return res.status(400).end();
      return res.status(201).end();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e.message);
    }
  }
  async deleteletter(req, res) {
    try {
      const { ids } = req.body;
      const deleted = Letter.destroy({
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
}

export default new lettersController();
