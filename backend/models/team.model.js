import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    photo: {
      type: String, // Cloudinary Image URL
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const teamSchema = new mongoose.Schema(
  {
    video: {
      type: String, // Cloudinary Video URL
      trim: true,
    },

    members: {
      type: [memberSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Team", teamSchema);