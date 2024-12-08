"use client"

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const LETTERS = ["A", "B", "C", "D", "E", "F",
                "G", "H", "I", "J", "K", "L",
                "M", "N", "O", "P", "Q", "R",
                "S", "T", "U", "V", "W", "X",
                "Y", "Z"];

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetName = searchParams.get('is') || '';
  const [light, setLight] = useState<"red" | "green">("red");
  const [username, setUsername] = useState<string>("");
  const [shake, setShake] = useState<boolean>(false);
  const [letters, setLetters] = useState(LETTERS);

  // Set random interval for time
  const getRandomInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // Convert to milliseconds
  };

  useEffect(() => {
    const toggleLight = () => {
      setLight((prev) => (prev === "red" ? "green" : "red"));
      setLetters(shuffleArray(LETTERS)); // Shuffle letters when light changes
      
      const nextInterval = getRandomInterval(1, 5);
      setTimeout(toggleLight, nextInterval);
    }
    const initialInterval = getRandomInterval(1, 5);
    const timeoutId = setTimeout(toggleLight, initialInterval);
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

  const handleConfirm = () => {
    if (username.toLowerCase() === decodeURIComponent(targetName).toLowerCase()) {
      router.push('/birthday'); // or whatever the next page is
    }
  };

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

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={username.toLowerCase() !== decodeURIComponent(targetName).toLowerCase()}
        className={`mt-4 px-6 py-2 rounded-lg transition-all ${
          username.toLowerCase() === decodeURIComponent(targetName).toLowerCase()
            ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Confirm
      </button>

      {/* Moving Letters */}
      <div className="mt-8 grid grid-cols-6 gap-4 max-w-xl">
        {letters.map((char, index) => (
          <div
            key={index}
            className={`letter ${light === "red" ? "stopped" : ""} flex items-center justify-center`}
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