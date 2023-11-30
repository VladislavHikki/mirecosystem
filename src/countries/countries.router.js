import { Router } from "express";
import multer from "multer";
import countriesController from "./countries.controller.js";
import middlewareController from "../middleware/middleware.controller.js";

export const countriesRouter = new Router();

// countriesRouter.get('/all', countriesController.getAll)
countriesRouter.get("/", countriesController.getCountries);
countriesRouter.get("/regions/:id", countriesController.getRegions);
countriesRouter.get("/cities/:id", countriesController.getCities);
countriesRouter.post("/country/create", middlewareController.admin, multer().none(), countriesController.createCountry);
countriesRouter.post("/region/create", middlewareController.admin, multer().none(), countriesController.createRegion);
countriesRouter.post("/city/create", middlewareController.admin, multer().none(), countriesController.createCity);

countriesRouter.put("/country/:id", middlewareController.admin, multer().none(), countriesController.updateCountry);
countriesRouter.put("/region/:id", middlewareController.admin, multer().none(), countriesController.updateRegion);
countriesRouter.put("/city/:id", middlewareController.admin, multer().none(), countriesController.updateCity);

countriesRouter.delete("/country", middlewareController.admin, multer().none(), countriesController.deleteCountry);
countriesRouter.delete("/region", middlewareController.admin, multer().none(), countriesController.deleteRegion);
countriesRouter.delete("/city", middlewareController.admin, multer().none(), countriesController.deleteCity);

// Добавление из excel файла
countriesRouter.post("/excel", middlewareController.admin, multer().single("file"), countriesController.excelCountry);
