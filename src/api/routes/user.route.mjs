import express from "express";
import {userController} from "../controllers/userController.mjs";

const router = express.Router();

router.get("/candidate/:id", userController.getCandidateInfo);
router.get("/entreprise/:id", userController.getEntrepriseInfo);
router.get("/candidate", userController.searchCandidate)
router.get("/entreprise", userController.searchEntreprise)

export default router;
