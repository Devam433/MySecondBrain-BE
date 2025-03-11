import { getChromaDbCollection } from "../config/chromadb.js";
import { generateVectorEmbedding } from "./vectorEmbedder.mjs"


//this is to search for closest matching embeddings in the vector db.
//return - 3 closest embeddings
export const searchQueryInChromaDb = async (query:string) => {
  try {
    const queryVector = await generateVectorEmbedding(query);
    console.log('queryVector',queryVector);
    console.log('queryVector dimension', queryVector[0].length)
    const collection = await getChromaDbCollection();
    collection?.get().then(res=>{
      console.log('ChromaDbCollection docs', res)
    })
    const result = await collection.query({
      queryEmbeddings: queryVector,
      nResults: 2,
    })
    console.log('result',result)
    return result;
  } catch (error) {
    console.log('Error at searchQueryInChromaDb service',error)
  }
}