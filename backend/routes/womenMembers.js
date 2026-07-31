import express from "express";
import WomenMember from "../models/WomenMember.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const members = await WomenMember.find();

  res.json(members);
});

router.post("/", async (req, res) => {
  const member = new WomenMember(req.body);

  await member.save();

  res.json(member);
});

router.put("/:id", async (req, res) => {
  const member = await WomenMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(member);
});

router.delete("/:id", async (req, res) => {
  await WomenMember.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

export default router;
