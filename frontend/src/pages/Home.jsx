import React from "react";
import { useAuth } from "../context/AuthContext";
import Main from "@/components/Main";
import Hero from "@/components/Hero";
import { useChat } from "../context/ChatContext";
import { useParams } from "react-router-dom";

const Home = () => {
  const auth = useAuth();
  const chat = useChat();

  const { convoId } = useParams();
  chat.setConvoId(convoId);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      {auth.isLoggedIn ? <Main /> : <Hero />}
    </div>
  );
};

export default Home;
