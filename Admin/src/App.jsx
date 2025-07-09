import { Route, Routes, useLocation } from "react-router-dom";

import Appointments from "./pages/Appointments";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Add from "./pages/Add";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { backendUrl } from "./pages/Add";
import Designers from "./pages/Designers";
import DesignerDetails from "./pages/DesignerDetails";
import AppointmentDetailPage from "./pages/AppointmentDetails";
import ProductDetail from "./components/ProductDetail";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import adminSocket from "./adminSocket";
import ChatBox from "./pages/Chatbox";
import { useAdmin } from "./context/AdminContext";

function App() {
  const [authenticated, setAuthenticated] = useState(null); // null = checking
  const admin = useAdmin()
  const location =  useLocation()
  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected with ID:", adminSocket.id);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from socket");
    };

    const handleReceive = (msg)=>{
      console.log("Recoved msg: ",msg);
      admin.setMessages((prev) => [...prev, msg])
    }

    adminSocket.on("connect", handleConnect);
    adminSocket.on("disconnect", handleDisconnect);
    adminSocket.on("receive-message", handleReceive);

    return () => {
      adminSocket.off("connect", handleConnect);
      adminSocket.off("disconnect", handleDisconnect);
      adminSocket.off("receive-message", handleReceive);
    };
  }, []);

  useEffect(() => {
    adminSocket.emit("join", "admin");
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/admin/check-auth`, {
          withCredentials: true,
        });

        // console.log("Admin auth check: ", res);

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

  const hideNavbar = location.pathname.startsWith("/chat/");

  return (
    <div>
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <>
          {!hideNavbar && <Navbar setAuthenticated={setAuthenticated} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:senderId/:receiverId" element={<ChatBox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/add" element={<Add />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category/:id" element={<ProductDetail />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/appointments/:id"
              element={<AppointmentDetailPage />}
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/designers" element={<Designers />} />
            <Route path="/designers/:id" element={<DesignerDetails />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
