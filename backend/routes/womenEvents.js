import express from "express";
import WomenEvent from "../models/WomenEvent.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// --------------------------------------------------
// GET WOMEN EVENTS
// --------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const events = await WomenEvent.find().sort({
      date: 1,
    });

    res.json(events);
  } catch (err) {
    console.error("Women events GET error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// --------------------------------------------------
// CREATE WOMEN EVENT
// --------------------------------------------------

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const event = new WomenEvent({
      title: req.body.title || "",

      description: req.body.description || "",

      // IMPORTANT:
      // Save exactly YYYY-MM-DD.
      date: String(req.body.date || "").substring(0, 10),

      startTime: req.body.startTime || "",

      endTime: req.body.endTime || "",

      location: req.body.location || "",

      category: req.body.category || "Meeting",

      image: req.file ? req.file.path : "",
    });

    await event.save();

    res.status(201).json(event);
  } catch (err) {
    console.error("Women event CREATE error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// --------------------------------------------------
// UPDATE WOMEN EVENT
// --------------------------------------------------

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title || "",

      description: req.body.description || "",

      // IMPORTANT:
      // Save exactly YYYY-MM-DD.
      date: String(req.body.date || "").substring(0, 10),

      startTime: req.body.startTime || "",

      endTime: req.body.endTime || "",

      location: req.body.location || "",

      category: req.body.category || "Meeting",
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await WomenEvent.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Women event not found",
      });
    }

    res.json(updated);
  } catch (err) {
    console.error("Women event UPDATE error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// --------------------------------------------------
// DELETE WOMEN EVENT
// --------------------------------------------------

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await WomenEvent.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Women event not found",
      });
    }

    res.json({
      message: "Women event deleted",
    });
  } catch (err) {
    console.error("Women event DELETE error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
