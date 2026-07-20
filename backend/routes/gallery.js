import express from "express";
import Gallery from "../models/Gallery.js";
import { upload } from "../middleware/upload.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// GET IMAGES
router.get("/", async (req, res) => {
  const images = await Gallery.find().sort({
    createdAt: -1,
  });

  res.json(images);
});

// UPLOAD IMAGE
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const image = new Gallery({
      image: `/uploads/${req.file.filename}`,
    });

    await image.save();

    res.json(image);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// DELETE IMAGE
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Remove image file from uploads folder
    const filePath = path.join(process.cwd(), image.image.replace(/^\//, ""));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove MongoDB document
    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted successfully" });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
