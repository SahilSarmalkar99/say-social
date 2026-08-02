import express from "express";

import {
  createHome,
  getAllHome,
  getHomeBySection,
  updateHome,
  deleteHome,
} from "../controllers/home.controller.js";

const router = express.Router();

router.post("/", createHome);

router.get("/", getAllHome);

router.get("/section/:section", getHomeBySection);

router.put("/:id", updateHome);

router.delete("/:id", deleteHome);

export default router;