import JobRole from "../models/JobRole.js";

export async function createJobRole(req,res){
  try{
    const {title,type,salary,location,description}=req.body;
    if(!title||!type||!location) return res.status(400).json({success:false,message:"title, type and location are required"});
    const job=await JobRole.create({title,type,salary,location,description});
    res.status(201).json({success:true,data:job});
  }catch(e){res.status(500).json({success:false,message:e.message});}
}
export async function getActiveJobRoles(req,res){
  try{res.json({success:true,data:await JobRole.find({isActive:true}).sort({createdAt:-1})});}
  catch(e){res.status(500).json({success:false,message:e.message});}
}
export async function getAllJobRoles(req,res){
  try{res.json({success:true,data:await JobRole.find().sort({createdAt:-1})});}
  catch(e){res.status(500).json({success:false,message:e.message});}
}
export async function updateJobRole(req,res){
  try{
    const job=await JobRole.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if(!job)return res.status(404).json({success:false,message:"Job role not found"});
    res.json({success:true,data:job});
  }catch(e){res.status(500).json({success:false,message:e.message});}
}
export async function deleteJobRole(req,res){
  try{
    const job=await JobRole.findByIdAndDelete(req.params.id);
    if(!job)return res.status(404).json({success:false,message:"Job role not found"});
    res.json({success:true,message:"Job role deleted"});
  }catch(e){res.status(500).json({success:false,message:e.message});}
}