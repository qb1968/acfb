import express from "express";
import YoungFarmerEvent from "../models/YoungFarmerEvent.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await YoungFarmerEvent.find().sort({
    date: 1,
  });

  res.json(events);
});

router.post("/", async (req, res) => {
  const event = new YoungFarmerEvent(req.body);

  await event.save();

  res.json(event);
});

router.put("/:id", async (req, res) => {
  const event = await YoungFarmerEvent.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );

  res.json(event);
});

router.delete("/:id", async (req, res) => {
  await YoungFarmerEvent.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

export default router;
