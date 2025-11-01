import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { storetokenInLs } = useAuth();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(user)
      });

      const res_data = await response.json();
      console.log(`res from server`, res_data);

      if (response.ok) {
        alert("Login successful");
        storetokenInLs(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        console.log("Invalid credentials");
      }

    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#1F1C2C] via-[#2D2B4E] to-[#928DAB] flex items-center justify-center px-4">
      <div className="bg-[#1F1C2C] border border-[#2D2B4E] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#928DAB] mb-8">Login to Your Account</h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[#d1cfe9] font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className="mt-1 w-full px-4 py-2 bg-[#2D2B4E] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[#d1cfe9] font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="mt-1 w-full px-4 py-2 bg-[#2D2B4E] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#928DAB]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#928DAB] text-black font-semibold py-2 rounded-md hover:bg-[#7e7898] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
