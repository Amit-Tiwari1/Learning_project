import moment from "moment";
import { sendOTPmail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/otpfuncation.js";
import { verifyOTP } from "../utils/otpVerification.js";
import Rider from "../models/rider.model.js";
import { ErrorResponse } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";

export const register = async (req, res) => {
  try {
    const newRiderData = req.body;

    // Check if email is already registered
    const existingRider = await Rider.findOne({ where: { email: newRiderData.email } });
    if (existingRider) {
      return res.status(409).json(ErrorResponse("Email already registered"));
    }

    // Generate OTP
    const otp = generateOTP();

    // Create rider record with otp
    const newRider = await Rider.create({ ...newRiderData, otp });

    // Send OTP via email
    await sendOTPmail(newRider.email, otp, newRider.fullName);

    return res.status(200).json(apiResponse({ email: newRider.email }, "OTP has been sent to your registered email!"));
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json(ErrorResponse(error, "Error registering user"));
  }
};

export const isAuthenticated = async (req, res) => {
  const { userId, expectedOTP } = req.body;
  console.log("userid and expectedotp", userId, expectedOTP);

  try {
    const rider = await Rider.findByPk(userId); // Change this line
    if (!rider) {
      return res.status(404).json(ErrorResponse("User not found"));
    }
    console.log("rider data", rider);

    const isVerified = verifyOTP(rider.otp, expectedOTP);

    if (isVerified) {
      // Update user authentication status and set otp to null
      await Rider.update({ isAuthenticated: true, otp: null }, { where: { Rider_Id: userId } });

      return res.status(200).json(apiResponse(null, "OTP Verified! User registered successfully!"));
    } else {
      return res.status(400).json(ErrorResponse("OTP verification failed"));
    }
  } catch (error) {
    console.error("Error updating user authentication status:", error);
    return res.status(500).json(ErrorResponse(error, "Error updating user authentication status"));
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the rider by email
    const rider = await Rider.findOne({ where: { email } });
    if (!rider) {
      return res.status(404).json(ErrorResponse("User not found"));
    }
    console.log("rider data resend response",rider);

    // Generate a new OTP
    const otp = generateOTP();

    // Update rider record with the new OTP
    await rider.update({ otp });

    // Send OTP via email
    await sendOTPmail(rider.email, otp, rider.fullName);

    return res.status(200).json(apiResponse(null, "OTP has been resent to your registered email!"));
  } catch (error) {
    console.error("Error resending OTP:", error);
    return res.status(500).json(ErrorResponse(error, "Error resending OTP"));
  }
};