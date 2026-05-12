import express from "express";
import mainController from "../controllers/main.controller.js";
import { uploadFile } from "../middlewares.js";

const router = express.Router();

router.post("/", uploadFile, mainController.insert);
router.post("/text", express.text({ type: "text/csv" }), mainController.insertText);

export default router;
