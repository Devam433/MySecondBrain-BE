import mongoose from "mongoose";

const TagsSchema = new mongoose.Schema({
  title:{
    type: String,
    unique: true,
  }
})

export const TagsModel = mongoose.model('Tags',TagsSchema);