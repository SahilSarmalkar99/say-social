import CareerSetting from "../models/CareerSetting.js";

export async function getCareerSetting(req,res){
  try{res.json({success:true,data:await CareerSetting.findOne().sort({createdAt:-1})});}
  catch(e){res.status(500).json({success:false,message:e.message});}
}
export async function saveCareerSetting(req,res){
  try{
    const {applicationEmail}=req.body;
    if(!applicationEmail)return res.status(400).json({success:false,message:"applicationEmail is required"});
    const setting=await CareerSetting.findOneAndUpdate({}, {applicationEmail},{new:true,upsert:true,runValidators:true});
    res.json({success:true,data:setting});
  }catch(e){res.status(500).json({success:false,message:e.message});}
}