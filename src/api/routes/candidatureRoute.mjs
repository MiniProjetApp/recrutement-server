import express from "express"
import {candidatureController} from "../controllers/candidatureController.mjs"

const route = express.Router();

route.post("/candidature/new", candidatureController.new)
route.get("/candidature/user/:id", candidatureController.getCandidatures)
route.get('/candidature/post/:postID', candidatureController.getCandidaturesByPostID);
route.delete("/candidature/delete", candidatureController.deleteCandidatureByUserIDAndPostID); 
export default route