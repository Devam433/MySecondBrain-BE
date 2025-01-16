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
exports.addNewContentService = void 0;
const ContentsModel_1 = require("../models/ContentsModel");
const TagsModel_1 = require("../models/TagsModel");
const addNewContentService = (contentToAdd, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('this is contentToAdd', contentToAdd);
        // Handle new tags
        if (contentToAdd.newTags.length > 0) {
            const insertTagsWithDuplicateTagsHandling = (tags) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c;
                while (tags.length > 0) {
                    try {
                        //insert new tags (@param tags)
                        const newTags = yield TagsModel_1.TagsModel.insertMany(tags);
                        //Push the new tags' _ids to contentToAdd.tags
                        contentToAdd.tags = [...(contentToAdd.tags || []), ...newTags.map((tag) => tag._id)];
                        break;
                    }
                    catch (error) {
                        if (error.code === 11000) { // Duplicate tag error
                            const duplicateTitle = (_c = (_b = (_a = error.writeErrors[0]) === null || _a === void 0 ? void 0 : _a.err) === null || _b === void 0 ? void 0 : _b.op) === null || _c === void 0 ? void 0 : _c.title; // Get duplicate tag title
                            if (duplicateTitle) {
                                const existingTag = yield TagsModel_1.TagsModel.findOne({ title: duplicateTitle });
                                if (existingTag) {
                                    contentToAdd.tags = [...(contentToAdd.tags || []), existingTag._id];
                                }
                                //Removing the duplicate tag from the list. 
                                //the loop continues until and unless tags[] is empty runs
                                tags = tags.filter((tag) => tag.title !== duplicateTitle);
                            }
                            else {
                                console.error('Duplicate tag error, but could not extract title:', error);
                                throw error;
                            }
                        }
                        else {
                            console.error('Error inserting tags at addNewContentService:', error);
                            throw error;
                        }
                    }
                }
            });
            //inserting newTags
            yield insertTagsWithDuplicateTagsHandling(contentToAdd.newTags);
        }
        const data = {
            title: contentToAdd.title,
            tags: contentToAdd.tags || [],
            type: contentToAdd === null || contentToAdd === void 0 ? void 0 : contentToAdd.type,
        };
        const content = new ContentsModel_1.ContentModel(Object.assign(Object.assign({}, data), { createdBy: user === null || user === void 0 ? void 0 : user.id }));
        const response = yield content.save();
        return response;
    }
    catch (error) {
        console.error('Error at addNewContentService:', error);
        throw error;
    }
});
exports.addNewContentService = addNewContentService;
