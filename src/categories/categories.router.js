import { Router } from "express";
import categoriesController from "./categories.controller.js";
import multer from "multer";
import middlewareController from "../middleware/middleware.controller.js";
import { uploadFranPic, uploadProjPic, uploadSubsecPic, uploadTeamPic, uploadTriad } from "../../utils/uploader.js";

export const categoriesRouter = new Router();

// Категории
// categoriesRouter.get("/list/cata", categoriesController.getResourcesByCategory);
categoriesRouter.get("/main", categoriesController.main);
categoriesRouter.get("/cata/:page", categoriesController.getCategories);
categoriesRouter.get("/list", categoriesController.categoriesList);
categoriesRouter.post("/create/cata", middlewareController.admin, multer().none(), categoriesController.createCategory);
categoriesRouter.put("/update/cata/:id", middlewareController.admin, multer().none(), categoriesController.updateCategory);
categoriesRouter.put("/restore/cata", middlewareController.admin, multer().none(), categoriesController.restoreCategory);
categoriesRouter.delete("/delete/cata", middlewareController.admin, multer().none(), categoriesController.deleteCategory);

// Франшизы
categoriesRouter.get("/fran/:page", categoriesController.getFranchises);
categoriesRouter.get("/lastfran", categoriesController.getLastFranchises);
categoriesRouter.get("/onefran/:id/:page", categoriesController.getOneFranchise);
categoriesRouter.post("/create/fran", middlewareController.admin, uploadFranPic.single("file"), categoriesController.createFranchise);
categoriesRouter.put("/update/fran/:id", middlewareController.admin, uploadFranPic.single("file"), categoriesController.updateFranchise);
categoriesRouter.put("/restore/fran", middlewareController.admin, multer().none(), categoriesController.restoreFranchise);
categoriesRouter.delete("/delete/fran", middlewareController.admin, multer().none(), categoriesController.deleteFranchise);

// Проекты
categoriesRouter.get("/proj/:page", categoriesController.getProjects);
categoriesRouter.get("/oneproj/:id/:page", categoriesController.getOneProject);
categoriesRouter.post("/create/proj", middlewareController.admin, uploadProjPic.single("file"), categoriesController.createProject);
categoriesRouter.put("/update/proj/:id", middlewareController.admin, uploadProjPic.single("file"), categoriesController.updateProject);
categoriesRouter.put("/restore/proj", middlewareController.admin, multer().none(), categoriesController.restoreProject);
categoriesRouter.delete("/delete/proj", middlewareController.admin, multer().none(), categoriesController.deleteProject);

// Подкатегории
categoriesRouter.get("/subcat/page/:page", categoriesController.getSubcategories);
categoriesRouter.get("/onesubcat/:id", categoriesController.getOneSubcategory);
categoriesRouter.get("/subcat/cata", categoriesController.getCategoriesBySubcategory);
categoriesRouter.get("/subcat/list", categoriesController.getListSubcategories);
categoriesRouter.post("/create/subcat", middlewareController.admin, multer().none(), categoriesController.createSubcategory);
categoriesRouter.put("/update/subcat/:id", middlewareController.admin, multer().none(), categoriesController.updateSubcategory);
categoriesRouter.put("/restore/subcat", middlewareController.admin, multer().none(), categoriesController.restoreSubcategory);
categoriesRouter.delete("/delete/subcat", middlewareController.admin, multer().none(), categoriesController.deleteSubcategory);

// Дивизионы
categoriesRouter.get("/subs/lastsubs", categoriesController.getLastSubsections);
categoriesRouter.get("/subs/list", categoriesController.getListSubsections);
categoriesRouter.get("/subs/:page", categoriesController.getSubsections);
categoriesRouter.get("/subs/one/:id", categoriesController.getOneSubsection);
categoriesRouter.post("/create/subs", middlewareController.admin, uploadSubsecPic.single("file"), categoriesController.createSubsection);
categoriesRouter.put("/update/subs/:id", middlewareController.admin, uploadSubsecPic.single("file"), categoriesController.updateSubsection);
categoriesRouter.delete("/delete/subs", middlewareController.admin, multer().none(), categoriesController.deleteSubsection);

// Охват
categoriesRouter.get("/cova/list", categoriesController.getListCoverage);
categoriesRouter.get("/cova/:page", categoriesController.getСoverage);
categoriesRouter.post("/create/cova", middlewareController.admin, multer().none(), categoriesController.createCoverage);
categoriesRouter.put("/update/cova/:id", middlewareController.admin, multer().none(), categoriesController.updateCoverage);
categoriesRouter.put("/restore/cova", middlewareController.admin, multer().none(), categoriesController.restoreCoverage);
categoriesRouter.delete("/delete/cova", middlewareController.admin, multer().none(), categoriesController.deleteCoverage);

// Ссылки
categoriesRouter.get("/links/all", categoriesController.getAllLinks);
categoriesRouter.post("/create/link", middlewareController.admin, multer().none(), categoriesController.createLink);
categoriesRouter.put("/update/link/:id", middlewareController.admin, multer().none(), categoriesController.updateLink);
categoriesRouter.delete("/delete/link/:id", middlewareController.admin, multer().none(), categoriesController.deleteLink);

// Рубрики
categoriesRouter.get("/rubrics/all/:page", categoriesController.getAllRubrics);
categoriesRouter.post("/create/rubric", middlewareController.admin, multer().none(), categoriesController.createRubric);
categoriesRouter.put("/update/rubric/:id", middlewareController.admin, multer().none(), categoriesController.updateRubric);
categoriesRouter.delete("/delete/rubric/:id", middlewareController.admin, multer().none(), categoriesController.deleteRubric);

// Триады
categoriesRouter.get("/triads/all/:page", categoriesController.getAllTriads);
categoriesRouter.get("/triads/one/:id", categoriesController.getOneTriads);
categoriesRouter.post("/triads/create", middlewareController.admin, uploadTriad.single("file"), categoriesController.createTriads);
categoriesRouter.put("/triads/update/:id", middlewareController.admin, uploadTriad.single("file"), categoriesController.updateTriads);
categoriesRouter.delete("/triads/delete/:id", middlewareController.admin, categoriesController.deleteTriads);
