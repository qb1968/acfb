import express from "express";
import Event from "../models/Event.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Event.find());
});

router.post("/", auth, async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

router.delete("/:id", auth, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;
