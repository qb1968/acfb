import express from "express";
import Gallery from "../models/Gallery.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// ==========================
// GET IMAGES
// ==========================

router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({
      createdAt: -1,
    });

    res.json(images);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ==========================
// UPLOAD IMAGE
// ==========================

router.post(
  "/",

  upload.single("image"),

  async (req, res) => {
    try {
      const image = new Gallery({
        image: req.file ? req.file.path : "",
      });

      await image.save();

      res.json(image);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// ==========================
// DELETE IMAGE
// ==========================

router.delete(
  "/:id",

  async (req, res) => {
    try {
      const image = await Gallery.findById(req.params.id);

      if (!image) {
        return res.status(404).json({
          message: "Image not found",
        });
      }

      // Delete MongoDB record

      await Gallery.findByIdAndDelete(req.params.id);

      res.json({
        message: "Image deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

export default router;
