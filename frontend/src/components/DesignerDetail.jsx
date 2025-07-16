import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/components/ui/button";
import { Card, CardContent } from "../components/components/ui/card";
import { motion } from "framer-motion";
import LayoutCard from "./LayoutCard";
import { FaArrowRight, FaEnvelope, FaStar } from "react-icons/fa";
import { useDesiner } from "../context/DesignerContex";
import { getDesignerRating } from "../helper/api-communicator.js";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { IoLogoWhatsapp } from "react-icons/io";

const DesignerDetail = () => {
  const { id } = useParams();
  const auth = useAuth();
  
  const navigate = useNavigate();
  const DesignerContex = useDesiner();
  const designer = DesignerContex.designers.find((d) => d._id === id);
  // console.log("Designer: ", designer);
  
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

  // console.log("Rating length: ",rating.length);
  const designerProjects = designer?.projects.map((p) => p);

  console.log("Projects: ", designerProjects);

  if (!designer) return <p className="text-center mt-10">Designer not found</p>;

  return (
    <div className="min-h-screen px-4 sm:px-20 py-10 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10 p-4 sm:p-6 bg-white rounded-xl shadow-md"
      >
        {/* Profile Picture */}
        <div className="w-36 h-36 sm:w-48 sm:h-48">
          <img
            src={designer.user.profilePicture}
            alt={designer.user.username}
            className="w-full h-full object-cover rounded-full shadow-lg border-4 border-primary"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold text-primary">
            {designer.user.username}
          </h1>

          {/* Rating */}
          <div className="flex items-center justify-center sm:justify-start gap-1">
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
                ? `(${designer.totalRatings} Review$${
                    designer.totalRatings > 1 ? "s" : ""
                  })`
                : "(No reviews)"}
            </span>
          </div>

          {/* Type and Experience */}
          <p className="text-lg font-medium capitalize bg-secondary/10 text-secondary px-4 py-1 rounded-full inline-block border border-secondary">
            {designer.type} &bull; {designer.experience} Years
          </p>

          {/* Bio */}
          <p className="text-gray-600 font-semibold italic max-w-xl mx-auto sm:mx-0">
            {designer.bio ? `"${designer.bio}"` : "Bio not available"}
          </p>

          {/* Contact and Studio Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-left">
            <div className="flex items-start justify-start gap-6">
              <div>
                <p className="text-muted-foreground font-medium flex items-center gap-2">
                  <IoLogoWhatsapp className="text-primary" />
                  Phone
                </p>
                <p className="text-secondary font-semibold">
                  {designer.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground flex gap-2 items-center font-medium">
                  <FaEnvelope className="text-primary" />
                  Email
                </p>
                <p className="text-secondary font-semibold">
                  {designer?.user?.email || "N/A"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">
                Studio Address
              </p>
              <p className="text-primary font-semibold">
                {designer.studioAddress || "Not provided"}
              </p>
            </div>
            <div className="sm:col-span-2 ">
              <p className="text-muted-foreground font-medium">Expertise</p>
              <div className="flex flex-wrap overflow-y-auto scrollbar-hide max-h-24 gap-2 mt-1">
                {designer.expertise?.length > 0 ? (
                  designer.expertise.map((item, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full border border-primary"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic">Not Available</span>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <p className="text-muted-foreground font-medium">
                Preferred Locations
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {designer.preferredLocations?.length > 0 ? (
                  designer.preferredLocations.map((loc, i) => (
                    <span
                      key={i}
                      className="bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full border border-secondary"
                    >
                      {loc}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic">Not Available</span>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className="mt-6 rounded-full bg-primary text-white hover:bg-secondary transition-all"
            onClick={() => navigate("/new-appointment")}
          >
            Consult Now <FaArrowRight className="ml-2" />
          </Button>
          <Button
            className="mt-6 rounded-full bg-primary text-white hover:bg-secondary transition-all"
            onClick={() =>
              navigate(
                `/chat/${designer?.user?._id}/${
                  auth?.user?.role === "designer" ? "user" : "designer"
                }`,{state: { user: { name: designer?.user?.username, profilePicture:designer?.user?.profilePicture } } }
              )
            }
          >
            Talk Now <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </motion.div>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-secondary">
          Featured Projects
        </h2>
        <div className="grid mx-10 sm:grid-cols-2 gap-4">
          {designerProjects.map((project, idx) => (
            <a
              key={idx}
              href={project.links[0]}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-[1.03] transition-transform duration-300"
            >
              <LayoutCard
                img_scr={project.images[0]}
                description={project.description}
                className="w-full h-full object-cover"
                title={project.title}
                tag={"Project"}
                duration={project.duration}
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
