'use client';

import React from 'react';
import { useState, useEffect } from 'react'

const Page = () => {
  const [day, setDay] = useState(1);

  const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [monthIdx, setMonthIdx] = useState(1);
  const [intervalId1, setIntervalId1] = useState<NodeJS.Timeout | null>(null);
  const [intervalId2, setIntervalId2] = useState<NodeJS.Timeout | null>(null);
  const [intervalId3, setIntervalId3] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {

      const dayInterval = setInterval(() => { // Loop day interval from 1-31
        setDay((prevDay) => prevDay % 31 + 1)
      }, 97);

      const monthInterval = setInterval(() => { // Loop through month indices 1-12
        setMonthIdx((prevIdx) => prevIdx % 12 + 1)
      }, 231);

      setIntervalId1(dayInterval);
      setIntervalId2(monthInterval);

      return () => {
        if (intervalId1) {
          clearInterval(intervalId1);
        }
        if (intervalId2) {
          clearInterval(intervalId2);
        }
      }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        if (intervalId1) clearInterval(intervalId1);
        if (intervalId2) clearInterval(intervalId2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [intervalId1]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <div className="bg-white rounded-lg justify-evenly p-8 text-center w-1/2 h-1/3">
        <h1 className="text-4xl font-comic font-bold mb-14">Press space to select your date of birth</h1>
        <p className="text-xl text-gray-600 absolute right-[750px]">{months[monthIdx - 1]}</p>
        <p className="text-xl text-gray-600 absolute left-[800px]">{day}</p>
      </div>
    </div>
  );
};

export default Page;