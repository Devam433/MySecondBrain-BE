import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title:{
    type:String,
  },
  type:{
    type:String,
    enum:['facebook','youtube','twitter','linkedin','link']
  },
  tags:{
    type:[mongoose.Types.ObjectId],
    ref:'Tags'
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'Users'
  }
})

export const ContentModel = mongoose.model('Contents', ContentSchema)