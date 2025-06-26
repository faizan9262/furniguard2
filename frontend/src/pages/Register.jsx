import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    try {
      toast.loading("Siging In", { id: "signup" });
      await auth.signup(name, email, password);
      toast.success("Sign in Successfully", { id: "signup" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "signup" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-slate-200">
        <div className="mx-4 sm:mx-[10%] min-h-screen flex items-center justify-center">
          <div className="w-full sm:w-2/5 flex flex-col p-4 shadow-lg gap-3 bg-white items-center rounded-lg">
            <div className="flex justify-between gap-4 items-center">
              <span
                onClick={() => navigate("/")}
                className="text-xl sm:text-2xl  font-semibold shadow-lg border-2 border-secondary text-white bg-secondary cursor-pointer rounded-full py-1 px-3 "
              >
                FURNIGUARD&reg;
              </span>
              <h1 className=" text-xl sm:text-3xl text-primary font-medium">
                Register Here
              </h1>
            </div>
            <div className="w-full flex flex-col gap-2 sm:gap-4 mt-2">
              <div className="flex flex-col mx-4 gap-1">
                <label className=" text-sm sm:text-lg text-primary mx-2 sm:mx-3">
                  Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  className="w-full text-sm sm:text-base py-2 text-primary outline-none rounded-full px-3  bg-slate-100 border-2 border-primary"
                  type="text"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="flex flex-col mx-4 gap-1">
                <label className=" text-sm sm:text-lg text-primary mx-2 sm:mx-3">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  className="w-full text-sm sm:text-base py-2 text-primary outline-none rounded-full px-3  bg-slate-100 border-2 border-primary"
                  type="email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="flex flex-col mx-4 gap-1">
                <label className=" text-sm sm:text-lg text-primary mx-2 sm:mx-3">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  className="w-full text-sm sm:text-base py-2 text-primary outline-none rounded-full px-3  bg-slate-100 border-2 border-primary"
                  type="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>
            <div className="flex px-4 flex-col w-full items-center gap-4 justify-between">
              <button className="flex items-center justify-center gap-2 bg-primary text-white rounded-full px-5 w-full py-2 text-base sm:text-lg font-medium shadow-md  hover:bg-secondary transition-all duration-300">
                Register
              </button>
              <p className="text-sm sm:text-base text-primary cursor-pointerr">
                <Link to={"/login"}>Already have an account?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
