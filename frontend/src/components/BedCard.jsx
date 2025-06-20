import React from "react";
import { Card, CardContent, CardTitle, CardDescription } from "../components/components/ui/card";
import { motion } from "framer-motion";

const BedCard = ({ img_src, title , description, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-full max-w-md mx-auto sm:mx-0 cursor-pointer`}
    >
      <Card className="overflow-hidden rounded-3xl shadow-md">
        <div className="relative">
          <img
            src={img_src}
            alt={title}
            className="w-full h-[260px] object-cover transition-all duration-700 hover:scale-105"
          />
        </div>
        <CardContent className="py-6 px-5 text-center space-y-4">
          <CardTitle className="text-2xl sm:text-3xl text-primary">{title}</CardTitle>
          <CardDescription className="text-base sm:text-lg text-gray-600">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BedCard;
