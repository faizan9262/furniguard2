import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");

    if (!oldPassword || !newPassword) {
      return toast.error("All fields are required");
    }
    try {
      toast.loading("Updating Your Password", { id: "update-password" });
      await auth.updateYourPassword(oldPassword, newPassword);
      toast.success("Your Password Is Successfully Updated", { id: "update-password" });
      navigate("/");
    } catch (error) {
      toast.error(error.message, { id: "update-password" });
    }
  };

  const handleForgotPassword = async () => {
    if (!auth.email) {
      toast.error("Pvovide Your Email to Generate Otp.");
    }
    try {
      toast.loading("Sending Password Reset Otp To Yout Email", {
        id: "reset-password",
      });
      await auth.sendOtpForPasswordReset(auth.user.email);
      toast.success("6 digit OTP Sent to your email.", {
        id: "reset-password",
      });
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "reset-password" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#effaf2] to-[#c8ebd9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-[#d6f0e4] p-6 md:p-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#2d9b67]">Update Password</h2>
          <p className="text-[#326951] text-sm">
            Change your password for better security.
          </p>
          <p className="bg-[#326951]/10 sm:font-semibold flex items-center justify-center text-[#2d9b67] py-1 px-1 rounded-full mx-4 text-sm">
            Your Email : {auth.user.email}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="relative">
            <Label htmlFor="oldPassword" className="text-[#326951] font-medium">
              Current Password
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              required
              placeholder="Enter your current password"
              className="mt-1 w-full bg-[#e3f5ea] text-[#2d9b67] border border-[#c1e5d3] placeholder-[#70a88a] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute top-7 right-3 text-[#2d9b67]"
              tabIndex={-1}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <Label htmlFor="newPassword" className="text-[#326951] font-medium">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              placeholder="Enter your new password"
              className="mt-1 w-full bg-[#e3f5ea] text-[#2d9b67] border border-[#c1e5d3] placeholder-[#70a88a] pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute top-7 right-3 text-[#2d9b67]"
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="text-right text-sm">
            <span
              onClick={handleForgotPassword}
              className="text-[#2d9b67] cursor-pointer hover:underline"
            >
              Forgot password?
            </span>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2d9b67] hover:bg-[#277b59] text-white text-lg font-semibold py-2 rounded-xl"
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
