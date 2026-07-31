import mongoose from "mongoose";

const youngFarmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    location: String,

    bio: String,

    image: String,

    order: {
      type: Number,
      default: 99,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("YoungFarmer", youngFarmerSchema);
