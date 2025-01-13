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
exports.signUp = exports.signIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UsersModel_1 = require("../models/UsersModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = req.body;
    try {
        const user = yield UsersModel_1.UsersModel.findOne({ userName: userDetails.userName });
        if ((user === null || user === void 0 ? void 0 : user.password) && (yield bcrypt_1.default.compare(userDetails.password, user.password))) {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                res.status(500).json({ message: 'JWT_SECRRET is not defined in environment file' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, }, jwtSecret, { expiresIn: "1h" });
            res.status(200).json({ success: true, message: 'SignIn success', token });
        }
        else {
            res.status(501).json({ success: false, message: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.log('Error at signin!', error);
        res.status(500).json({ success: false, message: 'Error while sign in', error: error });
    }
});
exports.signIn = signIn;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const userDetails = req.body;
    const hashedPassowrd = yield bcrypt_1.default.hash(userDetails.password, 5);
    userDetails.password = hashedPassowrd;
    try {
        const userExists = yield UsersModel_1.UsersModel.findOne({ userName: userDetails.userName });
        if (userExists) {
            res.status(401).json({ success: true, message: 'Conflict, userName not available.' });
        }
        const user = new UsersModel_1.UsersModel(userDetails);
        const response = yield user.save();
        res.status(200).json({ success: true, message: 'Sign up success!' });
    }
    catch (error) {
        console.log('Error at signUp', error);
        res.status(500).json({ success: false, error: error });
    }
});
exports.signUp = signUp;
