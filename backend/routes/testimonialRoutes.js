import express from "express";
import {
  createTestimonial,
  getTestimonials,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";
const router = express.Router();
router.post("/", createTestimonial);
router.get("/", getTestimonials);
router.get("/admin", getAllTestimonials);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);
export default router;
