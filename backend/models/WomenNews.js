import mongoose from "mongoose";

const womenNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    image: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WomenNews", womenNewsSchema);
