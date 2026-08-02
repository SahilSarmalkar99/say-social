import express from "express";

import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
  getProjectBySlug
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);

router.get("/:slug", getProjectBySlug);
router.get("/:id", getProject);

router.post("/", createProject);

router.put("/:id", updateProject);

router.delete("/:id", deleteProject);

export default router;