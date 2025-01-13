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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShareLink = exports.createOrDeleteLink = void 0;
const LinkModel_1 = require("../models/LinkModel");
const utils_1 = require("../utils");
const ContentsModel_1 = require("../models/ContentsModel");
const createOrDeleteLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        const user = req.user;
        const hash = (0, utils_1.generateHash)(30);
        if (share) {
            // const existingLink = await LinkModel.findOne({userId:user?.id})
            // if(existingLink) {
            //   res.status(200).json({success:true,message:'Share Link already exists',Link:{link:existingLink.hash}})
            //   return;
            // }
            // const Link = new LinkModel({hash,userId:user?.id})
            // const response = await Link.save();
            const response = yield LinkModel_1.LinkModel.findOneAndUpdate({ userId: user === null || user === void 0 ? void 0 : user.id }, { hash, userId: user === null || user === void 0 ? void 0 : user.id }, { upsert: true, new: true });
            res.status(200).json({ success: true, message: 'Share link created', Link: { link: response.hash } });
            return;
        }
        else {
            // const existingLink = await LinkModel.findOne({userId:user?.id})
            // if(!existingLink) {
            //   res.status(404).json({success:false,message:'Previous Link document not found.'})
            //   return;
            // }
            // await LinkModel.deleteOne({userId:user?.id});
            const existingLink = yield LinkModel_1.LinkModel.findOneAndDelete({ userId: user === null || user === void 0 ? void 0 : user.id });
            if (!existingLink) {
                res.status(404).json({ success: false, message: 'Previous Link document not found.' });
                return;
            }
            res.status(200).json({ success: true, message: 'Link removed successfully.' });
        }
    }
    catch (error) {
        console.log('Error at createOrDeleteLink');
        res.status(500).json({ success: false, message: 'An expected error!', error });
    }
});
exports.createOrDeleteLink = createOrDeleteLink;
const getShareLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.params.hash;
        const hash = param.replace(':', '');
        const Link = yield LinkModel_1.LinkModel.findOne({ hash });
        if (!Link) {
            res.status(404).json({ success: false, message: 'Shared Brain not found!' });
            return;
        }
        const contents = yield ContentsModel_1.ContentModel.find({ createdBy: Link.userId });
        res.status(200).json({ success: true, contents });
        return;
    }
    catch (error) {
        console.log('An error occured at getShareLink', error);
        res.status(500).json({ success: false, message: 'An expected error!', error });
    }
});
exports.getShareLink = getShareLink;
