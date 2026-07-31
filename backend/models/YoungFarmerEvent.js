import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    date: {
      type: Date,
      required: true,
    },

    location: String,

    image: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("YoungFarmerEvent", schema);
