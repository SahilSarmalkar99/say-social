import express from "express";
import {getCareerSetting,saveCareerSetting} from "../controllers/careerSettingController.js";
const router=express.Router();
router.get("/",getCareerSetting); router.put("/",saveCareerSetting);
export default router;