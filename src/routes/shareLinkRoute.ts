import express from "express"
import {verifyTokenMiddleware} from "../middlewares/verifyTokenMiddleware"
import { createOrDeleteLink, getShareLink } from "../controllers/shareLinkController"
const router = express.Router()

router.post('/',verifyTokenMiddleware,createOrDeleteLink)
router.get('/:hash',getShareLink)

export default router;