import express from "express";
import {
  getSiteSettings,
  updateSiteSettings,
} from "../controllers/siteSettingController.js";

const router = express.Router();

// Public read endpoint used by the website.
router.get("/", getSiteSettings);

// Admin write endpoint used by the admin panel.
router.put("/", updateSiteSettings);

export default router;
