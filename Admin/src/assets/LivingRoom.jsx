import React from "react";
import RoomCard from "../components/RoomCard";
import { assets } from "./assets";
import { useNavigate } from "react-router-dom";

const LivingRoom = () => {
  const navigate = useNavigate()
  return (
    <div className="mx-10 flex items-center justify-center sm:mx-[10%] ">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <RoomCard onClick={() => {navigate(`/rooms`); window.scroll(0,0)}} img_src={assets.h2} title={"Luxurios Living-Room"} />
        <RoomCard onClick={() => {navigate(`/rooms`); window.scroll(0,0)}} img_src={assets.h3} title={"Classical Living-Room"} />
        <RoomCard onClick={() => {navigate(`/rooms`); window.scroll(0,0)}} img_src={assets.h4} title={"Modular Living-Room"} />
        <RoomCard onClick={() => {navigate(`/rooms`); window.scroll(0,0)}} img_src={assets.h1} title={"Premium Living-Room"} />
      </div>
    </div>
  );
};

export default LivingRoom;
