import express from "express";
import {userController} from "../controllers/userController.mjs";

const router = express.Router();

router.get("/candidate/get/:id", userController.getCandidateInfo);
router.get("/entreprise/get/:id", userController.getEntrepriseInfo);

router.get("/candidate/search", userController.searchCandidate);
router.get("/entreprise/search", userController.searchEntreprise);

router.put("/candidate/update/:id", userController.updateCandidateProfile);
router.put("/entreprise/update/:id", userController.updateEnterpriseProfile);


export default router;
