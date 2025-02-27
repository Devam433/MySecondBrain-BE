"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQueryInChromaDb = void 0;
const chromadb_1 = require("../config/chromadb");
const vectorEmbedder_mjs_1 = require("./vectorEmbedder.mjs");
//this is to search for closest matching embeddings in the vector db.
//return - 3 closest embeddings
const searchQueryInChromaDb = async (query) => {
    try {
        const queryVector = await (0, vectorEmbedder_mjs_1.generateVectorEmbedding)(query);
        console.log('queryVector', queryVector);
        const collection = await (0, chromadb_1.getChromaDbCollection)();
        const result = await collection.query({
            queryEmbeddings: [queryVector],
            nResults: 3,
        });
        return result;
    }
    catch (error) {
    }
};
exports.searchQueryInChromaDb = searchQueryInChromaDb;
