import express from "express";
import { commentController } from "../controller/index.js";

const router = express.Router();

router.post("/", commentController.storeComment)

export default router;