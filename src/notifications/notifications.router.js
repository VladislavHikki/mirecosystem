import { Router } from "express";
import notificationsController from "./notifications.controller.js";
import middlewareController from "../middleware/middleware.controller.js";
import multer from "multer";

export const notificationsRouter = new Router();

// Роль
notificationsRouter.get("/get/roles", middlewareController.user, notificationsController.getRoleNotification);
notificationsRouter.delete("/delete/roles", middlewareController.user, notificationsController.deleteRoleNotification);

// Спонсорство
notificationsRouter.get("/get/sponsors", middlewareController.user, notificationsController.getSponsorNotification);
notificationsRouter.delete("/delete/sponsors", middlewareController.user, notificationsController.deleteSponsorNotification);

// Транзакции
notificationsRouter.get("/get/transactions", middlewareController.user, notificationsController.getTransactionsNotification);
notificationsRouter.delete("/delete/transactions", middlewareController.user, notificationsController.deleteTransactionsNotification);

// Чаты
notificationsRouter.get("/get/chats", middlewareController.user, notificationsController.getChatsNotification);
notificationsRouter.delete("/delete/chats", middlewareController.user, multer().none(), notificationsController.deleteChatsNotification);

// Посты
notificationsRouter.get("/get/posts", middlewareController.user, notificationsController.getPostsNotification);
notificationsRouter.delete("/delete/posts", middlewareController.user, notificationsController.deletePostsNotification);
