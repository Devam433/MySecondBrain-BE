import express from "express";
import { addContent, deleteContent, getAllContents } from "../controllers/contentController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";

const router = express.Router()

router.post('/',verifyTokenMiddleware,addContent)
router.get('/',verifyTokenMiddleware,getAllContents)
router.delete(':id',verifyTokenMiddleware,deleteContent)
export default router
