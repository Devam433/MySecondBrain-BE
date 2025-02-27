"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.addContent = exports.getAllContents = void 0;
const ContentsModel_1 = require("../models/ContentsModel");
const addNewContent_1 = require("../services/addNewContent");
const vectorEmbedder_mjs_1 = require("../services/vectorEmbedder.mjs");
const chromadb_1 = require("../config/chromadb");
const getAllContents = async (req, res) => {
    const user = req.user; //{userName,id}
    try {
        const allContent = await ContentsModel_1.ContentModel.find({ createdBy: user?.id }).populate('tags', '-_id title');
        if (!allContent) {
            res.status(404).json({ success: false, message: 'Contents not found. Ensure user/userid is valid!' });
        }
        res.status(200).json({ success: true, allContent });
    }
    catch (error) {
        console.log('Error at getAllContents', error);
        res.status(500).json({ success: false, message: 'An error occured', error });
    }
};
exports.getAllContents = getAllContents;
const addContent = async (req, res) => {
    const contentToAdd = req.body;
    const user = req.user;
    try {
        if (!contentToAdd) {
            return res.status(400).json({ messgae: 'Content is required!' });
        }
        //generate vector embeddtion of the content
        const vectorEmbeddings = await (0, vectorEmbedder_mjs_1.generateVectorEmbedding)(contentToAdd);
        console.log('embeddings tolist or flat', vectorEmbeddings);
        //get the ChromaDb collection
        const chromaDbCollection = await (0, chromadb_1.getChromaDbCollection)();
        //add the content in mongodb
        const response = await (0, addNewContent_1.addNewContentService)(contentToAdd, user);
        //add the vector embeddings of the content in the chromaDb collection
        await chromaDbCollection.add({
            ids: [response._id.toString()],
            embeddings: [vectorEmbeddings],
        });
        res.status(200).json({ success: true, message: 'Content created successfully!', content: response });
    }
    catch (error) {
        console.log('Error at addContent!', error);
        res.status(500).json({ success: false, message: 'An error occured', error });
    }
};
exports.addContent = addContent;
const deleteContent = async (req, res) => {
    //@ts-ignore
    const user = req.user;
    const contentId = req.body.contentId;
    try {
        const contentToDelete = await ContentsModel_1.ContentModel.findById(contentId);
        if (!contentToDelete) {
            res.status(404).json({ success: false, message: 'Content to delete not found. Ensure id is valid!' });
        }
        if (contentToDelete?.createdBy != user?.id) {
            res.status(401).json({ success: false, message: 'Can not perform delete operation!' });
        }
        const response = await ContentsModel_1.ContentModel.findByIdAndDelete(contentId);
        res.status(200).json({ success: false, message: 'Content deleted successfully!', deletedContent: response });
    }
    catch (error) {
        console.log('Error at deleteContent', error);
        res.status(500).json({ success: false, message: 'An error occured', error });
    }
};
exports.deleteContent = deleteContent;
