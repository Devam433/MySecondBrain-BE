import { Request, Response, Router } from "express";
import { searchQueryInChromaDb } from "../services/searchQueryInChromaDb.mjs";
import { ContentModel } from "../models/ContentsModel.js";
import { queryLLM } from "../config/LLM.js";

const router =  Router()

//searches query vector in chromaDb and returns the matching mongodb documents.
router.post('/search-similar-content', async (req:Request,res:Response)=>{
  try {
    const {query} = req.body;
    if(!query) {
      res.status(400).json({messgae:'Query is required!'});
    }

    console.log('query ',query)

    //get similar top 3 vector embedding documents from chromaDb
    const result = await searchQueryInChromaDb(query);

    console.log('Result of searchQueryInChromaDb',result);

    const documentIds = result?.ids.flat()
    console.log('documentIds',documentIds)  //["id"]
    //get the contents from mongodb
    const content = await ContentModel.find({_id: { $in: documentIds }})

    //from the FE this content has to be passed to the LLM along with the prompt.
    res.json(content);

  } catch (error) {
    console.log('Error at /search-query route');
    res.status(500).json({error});
  }
})

//searches LLM for response based on prompt and the related documents.
router.post('/search-llm', async (req:Request,res:Response) => {
  try {
    //@param prompt is the prompt, @param content is the related document of the prompt
    const {prompt,content} = req.body;

    if(!prompt || !content) {
      res.status(400).json({message:'prompt and content are required!'});
    }

    const llmResponse = await queryLLM(prompt,content)  

    res.json(llmResponse);
  } catch (error) {
    console.log('Error at route /search-llm',error)
  }
})
export default router;