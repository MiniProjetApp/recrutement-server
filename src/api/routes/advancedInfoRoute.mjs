import express from "express";
import {advancedInfoController} from "../controllers/advancedInfoController.mjs";
import { SubscriptionController } from "../controllers/subscriptionController.mjs";

const router = express.Router();

// search for formations of a certain user using user ID
router.get("/advancedInfo/formation/:userid", advancedInfoController.getAllFormations);
// delete a specific formation from a user's profile
router.delete("/advancedInfo/formation/delete/:ID", advancedInfoController.deleteFormation);
// create a new formation
router.post("/advancedInfo/formation/create", advancedInfoController.createFormation);


// // search for education of a certain user using user ID
router.get("/advancedInfo/education/:userid", advancedInfoController.getAllEducation);

// // delete a specific education from a user's profile:
router.delete("/advancedInfo/education/delete/:educationID", advancedInfoController.deleteEducation);

// // create a new education
router.post("/advancedInfo/education/create", advancedInfoController.createEducation);


// // search for experience of a certain user using user ID
router.get("/advancedInfo/experience/:userid", advancedInfoController.getAllExperiences);

// // delete a specific experience from a user's profile
router.delete("/advancedInfo/experience/delete/:experienceID", advancedInfoController.deleteExperience);

// // create a new experience
router.post("/advancedInfo/experience/create", advancedInfoController.createExperience);

// Modify languages in a user profile
router.put("/advancedInfo/languages/:userid", advancedInfoController.updateLanguages);

// Modify advanced criteria in a user profile
router.put("/advancedInfo/criteria/:userid", advancedInfoController.updateAdvancedCriteria);
export default router;

router.post("/subscription/new",SubscriptionController.createSubscription)
