import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    targetType: {
      type: String,
      enum: ["product", "designer"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
ratingSchema.index({ userId: 1, targetType: 1, targetId: 1 }, { unique: true });

export const Rating = mongoose.model("Rating", ratingSchema);
