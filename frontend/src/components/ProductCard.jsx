import React from "react";
import { motion } from "framer-motion";

const ProductCard = ({ img_src, title, description, onClick }) => {
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
      <div className="w-1/2 max-h-40 sm:max-h-60">
        <img
          src={img_src}
          className="w-full h-full object-cover"
          alt="Product"
        />
      </div>
      <div className="w-1/2 p-2 sm:p-4 flex flex-col justify-center gap-3">
        <p className="font-semibold tsxt-xl sm:text-3xl text-primary">
          {title}
        </p>
        <p className="text-[10px] sm:text-sm text-gray-600">
          {description.split(" ").slice(0, 20).join(" ") +
            (description.split(" ").length > 20 ? "..." : "")}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
