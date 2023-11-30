import { Router } from "express";
import multer from "multer";
import mailController from "./mail.controller.js";

export const mailRouter = new Router();

mailRouter.post("/regcontinue", multer().none(), mailController.continuedRegistration);
mailRouter.post("/resetpass", multer().none(), mailController.resetPassword);
mailRouter.get("/resurl/:resetURL", mailController.getReset);
mailRouter.put("/updatepass/:resetURL", multer().none(), mailController.updatePass);
