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
  FaSignOutAlt,
} from "react-icons/fa";
import { PiListHeart } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentsContex";
import { useDesiner } from "../context/DesignerContex";
import { Badge } from "@/components/components/ui/badge";
import UserProfile from "@/components/UserProfile";
import DesignerProfile from "@/components/DesignerProfile";

const Profile = () => {
  const designer = useDesiner();
  const auth = useAuth();

  const designerUserId = auth?.user?.role === "designer" && auth?.user?.id;

  const designerProfile = designer.designers.filter(
    (d) => d.user?._id === designerUserId
  );

  return (
    <>{designerProfile?.length > 0 ? <DesignerProfile designer={designerProfile[0]}/> : <UserProfile />}</>
  );
};

export default Profile;
