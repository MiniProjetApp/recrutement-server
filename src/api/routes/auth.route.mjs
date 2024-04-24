import express from "express";
import { AuthController } from "../controllers/auth.controller.mjs";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/test", AuthController.test);

export default router;
