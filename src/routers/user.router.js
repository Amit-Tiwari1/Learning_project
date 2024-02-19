import express from "express";
import {
  registerUser,
  authenticateUser,
  resendOTPForUser,
  getAll,
} from "../controllers/user.controller.js";

const router = express.Router();

// Route to register a new user
router.post("/users/register", registerUser);

// Route to authenticate user
router.post("/users/authenticate", authenticateUser);

// Route to resend OTP for user
router.post("/users/resend-otp", resendOTPForUser);

// Route to get all users
router.post("/users/getall", getAll);

export default router;
