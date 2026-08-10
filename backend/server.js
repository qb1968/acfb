import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import galleryRoutes from "./routes/gallery.js";
import newsRoutes from "./routes/news.js";
import officerRoutes from "./routes/officers.js";
import youngFarmerRoutes from "./routes/youngFarmers.js";
import youngFarmerNewsRoutes from "./routes/youngFarmerNews.js";
import youngFarmerEventRoutes from "./routes/youngFarmerEvents.js";
import womenMembersRoutes from "./routes/womenMembers.js";
import womenNewsRoutes from "./routes/womenNews.js";
import womenEventsRoutes from "./routes/womenEvents.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://acfb-three.vercel.app","https://www.acfarmbureau.com"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/officers", officerRoutes);
app.use("/api/young-farmers", youngFarmerRoutes);

app.use("/api/young-farmer-news", youngFarmerNewsRoutes);

app.use("/api/young-farmer-events", youngFarmerEventRoutes);
app.use("/api/women-members", womenMembersRoutes);

app.use("/api/women-news", womenNewsRoutes);

app.use("/api/women-events", womenEventsRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
