import mongoose from "mongoose";

const youngFarmerNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

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

export default mongoose.model("YoungFarmerNews", youngFarmerNewsSchema);
