import { ChromaClient } from "chromadb";

// const chromaClient = new ChromaClient();
const client = new ChromaClient({ path: "http://localhost:8000" });

export const getChromaDbCollection = async () => {
  try {
    console.log('Inside getChromaDbCollection')

    const collection = await client.getOrCreateCollection({name:"mySecondBrain",
      dimension:384});
    const list =  await client.getCollection({
      name: "mySecondBrain"
    })
    console.log('collection',list)
    console.log('chromadb collection',collection)
    if(!collection) {
      throw new Error("Coundnot get chromadb collection")
    }
    return collection;
  } catch (error) {
    console.log('Error at connecting chromadb!',error)
  }

} 

// export default chromaClient;