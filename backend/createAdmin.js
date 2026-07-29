import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

    const admin = new User({
      name: "Site Admin",

      email: "admin@acfb.com",

      password: hashedPassword,

      role: "admin",
    });

    await admin.save();

    console.log("Admin created!");

    console.log({
      email: "admin@acfb.com",
      password: "AdminPassword123!",
    });

    process.exit();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

createAdmin();
