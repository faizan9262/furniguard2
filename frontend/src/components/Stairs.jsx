import React, { useRef } from "react";
import StairCard from "./StairCard";
import { useNavigate } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useProduct } from "../context/ProductContext";

const Stairs = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const product = useProduct();

  const stairs = product.products.filter(
    (stair) => stair.category === "stairs"
  );

  const filterStairs = stairs.slice(0, 4);


  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="bg-gradient-to-r from-[#D1E8D1] via-[#A4D8A8] to-[#6BBF9B] mt-5 py-6">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filterStairs.map((stair, i) => {
              const showOnSmall = i < 2 ? "block" : "hidden";
              const showOnLarge = "lg:block";

              return (
                <motion.div
                  key={(stair._id || stair.id || i)}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className={`${showOnSmall} ${showOnLarge}`}
                >
                  <StairCard
                    onClick={() => {
                      navigate(`products/stairs/${stair._id}`);
                      window.scrollTo(0, 0);
                    }}
                    img_src={stair.image}
                    title={stair.name?.split(" ").slice(0, 2).join(" ")}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Stairs;
