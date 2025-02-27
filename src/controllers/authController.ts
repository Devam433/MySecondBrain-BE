import bcrypt from "bcrypt"
import { UsersModel } from "../models/UsersModel";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config()

export const signIn = async (req:Request,res:Response):Promise<void> => {

  const userDetails = req.body;
  try {
    const user = await UsersModel.findOne({userName:userDetails.userName});

    if(user?.password && await bcrypt.compare(userDetails.password,user.password)) {
      const jwtSecret = process.env.JWT_SECRET;
      if(!jwtSecret) {
        res.status(500).json({message:'JWT_SECRRET is not defined in environment file'})
        return;
      }

      const token = JWT.sign({id:user._id,},jwtSecret,{ expiresIn: "1h" })
      res.status(200).json({success:true,message:'SignIn success',token})
    } else {
      res.status(501).json({success:false,message:'Invalid credentials'})
    }
  } catch (error) {
    console.log('Error at signin!',error)
    res.status(500).json({success:false,message:'Error while sign in',error:error})
  }
}

export const signUp = async (req:any,res:any):Promise<void> => {

  const {userName,password} = req.body;
  const userDetails = req.body;
  const hashedPassowrd = await bcrypt.hash(userDetails.password,5);
  userDetails.password = hashedPassowrd;
  try {
    const userExists = await UsersModel.findOne({userName:userDetails.userName});
    if(userExists) {
      res.status(401).json({success:true,message:'Conflict, userName not available.'});
      return;
    }

    const user = new UsersModel(userDetails);
    const response = await user.save();
    res.status(200).json({success:true,message:'Sign up success!'});
  } catch (error) {
    console.log('Error at signUp',error);
    res.status(500).json({success:false,error:error});
  }
}