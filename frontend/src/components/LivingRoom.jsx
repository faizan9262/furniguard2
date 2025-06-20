import React, { useRef } from "react";
import RoomCard from "./RoomCard";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/components/ui/button";
import { Separator } from "@/components/components/ui/separator";
import { FaArrowRight } from "react-icons/fa";
import { useProduct } from "../context/ProductContext";

const LivingRoom = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const product = useProduct();

  const livingroom = product.products.filter(
    (lv) => lv.category === "livingroom"
  );

  const filteredLivingRooms = livingroom.slice(0, 4);

  return (
    <>
      <div
        ref={sectionRef}
        className="mx-10 my-5 flex items-center justify-center sm:mx-[10%]"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {filteredLivingRooms.map((lv, i) => {
            // Show first 2 always, others only on sm and above
            const visibilityClass = i < 2 ? "block" : "hidden sm:block";

            return (
              <div key={i} className={visibilityClass}>
                <RoomCard
                  onClick={() => {
                    navigate(`/products/livingroom/${lv._id}`);
                    window.scroll(0, 0);
                  }}
                  img_src={lv.image}
                  title={lv.name}
                  description={lv.description}
                  price={lv.price}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center flex-col justify-center">
        <Button
          onClick={() => {
            navigate("/rooms");
            window.scroll(0, 0);
          }}
          className="my-5 text-lg bg-[#2d9b67] rounded-full"
        >
          Explore Latest Designs <FaArrowRight />
        </Button>
        <Separator
          orientation="horozontal"
          className="border-2 max-w-[80%] border-gray-500 rounded-full"
        />
      </div>
    </>
  );
};

export default LivingRoom;
