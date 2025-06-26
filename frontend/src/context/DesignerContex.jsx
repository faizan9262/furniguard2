import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllDesigners } from "../helper/api-communicator";

export const DesignerContext = createContext();

export const DesignerContexProvider = (props) => {
  const [designers, setDesigners] = useState([]);

  useEffect(() => {
    const getAllDesignerFromDB = async () => {
      const data = await getAllDesigners();
      // console.log("Data:",data);
      setDesigners(data);
    };
    getAllDesignerFromDB();
  }, []);

  useEffect(()=>{
    // console.log("Designers: ",designers);
  })

  const value = {
    designers
  };

  return (
    <DesignerContext.Provider value={value}>
      {props.children}
    </DesignerContext.Provider>
  );
};

export const useDesiner = () => useContext(DesignerContext);
