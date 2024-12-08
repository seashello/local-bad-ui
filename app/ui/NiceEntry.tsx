"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NiceEntry() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (name.trim()) {
      console.log('Name entered:', name);
      router.push('/name'); // or whatever route you want to go to
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-light text-gray-800">
          What&apos;s your name?
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64 px-4 py-2 text-xl text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
          placeholder="Type your name"
          autoFocus
        />
      </div>
      
      {/* Clickable animated down arrow */}
      <button 
        onClick={handleContinue}
        className="animate-bounce p-2 hover:text-blue-500 transition-colors"
        aria-label="Continue"
      >
        <svg 
          className="w-6 h-6 text-gray-400"
          fill="none" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
}
