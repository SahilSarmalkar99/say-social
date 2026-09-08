import mongoose from "mongoose";

const schema = new mongoose.Schema({
  applicationEmail:{type:String,required:true,trim:true,lowercase:true}
},{timestamps:true});

export default mongoose.model("CareerSetting",schema);