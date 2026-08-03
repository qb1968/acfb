import mongoose from "mongoose";

const youngFarmerEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: String,

    description: String,

    image: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("YoungFarmerEvent", youngFarmerEventSchema);
