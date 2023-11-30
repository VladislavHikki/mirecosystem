import { Router } from "express";
import lettersController from "./letters.controller.js";
import multer from "multer";
import middlewareController from "../middleware/middleware.controller.js";

export const lettersRouter = new Router();

lettersRouter.get("/:page", lettersController.getLetters);
lettersRouter.post("/create", multer().none(), lettersController.createLetter);

lettersRouter.delete("/delete", middlewareController.admin, multer().none(), lettersController.deleteletter);
