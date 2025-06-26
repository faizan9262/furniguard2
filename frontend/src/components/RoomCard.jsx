import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/components/ui/card";
import { FaRupeeSign } from "react-icons/fa";

const RoomCard = ({ img_src, title ,description, price,onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="group w-full max-w-sm rounded-3xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 p-0"
    >
      <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80">
        <img
          src={img_src}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <CardContent className="p-5 space-y-3">
        <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>

        <CardDescription className="text-sm text-gray-600 leading-relaxed">
            {description}
        </CardDescription>

        {/* Highlights */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-3">
          <div className="flex items-center gap-2 text-green-500">
            <span>Sarting From</span>
          </div>
          <div className="flex items-center justify-center">
            <FaRupeeSign className="w- h-3" />
            <span>{price?.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
