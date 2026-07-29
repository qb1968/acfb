import express from "express";
import News from "../models/News.js";
import auth from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await News.find());
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const news = new News({
      title: req.body.title,
      content: req.body.content,
      date: new Date(`${req.body.date}T12:00:00`),
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await news.save();

    res.json(news);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// UPDATE NEWS
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      content: req.body.content,
      date: new Date(`${req.body.date}T12:00:00`),
    };

    // Only replace the image if a new one was uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await News.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// DELETE NEWS
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);

    res.json({
      message: "News deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
