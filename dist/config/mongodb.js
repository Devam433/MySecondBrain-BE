"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = connectMongoDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectMongoDB(url) {
    try {
        await mongoose_1.default.connect(url);
        console.log("✅ Connected to MongoDB Atlas");
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed", error);
    }
}
