import { Router } from "express";
import middlewareController from "../middleware/middleware.controller.js";
import profilesController from "./profiles.controller.js";
import { uploadAttachment } from "../../utils/uploader.js";

export const profilesRouter = new Router();

const profileUpl = (req, res, next) => {
  const upl = uploadAttachment.fields([
    { name: "media", maxCount: 8 },
    { name: "familyImg", maxCount: 10 },
    { name: "petsImg", maxCount: 8 },
    { name: "transportImg", maxCount: 8 },
    { name: "idolsImg", maxCount: 8 },
  ]);

  upl(req, res, (err) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    next();
  });
};

profilesRouter.post("/create", middlewareController.user, profileUpl, profilesController.createProfile);
