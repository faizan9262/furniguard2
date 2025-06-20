import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // ✅ corrected typo
  },
  email: {
    type: String,
    required: true, // ✅ corrected typo
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  role: {
    type: String,
    enum: ["user", "designer", "admin"],
    default: "user",
  },
  designerProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designer",
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
    },
  ],

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
}, { timestamps: true });

export const UserModel = mongoose.model("UserModel", userSchema);
