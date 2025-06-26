import React from "react";
import { motion } from "framer-motion";

const DesignBannerLeft = ({ img_src, title, description,onClick }) => {

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-50 to-gray-100 mt-6 rounded-2xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div onClick={onClick} className="flex flex-col cursor-pointer lg:flex-row items-center gap-0 lg:gap-8">
        {/* Content Section */}
        <motion.div
          className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2d9b67]">
              {title}
            </h1>

            <p className="text-[#326951] text-base md:text-lg">
              {description ||
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, maiores repellendus! Ipsa, cumque ducimus voluptate eos incidunt animi reprehenderit."}
            </p>
          </div>
        </motion.div>
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 relative overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={img_src}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            alt={title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DesignBannerLeft;
