import { Rating } from "../models/rating.model.js";
import { UserModel } from "../models/user.model.js";

export const rateItem = async (req, res) => {
  try {
    const { designer, products } = req.body;

    const user = await UserModel.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = user._id;

    const results = [];

    // 1. Handle designer rating
    if (designer?.targetId && designer?.rating) {
      const updatedDesignerRating = await Rating.findOneAndUpdate(
        { userId, targetType: "designer", targetId: designer.targetId },
        {
          rating: designer.rating,
          reviewText: designer.reviewText,
          updatedAt: new Date(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      results.push(updatedDesignerRating);
    }

    // 2. Handle product ratings
    if (Array.isArray(products)) {
      for (const product of products) {
        if (!product.targetId || !product.rating) continue;

        const updatedProductRating = await Rating.findOneAndUpdate(
          { userId, targetType: "product", targetId: product.targetId },
          {
            rating: product.rating,
            reviewText: product.reviewText,
            updatedAt: new Date(),
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        results.push(updatedProductRating);
      }
    }

    res.status(200).json({
      message: "Ratings submitted successfully",
      data: results.map((r) => ({
        userId: r.userId,
        targetType: r.targetType,
        targetId: r.targetId,
        rating: r.rating,
        reviewText: r.reviewText,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while submitting ratings",
    });
  }
};

export const getRatingsForProduct = async (req, res) => {
  try {
    const ratings = await Rating.find({
      targetType: "product",
      targetId: req.params.productId,
    })
      .sort({ updatedAt: -1 })
      .populate("userId", "username profilePicture"); // <-- only fetch needed fields

    res.status(200).json({ message: "OK", data: ratings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product ratings" });
  }
};

export const getRatingsForDesigner = async (req, res) => {
  try {
    const ratings = await Rating.find({
      targetType: "designer",
      targetId: req.params.designerId,
    })
      .sort({ updatedAt: -1 })
      .populate("userId", "username profilePicture");

    res.status(200).json({ message: "OK", data: ratings });
  } catch (err) {
    res.status(500).json({ message: "Error fetching designer ratings" });
  }
};
