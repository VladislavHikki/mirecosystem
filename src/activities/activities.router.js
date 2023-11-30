import { Router } from "express";
import activitiesController from "./activities.controller.js";
import middlewareController from "../middleware/middleware.controller.js";
import multer from "multer";

export const activitiesRouter = new Router();

activitiesRouter.post("/create/:type/:id", middlewareController.user, multer().none(), activitiesController.createComment);
activitiesRouter.post("/like/:type/:id", middlewareController.user, multer().none(), activitiesController.createLike);
activitiesRouter.put("/edit/:id", middlewareController.user, multer().none(), activitiesController.editComment);
activitiesRouter.delete("/delete/:id", middlewareController.user, activitiesController.deleteComment);

activitiesRouter.get("/comments/:type/:id/:page", middlewareController.userData, activitiesController.getComments);
