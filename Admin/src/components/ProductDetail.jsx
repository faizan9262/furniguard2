import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Card, CardContent } from "@/components/components/ui/card";
import { Button } from "@/components/components/ui/button";
import { Badge } from "@/components/components/ui/badge";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { getProductRating } from "../helper/apis.js";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useAdmin();
  const navigate = useNavigate();
  const [rating, setRating] = useState({});

  const [showAllRatings, setShowAllRatings] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); 

  console.log("List in details page: ",product.list);
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(2); 
      else if (width < 1024) setVisibleCount(3); 
      else setVisibleCount(4); 
    };

    updateCount(); 
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  

  const products = product?.list?.find((p) => p._id === id);
  const relatedProducts = product?.list?.filter(
    (p) => p._id !== products._id && p.category === products.category
  );

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const data = await getProductRating(id);
        setRating(data.data.map((d) => d));
      } catch (err) {
        console.error("Failed to load product rating:", err.message);
      }
    };
    fetchRating();
  }, [id]);


  if (!products) {
    return <div>Product not found</div>;
  }

  const roundedRating = Math.round(products.averageRating || 0);

  return (
    <div className="px-4 py-10 sm:px-[5%] bg-gradient-to-br from-[#effaf2] to-[#c8ebd9] min-h-screen">
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="aspect-[4/3] max-h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
            <img
              src={products.image}
              alt={products.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={products.image}
                alt={`Thumb ${i}`}
                className="rounded-md object-cover w-full h-20 shadow"
              />
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#2d9b67]">{products.name}</h1>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < roundedRating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}

            {products.totalRatings > 0 ? (
              <span className="text-sm text-gray-500">
                ({products.totalRatings} Rating
                {products.totalRatings > 1 ? "s" : ""})
              </span>
            ) : (
              <span className="text-sm text-gray-400">No ratings</span>
            )}
          </div>
          <p className="text-md ms:text-lg text-gray-700 leading-relaxed">
            {products.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-primary/20 text-primary-foreground border-none">
              Eco-Friendly
            </Badge>
            <Badge variant="outline" className="bg-primary/20 text-primary-foreground border-none">
              Durable
            </Badge>
            <Badge variant="outline" className="bg-primary/20 text-primary-foreground border-none">
              Customizable
            </Badge>
          </div>

          <div className="text-2xl font-semibold text-[#326951]">
            Starting From ₹ {products.price}
          </div>
        </motion.div>
      </div>

      {/* Creative Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-20 rounded-xl bg-[#e5f6ee] p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left"
      >
        <div className="space-y-3 max-w-xl">
          <h3 className="text-2xl font-bold text-[#2d9b67]">
            Trusted by Interior Designers & Homeowners Alike
          </h3>
          <p className="text-gray-700">
            Over 10,000+ homes enhanced with our elegant products. Explore
            premium craftsmanship and unique designs tailored to your lifestyle.
          </p>
        </div>
        <img
          src={products.image}
          alt="creative-preview"
          className="w-60 h-60 object-cover rounded-xl mt-6 md:mt-0 shadow-md"
        />
      </motion.div>

      <section className="space-y-6 mt-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(rating) &&
            rating.map((t, i) => (
              <Card
                key={i}
                className="p-4 shadow-md hover:shadow-lg transition-shadow border border-muted rounded-2xl"
              >
                <CardContent className="space-y-4">
                  {/* Feedback text */}
                  <p className="text-gray-700 italic text-sm line-clamp-4">
                    “{t.reviewText}”
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    {/* User Avatar */}
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={t.userId.profilePicture} />
                      <AvatarFallback>
                        {t.userId.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Username and Rating */}
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-foreground">
                        {t.userId.username}
                      </span>
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= t.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill={star <= t.rating ? "#facc15" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
        {!showAllRatings && rating.length > visibleCount && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setShowAllRatings(true)}>
              View All Ratings
            </Button>
          </div>
        )}
      </section>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2d9b67] mb-6">
          Similar Styles, Same Wow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts?.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-[#c1e5d3] p-4 group"
              onClick={() => navigate(`/products/${p.category}/${p._id}`)}
            >
              <img
                src={p.image}
                alt=""
                className="w-full h-60 object-cover rounded-xl mb-3"
              />
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#2d9b67]">{p.name}</h3>
                <p className="text-sm text-gray-500">
                  Elegant & modern design crafted for durability.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-primary-foreground bg-primary/20 border-none">{p.category}</Badge>
                  <Badge variant="outline" className="text-primary-foreground bg-primary/20 border-none">Modern</Badge>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-[#2d9b67] text-white px-2 py-1 text-xs rounded-full">
                ₹{p.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
