import mongoose from "mongoose";

const womenNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: String,

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WomenNews", womenNewsSchema);
