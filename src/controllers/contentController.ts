//@ts-ignore
import { Request, Response } from "express";
import { ContentModel } from "../models/ContentsModel"

export const getAllContents = async (req:Request,res:Response) => {
  const user = req.user; //{userName,id}
  try {
    const allContent = await ContentModel.find({createdBy:user?.id});
    if(!allContent) {
      res.status(404).json({success:false,message:'Contents not found. Ensure user/userid is valid!'});
    }
    res.status(200).json({success:true,allContent});
  } catch (error) {
    console.log('Error at getAllContents',error);
    res.status(500).json({success:false,message:'An error occured', error});
  }
}

export const addContent = async (req:Request,res:Response) => {
  const contentToAdd = req.body;
  const user = req.user;
  try {
    const content = new ContentModel({...contentToAdd,createdBy:user?.id});
    const response = await content.save();
    res.status(200).json({success:true,message:'Content created successfully!',content:response})
  } catch (error) {
    console.log('Error at addContent!',error);
    res.status(500).json({success:false,message:'An error occured',error})
  }
}

export const deleteContent = async (req:Request,res:Response) => {
  //@ts-ignore
  const user = req.user;
  const contentId = req.body.contentId;
  try {
    const contentToDelete = await ContentModel.findById(contentId);
    if(!contentToDelete) {
      res.status(404).json({success:false,message:'Content to delete not found. Ensure id is valid!'})
    }
    if(contentToDelete?.createdBy != user?.id) {
      res.status(401).json({success:false,message:'Can not perform delete operation!'});
    }
    const response = await ContentModel.findByIdAndDelete(contentId);
    res.status(200).json({success:false,message:'Content deleted successfully!',deletedContent:response});
  } catch (error) {
    console.log('Error at deleteContent',error);
    res.status(500).json({success:false,message:'An error occured',error});
  }
}