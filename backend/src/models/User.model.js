import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    googleId: { 
        type: String, 
        unique: true, 
        sparse: true },
    profilePicture:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerficationOtp: {
      type: String,
    },
    emailVerficationOtpExpiresAt: {
      type: Date,
    },
    passwordResetOtp: {
      type: String,
    },
    passwordResetOtpExpiresAt: {
      type: Date,
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
