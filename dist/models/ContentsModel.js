"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ContentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    type: {
        type: String,
        enum: ['facebook', 'youtube', 'twitter', 'linkedin', 'link']
    },
    tags: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: 'Tags'
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Users'
    }
});
exports.ContentModel = mongoose_1.default.model('Contents', ContentSchema);
