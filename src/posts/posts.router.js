import { Router } from "express";
import postsController from "./posts.controller.js";
import middlewareController from "../middleware/middleware.controller.js";
import { uploadAttachment } from "../../utils/uploader.js";
import multer from "multer";

const attUpl = (req, res, next) => {
  const upl = uploadAttachment.fields([
    { name: "attachments", maxCount: 10 },
    { name: "preview", maxCount: 1 },
  ]);

  upl(req, res, (err) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    next();
  });
};

export const postsRouter = new Router();

postsRouter.get("/all/:page", postsController.getAllPosts);
postsRouter.get("/one/:id", middlewareController.userData, postsController.getOnePost);
postsRouter.post("/create", middlewareController.admin, attUpl, postsController.createPost);
postsRouter.put("/edit/:id", middlewareController.admin, attUpl, postsController.editPost);
postsRouter.delete("/delete/:id", middlewareController.admin, postsController.deletePost);
postsRouter.get("/popular", postsController.getPopPosts);
