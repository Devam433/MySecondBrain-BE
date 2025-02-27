"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const verifyTokenMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization?.startsWith('Bearer')) {
            res.status(500).json({ success: false, message: 'Authorization headers or token missing or Invalid authorization format, ensure Bearer is included!' });
        }
        const token = req.headers.authorization?.split(' ')[1];
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
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
