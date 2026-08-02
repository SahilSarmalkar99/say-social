import express from "express";

import {
  getTeam,
  updateVideo,
  deleteVideo,
  addMember,
  updateMember,
  deleteMember,
} from "../controllers/team.controller.js";

const router = express.Router();

/**
 * TEAM
 */
router.get("/", getTeam);

/**
 * VIDEO
 */
router.put("/video", updateVideo);
router.delete("/video", deleteVideo);

/**
 * MEMBERS
 */
router.post("/member", addMember);
router.put("/member/:memberId", updateMember);
router.delete("/member/:memberId", deleteMember);

export default router;
