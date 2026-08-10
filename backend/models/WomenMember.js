import mongoose from "mongoose";

const womenMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      default: "Committee Member",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 99,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WomenMember", womenMemberSchema);
