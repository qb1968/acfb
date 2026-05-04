import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
});

export default mongoose.model("Event", eventSchema);
