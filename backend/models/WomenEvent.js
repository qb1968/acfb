import mongoose from "mongoose";

const womenEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // Calendar date — NOT a timestamp
    date: {
      type: String,
      required: true,
    },

    location: String,

    description: String,

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WomenEvent", womenEventSchema);
