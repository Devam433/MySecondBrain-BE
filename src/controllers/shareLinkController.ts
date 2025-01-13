import { Request, Response } from "express";
import { LinkModel } from "../models/LinkModel";
import { generateHash } from "../utils";
import { ContentModel } from "../models/ContentsModel";

export const createOrDeleteLink = async(req:Request,res:Response):Promise<void> => {
  try {
    const {share} = req.body;
    const user = req.user;
    
    const hash = generateHash(30)

    if(share) {

      // const existingLink = await LinkModel.findOne({userId:user?.id})
      // if(existingLink) {
      //   res.status(200).json({success:true,message:'Share Link already exists',Link:{link:existingLink.hash}})
      //   return;
      // }

      // const Link = new LinkModel({hash,userId:user?.id})
      // const response = await Link.save();

      const response = await LinkModel.findOneAndUpdate({userId:user?.id},{hash,userId:user?.id},{upsert:true,new:true})
      res.status(200).json({success:true,message:'Share link created',Link:{link:response.hash}})
      return;
    } else {

      // const existingLink = await LinkModel.findOne({userId:user?.id})
      // if(!existingLink) {
      //   res.status(404).json({success:false,message:'Previous Link document not found.'})
      //   return;
      // }

      // await LinkModel.deleteOne({userId:user?.id});

      const existingLink = await LinkModel.findOneAndDelete({userId:user?.id});
      if(!existingLink) {
        res.status(404).json({success:false,message:'Previous Link document not found.'})
        return;
      }
      res.status(200).json({success:true,message:'Link removed successfully.'})
    }
  } catch (error) {
    console.log('Error at createOrDeleteLink');
    res.status(500).json({success:false,message:'An expected error!',error})
  }
}

export const getShareLink = async(req:Request, res:Response):Promise<void> => {
  try {
    const param = req.params.hash;
    const hash = param.replace(':','')

    const Link = await LinkModel.findOne({hash})
    if(!Link) {
      res.status(404).json({success:false,message:'Shared Brain not found!'})
      return;
    }

    const contents = await ContentModel.find({createdBy:Link.userId})
    res.status(200).json({success:true,contents})
    return;
  } catch (error) {
    console.log('An error occured at getShareLink',error)
    res.status(500).json({success:false,message:'An expected error!',error})
  }
}