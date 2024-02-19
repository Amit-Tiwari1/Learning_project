import express from 'express';
import {isAuthenticated, register,resendOTP} from '../controllers/rider.controller.js';

const router = express.Router();

// Route to add a new rider
router.post('/riders/add', register);
router.post("/verify",isAuthenticated)
router.post('/resend-otp', resendOTP);

export default router;
