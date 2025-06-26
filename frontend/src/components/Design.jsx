import React from "react";
import DesignBannerLeft from "./DesignBannerLeft";
import DesignBannerRight from "./DesignBannerRight";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { motion } from "framer-motion";
import { useProduct } from "../context/ProductContext";

const Design = () => {
  const navigate = useNavigate();
  const product = useProduct();
  const bedroom = product?.products.filter(
    (lv) => lv.category === "livingroom"
  );
  const filterRooms = bedroom.slice(5, 7);

  return (
    <div className="mx-10  sm:mx-[10%]">
      {filterRooms.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <DesignBannerLeft
            title={filterRooms[0].name}
            img_src={filterRooms[0].image}
            description={filterRooms[0].description}
            onClick={()=>navigate(`/products/${filterRooms[0].category}/${filterRooms[0]._id}`)}
          />
          <DesignBannerRight
            title={filterRooms[1].name}
            img_src={filterRooms[1].image}
            description={filterRooms[1].description}
            onClick={()=>navigate(`/products/${filterRooms[1].category}/${filterRooms[1]._id}`)}
          />
        </motion.div>
      )}

      <div className="flex items-center justify-center">
        <Button
          onClick={() => {
            navigate("/rooms");
            window.scroll(0, 0);
          }}
          className="my-5 text-lg bg-[#2d9b67] rounded-full"
        >
          Explore Latest Designs <FaArrowRight />
        </Button>
      </div>
      <Separator className="border-2 border-gray-500 rounded-full" />
    </div>
  );
};

export default Design;
