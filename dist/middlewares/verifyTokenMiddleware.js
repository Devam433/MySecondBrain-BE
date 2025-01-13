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
exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const verifyTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.headers.authorization || !((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer'))) {
            res.status(500).json({ success: false, message: 'Authorization headers or token missing or Invalid authorization format, ensure Bearer is included!' });
        }
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            res.status(500).json({ success: false, message: 'Token is empty!' });
            return;
        }
        console.log(token);
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            res.status(500).json({ message: 'JWT_SECRET not defined!' });
            return;
        }
        const decodedJWT = jsonwebtoken_1.default.verify(token, jwtSecret);
        console.log('decodedJwt', decodedJWT);
        req.user = decodedJWT;
        console.log('req.user', req.user);
        next();
    }
    catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, error: 'Token is not valid' });
    }
});
exports.verifyTokenMiddleware = verifyTokenMiddleware;
