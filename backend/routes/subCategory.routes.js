import express from "express";

import {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategory.controller.js";

const router = express.Router();

router.post("/", createSubCategory);

router.get("/", getSubCategories);

router.get("/:id", getSubCategory);

router.put("/:id", updateSubCategory);

router.delete("/:id", deleteSubCategory);

export default router;