import express from "express";
import {PostController} from "../controllers/postController.mjs";
import{AuthMiddleware} from "../middleware/authorizationMiddleware.mjs"

const router = express.Router();

router.post("/post/create",PostController.create);
router.get("/post/all", PostController.findAll);
router.get("/post/get/:id",PostController.getPostInfo)
router.get("/post/search",PostController.searchPosts)
router.delete("/post/delete/:id",PostController.deletePostByID)

export default router;
