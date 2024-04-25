import {DocumentsController} from "../controllers/documentsController.mjs"
import express from "express"

const router = express.Router();

router.post("/documents/new",DocumentsController.newDocuments)
// router.get("/documents/:userid",DocumentsController.getDocuments)

export default router