import { Route, Routes } from "react-router-dom";
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
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./pages/Profile.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Appointments from "./pages/Appointments.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import PasswordUpdate from "./pages/PasswordUpdate.jsx";
import PasswordReset from "./pages/PasswordReset.jsx";
import AppointmentDetailPage from "./pages/AppointmentDetails.jsx";
import NewAppointment from "./pages/NewAppointment.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
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
