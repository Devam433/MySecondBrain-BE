import express, { Request, Response } from 'express'
import { TagsModel } from '../models/TagsModel';

const router = express.Router();

router.post('/search-tag/:key',async (req:Request,res:Response) => {
  try {
    const data = await TagsModel.find({"$or":[{title:{$regex: req.params.key,$options: 'i'}}]})
    res.send(data);
  } catch (error) {
    console.log('Error at /search-tag controller');
    res.status(500).json({success:false,message:"An error occured while searching tag!"});
  }
})

export default router;