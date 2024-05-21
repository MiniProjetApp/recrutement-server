import express from "express";
import {userController} from "../controllers/userController.mjs";
import {AuthMiddleware} from "../middleware/authorizationMiddleware.mjs"
const router = express.Router();

router.get("/candidate/get/:id", userController.getCandidateInfo);
router.get("/entreprise/get/:id", userController.getEntrepriseInfo);
router.get("/own_profile",AuthMiddleware.auth, userController.get_own_profile);

router.get("/candidate/search", userController.searchCandidate);
router.get("/entreprise/search", userController.searchEntreprise);

router.put("/candidate/update/:id", userController.updateCandidateProfile);
router.put("/entreprise/update/:id", userController.updateEnterpriseProfile);

router.delete("/user/:userid", userController.deleteUser)

router.post("/picture/add",userController.uploadProfilePicture)

export default router;
