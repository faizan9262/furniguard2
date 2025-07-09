import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaStar,
  FaEdit,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { Badge } from "@/components/components/ui/badge";
import { Button } from "@/components/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/components/ui/card";
import { useDesiner } from "../context/DesignerContex";
import { useAppointment } from "../context/AppointmentsContex";
import { useAuth } from "../context/AuthContext";
import LayoutCard from "./LayoutCard";
import { LiaUserEditSolid } from "react-icons/lia";
import { RiFunctionAddFill } from "react-icons/ri";
import { toast } from "sonner";
import AddProjectDialog from "./ProjectDialog";
import EditDesignerProfileDialog from "./DesignerProfileDialog";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbBulb } from "react-icons/tb";

const DesignerProfile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const auth = useAuth();
  const design = useDesiner();
  const designer = design.currentDesigner[0];
  const user = designer?.user;
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  let pendingAppointment = 0;
  const appointment = useAppointment();
  const allAppointmentsOfUser = appointment?.allAppointments;

  useEffect(() => {
    setProjects(designer?.projects);
    // console.log("Projects : ",projects);
  }, [designer]);

  allAppointmentsOfUser?.forEach((ap) => {
    if (ap.status !== "completed") {
      pendingAppointment += 1;
    }
  });

  const handleEditProfilePic = () => {
    fileInputRef.current?.click();
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

  const designerProjects = projects;
  // console.log("Project: ", designerProjects);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#effaf2] to-[#c8ebd9] py-12 px-4 flex flex-col items-center justify-center">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-[#2d9b67] mb-2">
          Welcome, {user?.username || "Designer"}!
        </h1>
        <p className="text-gray-700 text-base">
          View and manage your designer profile, appointments, and projects.
        </p>
      </motion.div>

      {/* Profile Overview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row gap-6 items-stretch justify-center w-full max-w-6xl"
      >
        {/* Profile Card */}
        <Card className="w-full md:w-[30%] rounded-3xl shadow-xl bg-white/80 backdrop-blur-md z-10">
          <CardHeader className="flex flex-col items-center">
            <div className="relative w-28 h-28">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : user?.profilePicture
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
            <Badge
              variant="Outline"
              className={`mt-4 bg-primary/10 font-bold text-[#2d9b67] text-center`}
            >
              {designer?.type}
            </Badge>
            <div className="flex flex-col items-start">
              <p className="text-gray-700 text-center">
                <IoLogoWhatsapp className="inline mr-2 text-[#2d9b67]" />
                {designer?.phone || "email@example.com"}
              </p>
              <p className="text-gray-700 text-center">
                <FaEnvelope className="inline mr-2 text-[#2d9b67]" />
                {auth?.user?.email || "email@example.com"}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
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
          className="w-full md:w-[65%]"
        >
          <Card className="rounded-3xl shadow-xl bg-white/80 backdrop-blur-md h-full">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-[#2d9b67]">
                  Profile Overview
                </h3>
                <EditDesignerProfileDialog />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bio & Experience */}
              <div className="bg-[#e3f5ea] rounded-xl p-4">
                <h4 className="text-[#326951] font-medium mb-1">Bio</h4>
                <p className="text-sm text-gray-700">
                  {designer?.bio || "No bio provided."}
                </p>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="bg-[#e3f5ea] rounded-xl p-4 w-full sm:w-[48%]">
                  <h4 className="text-[#326951] font-medium">Expertise</h4>
                  <div className="flex gap-2 flex-wrap max-h-28 md:max-h-16 scroll-smooth scrollbar-hide overflow-y-auto">
                    {designer?.expertise?.length > 0
                      ? designer.expertise.map((ex, idx) => (
                          <Badge
                            key={idx}
                            className="bg-primary mt-1 text-white"
                          >
                            {ex}
                          </Badge>
                        ))
                      : "Not Available"}
                  </div>
                </div>
                <div className="bg-[#e3f5ea] rounded-xl p-4 w-full sm:w-[48%]">
                  <h4 className="text-[#326951] font-medium">Studio Address</h4>
                  <p className="text-sm">
                    {designer?.studioAddress || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="bg-[#e3f5ea] rounded-xl p-4 w-full sm:w-[48%]">
                  <h4 className="text-[#326951] font-medium">Experience</h4>
                  <p className="text-sm">{designer?.experience} years</p>
                </div>
                <div className="bg-[#e3f5ea] rounded-xl p-4 w-full sm:w-[48%]">
                  <h4 className="text-[#326951] font-medium">Average Rating</h4>
                  <p className="text-sm flex items-center gap-2">
                    <FaStar className="text-yellow-500" />{" "}
                    {designer?.averageRating || 0}/5 from{" "}
                    {designer?.totalRatings} ratings
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="bg-[#e3f5ea] rounded-xl p-4 w-full sm:w-[48%]">
                  <h4 className="text-[#326951] font-medium">
                    Preferred Locations
                  </h4>
                  <p className="text-sm">
                    {designer?.preferredLocations?.join(", ") ||
                      "Not specified"}
                  </p>
                </div>
                <div className="bg-[#e3f5ea] rounded-xl p-4 w-full sm:w-[48%]">
                  <h4 className="text-[#326951] font-medium">Mobile Number</h4>
                  <p className="text-sm flex items-center gap-2">
                    +91 {designer?.phone || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      <section className="w-full max-w-7xl mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-secondary">
            Your Featured Projects
          </h2>
          <AddProjectDialog
            projects={designerProjects}
            open={open}
            setOpen={setOpen}
            designerProjects={projects}
            setProjects={setProjects}
          >
            <Button
              variant="outline"
              className="w-1/6 sm:w-[10%] bg-primary/20 text-[#2d9b67] hover:bg-[#277b59]"
            >
              <RiFunctionAddFill className="" />{" "}
              <span className="hidden md:block">Add Project</span>
            </Button>
          </AddProjectDialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {designerProjects?.length > 0
            ? designerProjects?.map((project, idx) => (
                <div
                  key={idx}
                  rel="noreferrer"
                  className="hover:scale-[1.03] transition-transform duration-300"
                >
                  <LayoutCard
                    projectId={project._id}
                    img_scr={project?.images[0]}
                    description={project.description}
                    className="w-full h-full object-cover"
                    title={project.title}
                    tag="Project"
                    duration={project.duration}
                    setProjects={setProjects}
                  />
                </div>
              ))
            : "No Projects Found."}
        </div>
        <div className="bg-primary/20 my-8 text-primary border-l-[6px] border-primary dark:border-yellow-500/40 px-4 py-3 rounded-lg text-sm">
          <div className="flex items-center gap-1">
            <TbBulb size={18} />
            <p className="font-medium">TIP</p>
          </div>
            <p>
              You cannot modify or Edit Projects Details. In case of any mistake
              or want to edit, please
              <span className="font-semibold text-red-600 dark:text-red-400">
                {" "}
                Delete{" "}
              </span>
              the Project and Re-upload.
            </p>
        </div>
      </section>
    </div>
  );
};

export default DesignerProfile;
