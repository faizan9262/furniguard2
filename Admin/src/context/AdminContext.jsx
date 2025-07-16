import React, { createContext, useContext, useEffect, useState } from "react";
import {
  authStatus,
  getAllAppointments,
  getAllDesigners,
  getAllProducts,
} from "../helper/apis.js";
import { backendUrl } from "../pages/Add";
import axios from "axios";

export const AdminContex = createContext();

export const AdminContexProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [list, setList] = useState([]);
  const [admin, setAdmin] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/login",
        { email, password },
        { withCredentials: true }
      );
      setUser({
        email: data.email,
        name: data.name,
        role:data.role,
        profilePicture: data.profilePic,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (admin) {
      const checkAuth = async () => {
        const data = await authStatus();
        // console.log("User Data:",data);
        if (data) {
          setAdmin({
            email: data.email,
            name: data.name,
            isEmailVerified: data.emailVerified,
            role: data.role,
            id: data.id,
            profilePic: data.profilePic,
          });
          setIsLoggedIn(true);
        } else {
          setAdmin({
            email: "",
            name: "",
            isEmailVerified: "",
          });
          setIsLoggedIn(false);
        }
      };
      checkAuth();
    }
  }, []);

  useEffect(() => {
    // console.log("Admin: ", admin);
  }, [admin]);

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
  }, [list]);

  useEffect(() => {
    const getAllAppointmentsOfUser = async () => {
      const data = await getAllAppointments();
      console.log("Data:", data);
      setAllAppointments(data);
    };
    getAllAppointmentsOfUser();
  }, [allAppointments]);

  useEffect(() => {
    console.log("Appointments Array:", allAppointments);
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
    setMessages,
    adminLogin,
    admin,
    setAllAppointments
  };

  return (
    <AdminContex.Provider value={value}>{props.children}</AdminContex.Provider>
  );
};

export const useAdmin = () => useContext(AdminContex);
