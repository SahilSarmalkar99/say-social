import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {submitApplication,getApplications,updateApplicationStatus} from "../controllers/jobApplicationController.js";

const router=express.Router();
const uploadDir="uploads/resumes";
fs.mkdirSync(uploadDir,{recursive:true});
const storage=multer.diskStorage({
  destination:(req,file,cb)=>cb(null,uploadDir),
  filename:(req,file,cb)=>{
    const ext=path.extname(file.originalname);
    const name=path.basename(file.originalname,ext).replace(/[^a-zA-Z0-9-_]/g,"_");
    cb(null,`${Date.now()}-${name}${ext}`);
  }
});
const upload=multer({
  storage,limits:{fileSize:10*1024*1024},
  fileFilter:(req,file,cb)=>{
    const allowed=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if(!allowed.includes(file.mimetype))return cb(new Error("Only PDF, DOC and DOCX resumes are allowed"));
    cb(null,true);
  }
});
router.post("/",upload.single("resume"),submitApplication);
router.get("/admin",getApplications);
router.patch("/admin/:id/status",updateApplicationStatus);
export default router;