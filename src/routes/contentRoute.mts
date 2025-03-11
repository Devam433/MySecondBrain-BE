import express from "express";
import { addContent, deleteContent, getAllContents } from "../controllers/contentController.mjs";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const router = express.Router()

router.post('/', verifyTokenMiddleware, async (req, res, next) => {
  try {
    await addContent(req, res);
  } catch (error) {
    next(error);
  }
})
router.get('/', verifyTokenMiddleware, async (req, res, next) => {
  try {
    await getAllContents(req, res);
  } catch (error) {
    next(error);
  }
})
router.delete('/:id', verifyTokenMiddleware, async (req, res, next) => {
  try {
    await deleteContent(req, res);
  } catch (error) {
    next(error);
  }
})
export default router
