//@ts-ignore
import { Request, Response } from "express";
import { ContentModel } from "../models/ContentsModel.js"
import { addNewContentService } from "../services/addNewContent.js";
import { generateVectorEmbedding } from "../services/vectorEmbedder.mjs";
import { getChromaDbCollection } from "../config/chromadb.js";

export const getAllContents = async (req:Request,res:Response) => {
  const user = req.user; //{userName,id}
  try {
    const allContent = await ContentModel.find({createdBy:user?.id}).populate('tags','-_id title');
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
  console.log('Inside addContent')
  const contentToAdd = req.body;
  const user = req.user;
  try {
    if(!contentToAdd) {
      return res.status(400).json({messgae:'Content is required!'})
    }
    
    // if(!contentToAdd.content) {
    //   return res.status(400).json({message:'Content text is required!'})
    // }

    //generate vector embeddtion of the content
    const vectorEmbeddings = await generateVectorEmbedding(contentToAdd); 
    
    // Convert tensor to flat array if needed
    // const flatEmbeddings = Array.isArray(vectorEmbeddings.data) 
    //   ? vectorEmbeddings.data 
    //   : Array.from(vectorEmbeddings.data);

    //get the ChromaDb collection
    const chromaDbCollection = await getChromaDbCollection();
    
    //add the content in mongodb
    const response = await addNewContentService(contentToAdd,user)
    
    // Debug log before sending to ChromaDB
    const dataToSend = {
      ids: [response._id.toString()],
      embeddings: vectorEmbeddings, // Single array of numbers
      documents: [contentToAdd.title],
      metadatas: contentToAdd.newTags,
    };
    
    console.log('Data being sent to ChromaDB:', {
      ...dataToSend,
    });
    console.log( ` embeddings Length: ${dataToSend.embeddings[0].length}`); // Log length instead of full array)
    console.log( ` embeddings Length: ${dataToSend.embeddings.length}`);
    //add the vector embeddings of the content in the chromaDb collection
    const chromaCollection = await chromaDbCollection.add(dataToSend);

    const docs = await chromaDbCollection.get();
    console.log('All docs:', docs);
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