"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChromaDbCollection = void 0;
const chromadb_1 = require("chromadb");
// const chromaClient = new ChromaClient();
const client = new chromadb_1.ChromaClient({ path: "http://localhost:8000" });
const getChromaDbCollection = async () => {
    try {
        console.log('Inside getChromaDbCollection');
        const collection = await client.getOrCreateCollection({ name: "mySecondBrain",
            dimension: 384 });
        const list = await client.getCollection({
            name: "mySecondBrain"
        });
        console.log('collection', list);
        console.log('chromadb collection', collection);
        if (!collection) {
            throw new Error("Coundnot get chromadb collection");
        }
        return collection;
    }
    catch (error) {
        console.log('Error at connecting chromadb!', error);
    }
};
exports.getChromaDbCollection = getChromaDbCollection;
// export default chromaClient;
