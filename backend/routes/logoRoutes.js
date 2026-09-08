import express from "express";

import {
  createLogo,
  getLogos,
  getAllLogos,
  updateLogo,
  deleteLogo,
} from "../controllers/logoController.js";

const router = express.Router();

router.post("/", createLogo);

router.get("/", getLogos);

router.get("/admin", getAllLogos);

router.put("/:id", updateLogo);

router.delete("/:id", deleteLogo);

export default router;