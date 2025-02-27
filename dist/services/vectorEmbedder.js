"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVectorEmbedding = void 0;
const transformers_1 = require("@xenova/transformers");
const generateVectorEmbedding = async (text) => {
    try {
        const embedder = await (0, transformers_1.pipeline)('feature-extraction', "Xenova/all-MiniLM-L6-v2"); // getting the feature we want, here we want 'feature-extraction' as it is used to generate vector embeddings.
        const embeddings = await embedder(text, { pooling: "mean", normalize: true });
        console.log('embeddings', embeddings);
        return embeddings.tolist(); // converts tensor data in n dimensional js list
    }
    catch (error) {
        console.log('Error in generateVectorEmbedding');
    }
};
exports.generateVectorEmbedding = generateVectorEmbedding;
