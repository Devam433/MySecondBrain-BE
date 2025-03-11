import { pipeline } from "@xenova/transformers";
export const generateVectorEmbedding = async (text) => {
    try {
        console.log('Inside generateVectorEmbedding');
        // Convert input to string if it isn't already
        const textString = String(text);
        const embedder = await pipeline('feature-extraction', "Xenova/all-MiniLM-L6-v2"); // getting the feature we want, here we want 'feature-extraction' as it is used to generate vector embeddings.
        const embeddings = await embedder(textString, { pooling: "mean", normalize: true });
        console.log('embeddings', embeddings);
        console.log('embeddings length', embeddings[0].length);
        const flateEmbeddings = embeddings.tolist(); // converts tensor data in n dimensional js list
        console.log('flateEmbeddings', flateEmbeddings);
        return flateEmbeddings;
    }
    catch (error) {
        console.log('Error in generateVectorEmbedding', error);
        throw error; // Re-throw the error to handle it in the calling code
    }
};
