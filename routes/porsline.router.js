import express from "express";
import { porslineController } from "../controller/index.js";

const router = express.Router();

router.get("/analysis", porslineController);

export default router;
