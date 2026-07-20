import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// GET EVENTS
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);

    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
