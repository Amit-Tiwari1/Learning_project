import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config({
  path: "../../.env", // Adjust the path to point to the .env file correctly
});


export const sendOTPmail = async (email, OTP, full_name) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      logger: true,
      debug: true,
      secureConnection:false,
      auth: {
        user:"aktsln28@gmail.com", // Use environment variable for username
        pass:"ganluvtygomuihsi", // Use environment variable for password
      },
      tls:{
        rejectUnauthorized:true
      }
    });

    const content = `
      <p>Dear ${full_name},</p>
      <p>Thank you for choosing rider! To ensure the security of your account, we require you to complete the OTP (One-Time Password) verification process.</p>
      <p>Your OTP is: <strong>${OTP}</strong></p>
      <p>Please enter this code on the verification page to complete the process.</p>
      <p>If you did not request this verification, please ignore this email. Your account security is important to us, and we recommend changing your password immediately.</p>
      <p>Thank you for using Rider!</p>
      <p>Best Regards,<br/>
      stakeminds<br/>
      pta nhi</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_NAME, // Use environment variable for sender email
      to: email,
      subject: "OTP verification",
      html: content,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("OTP sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

export const sendLogInOTP = async (email, OTP, full_name) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      logger: true,
      debug: true,
      secureConnection:false,
      auth: {
        user: "aktsln28@gmail.com", // Use environment variable for username
        pass: "ganluvtygomuihsi", // Use environment variable for password
      },
      tls:{
        rejectUnauthorized:true
      }
    });

    const content = `
      <p>Dear ${full_name},</p>
      <p>Welcome to rider! To login, ensure the security of your account, we require you to complete the OTP (One-Time Password) verification process.</p>
      <p>Your OTP is: <strong>${OTP}</strong></p>
      <p>Please enter this code on the verification page to complete the process.</p>
      <p>If you did not request this verification, please ignore this email. Your account security is important to us, and we recommend changing your password immediately.</p>
      <p>Thank you for using stakeminds!</p>
      <p>Best Regards,<br/>
      stakeminds<br/>
      pta nhi</p>
    `;

    const mailOptions = {
      from: process.env.SMTP_NAME, // Use environment variable for sender email
      to: email,
      subject: "OTP verification",
      html: content,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Login OTP sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending login OTP email:", error);
  }
};
