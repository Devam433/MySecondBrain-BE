"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.addContent = exports.getAllContents = void 0;
const ContentsModel_1 = require("../models/ContentsModel");
const addNewContent_1 = require("../services/addNewContent");
const getAllContents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user; //{userName,id}
    try {
        const allContent = yield ContentsModel_1.ContentModel.find({ createdBy: user === null || user === void 0 ? void 0 : user.id }).populate('tags', '-_id title');
        if (!allContent) {
            res.status(404).json({ success: false, message: 'Contents not found. Ensure user/userid is valid!' });
        }
        res.status(200).json({ success: true, allContent });
    }
    catch (error) {
        console.log('Error at getAllContents', error);
        res.status(500).json({ success: false, message: 'An error occured', error });
    }
});
exports.getAllContents = getAllContents;
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentToAdd = req.body;
    const user = req.user;
    try {
        const response = yield (0, addNewContent_1.addNewContentService)(contentToAdd, user);
        res.status(200).json({ success: true, message: 'Content created successfully!', content: response });
    }
    catch (error) {
        console.log('Error at addContent!', error);
        res.status(500).json({ success: false, message: 'An error occured', error });
    }
});
exports.addContent = addContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const user = req.user;
    const contentId = req.body.contentId;
    try {
        const contentToDelete = yield ContentsModel_1.ContentModel.findById(contentId);
        if (!contentToDelete) {
            res.status(404).json({ success: false, message: 'Content to delete not found. Ensure id is valid!' });
        }
        if ((contentToDelete === null || contentToDelete === void 0 ? void 0 : contentToDelete.createdBy) != (user === null || user === void 0 ? void 0 : user.id)) {
            res.status(401).json({ success: false, message: 'Can not perform delete operation!' });
        }
        const response = yield ContentsModel_1.ContentModel.findByIdAndDelete(contentId);
        res.status(200).json({ success: false, message: 'Content deleted successfully!', deletedContent: response });
    }
    catch (error) {
        console.log('Error at deleteContent', error);
        res.status(500).json({ success: false, message: 'An error occured', error });
    }
});
exports.deleteContent = deleteContent;
