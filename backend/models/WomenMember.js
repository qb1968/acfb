import mongoose from "mongoose";

const womenMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "Committee Member",
    },

    location: String,

    bio: String,

    image: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("WomenMember", womenMemberSchema);
