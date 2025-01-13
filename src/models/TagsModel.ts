import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema({
  title:String,
})

export const TagsModel = mongoose.model('Tags',TagsSchema);