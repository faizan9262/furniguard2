import mongoose from "mongoose";
import { Designer } from "../models/designer.model.js";
import { Rating } from "../models/rating.model.js";

export const getAllDesingers = async (req, res) => {
  try {
    const designers = await Designer.find().populate({
      path: "user",
      select: "-password -appointments -designerProfile",
    });

    const ratedDesigners = await Promise.all(
      designers.map(async (designer) => {
        const stats = await Rating.aggregate([
          {
            $match: {
              targetType: "designer",
              targetId: new mongoose.Types.ObjectId(designer._id),
            },
          },
          {
            $group: {
              _id: "$targetId",
              averageRating: { $avg: "$rating" },
              totalRatings: { $sum: 1 },
            },
          },
        ]);

        return {
          ...designer.toObject(),
          averageRating: stats[0]?.averageRating || 0,
          totalRatings: stats[0]?.totalRatings || 0,
        };
      })
    );

    res.status(200).json(ratedDesigners);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during fetching all designers." });
  }
};

