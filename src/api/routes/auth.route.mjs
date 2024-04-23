import multer from "multer";
import express from "express";

const upload = multer();

import { AuthController } from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/register", upload.none(), AuthController.register);
router.post("/login", upload.none(), AuthController.login);
router.get("/test", AuthController.test);

export default router;
