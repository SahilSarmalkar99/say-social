import mongoose from "mongoose";

const mainVideoSchema = new mongoose.Schema(
  {
    desktopVideoUrl: {
      type: String,
      required: true,
    },

    mobileVideoUrl: {
      type: String,
      required: true,
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MainVideo", mainVideoSchema);