import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AdminContexProvider } from "./context/AdminContext.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContexProvider>
      <App />
    </AdminContexProvider>
  </BrowserRouter>
);
