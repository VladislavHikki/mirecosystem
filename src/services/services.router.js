import { Router } from "express";
import servicesController from "./services.controller.js";
import middlewareController from "../middleware/middleware.controller.js";
import { uploadService } from "../../utils/uploader.js";
import multer from "multer";

export const servicesRouter = new Router();

// Сервисы
servicesRouter.get("/page/:page", servicesController.getAllServices);
servicesRouter.get("/type", middlewareController.userData, servicesController.getServicesByType);
servicesRouter.post("/create", middlewareController.admin, uploadService.single("file"), servicesController.createService);
servicesRouter.put("/update/:id", middlewareController.admin, uploadService.single("file"), servicesController.updateService);
servicesRouter.delete("/delete/:id", middlewareController.admin, multer().none(), servicesController.deleteService);

// Типы сервисов
servicesRouter.get("/type/:page", servicesController.getServicesTypes);
servicesRouter.post("/create/type", middlewareController.admin, multer().none(), servicesController.createType);
servicesRouter.put("/type/update/:id", middlewareController.admin, uploadService.single("file"), servicesController.updateType);
servicesRouter.delete("/type/delete/:id", middlewareController.admin, multer().none(), servicesController.deleteType);

// Избранное
servicesRouter.get("/save", middlewareController.user, servicesController.getSavesServices);
servicesRouter.post("/save", middlewareController.user, multer().none(), servicesController.saveService);
