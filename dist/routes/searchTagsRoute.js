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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TagsModel_1 = require("../models/TagsModel");
const router = express_1.default.Router();
router.post('/search-tag/:key', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield TagsModel_1.TagsModel.find({ "$or": [{ title: { $regex: req.params.key, $options: 'i' } }] });
        res.send(data);
    }
    catch (error) {
        console.log('Error at /search-tag controller');
        res.status(500).json({ success: false, message: "An error occured while searching tag!" });
    }
}));
exports.default = router;
