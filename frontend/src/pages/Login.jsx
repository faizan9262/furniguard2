import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'sonner'
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    try {
      toast.loading("Siging In", { id: "login" });
      await auth.login(email, password);
      toast.success("Sign in Successfully", { id: "login" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "login" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-slate-200">
        <div className="mx-4 sm:mx-[10%] min-h-screen flex items-center justify-center relative">
          {/* Overlay Loader */}
          <div className="w-full sm:w-2/5 flex flex-col p-4 shadow-lg gap-3 bg-white items-center rounded-lg z-10">
            <div className="flex justify-between gap-4 items-center">
              <span
                onClick={() => navigate("/")}
                className="text-xl sm:text-2xl font-semibold shadow-lg border-2 border-secondary text-white bg-secondary cursor-pointer rounded-full py-1 px-3 "
              >
                FURNIGUARD&reg;
              </span>
              <h1 className="text-xl sm:text-3xl text-primary font-medium">Login Here</h1>
            </div>
            <div className="w-full flex flex-col gap-2 sm:gap-4 mt-2">
              <div className="flex flex-col mx-4 gap-1">
                <label className="text-sm sm:text-lg text-primary mx-2 sm:mx-3">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  className="w-full text-sm sm:text-base py-2 text-primary outline-none rounded-full px-3 bg-slate-100 border-2 border-primary"
                  type="email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="flex flex-col mx-4 gap-1">
                <label className="text-sm sm:text-lg text-primary mx-2 sm:mx-3">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  className="w-full text-sm sm:text-base py-2 text-primary outline-none rounded-full px-3 bg-slate-100 border-2 border-primary"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div className="flex px-4 flex-col w-full items-center gap-4 justify-between">
            
                <button className="flex items-center justify-center gap-2 bg-primary text-white rounded-full px-5 w-full py-2 text-base sm:text-lg font-medium shadow-md hover:bg-secondary transition-all duration-300">
                  Log in
                </button>
              <p className="text-sm sm:text-base text-primary cursor-pointer">
                <Link to={"/register"}>Don't have an account?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
