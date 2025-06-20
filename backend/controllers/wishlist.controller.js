import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.model.js";

export const addToWishlist = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);
    const { productId } = req.body;

    if (!user)
      return res
        .status(401)
        .json({ message: "User not found or token malfunctioned." });

    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({ message: "Unauthorized access." });

    if (!productId) {
      return res.status(400).json({ message: "Product not seleted." });
    }

    const seletedProduct = await ProductModel.findById(productId);

    if (!seletedProduct) {
      return res.status(400).json({ message: "Product not Found." });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(409).json({ message: "Product already in wishlist." });
    }

    user.wishlist.push(productId);
    user.save();

    return res.status(200).json({
      message: "Product added to wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getAllWishlistProducts = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "User not found or token malfunctioned." });

    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({ message: "Unauthorized access." });

    const products = await ProductModel.find({
      _id: { $in: user.wishlist },
    });

    res.status(200).json({products});
  } catch (error) {
    console.error("Error in addToWishlist:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const user = await UserModel.findById(res.locals.jwtData.id);
    const { productId } = req.body;

    if (!user)
      return res
        .status(401)
        .json({ message: "User not found or token malfunctioned." });

    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({ message: "Unauthorized access." });

    if (!productId) {
      return res.status(400).json({ message: "Product not seleted." });
    }

    user.wishlist.pop(productId);
    user.save();

    return res.status(200).json({
      message: "Product Removed to wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Error in removeFromWishlist:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
