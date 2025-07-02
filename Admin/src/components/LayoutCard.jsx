import React from "react";
import { Badge } from "./components/ui/badge";

const LayoutCard = ({ img_scr, title, onClick,tag, description,duration }) => {
  return (
    <div
      onClick={onClick}
      className="relative  flex flex-col sm:flex-row overflow-visible sm:overflow-hidden rounded-3xl group cursor-pointer transition-all hover:shadow-2xl"
    >
      {/* Background Container */}
      <div className="relative w-full sm:w-1/2 h-56 sm:h-auto">
        <img
          src={img_scr}
          alt="Layout"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl sm:rounded-none sm:rounded-l-3xl transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 rounded-3xl sm:rounded-none sm:rounded-l-3xl" />
      </div>

      {/* Content Block */}
      <div
        className="relative w-full sm:w-3/5 z-10
          sm:-ml-8 sm:mt-0 -mt-10 px-6 sm:px-10 py-6 sm:py-10
          rounded-3xl bg-white border border-muted shadow-sm
          flex flex-col justify-between gap-4"
      >
        {/* Title */}
        <div>
          <h2 className="text-2xl font-semibold text-primary">{title}</h2>
          <div className="mt-2">
            <Badge  className="bg-primary/20 text-black text-xs">
              {tag}
            </Badge>
          </div>
        </div>

        {/* Description */}
        {duration?.length > 0 && (
          <p className="text-sm text-primary-foreground leading-relaxed mt-4 line-clamp-3">
            Duration: {duration}
          </p>
        )}
        <p className="text-sm text-primary-foreground leading-relaxed mt-4 line-clamp-3">
          {description}
        </p>
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-primary/10 rotate-45 rounded-lg" />
      </div>
    </div>
  );
};

export default LayoutCard;
