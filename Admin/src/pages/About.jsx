import React from "react";
import { motion } from "framer-motion";
import {
  FaPuzzlePiece,
  FaPalette,
  FaHandshake,
  FaShieldAlt,
  FaAward,
  FaRocket,
  FaGlobeAsia,
} from "react-icons/fa";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";

const highlights = [
  {
    icon: <FaRocket className="text-3xl text-[#2d9b67]" />,
    title: "Our Mission",
    description:
      "To revolutionize interiors by delivering personalized, sustainable, and high-performance furniture and design experiences.",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-[#2d9b67]" />,
    title: "Core Values",
    description:
      "Integrity, innovation, craftsmanship, and client-centricity drive our everyday decisions and design ethos.",
  },
  {
    icon: <FaHandshake className="text-3xl text-[#2d9b67]" />,
    title: "Client Commitment",
    description:
      "We don't just deliver spaces—we deliver trust, long-term relationships, and unmatched after-sales service.",
  },
  {
    icon: <FaGlobeAsia className="text-3xl text-[#2d9b67]" />,
    title: "Global Vision",
    description:
      "Expanding our presence across continents while staying rooted in local culture and design heritage.",
  },
];

const storyTimeline = [
  {
    year: "2014",
    text: "FurniGuard was born out of a passion for transforming everyday spaces into extraordinary experiences.",
  },
  {
    year: "2017",
    text: "Introduced modular design systems and expanded production capabilities to cater to commercial interiors.",
  },
  {
    year: "2020",
    text: "Shifted toward sustainable materials and eco-friendly manufacturing processes.",
  },
  {
    year: "2024",
    text: "Launched smart-furniture solutions integrated with home automation and ergonomic innovations.",
  },
];

const expertise = [
  {
    title: "Space Planning",
    description:
      "Optimize every square foot with tailored layouts based on functionality and lifestyle.",
    icon: <FaPuzzlePiece className="text-3xl text-[#2d9b67]" />,
  },
  {
    title: "Color Psychology",
    description:
      "Use color science to evoke mood and harmony, shaping how you feel in a space.",
    icon: <FaPalette className="text-3xl text-[#2d9b67]" />,
  },
  {
    title: "Premium Materials",
    description:
      "We source only the finest, sustainable woods, fabrics, and metals from certified suppliers.",
    icon: <FaAward className="text-3xl text-[#2d9b67]" />,
  },
];

const About = () => {
  return (
    <>
      <div className="bg-[#fffefc] py-2 px-4 sm:px-[10%]">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={assets.logo}
            alt="FurniGuard Logo"
            className="mx-auto h-24"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-[#326951]">
            Who We Are
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-gray-600">
            At FurniGuard, we don't just furnish spaces—we shape stories, define
            identities, and craft sanctuaries. Here’s everything you should know
            about us.
          </p>
        </motion.div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#2d9b67]/10 p-6 rounded-2xl shadow-sm text-center"
            >
              <div className="mb-3 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#326951] mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Journey */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-[#326951] mb-10">
            Our Journey
          </h2>
          <div className="flex flex-col gap-6">
            {storyTimeline.map((event, idx) => (
              <div
                key={idx}
                className="border-l-4 border-[#2d9b67] pl-6 relative"
              >
                <div className="absolute -left-3 top-1 w-5 h-5 bg-[#2d9b67] rounded-full"></div>
                <h4 className="text-lg font-semibold text-[#326951]">
                  {event.year}
                </h4>
                <p className="text-gray-600 text-sm mt-1">{event.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Expertise */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {expertise.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 bg-white shadow-md rounded-2xl text-center"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h4 className="text-xl font-semibold text-[#326951]">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision Statement */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <blockquote className="text-xl italic text-gray-600 max-w-2xl mx-auto">
            "We believe a well-designed space elevates not just the surroundings
            but the soul. Design is a responsibility—and we carry it with
            pride."
          </blockquote>
          <p className="mt-2 text-sm text-[#326951]">— Team FurniGuard</p>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default About;
