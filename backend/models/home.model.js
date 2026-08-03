import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
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
  { _id: false }
);

const workCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    videos: {
      type: [videoSchema],
      default: [],
    },
  },
  { _id: false }
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

    // Used by all sections except "work"
    videos: {
      type: [videoSchema],
      default: [],
    },

    // Used only when section === "work"
    workCategories: {
      type: [workCategorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Home", homeSchema);