import { Op } from "sequelize";
import { Team, User } from "../users/users.model.js";
import { Resource } from "../resources/resources.model.js";
import { validateError } from "../../utils/customValidation.js";
import { Post } from "../posts/posts.model.js";
import { Currency } from "../currency/currency.model.js";
import { Category, Rubric, Subsection } from "../categories/categories.model.js";
import { usersStatuses } from "../../utils/dbQueries.js";

class GlobalController {
  async search(req, res) {
    try {
      const { search } = req.query;
      let data = {};
      if (search) {
        if (search.length < 3) return res.status(500).json("Поиск от трех символов");
        const searchQuery = search.replace(/[()-*@]/g, "");
        [data.profile, data.teams, data.resources, data.blogs, data.currencys, data.category, data.division, data.rubrics] = await Promise.allSettled([
          User.scope("allAttributes").findAll({
            where: {
              [Op.or]: [
                {
                  name: { [Op.substring]: search },
                },
                {
                  email: { [Op.substring]: search },
                },
              ],
              verified: 1,
            },
          }),
          Team.scope("include").findAll({
            where: {
              label: { [Op.substring]: search },
            },
            attributes: { exclude: ["updatedAt", "deletedAt"] },
          }),
          Resource.scope({ method: ["fullSearch", searchQuery] }).findAll(),
          Post.scope("minAttributes", { method: ["fullSearch", searchQuery] }).findAll(),
          Currency.scope("minAttributes").findAll({
            where: {
              label: { [Op.substring]: search },
            },
          }),
          Category.findAll({
            where: {
              label: { [Op.substring]: search },
            },
            attributes: ["id", "label"],
          }),
          Subsection.findAll({
            where: {
              label: { [Op.substring]: search },
            },
            attributes: ["id", "label", "picture"],
          }),
          Rubric.findAll({
            where: {
              label: { [Op.substring]: search },
            },
            attributes: ["id", "label"],
          }),
        ]);
        if (data.profile.value.length > 1) data.profile.value = await usersStatuses(data.profile.value);
      }

      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json(validateError(e));
    }
  }
}

export default new GlobalController();
