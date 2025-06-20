import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    designer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DesignerModel",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("ProductModel", productSchema);
