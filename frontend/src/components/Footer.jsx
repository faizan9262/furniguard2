import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { Separator } from "@/components/components/ui/separator";
import { Card, CardContent } from "@/components/components/ui/card";

const Footer = () => {
  return (
    <footer className="bg-[#326951] text-white border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <Card className="bg-transparent border-none shadow-none text-white">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-2xl font-bold text-primary">FURNIGUARD&reg;</h2>
            <p className="text-sm leading-relaxed">
              Redefining furniture aesthetics and durability. At FURNIGUARD, we blend contemporary design with unmatched craftsmanship to deliver comfort and style to your home.
            </p>
          </CardContent>
        </Card>

        {/* Store Locations */}
        <Card className="bg-transparent border-none shadow-none text-white">
          <CardContent className="p-0 space-y-4">
            <h2 className="text-xl font-semibold text-primary">Store Locations</h2>
            <p className="text-sm leading-relaxed">
              Mumbai, Kolkata, Hyderabad, Chennai, Bengaluru, Jaipur, Ahmedabad, Prayagraj, Pune, Agra, Varanasi, Lucknow, Visakhapatnam, Chandigarh, Kanpur, Surat, Delhi, Nagpur, Madurai, Kochi, Patna, Jodhpur, Coimbatore, Guwahati, Nashik, Ludhiana, Amritsar, Jabalpur
            </p>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="bg-transparent border-none shadow-none text-white">
          <CardContent className="p-0">
            <h2 className="text-xl font-semibold text-primary mb-4">Follow Us</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
                <FaInstagram className="w-5 h-5" /> <span>Instagram</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
                <FaXTwitter className="w-5 h-5" /> <span>Twitter</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
                <FaLinkedin className="w-5 h-5" /> <span>LinkedIn</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
                <FaYoutube className="w-5 h-5" /> <span>YouTube</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-primary" />

      <div className="py-4 text-center text-sm text-white">
        All rights reserved &copy; 2024 - 2029 <span className="text-primary font-semibold">FURNIGUARD</span>
      </div>
    </footer>
  );
};

export default Footer;