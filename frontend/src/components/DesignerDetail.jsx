import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { designers } from "../assets/assets";
import { Button } from "../components/components/ui/button";
import { Card,CardContent } from "../components/components/ui/card";
import { motion } from "framer-motion";
import LayoutCard from "./LayoutCard";
import { FaArrowRight } from "react-icons/fa";
import { useDesiner } from "../context/DesignerContex";

const sampleProjects = [
  {
    title: "Minimalist Living Room Sanctuary",
    image: "https://www.bhg.com/thmb/k-SOGurrVsJLF87LSgFndZZHpvk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20190521_meredith_015_preview-4cafea707ac344e18df0f94b6fff3356.jpg",
    description: "Neutral palette, clean lines, and natural light combine to create a calm and elegant living space.",
  },
  {
    title: "Spa-Inspired Bathroom Retreat",
    image: "https://assets.vogue.com/photos/67dd2aa9423f1e0521dbdcba/master/w_1920,c_limit/Chango%20-%20Modern%20Hamptons%20Living%20Room%20Wide%20-%20courtesy%20of%20Sarah%20Elliott.jpg",
    description: "Sleek surfaces and soft textures form a luxurious, wellness-focused bathroom aesthetic.",
  },
  {
    title: "Japandi Coze Corner",
    image: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-7de7212/www.decorilla.com/online-decorating/wp-content/uploads/2023/07/Minimalist-mid-century-modern-living-room-ideas.jpg",
    description: "Blending Japanese minimalism and Scandinavian warmth for a serene and functional nook.",
  },
  {
    title: "Bright Airy Minimal Interior",
    image: "https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-7de7212/www.decorilla.com/online-decorating/wp-content/uploads/2023/07/Minimalist-living-room-ideas-with-modern-decor.jpg",
    description: "Open layout and soft tones maximize light and space for a peaceful, minimalist setting.",
  }
];



const testimonials = [
  {
    name: "Aman Kapoor",
    quote:
      "Working with this designer was an absolute pleasure. They transformed my home into a dream space!",
  },
  {
    name: "Sara Mehta",
    quote:
      "Truly professional and deeply creative. Highly recommend for luxury interior design.",
  },
];

const DesignerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const DesignerContex = useDesiner()
  const designer = DesignerContex.designers.find((d) => d._id === id);

  console.log("Designer in detail page: ",designer);
  

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
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">{designer.user.username}</h1>
          <p className="text-xl font-medium bg-secondary/10 text-secondary px-4 py-1 rounded-full inline-block border border-secondary">
            {designer.type} ~ {designer.experience + " Years"}
          </p>
          <p className="text-gray-600 max-w-2xl">
            Passionate about crafting timeless, personalized spaces. I merge aesthetics with
            functionality for modern lifestyles and premium comfort.
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
        <h2 className="text-3xl font-semibold text-secondary">Featured Projects</h2>
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
        <h2 className="text-3xl font-semibold text-secondary">What Clients Say</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-6 shadow-sm border border-muted">
              <CardContent className="space-y-2">
                <p className="text-gray-700 italic">“{t.quote}”</p>
                <p className="text-right font-semibold text-primary">- {t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Work Areas */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-secondary">Service Areas</h2>
        <p className="text-gray-600">
          Currently offering services in <strong>Mumbai</strong>, <strong>Pune</strong>,{" "}
          <strong>Delhi NCR</strong>, <strong>Bangalore</strong>, and surrounding metro areas.
        </p>
      </section>
    </div>
  );
};

export default DesignerDetail;
