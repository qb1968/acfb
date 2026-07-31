import express from "express";
import YoungFarmer from "../models/YoungFarmer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const members = await YoungFarmer.find().sort({
    order: 1,
  });

  res.json(members);
});

router.post("/", async (req, res) => {
  const member = new YoungFarmer(req.body);

  await member.save();

  res.json(member);
});

router.put("/:id", async (req, res) => {
  const updated = await YoungFarmer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await YoungFarmer.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

export default router;
