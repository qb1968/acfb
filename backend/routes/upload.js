import express from "express";
import Gallery from "../models/Gallery.js";
import auth from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Gallery.find());
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  const newImage = new Gallery({
    imageUrl: `/uploads/${req.file.filename}`,
    caption: req.body.caption,
  });

  await newImage.save();
  res.json(newImage);
});

export default router;
