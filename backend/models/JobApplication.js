import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    jobRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobRole",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    // ------------------------------------
    // RESUME
    // ------------------------------------

    resume: {
      // Original file name uploaded by applicant
      originalName: {
        type: String,
        required: true,
      },

      // Cloudinary public ID
      filename: {
        type: String,
        required: true,
      },

      mimetype: {
        type: String,
        required: true,
      },

      size: {
        type: Number,
        required: true,
      },

      // Cloudinary secure URL
      path: {
        type: String,
        required: true,
      },

      // Cloudinary URL
      url: {
        type: String,
        required: true,
      },

      // Cloudinary public ID
      publicId: {
        type: String,
        required: true,
      },
    },

    workLinks: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      enum: [
        "new",
        "reviewing",
        "shortlisted",
        "rejected",
        "hired",
      ],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "JobApplication",
  schema
);