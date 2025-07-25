import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Layout from "./pages/Layout.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";
import Designers from "./pages/Designers.jsx";
import Login from "./pages/Login.jsx";
import DesignerDetail from "./components/DesignerDetail.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Rooms from "./pages/Rooms.jsx";
import Profile from "./pages/Profile.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Appointments from "./pages/Appointments.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import PasswordUpdate from "./pages/PasswordUpdate.jsx";
import PasswordReset from "./pages/PasswordReset.jsx";
import AppointmentDetailPage from "./pages/AppointmentDetails.jsx";
import NewAppointment from "./pages/NewAppointment.jsx";
import { useEffect } from "react";
import socket from "./socket.js";
import ChatBox from "./pages/Chatbox.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Inbox from "./pages/Inbox.jsx";

function App() {
  const auth = useAuth();
  const location = useLocation();
  // console.log("Role:", auth?.user?.role);

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected with ID:", socket.id);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from socket");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  useEffect(() => {
    if (auth?.user?.id) {
      socket.emit("join", auth?.user?.id);
    }
    console.log("Joined: ");
  }, [auth?.user?.id]);

  const hideNavbar = location.pathname.startsWith("/chat/");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:receiverId/:receiverRole" element={<ChatBox />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/layout" element={<Layout />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/designers" element={<Designers />} />
          <Route path="/designers/:id" element={<DesignerDetail />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/:id" element={<AppointmentDetailPage />} />
          <Route path="/new-appointment" element={<NewAppointment />} />

          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/update-password" element={<PasswordUpdate />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
