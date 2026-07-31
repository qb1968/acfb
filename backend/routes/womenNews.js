import express from "express";
import WomenNews from "../models/WomenNews.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await WomenNews.find().sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  const news = new WomenNews(req.body);

  await news.save();

  res.json(news);
});

router.delete("/:id", async (req, res) => {
  await WomenNews.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

export default router;
