"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewContentService = void 0;
const ContentsModel_1 = require("../models/ContentsModel");
const TagsModel_1 = require("../models/TagsModel");
const addNewContentService = async (contentToAdd, user) => {
    try {
        console.log('this is contentToAdd', contentToAdd);
        // Handle new tags
        if (contentToAdd.newTags.length > 0) {
            const insertTagsWithDuplicateTagsHandling = async (tags) => {
                while (tags.length > 0) {
                    try {
                        //insert new tags (@param tags)
                        const newTags = await TagsModel_1.TagsModel.insertMany(tags);
                        //Push the new tags' _ids to contentToAdd.tags
                        contentToAdd.tags = [...(contentToAdd.tags || []), ...newTags.map((tag) => tag._id)];
                        break;
                    }
                    catch (error) {
                        if (error.code === 11000) { // Duplicate tag error
                            const duplicateTitle = error.writeErrors[0]?.err?.op?.title; // Get duplicate tag title
                            if (duplicateTitle) {
                                const existingTag = await TagsModel_1.TagsModel.findOne({ title: duplicateTitle });
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
            };
            //inserting newTags
            await insertTagsWithDuplicateTagsHandling(contentToAdd.newTags);
        }
        const data = {
            title: contentToAdd.title,
            tags: contentToAdd.tags || [],
            type: contentToAdd?.type,
        };
        const content = new ContentsModel_1.ContentModel({ ...data, createdBy: user?.id });
        const response = await content.save();
        return response;
    }
    catch (error) {
        console.error('Error at addNewContentService:', error);
        throw error;
    }
};
exports.addNewContentService = addNewContentService;
