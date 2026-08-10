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

      // Store exactly YYYY-MM-DD
      date: String(req.body.date).substring(0, 10),

      location: req.body.location,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      category: req.body.category,

      image: req.file ? req.file.path : "",
    });

    await event.save();

    res.json(event);
  } catch (err) {
    console.error("CREATE EVENT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// UPDATE EVENT
// UPDATE EVENT
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      description: req.body.description,

      // Store exactly YYYY-MM-DD
      date: String(req.body.date).substring(0, 10),

      location: req.body.location,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      category: req.body.category,
    };

    if (req.file) {
      update.image = req.file.path;
    }

    const updated = await Event.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE EVENT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
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
