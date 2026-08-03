import express from "express";

import YoungFarmerEvent from "../models/YoungFarmerEvent.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();

// ============================
// GET ALL EVENTS
// ============================

router.get("/", async (req, res) => {
  try {
    const events = await YoungFarmerEvent.find().sort({
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

        // CLOUDINARY URL

        image: req.file ? req.file.path : "",
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

      // Only replace image when a new one is uploaded

      if (req.file) {
        update.image = req.file.path;
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
