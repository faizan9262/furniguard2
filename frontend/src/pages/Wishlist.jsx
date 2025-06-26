import React, { useEffect, useState } from "react";
import {
  getAllWishlistProducts,
  removeFromWishlist,
} from "../helper/api-communicator.js";
import WishlistCard from "@/components/WishlistCard.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/components/ui/button.jsx";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext.jsx";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const user = useAuth()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getAllWishlistProducts();
        setWishlist(response.data.products || []);
        user.setWishlistCount(response.data.products.length)
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      }
    };
    
    fetchWishlist();
  }, []);
  // console.log("Count: ",user.wishlistCount);

  

  const handleRemoveFromWishlist = async (productId) => {
    try {
      toast.loading("Removing from wishlist", { id: "wishlist" });
      await removeFromWishlist(productId);
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
      toast.success("Product removed from wishlist.", { id: "wishlist" });
    } catch (error) {
      toast.error(error?.message || "Removal failed", { id: "wishlist" });
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Your Wishlist
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage the products you've saved.
          </p>
        </div>

        {/* Add More Button */}
        <Button
          onClick={() => navigate("/products")}
          className="w-full hidden md:flex sm:w-auto items-center gap-1 font-semibold px-5 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
        >
          <Plus className="w-4 h-4" />
          Add More
        </Button>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          <p className="text-sm">No Products in Your wishlist</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {wishlist.map((w, index) => (
            <motion.div
              key={w._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <WishlistCard
                title={w.name}
                description={w.description}
                img_src={w.image}
                price={w.price}
                category={w.category}
                onView={() => navigate(`/products/${w.category}/${w._id}`)}
                onRemove={() => handleRemoveFromWishlist(w._id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
