import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/components/ui/button";
import { Card, CardContent } from "../components/components/ui/card";
import { motion } from "framer-motion";
import LayoutCard from "./LayoutCard";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useDesiner } from "../context/DesignerContex";
import { getDesignerRating } from "../helper/api-communicator.js";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Star } from "lucide-react";

const sampleProjects = [
  {
    title: "Minimalist Living Room Sanctuary",
    image:
      "https://www.bhg.com/thmb/k-SOGurrVsJLF87LSgFndZZHpvk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20190521_meredith_015_preview-4cafea707ac344e18df0f94b6fff3356.jpg",
    description:
      "Neutral palette, clean lines, and natural light combine to create a calm and elegant living space.",
  },
  {
    title: "Spa-Inspired Bathroom Retreat",
    image:
      "https://assets.vogue.com/photos/67dd2aa9423f1e0521dbdcba/master/w_1920,c_limit/Chango%20-%20Modern%20Hamptons%20Living%20Room%20Wide%20-%20courtesy%20of%20Sarah%20Elliott.jpg",
    description:
      "Sleek surfaces and soft textures form a luxurious, wellness-focused bathroom aesthetic.",
  },
  {
    title: "Japandi Coze Corner",
    image:
      "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-7de7212/www.decorilla.com/online-decorating/wp-content/uploads/2023/07/Minimalist-mid-century-modern-living-room-ideas.jpg",
    description:
      "Blending Japanese minimalism and Scandinavian warmth for a serene and functional nook.",
  },
  {
    title: "Bright Airy Minimal Interior",
    image:
      "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-7de7212/www.decorilla.com/online-decorating/wp-content/uploads/2023/07/Minimalist-living-room-ideas-with-modern-decor.jpg",
    description:
      "Open layout and soft tones maximize light and space for a peaceful, minimalist setting.",
  },
];

const DesignerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const DesignerContex = useDesiner();
  const designer = DesignerContex.designers.find((d) => d._id === id);
  const [rating, setRating] = useState({});

  const [showAllRatings, setShowAllRatings] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

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

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const data = await getDesignerRating(id);
        setRating(data.data.map((d) => d));
      } catch (err) {
        console.error("Failed to load designer rating:", err.message);
      }
    };
    fetchRating();
  }, [id]);

  console.log("Rating length: ",rating.length);
  

  if (!designer) return <p className="text-center mt-10">Designer not found</p>;

  return (
    <div className="min-h-screen px-4 sm:px-20 py-10 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-10"
      >
        <div className="w-40 h-40 sm:w-52 sm:h-52">
          <img
            src={designer.user.profilePicture}
            alt={designer.user.username}
            className="w-full h-full object-cover rounded-full shadow-xl border-4 border-primary"
          />
        </div>
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">
            {designer.user.username}
          </h1>
          <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.round(designer.averageRating || 0)
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              {designer.totalRatings > 0
                ? `(${designer.totalRatings} Review${
                    designer.totalRatings > 1 ? "s" : ""
                  })`
                : "(No reviews)"}
            </span>
          </div>

          <p className="text-xl font-medium bg-secondary/10 text-secondary px-4 py-1 rounded-full inline-block border border-secondary">
            {designer.type} ~ {designer.experience + " Years"}
          </p>
          <p className="text-gray-600 max-w-2xl">
            Passionate about crafting timeless, personalized spaces. I merge
            aesthetics with functionality for modern lifestyles and premium
            comfort.
          </p>
          <Button
            className="rounded-full bg-primary text-white hover:bg-secondary transition-all"
            onClick={() => navigate("/register")}
          >
            Consult Now <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-secondary">
          Featured Projects
        </h2>
        <div className="grid mx-10 sm:grid-cols-2 gap-4">
          {sampleProjects.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-[1.03] transition-transform duration-300"
            >
              <LayoutCard
                img_scr={project.image}
                description={project.description}
                className="w-full h-full object-cover"
                title={project.title}
                tag={"Project"}
              />
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6">
        {rating.rating > 0 && (
          <h2 className="text-3xl font-semibold text-secondary">
            What Clients Say
          </h2>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(rating) &&
            (showAllRatings ? rating : rating.slice(0, visibleCount)).map(
              (t, i) => (
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
              )
            )}
        </div>
        {!showAllRatings && rating.length > visibleCount && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setShowAllRatings(true)}>
              View All Ratings
            </Button>
          </div>
        )}
      </section>

      {/* Work Areas */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-secondary">Service Areas</h2>
        <p className="text-gray-600">
          Currently offering services in <strong>Mumbai</strong>,{" "}
          <strong>Pune</strong>, <strong>Delhi NCR</strong>,{" "}
          <strong>Bangalore</strong>, and surrounding metro areas.
        </p>
      </section>
    </div>
  );
};

export default DesignerDetail;
