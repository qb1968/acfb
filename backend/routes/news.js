import express from "express";
import News from "../models/News.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await News.find());
});

router.post("/", auth, async (req, res) => {
  const news = new News(req.body);
  await news.save();
  res.json(news);
});

export default router;
