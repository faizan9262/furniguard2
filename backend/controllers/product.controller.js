import { v2 as cloudinary } from "cloudinary";
import { ProductModel } from "../models/product.model.js";
import { Rating } from "../models/rating.model.js";
import mongoose from "mongoose";

const addProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    // Corrected: Accessing single uploaded image
    const product_img = req.file;

    let imageUrl = "";
    if (product_img) {
      try {
        let result = await cloudinary.uploader.upload(product_img.path, {
          resource_type: "image",
        });
        imageUrl = result.secure_url; // Store the image URL
      } catch (error) {
        console.log(error);
        // Return after sending the error response to prevent further execution
        return res.json({
          success: false,
          message: error.message,
        });
      }
    } else {
      // Return after sending the error response if no image is provided
      return res.json({
        success: false,
        message: "No image file provided",
      });
    }

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      price,
      image: imageUrl,
    };

    // Save the product in the database
    const product = new ProductModel(productData);
    await product.save();

    // Return success response after saving product
    return res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    // Return error response in case of any other error
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    const ratedProducts = await Promise.all(
      products.map(async (product) => {
        const stats = await Rating.aggregate([
          {
            $match: {
              targetType: "product",
              targetId: new mongoose.Types.ObjectId(product._id),
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
          ...product.toObject(),
          averageRating: stats[0]?.averageRating || 0,
          totalRatings: stats[0]?.totalRatings || 0,
        };
      })
    );

    res.status(200).json({
      success: true,
      ratedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching products details.",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Product Removed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const signleProduct = async (req, res) => {
  try {
    const singleProduct = await ProductModel.findById(req.body.id);

    res.json({
      success: true,
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, listProducts, removeProduct, signleProduct };
