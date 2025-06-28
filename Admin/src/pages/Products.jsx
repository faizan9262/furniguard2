import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { backendUrl } from "./Add";

import {
  TbWood,
  TbSofa,
  TbToolsKitchen2,
  TbStairs,
  TbBulb,
  TbLayoutDashboard,
  TbArmchair,
  TbBath,
  TbWallpaper,
  TbWashMachine,
} from "react-icons/tb";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/components/ui/select";
import { Input } from "../components/components/ui/input";

const Products = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [category, setCategory] = useState("flooring");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/list`);
      if (response.data.success) {
        const allProducts = response.data.ratedProducts;
        setList(allProducts);
        setFilteredList(
          allProducts.filter((item) => item.category === category)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const filtered = list.filter((item) => item.category === category);
    setFilteredList(filtered);
  }, [category, list]);

  const categoryIcons = {
    flooring: <TbWood className="text-lg mr-2" />, // Wood floor icon
    livingroom: <TbSofa className="text-lg mr-2" />, // Sofa icon
    kitchen: <TbToolsKitchen2 className="text-lg mr-2" />, // Kitchen tools
    stairs: <TbStairs className="text-lg mr-2" />, // Stairs icon
    lights: <TbBulb className="text-lg mr-2" />, // Bulb (light)
    textile: <TbWashMachine className="text-lg mr-2" />, // Towel for textile
    layout: <TbLayoutDashboard className="text-lg mr-2" />, // Layout dashboard
    furniture: <TbArmchair className="text-lg mr-2" />, // Armchair
    bathroom: <TbBath className="text-lg mr-2" />, // Bathtub
    wallpaper: <TbWallpaper className="text-lg mr-2" />, // Wallpaper pattern
  };

  const categories = [
    "flooring",
    "livingroom",
    "kitchen",
    "stairs",
    "lights",
    "textile",
    "layout",
    "furniture",
    "bathroom",
    "wallpaper",
  ];

  const filteredProducts = list?.filter((product) => {
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
    <div className="px-6 sm:px-12 py-10 min-h-screen bg-gradient-to-br from-[#f1f5f9] to-[#e0f2f1]">
      {/* Header */}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-center gap-4 mb-10">
        {/* Search Input */}
        <Input
          placeholder="Search products..."
          className="w-full sm:w-[40%] border border-[#2d9b67] bg-white text-[#1c4532] placeholder:text-[#2d9b67] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2d9b67] shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Dropdown */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[200px] border-2 border-[#2d9b67] bg-white text-[#2d9b67] font-medium shadow-sm hover:shadow-md focus:ring-2 focus:ring-[#2d9b67] transition rounded-lg">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-[#2d9b67] text-[#2d9b67] rounded-md shadow-lg">
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="hover:bg-[#2d9b67]/10 focus:bg-[#2d9b67]/20 text-[#2d9b67] font-medium px-4 py-2 transition-all cursor-pointer flex items-center"
              >
                <span className="flex items-center">
                  {categoryIcons[cat]}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1c4532] tracking-tight">
          {category.charAt(0).toUpperCase() + category.slice(1)} Collection
        </h1>
        <p className="text-[#2d9b67] text-sm mt-1 italic">
          {category === "kitchen"
            ? "Cook up beauty and functionality 🍳"
            : category === "bathroom"
            ? "Refresh your sanctuary 🛁"
            : category === "furniture"
            ? "Style meets comfort 🪑"
            : category === "lights"
            ? "Illuminate your vision 💡"
            : category === "wallpaper"
            ? "Style your walls, style your soul 🖼️"
            : "Explore our hand-picked finest pieces ✨"}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-lg">
          No products found in this category
        </p>
      ) : (
        <div className="grid gap-8 cursor-pointer sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Price Tag */}
              <div className="absolute top-3 right-3 bg-[#2d9b67] text-white text-xs px-3 py-1 rounded-full font-semibold transition-all duration-300 shadow-md">
                ₹{item.price}
              </div>

              {/* Category Label */}
              <div className="absolute top-0 left-0 bg-gradient-to-r from-[#2d9b67] to-[#47b881] text-white text-xs px-3 py-1 rounded-br-2xl font-medium tracking-wide">
                {item.category}
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover rounded-t-2xl border-b border-gray-200"
              />

              {/* Details */}
              <div className="p-4">
                <CardTitle className="text-xl font-semibold text-primary mb-1">
                  {item.name}
                </CardTitle>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
