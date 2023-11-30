import { Router } from "express";
import middlewareController from "../middleware/middleware.controller.js";
import chatsController from "./chats.controller.js";
import multer from "multer";

export const chatsRouter = new Router();

chatsRouter.get("/messages/:id/:page", middlewareController.user, chatsController.getMessages);
chatsRouter.get("/newmessages", middlewareController.user, chatsController.getNewMessages);
chatsRouter.get("/", middlewareController.user, chatsController.getChats);
chatsRouter.get("/searchusers/:page", middlewareController.user, chatsController.searchUsers);
chatsRouter.get("/byprofile/:userId", middlewareController.user, chatsController.getChatByProfile);

chatsRouter.post("/create", middlewareController.user, multer().none(), chatsController.createChat);
chatsRouter.post("/send", middlewareController.user, multer().none(), chatsController.createMessage);

chatsRouter.put("/message/:id", middlewareController.user, multer().none(), chatsController.updateMessage);

chatsRouter.delete("/message", middlewareController.user, multer().none(), chatsController.deleteMessage);
