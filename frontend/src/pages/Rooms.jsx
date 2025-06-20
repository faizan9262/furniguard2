import React from "react";
import RoomCard from "../components/RoomCard";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { motion } from "framer-motion";

const Rooms = () => {
  const navigate = useNavigate();
  const product = useProduct();

  const rooms = product.products.filter((r) => r.category === "livingroom");

  return (
    <div className="mx-4 sm:mx-[10%] my-2">
      <h1 className="text-3xl sm:text-4xl font-medium p-2 text-secondary">
        Top Rooms Designs
      </h1>
      <motion.div
        className="min-h-screen grid gap-10 grid-cols-1 sm:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {rooms.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <RoomCard
              onClick={() => navigate(`/products/livingrooms/${item._id}`)}
              title={item.name}
              img_src={item.image}
              description={item.description}
              price={item.price}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Rooms;
