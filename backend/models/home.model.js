import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      default: null,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
  },
  {
    _id: false,
  }
);

const homeSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "work",
        "content-creating",
        "design-identities",
        "featured-work",
      ],
    },

    videos: {
      type: [videoSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Home", homeSchema);