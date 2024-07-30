import express from "express";
import {
  youtubeLiveHandler
} from "../controllers/youtubeCtrl";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/live",youtubeLiveHandler)


export default router;
