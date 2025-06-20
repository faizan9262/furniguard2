import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllAppointments,  } from '../helper/api-communicator.js';

export const AppointmentsContex = createContext();

export const AppointmentsContexProvider = (props) => {
  const [allAppointments,setAllAppointments] = useState([])
 
  useEffect(()=>{
    const getAllAppointmentsOfUser = async()=>{
      const data = await getAllAppointments() 
    //   console.log("Data:",data);
      setAllAppointments(data)
    }
    getAllAppointmentsOfUser()
  },[])

  useEffect(()=>{
    // console.log("Aoopintments Array:",allAppointments);
  },[allAppointments])


  const removeAppointment = (id) => {
    setAllAppointments((prev) =>
      prev.filter((appointment) => appointment._id !== id)
    );
  };
  const addAppointment = (newAppointment) => {
    setAllAppointments((prev) => [newAppointment, ...prev]);
  };

  const value = {
    allAppointments,
    removeAppointment,
    addAppointment
  };

  


  

  return (
    <AppointmentsContex.Provider value={value}>
      {props.children}
    </AppointmentsContex.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentsContex);
