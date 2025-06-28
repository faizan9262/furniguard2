import React from "react";
import { Badge } from "./components/ui/badge";
import { Card } from "./components/ui/card";
import { FaStar } from "react-icons/fa";

const DesignerCard = ({
  name,
  experience,
  type,
  profile_img,
  onClick,
  bio,
  joining,
  averageRating,
  totalRatings,
}) => {
  const roundedRating = Math.round(averageRating || 0);
  return (
    <Card
      onClick={onClick}
      className="group relative w-full rounded-3xl mt-6 overflow-visible shadow-lg bg-gradient-to-br from-[#f7f9fc] to-[#eef2f5] pt-16 pb-6 px-6 cursor-pointer hover:shadow-2xl transition duration-300"
    >
      {/* Floating Profile Image */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-[#2d9b67] shadow-md overflow-hidden z-10 bg-[#2d9b67]">
        <img
          src={profile_img}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col items-center text-center gap-3">
        <h2 className="text-xl font-bold text-primary">{name}</h2>

        <div className="flex gap-2 flex-wrap justify-center">
          <Badge className="bg-white text-black px-3 py-1 rounded-full text-xs shadow-sm">
            {type}
          </Badge>
          <Badge className="bg-white text-black shadow-sm text-xs px-3 py-1 rounded-full">
            {experience ? experience + " Years" : "Experience"}
          </Badge>
          <Badge className="bg-white text-black shadow-sm text-xs px-3 py-1 rounded-full">
            Designer +3
          </Badge>
        </div>

        {/* Highlight Quote */}
        <p className="text-sm text-primary font-normal mt-3 px-3">
          Active On FurniGuard Since :{" "}
          {new Date(joining).toLocaleDateString("en-GB")}
        </p>

        {/* Highlight Quote */}
        <p className="text-sm text-gray-600 mt-3 px-3">
          {bio ? bio : "Crafting spaces, inspire minds and soothe souls."}
        </p>

        {/* Rating Section */}
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={`text-sm ${
                i < roundedRating ? "text-yellow-500" : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground">
            {totalRatings > 0
              ? `(${totalRatings} Review${totalRatings > 1 ? "s" : ""})`
              : "(No reviews)"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DesignerCard;
