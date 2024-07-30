import express from "express";
import {
  checkOrInitiateSignIn,
  createPlatform,
  getPlatformDetail,
  getPlatformList,
} from "../controllers/platformCtrl";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/check",checkOrInitiateSignIn)

router.post("/create", createPlatform);

router.get("/all", getPlatformList);

router.post("/:platformId", getPlatformDetail);

export default router;
