import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      toast.loading("Verifying Otp",{id:"otp"})
      await auth.verifyOtpForEmail(otp);
      toast.success("Email Verified Successfully.", { id: "otp" });
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || "Verification failed", { id: "otp" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#effaf2] to-[#c8ebd9] px-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-white/90 backdrop-blur border border-[#d6f0e4] text-[#2d9b67]">
        <CardHeader className="text-center space-y-3">
          <ShieldCheck className="mx-auto h-10 w-10 text-[#2d9b67]" />
          <CardTitle className="text-2xl font-bold tracking-wide">
            Email Verification
          </CardTitle>
          <p className="text-sm text-[#326951]">
            Enter the OTP sent to your email to complete the verification process.
          </p>
        </CardHeader>

        <CardContent className="space-y-5 mt-4">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-[#e3f5ea] text-[#2d9b67] placeholder-[#70a88a] border border-[#c1e5d3] focus:ring-[#2d9b67]"
          />

          <Button
            variant="ghost"
            onClick={verifyOtp}
            className="w-full bg-[#2d9b67] hover:bg-[#277b59] text-white"
          >
            Verify Email
          </Button>

          <p className="text-xs text-center text-[#326951]">
            Didn’t receive the OTP? Check your spam folder or try again in a few minutes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
