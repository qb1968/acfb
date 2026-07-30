import express from "express";
import Officer from "../models/Officer.js";

const router = express.Router();

// GET ALL OFFICERS

router.get("/", async (req, res) => {
  try {
    const officers = await Officer.find().sort({
      type: 1,
      name: 1,
    });

    res.json(officers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// CREATE

router.post("/", async (req, res) => {
  try {
    const officer = new Officer(req.body);

    await officer.save();

    res.json(officer);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// UPDATE

router.put("/:id", async (req, res) => {
  try {
    const officer = await Officer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(officer);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  await Officer.findByIdAndDelete(req.params.id);

  res.json({
    message: "Officer deleted",
  });
});

export default router;
