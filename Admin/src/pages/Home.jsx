import React from "react";
import { BsHouseAddFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {assets} from '../assets/assets'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex justify-center gap-5 flex-col items-center shadow-lg rounded-lg">
        <img src={assets.logo} className="w-60" alt="logo" />
        <p className="text-6xl">Welcome to Furniguard, Admin</p>
        <button onClick={() => navigate('/add')} className="flex items-center gap-2 bg-primary text-white rounded-full px-5    py-2 text-xl font-medium shadow-md hover:scale-105 transition-all duration-300 hover:bg-secondary">
          Add Product <BsHouseAddFill />{" "}
        </button>
    </div>
  );
};

export default Home;
