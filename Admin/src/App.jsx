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
import axios from "axios";
import { backendUrl } from "./pages/Add"
import Designers from "./pages/Designers";
import DesignerDetails from "./pages/DesignerDetails";
import AppointmentDetailPage from "./pages/AppointmentDetails";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [authenticated, setAuthenticated] = useState(null); // null = checking

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/admin/check-auth`, {
          withCredentials: true,
        });

        console.log("Admin auth check: ",res);
        

        if (res.data.success) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
        console.log("Auth check failed", err);
      }
    };

    checkAuth();
  }, []);

  if (authenticated === null) {
    return <div className="text-center p-10">Checking auth...</div>;
  }

  return (
    <div>
      <ToastContainer />
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <>
          <Navbar setAuthenticated={setAuthenticated} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category/:id" element={<ProductDetail />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/:id" element={<AppointmentDetailPage />} />
            <Route path="/designers" element={<Designers />} />
            <Route path="/designers/:id" element={<DesignerDetails />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
