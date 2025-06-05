import React from "react";
import { motion } from "framer-motion";

const bounceTransition = {
  y: {
    duration: 0.6,
    yoyo: Infinity,
    ease: "easeOut",
  },
};

const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 items-center px-2 py-1">
      <motion.span
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{ y: ["100%", "-100%"] }}
        transition={{ ...bounceTransition, delay: 0 }}
      />
      <motion.span
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{ y: ["100%", "-100%"] }}
        transition={{ ...bounceTransition, delay: 0.15 }}
      />
      <motion.span
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{ y: ["100%", "-100%"] }}
        transition={{ ...bounceTransition, delay: 0.3 }}
      />
    </div>
  );
};

export default TypingIndicator;
