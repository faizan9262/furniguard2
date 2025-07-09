import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import axios from "axios";
import { Toaster } from "./components/components/ui/sonner";
import { ProductContextProvider } from "./context/ProductContext";
import { DesignerContexProvider } from "./context/DesignerContex";
import { AppointmentsContexProvider } from "./context/AppointmentsContex";

axios.defaults.baseURL = "https://furniguard-backend.vercel.app/api";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductContextProvider>
          <DesignerContexProvider>
            <AppointmentsContexProvider>
              <App />
              <Toaster position="top-right" />
            </AppointmentsContexProvider>
          </DesignerContexProvider>
        </ProductContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
