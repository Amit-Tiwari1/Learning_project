import { sendOTPmail } from "../utils/sendMail.js";
import { generateOTP } from "../utils/otpfuncation.js";
import User from "../models/user.model.js"; // Make sure you import the correct model
import { ErrorResponse } from "../utils/ApiError.js";
import { apiResponse } from "../utils/ApiResponse.js";
import { verifyOTP } from "../utils/otpVerification.js";

export const registerUser = async (req, res) => {
  try {
    const newUser = req.body;

    console.log("New user data:", newUser.user_Email);

    // Check if the user already exists
    const existingUser = await User.findOne({ user_Email: newUser.user_Email });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(409).json(ErrorResponse("Email already registered"));
    }

    // Generate OTP
    const otp = generateOTP();

    // Create user record with OTP
    const user = await User.create({ ...newUser, otp });

    // Send OTP via email
    await sendOTPmail(user.user_Email, otp, user.user_Name);

    return res
      .status(200)
      .json(
        apiResponse(
          { email: user.user_Email },
          "OTP has been sent to your registered email!"
        )
      );
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json(ErrorResponse(error, "Error registering user"));
  }
};

export const authenticateUser = async (req, res) => {
  const { userId, expectedOTP } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(ErrorResponse("User not found"));
    }

    const isVerified = verifyOTP(user.otp, expectedOTP);

    if (isVerified) {
      // Update user authentication status and set otp to null
      await User.findByIdAndUpdate(userId, {
        isAuthenticated: true,
        otp: null,
      });

      return res
        .status(200)
        .json(apiResponse(null, "OTP Verified! User registered successfully!"));
    } else {
      return res.status(400).json(ErrorResponse("OTP verification failed"));
    }
  } catch (error) {
    console.error("Error updating user authentication status:", error);
    return res
      .status(500)
      .json(ErrorResponse(error, "Error updating user authentication status"));
  }
};

export const resendOTPForUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ user_Email: email });
    if (!user) {
      return res.status(404).json(ErrorResponse("User not found"));
    }

    // Generate a new OTP
    const otp = generateOTP();

    // Update user record with the new OTP
    await User.findByIdAndUpdate(user._id, { otp });

    // Send OTP via email
    await sendOTPmail(user.user_Email, otp, user.user_Name);

    return res
      .status(200)
      .json(apiResponse(null, "OTP has been resent to your registered email!"));
  } catch (error) {
    console.error("Error resending OTP:", error);
    return res.status(500).json(ErrorResponse(error, "Error resending OTP"));
  }
};

export const getAll = async (req, res) => {
  const userData = req.body;
  console.log("userdata", userData);
  try {
    const user_Data = await User.findOne({ user_Email: userData.user_Email });
    console.log("user_data", user_Data);
    if (user_Data) {
      return res.status(200).json(apiResponse(user_Data, "successfully!"));
    } else {
      return res.status(200).json(apiResponse(null, "successfully!"));
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    return res
      .status(500)
      .json(ErrorResponse(error, "Error getting user data"));
  }
};
