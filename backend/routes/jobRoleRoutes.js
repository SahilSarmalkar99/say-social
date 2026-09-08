import express from "express";
import {createJobRole,getActiveJobRoles,getAllJobRoles,updateJobRole,deleteJobRole} from "../controllers/jobRoleController.js";
const router=express.Router();
router.post("/",createJobRole); router.get("/",getActiveJobRoles); router.get("/admin",getAllJobRoles);
router.put("/:id",updateJobRole); router.delete("/:id",deleteJobRole);
export default router;