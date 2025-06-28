import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/components/ui/button";
import {
  BedDoubleIcon,
  CalendarClock,
  HeartIcon,
  HomeIcon,
  InfoIcon,
  LayoutPanelLeftIcon,
  SofaIcon,
  User2,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const [menuOpen, setMenuOpen] = useState(false); // State to track the menu's visibility
  const navigate = useNavigate();

  if (isAuthPage) return null; // Don't render the Navbar if on the auth pages

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu open/close
  };

  const handleLogout = () => {
    removeToken();
  };

  const isActive = (path) => {
    const currentPath = location.pathname;

    if (path === "/products") {
      return (
        currentPath.startsWith("/products") &&
        !currentPath.startsWith("/products/livingroom") &&
        !currentPath.startsWith("/products/layout")
      );
    }

    if (path === "/rooms") {
      return (
        currentPath.startsWith("/products/livingroom") ||
        currentPath === "/rooms"
      );
    }

    if (path === "/layout") {
      return (
        currentPath.startsWith("/products/layout") || currentPath === "/layout"
      );
    }

    if (path === "/designers") {
      return currentPath.startsWith("/designers");
    }

    if (path === "/appointments") {
      return currentPath.startsWith("/appointments");
    }

    if (path === "/notifications") {
      return currentPath.startsWith("/notifications");
    }

    return currentPath === path;
  };

  return (
    <>
      <header className="w-full sticky bg-[#2d9b67] top-0 px-5 z-50">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="text-xl md:text-2xl cursor-pointer bg-[#326951] text-white font-space font-bold border-2 border-white py-1 px-2 rounded-full"
          >
            FurniGuard &reg;
          </div>
          <nav className="hidden md:flex text-white  font-space gap-6">
            <Button
              onClick={() => navigate("/")}
              className={`text-xl  font-semibold hover:bg-white ${
                isActive("/")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <HomeIcon /> Home
            </Button>

            <Button
              onClick={() => navigate("/appointments")}
              className={`text-xl  font-semibold hover:bg-white ${
                isActive("/appointments")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <CalendarClock /> Appointments
            </Button>

            <Button
              onClick={() => navigate("/products")}
              className={`text-xl  font-semibold hover:bg-white ${
                isActive("/products")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <SofaIcon /> Products
            </Button>
            <Button
              onClick={() => navigate("/designers")}
              className={`text-xl font-semibold hover:bg-white ${
                isActive("/designers")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <User2 /> Designers
            </Button>
            <Button
              onClick={() => navigate("/about")}
              className={`text-xl font-semibold hover:bg-white ${
                isActive("/about")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <InfoIcon /> About
            </Button>
          </nav>
          <div>
            <p>Hey, Admin</p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
