import React, { useState } from "react";
import { Button } from "../components/components/ui/button";
import {
  BedDoubleIcon,
  BellRing,
  BellRingIcon,
  CalendarClock,
  HeartIcon,
  HomeIcon,
  InfoIcon,
  LayoutPanelLeftIcon,
  Menu,
  MessageCircleIcon,
  MessageSquare,
  MessageSquareCode,
  SofaIcon,
  User2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/components/ui/avatar";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInbox } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Helper to check active path
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

  // console.log("Name: ", auth.user);

  return (
    <header className="w-full sticky bg-[#2d9b67] top-0 px-5 z-50">
      <div className="flex h-14 items-center justify-between">
        <div className="flex md:hidden gap-3">
          <Avatar
            onClick={() => {
              navigate("/profile");
            }}
            className="w-10 border-white border-2 h-10"
          >
            <AvatarImage src={auth?.user?.profilePic} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl cursor-pointer bg-[#326951] text-white font-space font-bold border-2 py-1 px-2 rounded-full"
        >
          FurniGuard &reg;
        </div>

        {/* Desktop Nav */}
        {auth.isLoggedIn && auth.user.role !== "designer" && (
          <nav className="hidden md:flex text-white font-space gap-6">
            <Button
              onClick={() => navigate("/")}
              className={`text-lg  font-semibold ${
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
              className={`text-lg  font-semibold ${
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
              className={`text-lg  font-semibold ${
                isActive("/products")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <SofaIcon /> Products
            </Button>
            <Button
              onClick={() => navigate("/rooms")}
              className={`text-lg font-semibold ${
                isActive("/rooms")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <BedDoubleIcon /> Rooms
            </Button>
            <Button
              onClick={() => navigate("/layout")}
              className={`text-lg font-semibold ${
                isActive("/layout")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <LayoutPanelLeftIcon /> Layouts
            </Button>
            <Button
              onClick={() => navigate("/designers")}
              className={`text-lg font-semibold ${
                isActive("/designers")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <GrUserWorker /> Designers
            </Button>

            <Button
              onClick={() => navigate("/wishlist")}
              className={`text-lg font-semibold ${
                isActive("/wishlist")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <HeartIcon /> Wishlist
            </Button>
            <Button
              onClick={() => navigate("/about")}
              className={`text-lg font-semibold ${
                isActive("/about")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <InfoIcon /> About
            </Button>
             <Button
              onClick={() => navigate("/inbox")}
              variant="ghost"
              className={`rounded-full border-2 p-2 h-10 w-10 bg-secondary border-white ${
                isActive("/inbox")
                  ? " text-[#326951] bg-white"
                  : "text-white hover:bg-white hover:text-[#326951]"
              }`}
            >
              <MessageSquare />
              {/* 🔴 Optional badge */}
              {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
            </Button>
          </nav>
        )}

        {auth.isLoggedIn && auth.user.role === "designer" && (
          <nav className="hidden md:flex text-white font-space gap-6">
            <Button
              onClick={() => navigate("/")}
              className={`text-xl  font-semibold ${
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
              className={`text-xl  font-semibold ${
                isActive("/appointments")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <CalendarClock /> Appointments
            </Button>

            <Button
              onClick={() => navigate("/about")}
              className={`text-xl font-semibold ${
                isActive("/about")
                  ? "bg-[#326951] border-2 border-white"
                  : "text-white"
              }`}
              variant="ghost"
            >
              <InfoIcon /> About
            </Button>
            <Button
              onClick={() => navigate("/inbox")}
              variant="ghost"
              className={`rounded-full p-2 h-10 w-10 flex items-center justify-center border-2 bg-secondary border-white ${
                isActive("/inbox")
                  ? " text-[#326951] bg-white shadow-md"
                  : "text-white hover:bg-white hover:text-[#326951]"
              }`}
            >
              <MessageSquare className="h-6 w-6" />
              {/* 🔴 Optional badge */}
              {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
            </Button>
          </nav>
        )}

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {auth.isLoggedIn ? (
            <>
              <Avatar
                onClick={() => navigate("/profile")}
                className="hidden md:block border-white border-2 w-11 h-11"
              >
                <AvatarImage src={auth?.user?.profilePic} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Button
              className="border-2 border-white hover:border-none text-lg rounded-md py-2 px-4 text-white font-semibold"
              variant="ghost"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          )}

          {auth.isLoggedIn && auth.user.role !== "designer" && (
            <>
            <Button
                onClick={() => navigate("/inbox")}
                variant="ghost"
                className={`md:hidden rounded-full p-2 h-10 w-10 flex items-center justify-center border-2 bg-secondary border-white ${
                  isActive("/inbox")
                    ? " text-[#326951] bg-white shadow-md"
                    : "text-white hover:bg-white hover:text-[#326951]"
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                {/* 🔴 Optional badge */}
                {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
              </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              {" "}
              {/* ✅ Step 2: controlled */}
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden rounded-full p-2 h-10 w-10 bg-[#326951] border-2 text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-primary h-[80%] rounded-sm m-3 border-2 border-white w-53"
              >
                <nav className="flex flex-col items-start font-space gap-4 mt-10">
                  <div className="flex items-center justify-center gap-1">
                    <Avatar
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                      className="ml-4 w-8 border-white border-2 h-8"
                    >
                      <AvatarImage src={auth?.user?.profilePic} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold text-white  text-sm">
                        {auth?.user?.name}
                      </p>
                      <p className="font-light text-white  text-xs">
                        {auth?.user?.email}
                      </p>
                    </div>
                  </div>
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
                    onClick={() => navigate("/rooms")}
                    className={`text-xl font-semibold ${
                      isActive("/rooms")
                        ? "bg-[#326951] mx-2 border-2 border-white"
                        : "text-white"
                    }`}
                    variant="ghost"
                  >
                    <BedDoubleIcon /> Rooms
                  </Button>
                  <Button
                    onClick={() => navigate("/layout")}
                    className={`text-xl font-semibold ${
                      isActive("/layout")
                        ? "bg-[#326951] mx-2 border-2 border-white"
                        : "text-white"
                    }`}
                    variant="ghost"
                  >
                    <LayoutPanelLeftIcon /> Layouts
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
                    onClick={() => navigate("/wishlist")}
                    className={`text-xl font-semibold ${
                      isActive("/wishlist")
                        ? "bg-[#326951] mx-2 border-2 border-white"
                        : "text-white"
                    }`}
                    variant="ghost"
                  >
                    <HeartIcon /> Wishlist
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
            </>
          )}
          {auth.isLoggedIn && auth.user.role === "designer" && (
            <>
              <Button
                onClick={() => navigate("/inbox")}
                variant="ghost"
                className={`md:hidden rounded-full p-2 h-10 w-10 flex items-center justify-center border-2 bg-secondary border-white ${
                  isActive("/inbox")
                    ? " text-[#326951] bg-white shadow-md"
                    : "text-white hover:bg-white hover:text-[#326951]"
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                {/* 🔴 Optional badge */}
                {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" /> */}
              </Button>
              <Sheet open={open} onOpenChange={setOpen}>
                {" "}
                {/* ✅ Step 2: controlled */}
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden bg-[#326951] border-2 p-2 h-10 w-10 rounded-full text-white"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-primary h-[40%] rounded-sm m-3 border-2 border-white w-53"
                >
                  <nav className="flex flex-col items-start font-space gap-4 mt-10">
                    <div className="flex items-center justify-center gap-1">
                      <Avatar
                        onClick={() => {
                          navigate("/profile");
                          setOpen(false);
                        }}
                        className="ml-4 w-8 border-white border-2 h-8"
                      >
                        <AvatarImage src={auth?.user?.profilePic} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start justify-center">
                        <p className="font-bold text-white  text-sm">
                          {auth?.user?.name}
                        </p>
                        <p className="font-light text-white  text-xs">
                          {auth?.user?.email}
                        </p>
                      </div>
                    </div>
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
                      onClick={() => navigate("/notifications")}
                      className={`text-xl  font-semibold ${
                        isActive("/notifications")
                          ? "bg-[#326951] mx-2 border-2 border-white"
                          : "text-white"
                      }`}
                      variant="ghost"
                    >
                      <BellRing /> Notifications
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
