import { pipeline }  from "@xenova/transformers";

export const generateVectorEmbedding =  async (text:string) => {
  try {
    const embedder = await pipeline('feature-extraction',"Xenova/all-MiniLM-L6-v2") // getting the feature we want, here we want 'feature-extraction' as it is used to generate vector embeddings.

    const embeddings = await embedder(text,{pooling:"mean", normalize:true})
    console.log('embeddings', embeddings);
  
    return embeddings.tolist() // converts tensor data in n dimensional js list
  } catch (error) {
    console.log('Error in generateVectorEmbedding')
  }
}