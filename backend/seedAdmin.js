import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "./models/Admin.js";

await mongoose.connect(
  "mongodb+srv://qb1968:Allison19@cluster0.f0p0aun.mongodb.net/",
);

const createAdmin = async () => {
  const exists = await Admin.findOne({ email: "admin@site.com" });

  if (!exists) {
    const hashed = await bcrypt.hash("123456", 10);

    await Admin.create({
      email: "admin@site.com",
      password: hashed,
    });

    console.log("Admin created");
  } else {
    console.log("Admin already exists");
  }

  mongoose.disconnect();
};

createAdmin();
