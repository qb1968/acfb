import mongoose from "mongoose";

const officerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    county: String,

    location: String,

    commodities: String,

    type: {
      type: String,
      default: "Member",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Officer", officerSchema);
