'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

const Home = () => {
  const [clicks, setClicks] = useState<number>(0); // Click counter
  const [targetClicks, setTargetClicks] = useState<number>(0); // Target click number
  const [message, setMessage] = useState<string>(''); // Message after clicking enough times
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // Position of the button

  // Function to generate a random number between 1 and 100
  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setTargetClicks(randomNum);
  };

  // Handle the button click event
  const handleClick = () => {
    // Increase the click count
    setClicks((prevClicks) => {
      const newClickCount = prevClicks + 1;
      
      // If the target clicks are reached, set the message
      if (newClickCount >= targetClicks && !message) {
        const randomResponse = Math.random() > 0.5 ? 'Heads' : 'Tails';
        setMessage(randomResponse);
      }

      // Move the button by changing its position randomly on the screen
      const newX = Math.random() * 90; // Random x position (in percentage)
      const newY = Math.random() * 90; // Random y position (in percentage)

      setPosition({ x: newX, y: newY });

      return newClickCount;
    });
  };

  // Generate a random number when the page first loads
  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <div style={styles.container}>
      <title>Super Helpful Heads or Tails Generator</title>

      <h2>Heads/Tails Generator</h2>

      <h1>Click {targetClicks} times to reveal the message!</h1>

      <div style={styles.counter}>
        <p>Click count: {clicks}</p>
        <button
          onClick={handleClick}
          style={{
            ...styles.button,
            position: 'absolute',
            left: `${position.x}%`,
            top: `${position.y}%`, // Move button to the new position
          }}
        >
          Click me
        </button>
      </div>

      {/* Display the message after the user clicks enough times */}
      {clicks >= targetClicks && message && (
        <div style={styles.message}>
          <h2>{message}</h2>
        </div>
      )}
    </div>
  );
};

// Styles object with type definitions for React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
    fontFamily: 'Arial, sans-serif',
    height: '100vh', // Ensure the container fills the screen
    position: 'relative', // Needed for absolute positioning of the button
  },
  counter: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease', // Smooth transition for movement
  },
  message: {
    marginTop: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  }
};

export default Home;
