import React from "react";
import { motion } from "framer-motion";
import { CardTitle } from "./components/ui/card";

const ProductCard = ({
  img_src,
  title,
  description,
  category,
  price,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="cursor-pointer shadow-md flex rounded-xl overflow-hidden"
    >
      <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
        {/* Floating Price Tag on Hover */}
        <div
          className="absolute top-3 right-3 bg-[#2d9b67] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md transition-all duration-300"
        >
          ₹{price}
        </div>

        {/* Category Label */}
        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#2d9b67] to-[#47b881] text-white text-xs px-3 py-1 rounded-br-2xl font-medium tracking-wide">
          {category}
        </div>

        {/* Product Image */}
        <img
          src={img_src}
          alt={title}
          className="w-full h-44 object-cover rounded-t-2xl border-b border-gray-200"
        />

        {/* Content */}
        <div className="p-4">
          <CardTitle className="text-xl font-semibold text-primary mb-1">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-500 line-clamp-5">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
