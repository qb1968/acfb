import express from "express";
import multer from "multer";

import YoungFarmerEvent from "../models/YoungFarmerEvent.js";

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
// GET ALL EVENTS
// ============================

router.get("/", async (req, res) => {
  try {
    const events = await YoungFarmerEvent.find()

      .sort({
        date: 1,
      });

    res.json(events);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================
// CREATE EVENT
// ============================

router.post(
  "/",

  upload.single("image"),

  async (req, res) => {
    try {
      const event = await YoungFarmerEvent.create({
        title: req.body.title,

        date: req.body.date,

        location: req.body.location,

        description: req.body.description,

        image: req.file ? `/uploads/${req.file.filename}` : "",
      });

      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// ============================
// UPDATE EVENT
// ============================

router.put(
  "/:id",

  upload.single("image"),

  async (req, res) => {
    try {
      const update = {
        title: req.body.title,

        date: req.body.date,

        location: req.body.location,

        description: req.body.description,
      };

      // update image only if new image selected

      if (req.file) {
        update.image = `/uploads/${req.file.filename}`;
      }

      const event = await YoungFarmerEvent.findByIdAndUpdate(
        req.params.id,

        update,

        {
          new: true,
        },
      );

      res.json(event);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// ============================
// DELETE EVENT
// ============================

router.delete(
  "/:id",

  async (req, res) => {
    try {
      await YoungFarmerEvent.findByIdAndDelete(req.params.id);

      res.json({
        message: "Young Farmer event deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

export default router;
