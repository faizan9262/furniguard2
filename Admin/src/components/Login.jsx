import React, { useState } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../pages/Add";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/components/ui/card";
import { Input } from "../components/components/ui/input";
import { Label } from "../components/components/ui/label";
import { Button } from "../components/components/ui/button";
import { toast } from "sonner";
import { useAdmin } from "../context/AdminContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const adminContext = useAdmin()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Siging in you, Admin", { id: "admin-login" });
      const response = await adminContext.adminLogin(email,password)
      // console.log("Response in login: ",response);
      navigate("/");
      toast.success("Login successful", { id: "admin-login" });
    } catch (error) {
      console.log(error);
      toast.error(error, { toastId: "admin-login" });
    }
  };


  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#2d9b67] to-[#326951] text-white">
      {/* Left Icon Info Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 text-center gap-6 bg-[#2d9b67]">
        <ShieldCheck size={48} className="text-white" />
        <h1 className="text-4xl font-bold">Admin Access</h1>
        <p className="max-w-md text-white/90">
          Manage everything — appointments, users, and system settings — from a
          single, secure dashboard.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-6 text-left text-white/80">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-white" size={20} />
            Full control over dashboard
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-white" size={20} />
            Manage users & designers
          </div>
          <div className="flex items-center gap-3">
            <Settings className="text-white" size={20} />
            Access app settings
          </div>
        </div>
      </div>

      {/* Right Panel - Login Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12 bg-[#326951]">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-xl p-6"
        >
          <Card className="bg-transparent border-none shadow-none text-white space-y-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <span
                  onClick={() => navigate("/")}
                  className="text-xl sm:text-2xl font-semibold shadow-lg border border-white text-white bg-white/10 cursor-pointer rounded-full py-1 px-3"
                >
                  FURNIGUARD&reg;
                </span>
                <CardTitle className="text-xl sm:text-2xl">
                  Admin Login
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  className="text-white bg-white/10 placeholder:text-white/60 border border-white/30 focus:border-white"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    className="text-white bg-white/10 placeholder:text-white/60 border border-white/30 pr-10 focus:border-white"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute right-2 top-2.5 text-white/70 hover:text-white transition"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-white text-[#2d9b67] font-semibold hover:bg-white/90"
              >
                Login
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center text-sm text-white/70">
            Trouble logging in?{" "}
            <span className="underline cursor-pointer hover:text-white">
              Contact Support
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
