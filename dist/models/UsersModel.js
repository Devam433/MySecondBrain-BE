"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UsersSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    }
}, { timestamps: true });
exports.UsersModel = mongoose_1.default.model('Users', UsersSchema);
