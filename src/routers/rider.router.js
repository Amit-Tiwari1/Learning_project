import express from "express";
import {
  register,
  resendOTP,
  isAuthenticated,
} from "../controllers/rider.controller.js";

const router = express.Router();

router.post("/riders/add", register);

router.post("/riders/verify", isAuthenticated);

router.post("/riders/resend-otp", resendOTP);

export default router;
