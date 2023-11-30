import { Router } from "express";
import globalController from "./global.controller.js";

export const globalRouter = new Router();

globalRouter.get("/search", globalController.search);
