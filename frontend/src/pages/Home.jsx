import React from "react";
import { NavLink } from "react-router-dom";
import { Brain, Code2, UserCheck, Trophy } from "lucide-react";

export default function Home() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#3B0764] text-white flex flex-col items-center justify-center px-6 py-12">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Boost Your <span className="text-purple-400">Career Journey</span>
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Prepare for <span className="text-purple-300 font-semibold">Aptitude</span>, 
          <span className="text-green-300 font-semibold"> Programming</span>, and 
          <span className="text-blue-300 font-semibold"> HR Rounds</span> in one place.  
          Practice, get AI feedback, and gamify your learning journey!
        </p>

        <div className="flex gap-6 justify-center">
          <NavLink
            to="/login"
            className="px-8 py-3 bg-purple-500 text-black font-semibold rounded-lg hover:bg-purple-400 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-8 py-3 border border-purple-400 text-purple-400 font-semibold rounded-lg hover:bg-purple-400 hover:text-black transition"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Gamification Note */}
        {/* <div className="flex items-center gap-2 mt-6 justify-center text-yellow-400 font-semibold">
          <Trophy size={22} />
          <span>Earn points, badges & track progress as you practice!</span>
        </div> */}
      </div>

      {/* Features Section */}
      <div className="mt-15 max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-10">What You Can Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#1E1B4B] p-6 rounded-xl shadow hover:shadow-lg transition border border-purple-700">
            <Brain className="mx-auto text-purple-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">Aptitude Rounds</h3>
            <p className="text-gray-300">Sharpen your problem-solving and logical thinking skills.</p>
          </div>

          <div className="bg-[#1E1B4B] p-6 rounded-xl shadow hover:shadow-lg transition border border-purple-700">
            <Code2 className="mx-auto text-green-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">Programming Rounds</h3>
            <p className="text-gray-300">Solve coding challenges with real-time AI code review.</p>
          </div>

          <div className="bg-[#1E1B4B] p-6 rounded-xl shadow hover:shadow-lg transition border border-purple-700">
            <UserCheck className="mx-auto text-blue-300 mb-4" size={48} />
            <h3 className="text-xl font-semibold mb-2">HR Rounds</h3>
            <p className="text-gray-300">Prepare for interviews & build confidence to crack HR rounds.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
