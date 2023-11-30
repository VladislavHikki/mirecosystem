import { Router } from "express";
import middlewareController from "../middleware/middleware.controller.js";
import currencyController from "./currency.controller.js";
import { uploadCurrency } from "../../utils/uploader.js";

export const currencyRouter = new Router();

const curUpl = (req, res, next) => {
  const upl = uploadCurrency.single("file");

  upl(req, res, (err) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    next();
  });
};

currencyRouter.post("/create", middlewareController.admin, curUpl, currencyController.create);
currencyRouter.put("/edit/:id", middlewareController.admin, curUpl, currencyController.edit);
currencyRouter.delete("/delete/:id", middlewareController.admin, currencyController.delete);

currencyRouter.get("/all", currencyController.getCurrencys);
