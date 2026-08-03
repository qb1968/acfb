import express from "express";
import WomenNews from "../models/WomenNews.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET WOMEN NEWS

router.get("/", async (req, res) => {
  try {
    const news = await WomenNews.find().sort({
      createdAt: -1,
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// CREATE WOMEN NEWS WITH IMAGE

router.post(
  "/",

  upload.single("image"),

  async (req, res) => {
    try {
      const news = new WomenNews({
        title: req.body.title,

        content: req.body.content,

        image: req.file ? req.file.path : "",
      });

      await news.save();

      res.json(news);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// UPDATE WOMEN NEWS

router.put(
  "/:id",

  upload.single("image"),

  async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,

        content: req.body.content,
      };

      // replace image only if new upload

      if (req.file) {
        updateData.image = req.file.path;
      }

      const updated = await WomenNews.findByIdAndUpdate(
        req.params.id,

        updateData,

        {
          new: true,
        },
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// DELETE WOMEN NEWS

router.delete(
  "/:id",

  async (req, res) => {
    try {
      await WomenNews.findByIdAndDelete(req.params.id);

      res.json({
        message: "Women news deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

export default router;
