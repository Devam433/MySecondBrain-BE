import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  hash:{
    type:String,
    require:true,
  },
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'Users',
  },
})

export const LinkModel = mongoose.model("LinkSchema",LinkSchema);