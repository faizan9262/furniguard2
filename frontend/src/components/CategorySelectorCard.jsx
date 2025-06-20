import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const CategorySelectorCard = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setSelectedProduct,
  setSelectedProductDetails,
}) => {
  const handleClick = (val) => {
    setSelectedCategory(val);
    setSelectedProduct(null);
    setSelectedProductDetails(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Select Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => handleClick(cat)}
              className={cn(
                "group cursor-pointer transition-all duration-300 rounded-2xl px-4 py-2 min-w-fit whitespace-nowrap border shadow-sm hover:shadow-md flex items-center gap-2",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground border-primary scale-[1.03]"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              <Sparkles
                className={cn(
                  "w-4 h-4 transition-opacity duration-200",
                  selectedCategory === cat
                    ? "opacity-100"
                    : "opacity-40 group-hover:opacity-70"
                )}
              />
              <span className="font-medium text-sm sm:text-base">{cat}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySelectorCard;
