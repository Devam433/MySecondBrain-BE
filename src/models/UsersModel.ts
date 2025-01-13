import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userName:{
    type: String,
    unique: true,
  },
  password:{
    type:String
  }
},{timestamps:true})

export const UsersModel = mongoose.model('Users',UsersSchema)