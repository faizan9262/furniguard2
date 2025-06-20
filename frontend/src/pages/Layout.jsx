import React from "react";
import LayoutCard from "../components/LayoutCard";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { motion } from "framer-motion";

const Layout = () => {
  const navigate = useNavigate();
  const product = useProduct();

  const layout = product.products.filter((l) => l.category === "layout");

  return (
    <div className="my-5 mx-4 sm:mx-[10%]">
      <h1 className="text-3xl sm:text-4xl font-medium p-2 text-secondary">
        Top Layout
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 min-h-screen">
        {layout.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <LayoutCard
              onClick={() => navigate(`/products/layout/${item._id}`)}
              title={item.name}
              img_scr={item.image}
              description={item.description}
              tag={"Room Layout"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
