
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../store/auth";

const rounds = [
  { name: "Aptitude", description: "Test your logical reasoning skills.", level: 1 },
  { name: "Programming", description: "Solve coding challenges.", level: 2 },
  { name: "HR", description: "Prepare for HR interview questions.", level: 3 },
];

export default function DashboardAnimated() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleCoinClick = () => setShowIntro(false);
  
  // ✅ Quiz sirf Aptitude me hi khulega
  const handleRoundClick = (round) => {
    if (round.name === "Aptitude") {
      // Navigate to aptitude category selection screen
      try {
        navigate('/aptitude');
      } catch (err) {
        console.error('Navigation error:', err);
      }
    } else {
      console.log(`${round.name} clicked - Coming Soon...`);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F1C2C] via-[#2D2B4E] to-[#928DAB] flex items-center justify-center p-8 overflow-hidden">
      {user && (
        <div className="absolute top-4 right-4 text-white">
          Welcome, {user.username || user.name || user.email}!
        </div>
      )}
      
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 20 }}
            transition={{ duration: 1 }}
          >
            <div
              onClick={handleCoinClick}
              className="w-32 h-32 bg-[#928DAB] rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:scale-110 transition-transform"
            >
              <span className="text-black font-bold text-xl">Go</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showIntro && (
          <motion.div
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
            exit={{ opacity: 0 }}
          >
            {rounds.map((round, idx) => (
              <motion.div
                key={idx}
                onClick={() => handleRoundClick(round)}
                className="bg-[#1F1C2C] rounded-2xl shadow-2xl p-8 flex flex-col justify-between cursor-pointer hover:scale-105 transform transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 * idx } }}
              >
                <h2 className="text-2xl font-bold text-[#928DAB] mb-4">{round.name}</h2>
                <p className="text-gray-300 mb-6">{round.description}</p>

                {round.name === "Aptitude" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRoundClick(round);
                    }}
                    className="bg-[#928DAB] text-black py-2 px-6 rounded-full hover:bg-[#7e7898] transition"
                  >
                    Start {round.name}
                  </button>
                ) : (
                  <div className="text-gray-400 italic">Coming Soon...</div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



