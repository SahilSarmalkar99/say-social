import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      default: "global",
      immutable: true,
    },
    heroVideos: {
      work: { type: String, default: "", trim: true },
      team: { type: String, default: "", trim: true },
      contact: { type: String, default: "", trim: true },
    },
    logoUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSetting", siteSettingSchema);
