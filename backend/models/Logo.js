import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    cloudUri: {
      type: String,
      required: true,
      trim: true,
    },

    alt: {
      type: String,
      trim: true,
      default: "Trusted company logo",
    },

    // Which carousel this logo belongs to
    carousel: {
      type: String,
      enum: ["top", "bottom"],
      default: "top",
      required: true,
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

export default mongoose.model("Logo", logoSchema);