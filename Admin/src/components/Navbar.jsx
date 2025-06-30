import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/components/ui/button";
import {
  BedDoubleIcon,
  Bell,
  CalendarClock,
  HeartIcon,
  HomeIcon,
  InfoIcon,
  LayoutPanelLeftIcon,
  Menu,
  SofaIcon,
  User2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const [menuOpen, setMenuOpen] = useState(false); // State to track the menu's visibility
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
              onClick={() => navigate("/notifications")}
              className={`text-xl  font-semibold hover:bg-white ${
                isActive("/notifications")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <Bell /> Notifications
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
          <p className="mx-6 text-white font-semibold text-lg">Hey, Admin</p>
          <Sheet open={open} onOpenChange={setOpen}>
            {" "}
            {/* ✅ Step 2: controlled */}
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-[#326951] border-2 text-white"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-primary h-[45%] rounded-sm m-3 border-2 border-white w-53"
            >
              <nav className="flex flex-col items-start font-space gap-4 mt-10">
                <Button
                  onClick={() => navigate("/")}
                  className={`text-xl font-semibold ${
                    isActive("/")
                      ? "bg-[#326951] mx-2 border-2 border-white"
                      : "text-white"
                  }`}
                  variant="ghost"
                >
                  <HomeIcon /> Home
                </Button>
                <Button
                  onClick={() => navigate("/appointments")}
                  className={`text-xl  font-semibold ${
                    isActive("/appointments")
                      ? "bg-[#326951] mx-2 border-2 border-white"
                      : "text-white"
                  }`}
                  variant="ghost"
                >
                  <CalendarClock /> Appointments
                </Button>
                <Button
                  onClick={() => navigate("/products")}
                  className={`text-xl  font-semibold ${
                    isActive("/products")
                      ? "bg-[#326951] mx-2 border-2 border-white"
                      : "text-white"
                  }`}
                  variant="ghost"
                >
                  <SofaIcon /> Products
                </Button>
                <Button
                  onClick={() => navigate("/designers")}
                  className={`text-xl font-semibold ${
                    isActive("/designers")
                      ? "bg-[#326951]mx-2 border-2 border-white"
                      : "text-white"
                  }`}
                  variant="ghost"
                >
                  <User2 /> Designers
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  className={`text-xl font-semibold ${
                    isActive("/about")
                      ? "bg-[#326951] mx-2 border-2 border-white"
                      : "text-white"
                  }`}
                  variant="ghost"
                >
                  <InfoIcon /> About
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div></div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
