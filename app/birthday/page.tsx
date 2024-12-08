'use client';

import { useState } from 'react';

export default function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Happy Birthday Owen! 🎉
      </h1>
      
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xl mb-6">
          Wishing you an amazing day filled with joy and celebration!
        </p>
        
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          onClick={() => setShowConfetti(true)}
        >
          Click for a surprise! 🎈
        </button>
      </div>
    </main>
  );
}