import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
    },

    startTime: {
      type: String,
    },

    endTime: {
      type: String,
    },

    category: {
      type: String,
      enum: ["Meeting", "Community Event", "Youth Program", "Training"],
      default: "Community Event",
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Event", eventSchema);
