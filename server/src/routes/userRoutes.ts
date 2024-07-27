import express from "express";
import { signUp, signIn } from "../controllers/userCtrl";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

export default router;
