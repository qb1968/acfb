import express from "express";
import multer from "multer";

import YoungFarmerNews from "../models/YoungFarmerNews.js";

const router = express.Router();

// ============================
// MULTER IMAGE UPLOAD
// ============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ============================
// GET ALL NEWS
// ============================

router.get("/", async (req, res) => {
  try {
    const news = await YoungFarmerNews.find()

      .sort({
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

        image: req.file ? `/uploads/${req.file.filename}` : "",
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

      // only replace image if new one uploaded

      if (req.file) {
        update.image = `/uploads/${req.file.filename}`;
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
