"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChromaDbCollection = void 0;
const chromadb_1 = require("chromadb");
// const chromaClient = new ChromaClient();
const getChromaDbCollection = async () => {
    const chromaClient = new chromadb_1.ChromaClient({ path: './chroma_db_data' });
    return await chromaClient.getOrCreateCollection({ name: 'mySecondBrain' });
};
exports.getChromaDbCollection = getChromaDbCollection;
// export default chromaClient;
