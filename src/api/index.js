import express from "express";
import main from "./main.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - Energy Monitoring System",
  });
});

// router.use("/emojis", emojis);

router.use("/main", main);

export default router;
