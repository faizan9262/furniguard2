import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/components/ui/card";
import { Input } from "../components/components/ui/input";
import { Label } from "../components/components/ui/label";
import { Button } from "../components/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      toast.loading("Signing In...", { id: "login" });
      await auth.login(email, password);
      toast.success("Signed in successfully", { id: "login" });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed", { id: "login" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card className="shadow-xl border border-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <span
                onClick={() => navigate("/")}
                className="text-xl sm:text-2xl font-semibold shadow-lg border-2 border-secondary text-white bg-secondary cursor-pointer rounded-full py-1 px-3"
              >
                FURNIGUARD&reg;
              </span>
              <CardTitle className="text-xl sm:text-2xl text-primary">
                Login Here
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid w-full gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-2 top-2.5 text-muted-foreground hover:text-primary transition"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Log In
            </Button>
            <p className="text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
