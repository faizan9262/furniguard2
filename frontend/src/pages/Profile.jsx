import React, { useEffect, useRef, useState } from "react";
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
  FaSignOutAlt,
} from "react-icons/fa";
import { PiListHeart } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentsContex";
import { useDesiner } from "../context/DesignerContex";
import UserProfile from "@/components/UserProfile";
import DesignerProfile from "@/components/DesignerProfile";

const Profile = () => {
  const designer = useDesiner();
  const currentDesigner = designer.currentDesigner

  // console.log("Profile: ",currentDesigner);
  

  return (
    <>
      {currentDesigner?.length > 0 ? (
        <DesignerProfile  />
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Profile;
