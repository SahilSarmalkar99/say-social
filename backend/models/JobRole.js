import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title:{type:String,required:true,trim:true},
  type:{type:String,required:true,trim:true},
  salary:{type:String,trim:true,default:""},
  location:{type:String,required:true,trim:true},
  description:{type:String,trim:true,default:""},
  isActive:{type:Boolean,default:true}
},{timestamps:true});

export default mongoose.model("JobRole",schema);