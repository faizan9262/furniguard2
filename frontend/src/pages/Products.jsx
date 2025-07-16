import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/components/ui/input";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import {
  TbBath,
  TbWood,
  TbArmchair,
  TbToolsKitchen2,
  TbLayoutDashboard,
  TbBulb,
  TbSofa,
  TbStairs,
  TbWashMachine,
  TbWallpaper,
} from "react-icons/tb";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { motion } from "framer-motion";

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const product = useProduct();
  const [searchQuery, setSearchQuery] = useState("");

  const categoryIcons = {
    bathroom: <TbBath className="text-xl text-white" />, // Bathtub
    flooring: <TbWood className="text-xl text-white" />, // Wood floor icon
    furniture: <TbArmchair className="text-xl text-white" />, // Armchair
    kitchen: <TbToolsKitchen2 className="text-xl text-white" />, // Kitchen tools
    layout: <TbLayoutDashboard className="text-xl text-white" />, // Layout dashboard
    lights: <TbBulb className="text-xl text-white" />, // Bulb (light)
    livingroom: <TbSofa className="text-xl text-white" />, // Sofa icon
    stairs: <TbStairs className="text-xl text-white" />, // Stairs icon
    textile: <TbWashMachine className="text-xl text-white" />, // Towel for textile
    wallpaper: <TbWallpaper className="text-xl text-white" />, // Wallpaper pattern
  };

  const categories = [
    "bathroom",
    "flooring",
    "furniture",
    "kitchen",
    "layout",
    "lights",
    "livingroom",
    "stairs",
    "textile",
    "wallpaper",
  ];

  const getTitle = () => {
    if (!category || category === "all") return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const allProducts = product.products;

  const filteredProducts = allProducts?.filter((product) => {
    const matchCategory =
      !category || category === "all" || product.category === category;

    const title = product?.title || product?.name || "";
    const description = product?.description || "";

    const matchSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-white via-[#f0fdf4] to-[#e6fffa]">
      {/* Stunning Header */}
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
        <Input
          placeholder="Search products..."
          className="sm:w-1/2 border-b-4 border-r-4 border-[#2d9b67]/40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={category || "all"}
          onValueChange={(value) =>
            navigate(`/products/${value === "all" ? "" : value}`)
          }
        >
          <SelectTrigger className="w-[200px] border-b-4 border-r-4 border-[#2d9b67]/40 bg-white text-[#2d9b67] font-medium">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-[#2d9b67] text-[#2d9b67]">
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="flex items-center gap-2"
              >
                {categoryIcons[cat]}
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Title Section - Elegant Glow Title */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1c4532] relative inline-block"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {categoryIcons[category] || (
              <TbLayoutDashboard className="text-3xl text-[#2d9b67]" />
            )}
            <span>{getTitle()}</span>
          </span>
          {/* Glow effect */}
          <span className="absolute inset-0 bg-[#2d9b67]/10 blur-2xl rounded-xl z-0 animate-pulse"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base text-gray-600 mt-3 max-w-xl mx-auto"
        >
          {category
            ? `Explore visionary picks in ${getTitle().toLowerCase()} that blend elegance with function.`
            : "Discover beautiful, practical designs across categories. Crafted to inspire."}
        </motion.p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              img_src={product.image || product.images[0]}
              title={product.name}
              description={product.description}
              category={product.category}
              price={product.price}
              onClick={() =>
                navigate(`/products/${product.category}/${product._id}`)
              }
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
