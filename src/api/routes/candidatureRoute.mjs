import express from "express"
import {candidatureController} from "../controllers/candidatureController.mjs"

const route = express.Router();

route.post("/candidature/new", candidatureController.new)

export default route