import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth()
  return (
    <div
      className="relative bg-cover bg-center h-screen flex justify-center items-center overflow-hidden"
      style={{ backgroundImage: `url(${assets.banner})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute z-0 inset-0 bg-gradient-to-r from-black/90 to-black/70"></div>
      {/* Main content container */}
      <div className="relative flex flex-col gap-4 md:gap-6 z-10 px-6 sm:px-8 w-full max-w-6xl">
        {/* Heading section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2d9b67] leading-tight">
            Be Faithful To Your Own Taste,
            <br />
            <span className="relative inline-block">
              Because Nothing You Really Like
            </span>
            <br />
            Is Ever Out Of Style..
          </p>
        </motion.div>

        {/* Content with bullet points */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col gap-4 md:gap-6"
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className="text-[#2d9b67] mt-1 text-lg md:text-xl">
              <FaArrowRight />
            </div>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-light">
              Discover personalized interior styling that reflects your identity. 
              From minimalistic spaces to bold artistic expressions, we help you 
              create environments that feel like home.
            </p>
          </div>
          
          <div className="flex items-start gap-3 md:gap-4">
            <div className="text-[#2d9b67] mt-1 text-lg md:text-xl">
              <FaArrowRight />
            </div>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-light">
              Our expert designers blend creativity with functionality to craft 
              spaces that tell your unique story through textures, colors, and forms.
            </p>
          </div>
        </motion.div>

        {/* Stats section - responsive grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4"
        >
          <div className="text-center p-2 md:p-4 border-l-3 border-[#2d9b67]">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d9b67]">15+</p>
            <p className="text-white font-medium text-xs sm:text-sm">Years Experience</p>
          </div>
          <div className="text-center p-2 md:p-4 border-l-3 border-[#2d9b67]">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d9b67]">500+</p>
            <p className="text-white  font-medium text-xs sm:text-sm">Happy Clients</p>
          </div>
          <div className="text-center p-2 md:p-4 border-l-3 border-[#2d9b67]">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d9b67]">10+</p>
            <p className="text-white font-medium text-xs sm:text-sm">Awards Won</p>
          </div>
          <div className="text-center p-2 md:p-4 border-l-3 border-[#2d9b67]">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d9b67]">100%</p>
            <p className="text-white font-medium text-xs sm:text-sm">Satisfaction</p>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 md:mt-8"
        >
          <Button 
            onClick={() => navigate('/new-appointment')} 
            variant="secondary" 
            className={`bg-[#2d9b67] hover:bg-[#326951] text-white text-base sm:text-lg font-normal py-4 sm:py-6 px-6 sm:px-8 ${auth?.user?.role === "user" ? "flex": "hidden"} items-center gap-2 group w-full sm:w-auto justify-center`}
          >
            Book Your Session Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="group-hover:translate-x-1 transition-transform"
            >
              <FaArrowRight />
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;