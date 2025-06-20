import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/components/ui/select";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const product = useProduct();
  const [searchQuery, setSearchQuery] = useState("");

  // console.log("Products:",product.products);
  const categories = [
    { key: "all", label: "All" },
    { key: "furniture", label: "Furniture" },
    { key: "lights", label: "Lights" },
    { key: "stairs", label: "Staircase" },
    { key: "textile", label: "Textile" },
    { key: "kitchen", label: "Kitchen" },
    { key: "flooring", label: "Flooring" },
    { key: "bathroom", label: "Bathroom" },
    { key: "wallpaper", label: "Wallpaper" },
  ];

  const getTitle = () => {
    const titleMap = Object.fromEntries(categories.map((c) => [c.key, c.label]));
    return titleMap[category] || "All Products";
  };


  const allProducts = product.products
  

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
    <div className="min-h-screen p-4 space-y-6">
      {/* Top Filters */}
      <div className="flex sticky top-16 flex-row items-center justify-center gap-4 z-10 p-2">
        <Input
          placeholder="Search products..."
          className="sm:w-1/2 border-2 bg-white border-[#2d9b67]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={category || "all"}
          onValueChange={(value) =>
            navigate(`/products/${value === "all" ? "" : value}`)
          }
        >
          <SelectTrigger className="sm:w-30 w-full border-2 bg-white border-[#2d9b67]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(({ key, label }) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-secondary text-center">
        {getTitle()}
      </h1>

      {/* Product Grid */}
      <div className="mx-4 sm:mx-[4%] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product) => (
            <ProductCard
              key={product._id}
              img_src={product.image}
              title={product.name}
              description={product.description}
              onClick={() => navigate(`/products/${product.category}/${product._id}`)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
