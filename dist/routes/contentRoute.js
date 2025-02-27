"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_mjs_1 = require("../controllers/contentController.mjs");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const router = express_1.default.Router();
router.post('/', verifyTokenMiddleware_1.verifyTokenMiddleware, contentController_mjs_1.addContent);
router.get('/', verifyTokenMiddleware_1.verifyTokenMiddleware, contentController_mjs_1.getAllContents);
router.delete(':id', verifyTokenMiddleware_1.verifyTokenMiddleware, contentController_mjs_1.deleteContent);
exports.default = router;
