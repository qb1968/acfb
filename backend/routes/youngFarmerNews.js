import express from "express";

import YoungFarmerNews from "../models/YoungFarmerNews.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// ============================
// GET ALL NEWS
// ============================

router.get("/", async (req, res) => {
  try {
    const news = await YoungFarmerNews.find().sort({
      createdAt: -1,
    });

    res.json(news);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================
// CREATE NEWS WITH IMAGE
// ============================

router.post(
  "/",

  upload.single("image"),

  async (req, res) => {
    try {
      const news = await YoungFarmerNews.create({
        title: req.body.title,

        description: req.body.description,

        // CLOUDINARY IMAGE URL

        image: req.file ? req.file.path : "",
      });

      res.status(201).json(news);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// ============================
// UPDATE NEWS WITH IMAGE
// ============================

router.put(
  "/:id",

  upload.single("image"),

  async (req, res) => {
    try {
      const update = {
        title: req.body.title,

        description: req.body.description,
      };

      // Only update image if new file uploaded

      if (req.file) {
        update.image = req.file.path;
      }

      const news = await YoungFarmerNews.findByIdAndUpdate(
        req.params.id,

        update,

        {
          new: true,
        },
      );

      res.json(news);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// ============================
// DELETE NEWS
// ============================

router.delete(
  "/:id",

  async (req, res) => {
    try {
      await YoungFarmerNews.findByIdAndDelete(req.params.id);

      res.json({
        message: "Young Farmer news deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

export default router;
