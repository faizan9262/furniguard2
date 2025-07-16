import express from "express";
import {
  changeProfilePic,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendPassswordResetOtp,
  sendVerifyEmailOtp,
  updatePassword,
  verifyEmailOtp,
  verifyUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/token-manager.js";
import upload, { uploadToCloudinary } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyToken, logoutUser);
// userRouter.post("/admin/login", admiLogin);
// userRouter.get("/admin/logout", adminLogout);
userRouter.get("/admin/check-auth", adminAuth, (req, res) => {
  res.json({
    success: true,
    message: "Authenticated as admin",
  });
});
userRouter.get("/is-auth", verifyToken, verifyUser);
userRouter.get("/admin/is-auth", adminAuth, verifyUser);
userRouter.get("/send-email-otp", verifyToken, sendVerifyEmailOtp);
userRouter.post("/verify-email-otp", verifyToken, verifyEmailOtp);
userRouter.post("/forgot-password", sendPassswordResetOtp);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/update-password", verifyToken, updatePassword);
userRouter.post(
  "/update-profile-pic",
  verifyToken,
  upload.single("profile"),
  uploadToCloudinary("Melodify"),
  changeProfilePic
);

export default userRouter;
