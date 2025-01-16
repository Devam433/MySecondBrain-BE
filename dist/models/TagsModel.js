"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TagsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        unique: true,
    }
});
exports.TagsModel = mongoose_1.default.model('Tags', TagsSchema);
