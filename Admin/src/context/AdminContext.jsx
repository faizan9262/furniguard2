import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAllAppointments,
  getAllDesigners,
  getAllProducts,
} from "../helper/apis.js";

export const AdminContex = createContext();

export const AdminContexProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const getAllDesignerFromDB = async () => {
      const data = await getAllDesigners();
      // console.log("Data:",data);
      setDesigners(data);
    };
    getAllDesignerFromDB();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await getAllProducts();
        // console.log("Products response: ",response);
        
        if (response.success) {
          const allProducts = response.ratedProducts;
          // console.log("All products: ",allProducts);
          setList(allProducts);    
        } else {
          // toast.error(response.data.message);
        }
      } catch (error) {
        // toast.error("Failed to fetch products.");
      }
    };
    fetchList();
  }, []);

  useEffect(() => {
    // console.log("Designers: ",designers);
    // console.log("List: ", list);
  },[list]);

  useEffect(() => {
    const getAllAppointmentsOfUser = async () => {
      const data = await getAllAppointments();
      // console.log("Data:", data);
      setAllAppointments(data);
    };
    getAllAppointmentsOfUser();
  }, []);

  useEffect(() => {
    // console.log("Appointments Array:", allAppointments);
  }, [allAppointments]);

  const removeAppointment = (id) => {
    setAllAppointments((prev) =>
      prev.filter((appointment) => appointment._id !== id)
    );
  };

  const value = {
    designers,
    removeAppointment,
    allAppointments,
    list,
    setList,
    messages,
    setMessages
  };

  return (
    <AdminContex.Provider value={value}>{props.children}</AdminContex.Provider>
  );
};

export const useAdmin = () => useContext(AdminContex);
