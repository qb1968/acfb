import express from "express";
import WomenEvent from "../models/WomenEvent.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await WomenEvent.find());
});

router.post("/", async (req, res) => {
  const event = new WomenEvent(req.body);

  await event.save();

  res.json(event);
});

router.delete("/:id", async (req, res) => {
  await WomenEvent.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

export default router;
