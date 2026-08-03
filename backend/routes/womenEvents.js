import express from "express";
import WomenEvent from "../models/WomenEvent.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET WOMEN EVENTS

router.get("/", async (req, res) => {
  try {
    const events = await WomenEvent.find().sort({
      date: 1,
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// CREATE WOMEN EVENT WITH IMAGE

router.post(
  "/",
  upload.single("image"),

  async (req, res) => {
    try {
      const event = new WomenEvent({
        title: req.body.title,

        date: req.body.date,

        location: req.body.location,

        description: req.body.description,

        // CLOUDINARY IMAGE URL

        image: req.file ? req.file.path : "",
      });

      await event.save();

      res.json(event);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

// UPDATE WOMEN EVENT

router.put(
  "/:id",

  upload.single("image"),

  async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,

        date: req.body.date,

        location: req.body.location,

        description: req.body.description,
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const updated = await WomenEvent.findByIdAndUpdate(
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

// DELETE WOMEN EVENT

router.delete(
  "/:id",

  async (req, res) => {
    try {
      await WomenEvent.findByIdAndDelete(req.params.id);

      res.json({
        message: "Women event deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
);

export default router;
