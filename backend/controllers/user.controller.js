import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createToken } from "../utils/token-manager.js";
import {
  htmlContent,
  htmlLoginAlertContent,
  htmlRegisterContent,
} from "../utils/mailLayoutHtml.js";
import { sendMail } from "../utils/sendmail.js";
import { generateOtp } from "../utils/generateOtp.js";
import { Designer } from "../models/designer.model.js";
import { UserModel } from "../models/user.model.js";
dotenv.config();

const USER_COOKIE_NAME = "auth-cookie";
const ADMIN_COOKIE_NAME = "admin-cookie";
const COOKIE_OPTIONS = {
  path: "/",
  domain: "localhost",
  httpOnly: true,
  signed: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All credentials are required!" });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 characters" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%&]/;

    if (!uppercaseRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!numberRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    if (!symbolRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one special character (!@#$%&)",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new UserModel({
      username: name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    if (role === "designer") {
      const designer = new Designer({ user: user._id });
      await designer.save();
      user.designerProfile = designer._id;
      await user.save();
    }

    const token = createToken(user._id.toString(), email, "7d");

    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    const mailSubject = "Thank you for Registering with Fruniguard!";
    const mailHtml = htmlRegisterContent();

    await sendMail(user.email, mailSubject, mailHtml);

    const populatedUser = await UserModel.findById(user._id)
      .populate("designerProfile")
      .select("-password");

    const responseData = {
      message: "User registered successfully",
      id: populatedUser._id,
      name: populatedUser.username,
      email: populatedUser.email,
      profilePic: populatedUser.profilePicture,
      role: populatedUser.role,
    };

    if (populatedUser.role === "designer" && populatedUser.designerProfile) {
      responseData.designerProfile = populatedUser.designerProfile;
    }

    return res.status(201).json(responseData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during signup." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All credentials are required!" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    if (user.role === "admin") {
      const token = createToken(user._id.toString(), email, "7d");

      res.clearCookie(ADMIN_COOKIE_NAME, COOKIE_OPTIONS);
      res.cookie(ADMIN_COOKIE_NAME, token, COOKIE_OPTIONS);

      return res.status(200).json({
        id: user._id,
        name: user.username,
        email: user.email,
        profilePic: user.profilePicture,
        role: user.role,
      });
    }

    const token = createToken(user._id.toString(), email, "7d");

    res.clearCookie(USER_COOKIE_NAME, COOKIE_OPTIONS);
    res.cookie(USER_COOKIE_NAME, token, COOKIE_OPTIONS);
    console.log("Req.cookies: ",req.cookie);
    

    const mailSubject = "New Login";
    const mailHtml = htmlLoginAlertContent();

    await sendMail(user.email, mailSubject, mailHtml);

    return res.status(200).json({
      id: user._id,
      name: user.username,
      email: user.email,
      profilePic: user.profilePicture,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong during login." });
  }
};

// export const admiLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       // console.log("Admin Toekn in controller: ",token);

//       res.cookie("admin-token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });

//       res.json({
//         success: true,
//         message: "Admin Logged In",
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }
//   } catch (error) {
//     console.log(error);

//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const adminLogout = (req, res) => {
//   try {
//     res.clearCookie("admin-token", {
//       httpOnly: true,
//       secure: false, // set to true in production if using HTTPS
//       sameSite: "lax",
//     });

//     res.json({
//       success: true,
//       message: "Admin logged out successfully",
//     });
//   } catch (error) {
//     console.log("Logout Error: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong during logout",
//     });
//   }
// };

export const logoutUser = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while authorization" });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({
      message: "OK",
      name: user.username,
      email: user.email,
      profilePic: user.profilePicture,
      emailVerified: user.emailVerified,
      role: user.role,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while authorization" });
  }
};

export const sendVerifyEmailOtp = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const otp = generateOtp();
    user.emailVerficationOtp = otp;
    user.emailVerficationOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const mailSubject = "Email Verification Otp.";
    const mailHtml = htmlContent(otp);

    await sendMail(user.email, mailSubject, mailHtml);

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while sending email verification OTP",
    });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await UserModel.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.emailVerficationOtp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (user.emailVerficationOtpExpiresAt < new Date()) {
      return res.status(401).json({ message: "OTP Expired" });
    }

    user.emailVerficationOtp = "";
    user.emailVerficationOtpExpiresAt = 0;
    user.emailVerified = true;
    await user.save();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while email verification",
    });
  }
};

export const sendPassswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    const otp = generateOtp();
    user.passwordResetOtp = otp;
    user.passwordResetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const mailSubject = "Password Reset Otp.";
    const mailHtml = htmlContent(otp);

    await sendMail(user.email, mailSubject, mailHtml);

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while sending password reset OTP",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword, email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist or token malfunctioned" });
    }

    if (user.passwordResetOtp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (user.passwordResetOtpExpiresAt < new Date()) {
      return res.status(401).json({ message: "OTP expired" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 characters" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%&]/;

    if (!uppercaseRegex.test(newPassword)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!numberRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    if (!symbolRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must contain at least one special character (!@#$%&)",
      });
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);

    user.passwordResetOtp = "";
    user.passwordResetOtpExpiresAt = 0;
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while resetting password" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist or token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatchedPassword = await bcryptjs.compare(
      oldPassword,
      user.password
    );

    if (!isMatchedPassword) {
      if (!isPasswordMatched) {
        return res.status(403).json({ message: "Invalid Previous Password!" });
      }
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 characters" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%&]/;

    if (!uppercaseRegex.test(newPassword)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!numberRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    if (!symbolRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must contain at least one special character (!@#$%&)",
      });
    }

    const newHashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating password" });
  }
};

export const changeProfilePic = async (req, res) => {
  try {
    // console.log("Request file:", req.file.path);
    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist or token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = user._id;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // console.log("File received:", req.file);

    const imageUrl = req.file.path;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.error("Error changing profile picture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
