import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../pages/Add";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) =>{
    try {
        e.preventDefault()
        const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
        if(response.data.success){
            setToken(response.data.token)
        }else{
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-3xl font-bold text-primary mb-4">Admin Panel</h1>
        <form>
          <div className="mb-3 min-w-80">
            <p className="text-lg font-medium text-gray-600 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border-2 border-primary outline-none"
              type="email"
              placeholder="your@mail.com"
              required
            />
          </div>
          <div className="mb-3 min-w-80">
            <p className="text-lg font-medium text-gray-600 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border-2 border-primary outline-none"
              type="password"
              placeholder="Your Password"
              required
            />
          </div>
          <button onClick={onSubmitHandler} className="mt-2 w-full py-2 px-4 rounded-full bg-primary text-white hover:bg-secondary hover:scale-105 transition-all duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
