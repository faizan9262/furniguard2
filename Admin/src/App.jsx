import { Route, Routes } from "react-router-dom";

import Appointments from "./pages/Appointments";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Add from "./pages/Add";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  console.log(token);
  

  return (
    <div>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken = {setToken} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add token={token}/>} />
            <Route path="/products" element={<Products token={token} />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
