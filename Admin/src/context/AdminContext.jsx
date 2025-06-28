import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllAppointments, getAllDesigners } from '../helper/apis';

export const AdminContex = createContext();

export const AdminContexProvider = (props) => {
  
 const [designers, setDesigners] = useState([]);
 const [allAppointments,setAllAppointments] = useState([])

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

 
  useEffect(()=>{
    const getAllAppointmentsOfUser = async()=>{
      const data = await getAllAppointments() 
      console.log("Data:",data);
      setAllAppointments(data)
    }
    getAllAppointmentsOfUser()
  },[])

  useEffect(()=>{
    console.log("Appointments Array:",allAppointments);
  },[allAppointments])


  const removeAppointment = (id) => {
    setAllAppointments((prev) =>
      prev.filter((appointment) => appointment._id !== id)
    );
  };

  const value = {
    designers,
    removeAppointment, 
    allAppointments
  };

  return (
    <AdminContex.Provider value={value}>
      {props.children}
    </AdminContex.Provider>
  );
};

export const useAdmin = () => useContext(AdminContex);
