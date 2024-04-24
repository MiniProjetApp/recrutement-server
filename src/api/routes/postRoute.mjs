import express from "express";
import {PostController} from "../controllers/postController.mjs";
import{AuthMiddleware} from "../middleware/authorizationMiddleware.mjs"

const router = express.Router();

router.post("/post/create", AuthMiddleware.auth, AuthMiddleware.isEntreprise);
router.get("/post/all", AuthMiddleware.auth, AuthMiddleware.isEntreprise, PostController.findAll);


export default router;
