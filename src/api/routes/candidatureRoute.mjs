import express from "express"
import {candidatureController} from "../controllers/candidatureController.mjs"

const route = express.Router();

route.post("/candidature/new", candidatureController.new)
route.get("/candidature/:id", candidatureController.getCandidatures)

export default route