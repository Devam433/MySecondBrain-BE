"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TagsModel_1 = require("../models/TagsModel");
const router = express_1.default.Router();
router.post('/search-tag/:key', async (req, res) => {
    try {
        const data = await TagsModel_1.TagsModel.find({ "$or": [{ title: { $regex: req.params.key, $options: 'i' } }] });
        res.send(data);
    }
    catch (error) {
        console.log('Error at /search-tag controller');
        res.status(500).json({ success: false, message: "An error occured while searching tag!" });
    }
});
exports.default = router;
