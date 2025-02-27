import express from "express";
import { addContent, deleteContent, getAllContents } from "../controllers/contentController.mjs";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const router = express.Router()

router.post('/',verifyTokenMiddleware,addContent)
router.get('/',verifyTokenMiddleware,getAllContents)
router.delete(':id',verifyTokenMiddleware,deleteContent)
export default router
