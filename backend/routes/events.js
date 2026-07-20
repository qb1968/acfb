import express from "express";
import Event from "../models/Event.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET EVENTS
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// CREATE EVENT
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,

      description: req.body.description,

      date: req.body.date,

      location: req.body.location,

      startTime: req.body.startTime,

      endTime: req.body.endTime,

      category: req.body.category,

      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// UPDATE EVENT
router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE EVENT
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      message: "Event deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
