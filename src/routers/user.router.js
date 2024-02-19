import express from 'express';
import { registerUser, authenticateUser, resendOTPForUser, getAll } from '../controllers/user.controller.js';

const router = express.Router();
console.log("router working");

router.post('/user/register', registerUser);
router.post('/authenticate', authenticateUser);
router.post('/resend-otp', resendOTPForUser);
router.post('/user/getall',getAll)

export default router;
