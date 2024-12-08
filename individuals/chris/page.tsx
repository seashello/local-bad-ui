"use client"

import { useState, useEffect } from 'react';

const Home = () => {
  const [light, setLight] = useState<"red" | "green">("red");
  const [username, setUsername] = useState<string>("");
  const [shake, setShake] = useState<boolean>(false);

  // Set random interval for time
  const getRandomInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // Convert to milliseconds
  };

  useEffect(() => {
    const toggleLight = () => {
      setLight((prev) => (prev === "red" ? "green" : "red"));
      
      const nextInterval = getRandomInterval(1, 5);
      setTimeout(toggleLight, nextInterval);
    }
    const initialInterval = getRandomInterval(1, 5);
    const timeoutId = setTimeout(toggleLight,  initialInterval);
    return () => clearInterval(timeoutId);
  }, []);

  const handleMouseMove = () => {
    if (light === "red") {
      setUsername("");
      setShake(true);
    }
  };

  const addLetter = (char: string) => {
    if (light === "green") {
      setUsername((prev) => prev + char);
    }
  };

  
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    };
  }, [shake]);
  
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [light]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Stoplight */}
      <div className="w-20 h-60 bg-black rounded-lg mb-8 flex flex-col items-center justify-evenly">
        <div className={`light ${light === "red" ? "red" : ""}`}></div>
        <div className={`light ${light === "green" ? "green" : ""}`}></div>
      </div>

      {/* Username Input */}
      <input
        className={`w-80 p-4 border-2 border-gray-400 rounded-lg text-center text-lg ${
          shake ? "shake" : ""
        }`}
        placeholder="Enter your name"
        value={username}
        readOnly
      />

      {/* Moving Letters */}
      <div className="mt-8 flex gap-2">
        {["A", "B", "C", "D", "E",
          "F", "G", "H", "I", "J",
          "K", "L", "M", "N", "O",
          "P", "Q", "R", "S", "T",
          "U", "V", "W", "X", "Y",
          "Z"
        ].map((char, index) => (
          <div
            key={index}
            className={`letter ${light === "red" ? "stopped" : ""}`}
            onClick={() => addLetter(char)}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;