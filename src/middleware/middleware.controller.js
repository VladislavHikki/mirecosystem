import jwt from "jsonwebtoken";
import { SECRET } from "../../index.js";
import { User } from "../users/users.model.js";
import idempotency from "express-idempotency";
import { isUuid } from "uuidv4";
import { usersStatuses } from "../../utils/dbQueries.js";

class middlewareController {
  async user(req, res, next) {
    try {
      const auth = req.headers["authorization"];
      const token = auth && auth.split(" ")[1];

      if (token == null) return res.status(401).end();

      jwt.verify(token, SECRET, async (err, user) => {
        if (err) return res.status(403).end();

        let authorized = await User.scope("country").findByPk(user.id);
        if (!authorized) return res.status(403).end();

        const roles = await authorized.getRoles({ joinTableAttributes: [] });
        authorized.dataValues.roles = roles;

        [authorized] = await usersStatuses([authorized]);

        req.user = authorized;
        return next();
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }
  async userData(req, res, next) {
    try {
      const auth = req.headers["authorization"];
      const token = auth && auth.split(" ")[1];

      if (token == null) return next();

      jwt.verify(token, SECRET, async (err, user) => {
        if (err) return next();

        let authorized = await User.findByPk(user.id);
        if (!authorized) return next();

        const roles = await authorized.getRoles({ joinTableAttributes: [] });
        authorized.dataValues.roles = roles;

        [authorized] = await usersStatuses([authorized]);

        req.user = authorized;
        return next();
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }
  async admin(req, res, next) {
    try {
      const auth = req.headers["authorization"];
      const token = auth && auth.split(" ")[1];

      if (token == null) return res.status(401).end();

      jwt.verify(token, SECRET, async (err, user) => {
        if (err) return res.status(403).end();

        let authorized = await User.findByPk(user.id);
        if (!authorized) return res.status(403).end();

        const roles = await authorized.getRoles({ joinTableAttributes: [] });
        authorized.dataValues.roles = roles;

        [authorized] = await usersStatuses([authorized]);

        if (!roles.map((x) => x.accessLevel).includes(1)) return res.status(403).end();
        req.user = authorized;
        return next();
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }
  idempotent(req, res, next) {
    try {
      if (!req.headers["idempotency-key"]) return res.status(400).json({ key: "Idempotency-Key", msg: "Не передан ключ идемпотентности." });
      if (!isUuid(req.headers["idempotency-key"].substr(6))) return res.status(400).json({ key: "Idempotency-Key", msg: "Неверный ключ." });
      const idempotencyService = idempotency.getSharedIdempotencyService();
      if (idempotencyService.isHit(req)) {
      } else return next();
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }
}

export default new middlewareController();
