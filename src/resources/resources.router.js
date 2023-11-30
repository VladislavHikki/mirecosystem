import { Router } from "express";
import { uploadResourcePic } from "../../utils/uploader.js";
import resourcesController from "./resources.controller.js";
import middlewareController from "../middleware/middleware.controller.js";
import multer from "multer";

export const resourcesRouter = new Router();

resourcesRouter.get("/by/category/:id/:page", resourcesController.getResourceByCategory);
resourcesRouter.get("/by/subcategory/:id/:page", resourcesController.getResourcesBySubcategory);
resourcesRouter.get("/by/location/:type/:id/:page", resourcesController.getResourcesByLocation);
resourcesRouter.get("/restypes", resourcesController.getResTypes);
resourcesRouter.get("/page/:page", resourcesController.getResources);
resourcesRouter.get("/all", resourcesController.getAllResources);
resourcesRouter.get("/one/:id/:page", resourcesController.getOneResource);
resourcesRouter.get("/lastresources", resourcesController.lastResources);
resourcesRouter.get("/getFranChats/:id/:page", resourcesController.getFranChats);
resourcesRouter.get("/getFranChannels/:id/:page", resourcesController.getFranChannels);
resourcesRouter.get("/getTeamResources/:id/:page", resourcesController.getTeamResources);
resourcesRouter.get("/cityres/:page", resourcesController.getResourcesCity);
resourcesRouter.get("/stats", resourcesController.getStat);
resourcesRouter.get("/search/:page", resourcesController.search);
resourcesRouter.post("/create", middlewareController.user, uploadResourcePic.single("file"), resourcesController.createResource);

resourcesRouter.put("/update/:id", middlewareController.user, uploadResourcePic.single("file"), resourcesController.updateResource);

resourcesRouter.delete("/delete", middlewareController.user, multer().none(), resourcesController.deleteResources);
resourcesRouter.put("/restore", middlewareController.user, multer().none(), resourcesController.restoreResources);

resourcesRouter.get("/national/:page", resourcesController.getNationalCat);
