import React from "react";

const StairCard = ({ title, img_src, onClick }) => {
  return (
    <div className="mx-4 sm:mx-0">
      <div
        onClick={onClick}
        className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 max-w-sm mx-auto"
      >
        <div className="w-full h-72 sm:h-80">
          <img
            src={img_src}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4 text-center space-y-2">
          <h3 className="text-xl sm:text-2xl text-primary font-semibold">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 font-light">
            Explore a blend of style and safety with our modern staircase designs — crafted to elevate interiors with both elegance and structure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StairCard;
