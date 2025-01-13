"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const shareLinkController_1 = require("../controllers/shareLinkController");
const router = express_1.default.Router();
router.post('/', verifyTokenMiddleware_1.verifyTokenMiddleware, shareLinkController_1.createOrDeleteLink);
router.get('/:hash', shareLinkController_1.getShareLink);
exports.default = router;
