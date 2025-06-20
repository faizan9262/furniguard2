import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { Label } from "@/components/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const PasswordReset = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const otp = formData.get("otp");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (!otp || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      toast.loading("Resetting password...", { id: "reset" });
      await auth.resetYourPassword(otp, newPassword, auth.user.email);
      toast.success("Password reset successfully", { id: "reset" });
      auth.user ? navigate("/profile") : navigate('/login')
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "reset" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#effaf2] to-[#c8ebd9] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#d6f0e4] p-6 md:p-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#2d9b67]">Reset Password</h2>
          <p className="text-[#326951] text-sm">
            Set a new password and regain access.
          </p>
        </div>

        {auth.user.email && (
          <div>
            <Label className="text-[#326951] font-medium">Email</Label>
            <Input
              type="email"
              value={auth.user.email}
              disabled
              className="mt-1 w-full bg-[#e3f5ea] text-[#2d9b67] border border-[#c1e5d3] cursor-not-allowed"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="otp" className="text-[#326951] font-medium">
              OTP
            </Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              required
              placeholder="Enter OTP"
              className="mt-1 w-full bg-[#e3f5ea] text-[#2d9b67] border border-[#c1e5d3] placeholder-[#70a88a]"
            />
          </div>

          <div className="relative">
            <Label htmlFor="newPassword" className="text-[#326951] font-medium">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter new password"
              className="mt-1 w-full bg-[#e3f5ea] text-[#2d9b67] border border-[#c1e5d3] placeholder-[#70a88a] pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-9 right-3 text-[#2d9b67]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Label
              htmlFor="confirmPassword"
              className="text-[#326951] font-medium"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Confirm new password"
              className="mt-1 w-full bg-[#e3f5ea] text-[#2d9b67] border border-[#c1e5d3] placeholder-[#70a88a] pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-9 right-3 text-[#2d9b67]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2d9b67] hover:bg-[#277b59] text-white text-lg font-semibold py-2 rounded-xl"
          >
            Reset Password
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default PasswordReset;
