// models/ReadStatus.js
import mongoose from "mongoose";

const readStatusSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "UserModel",
  },
  lastRead: {
    type: Date,
    default: null,
  },
});

export const ReadStatus = mongoose.model("ReadStatus", readStatusSchema);
