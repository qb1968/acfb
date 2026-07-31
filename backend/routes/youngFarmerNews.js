import express from "express";
import YoungFarmerNews from "../models/YoungFarmerNews.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const news = await YoungFarmerNews.find().sort({
    date: -1,
  });

  res.json(news);
});

router.post("/", async (req, res) => {
  const news = new YoungFarmerNews(req.body);

  await news.save();

  res.json(news);
});

router.put("/:id", async (req, res) => {
  const news = await YoungFarmerNews.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );

  res.json(news);
});

router.delete("/:id", async (req, res) => {
  await YoungFarmerNews.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

export default router;
