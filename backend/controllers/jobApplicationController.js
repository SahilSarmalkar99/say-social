import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import JobRole from "../models/JobRole.js";
import JobApplication from "../models/JobApplication.js";
import CareerSetting from "../models/CareerSetting.js";

export async function submitApplication(req,res){
  try{
    const {jobRoleId,name,phone,email,workLinks}=req.body;
    if(!jobRoleId||!name||!phone||!req.file){
      if(req.file?.path&&fs.existsSync(req.file.path))fs.unlinkSync(req.file.path);
      return res.status(400).json({success:false,message:"Job role, name, phone and resume are required"});
    }
    const job=await JobRole.findOne({_id:jobRoleId,isActive:true});
    if(!job){
      if(req.file?.path&&fs.existsSync(req.file.path))fs.unlinkSync(req.file.path);
      return res.status(404).json({success:false,message:"Selected job role is no longer available"});
    }
    const links=typeof workLinks==="string"?workLinks.split("\n").map(x=>x.trim()).filter(Boolean):[];
    const application=await JobApplication.create({
      jobRole:job._id,jobTitle:job.title,name,phone,email:email||"",workLinks:links,
      resume:{originalName:req.file.originalname,filename:req.file.filename,mimetype:req.file.mimetype,size:req.file.size,path:req.file.path}
    });
    const setting=await CareerSetting.findOne().sort({createdAt:-1});
    const recipient=setting?.applicationEmail||process.env.CAREERS_EMAIL;
    if(recipient&&process.env.MAIL_USER&&process.env.MAIL_PASS){
      const transporter=nodemailer.createTransport({service:"gmail",auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASS}});
      await transporter.sendMail({
        from:`"Careers" <${process.env.MAIL_USER}>`,to:recipient,replyTo:email||process.env.MAIL_USER,
        subject:`New Application: ${job.title} — ${name}`,
        text:`New job application\n\nRole: ${job.title}\nName: ${name}\nPhone: ${phone}\nEmail: ${email||"Not provided"}\nWork links: ${links.length?links.join(", "):"None"}`,
        attachments:[{filename:req.file.originalname,path:path.resolve(req.file.path)}]
      });
    }
    res.status(201).json({success:true,message:recipient&&process.env.MAIL_USER&&process.env.MAIL_PASS?"Application submitted successfully":"Application saved; email delivery is not configured.",data:application});
  }catch(e){
    if(req.file?.path&&fs.existsSync(req.file.path))fs.unlinkSync(req.file.path);
    res.status(500).json({success:false,message:e.message});
  }
}
export async function getApplications(req,res){
  try{res.json({success:true,data:await JobApplication.find().populate("jobRole","title type location").sort({createdAt:-1})});}
  catch(e){res.status(500).json({success:false,message:e.message});}
}
export async function updateApplicationStatus(req,res){
  try{
    const app=await JobApplication.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true,runValidators:true});
    if(!app)return res.status(404).json({success:false,message:"Application not found"});
    res.json({success:true,data:app});
  }catch(e){res.status(500).json({success:false,message:e.message});}
}