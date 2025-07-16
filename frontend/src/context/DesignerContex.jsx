import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllDesigners } from "../helper/api-communicator";
import { useAuth } from "./AuthContext";

export const DesignerContext = createContext();

export const DesignerContexProvider = (props) => {
  const [designers, setDesigners] = useState([]);
  const [currentDesigner, setCurrentDesigners] = useState([]);
  const auth = useAuth();
  const userId = auth?.user?.id;

  // Fetch all designers from DB once
  useEffect(() => {
    const getAllDesignerFromDB = async () => {
      const data = await getAllDesigners();
      setDesigners(data);
    };
    getAllDesignerFromDB();
  }, []);

  // Filter current logged-in designer
  useEffect(() => {
    if (designers.length > 0 && userId) {
      const designerProfile = designers.filter((d) => d.user?._id === userId);
      setCurrentDesigners(designerProfile);
      // console.log("Current: ",currentDesigner);
    }
  }, [designers, userId]);

  console.log("Deign: ",currentDesigner);

  const value = {
    designers,
    setDesigners,
    currentDesigner,
    setCurrentDesigners,
  };

  return (
    <DesignerContext.Provider value={value}>
      {props.children}
    </DesignerContext.Provider>
  );
};

export const useDesiner = () => useContext(DesignerContext);
