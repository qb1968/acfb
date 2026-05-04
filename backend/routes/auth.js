import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

// Register (run once)
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const admin = new Admin({ email: req.body.email, password: hashed });
  await admin.save();
  res.json(admin);
});

// Login
router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).json("User not found");

  const valid = await bcrypt.compare(req.body.password, admin.password);
  if (!valid) return res.status(400).json("Invalid password");

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
