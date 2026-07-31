import mongoose from "mongoose";

const womenEventSchema = new mongoose.Schema(
  {
    title: String,

    description: String,

    date: Date,

    location: String,

    image: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WomenEvent", womenEventSchema);
