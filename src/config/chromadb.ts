import { ChromaClient } from "chromadb";

// const chromaClient = new ChromaClient();

export const getChromaDbCollection = async () => {
  const chromaClient = new ChromaClient({path:'./chroma_db_data'});
  return await chromaClient.getOrCreateCollection({name:'mySecondBrain'});
} 

// export default chromaClient;