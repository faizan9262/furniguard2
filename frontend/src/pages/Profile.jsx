import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/components/ui/card";
import {
  FaEdit,
  FaEnvelope,
  FaKey,
  FaUser,
  FaHeart,
  FaCalendarAlt,
  FaArrowRight,
  FaSignOutAlt,
  FaHistory,
} from "react-icons/fa";
import { PiListHeart } from "react-icons/pi";
import { AiOutlineSchedule, AiTwotoneSchedule } from "react-icons/ai";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentsContex";

const Profile = () => {
  const auth = useAuth();
  const {user} = auth
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  let pendingAppointment = 0
  const appointment = useAppointment()
  const allAppointmentsOfUser = appointment.allAppointments

  allAppointmentsOfUser.forEach((ap) => {
    if (ap.status === "pending") {
      pendingAppointment += 1;
    }
  });

  const handleEditProfilePic = () => {
    fileInputRef.current?.click(); // Trigger hidden input
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast.loading("Updating Your Profile", { id: "update-profile" });

      const formData = new FormData();
      formData.append("profile", file);

      const data = await auth.updateProfilePic(formData);

      setSelectedFile(null);

      toast.success("Profile Updated", { id: "update-profile" });
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "update-profile" });
    }
  };

  const resetPassword = () => {
    toast.info("Password reset link has been sent to your email");
  };

  const emailVerificationOtp = async () => {
    try {
      await auth.sendEmailVerifyOtp();
      toast.success("6 Digit OTP sent to your registered email.", {
        id: "otp",
      });
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "otp" });
    }
  };

  const handleLogout = () => {
    auth.logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  console.log("Count in pf: ",auth.wishlistCount);
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#effaf2] to-[#c8ebd9] py-12 px-4 flex flex-col items-center justify-center">
      {/* Top Heading / Introduction */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-[#2d9b67] mb-2">
          Welcome to Your Profile
        </h1>
        <p className="text-gray-700 text-base">
          Manage your personal details, appointments, saved items, and account
          settings all in one place.
        </p>
      </motion.div>

      {/* Main Profile and Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row gap-6 items-stretch justify-center w-full max-w-6xl"
      >
        {/* Profile Card */}
        <Card className="w-full md:w-[30%] rounded-3xl shadow-xl bg-white/80 backdrop-blur-md z-10">
          <CardHeader className="flex flex-col items-center">
            <div className="relative w-28 h-28">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : user?.profilePic
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-[#2d9b67]"
              />
              <button
                className="absolute bottom-0 right-0 bg-[#2d9b67] p-2 rounded-full shadow text-white"
                onClick={handleEditProfilePic}
              >
                <FaEdit size={14} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#2d9b67] text-center">
              <FaUser className="inline mr-2" /> {auth?.user?.name || "User"}
            </h2>
            <p className="text-gray-700 text-center">
              <FaEnvelope className="inline mr-2 text-[#2d9b67]" />
              {auth?.user?.email || "email@example.com"}
            </p>
          </CardHeader>
          <CardContent className="mt-6 space-y-4">
            {!auth?.user?.isEmailVerified && (
              <Button
                variant="outline"
                className="w-full bg-yellow-100 text-yellow-900 border-yellow-400"
                onClick={emailVerificationOtp}
              >
                Verify Email
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full bg-[#2d9b67] text-white hover:bg-[#277b59]"
              onClick={() => navigate("/update-password")}
            >
              <FaKey className="mr-2" /> Update Password
            </Button>
            <Button
              variant="ghost"
              className="w-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>

        {/* Overview Card */}
        <motion.div
          initial={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full md:w-[30%]"
        >
          <Card className="rounded-3xl shadow-xl bg-white/80 backdrop-blur-md h-full">
            <CardHeader className="text-center">
              <h3 className="text-2xl font-semibold text-[#2d9b67]">
                Account Overview
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Appointments */}
                <div className="p-4 bg-[#e3f5ea] rounded-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-[#326951] font-medium mb-1">
                      Appointments
                    </h4>
                    <p className="text-sm flex items-center gap-2">
                      <FaCalendarAlt className="text-[#2d9b67]" /> You have{" "}
                      <strong>{pendingAppointment} upcoming</strong> appointments
                    </p>
                  </div>
                  <Button
                    className="mt-4 bg-[#2d9b67] text-white hover:bg-[#277b59]"
                    onClick={() => navigate("/appointments")}
                  >
                    Go to Appointments <AiOutlineSchedule />
                  </Button>
                </div>

                {/* Wishlist */}
                <div className="p-4 bg-[#e3f5ea] rounded-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-[#326951] font-medium mb-1">
                      Wishlist
                    </h4>
                    <p className="text-sm flex items-center gap-2">
                      <FaHeart className="text-[#2d9b67]" /> Total{" "}
                      <strong>{auth.wishlistCount} saved</strong> items
                    </p>
                  </div>
                  <Button
                    className="mt-4 bg-[#2d9b67] text-white hover:bg-[#277b59]"
                    onClick={() => navigate("/wishlist")}
                  >
                    View Wishlist <PiListHeart />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 text-center max-w-2xl"
      >
        <p className="text-sm text-gray-600">
          Your profile data is securely stored. You can always come back here to
          update your details, check your bookings. Thanks for being with us!
        </p>
      </motion.div>
    </div>
  );
};

export default Profile;
