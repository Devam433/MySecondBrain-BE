import { getChromaDbCollection } from "../config/chromadb.js";
import { generateVectorEmbedding } from "./vectorEmbedder.mjs"


//this is to search for closest matching embeddings in the vector db.
//return - 3 closest embeddings
export const searchQueryInChromaDb = async (query:string) => {
  try {
    const queryVector = await generateVectorEmbedding(query);
    console.log('queryVector',queryVector);

    const collection = await getChromaDbCollection();
    
    const result = await collection.query({
      queryEmbeddings: [queryVector],
      nResults: 3,
    })

    return result;
  } catch (error) {
    
  }
}