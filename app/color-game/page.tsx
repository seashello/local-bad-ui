'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ColorGame() {
//color game!!
  const [favoriteColor, setFavoriteColor] = useState('#ff0000');
  const [shades, setShades] = useState<string[]>([]);
  const [targetShade, setTargetShade] = useState('');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);

  // Generate a random shade of the given color
  const generateRandomShade = (baseColor: string) => {
    // Convert hex to RGB
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    // Add random variation (-30 to +30)
    const variation = () => Math.floor(Math.random() * 61) - 30;
    
    // Ensure values stay within 0-255 range
    const newR = Math.min(255, Math.max(0, r + variation()));
    const newG = Math.min(255, Math.max(0, g + variation()));
    const newB = Math.min(255, Math.max(0, b + variation()));

    // Convert back to hex
    return '#' + [newR, newG, newB]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  };

  // Generate new game round
  const generateNewRound = () => {
    const newShades = Array(4)
      .fill(0)
      .map(() => generateRandomShade(favoriteColor));
    const targetIndex = Math.floor(Math.random() * 4);
    setShades(newShades);
    setTargetShade(newShades[targetIndex]);
    setMessage('');
  };

  // Start new game
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameActive(true);
    generateNewRound();
  };

  // Handle game over
  const endGame = () => {
    setIsGameActive(false);
    setHighScore(prev => Math.max(prev, score));
    setMessage(`Game Over! Final Score: ${score}`);
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isGameActive) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, score]);

  // Handle color selection
  const handleColorSelect = (selectedColor: string) => {
    if (!isGameActive) return;
    
    if (selectedColor === targetShade) {
      setScore(score + 1);
      setMessage('Correct! 🎉');
    } else {
      setScore(Math.max(0, score - 1)); // Prevent negative scores
      setMessage('Wrong! -1 point');
    }
    setTimeout(generateNewRound, 1000);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-2xl font-bold">Color Matching Game</h1>
        
        <div className="flex flex-col items-center gap-4">
          <label className="flex flex-col items-center gap-2">
            <span>Choose your favorite color:</span>
            <input
              type="color"
              value={favoriteColor}
              onChange={(e) => setFavoriteColor(e.target.value)}
              className="w-20 h-10"
              disabled={isGameActive}
            />
          </label>

          <div className="flex gap-4 items-center">
            <div className="text-lg font-bold">Score: {score}</div>
            <div className="text-lg font-bold">High Score: {highScore}</div>
          </div>
          
          <div className="text-lg font-bold text-blue-500">
            Time: {timeLeft}s
          </div>

          {!isGameActive && (
            <button
              onClick={startGame}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Game
            </button>
          )}

          {isGameActive && (
            <div className="flex flex-col items-center gap-2">
              <div className="text-center mb-4">
                Match this color:
                <div
                  className="w-20 h-20 rounded-lg mt-2"
                  style={{ backgroundColor: targetShade }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {shades.map((shade, index) => (
                  <button
                    key={index}
                    className="w-20 h-20 rounded-lg hover:scale-105 transition-transform"
                    style={{ backgroundColor: shade }}
                    onClick={() => handleColorSelect(shade)}
                  />
                ))}
              </div>
            </div>
          )}

          {message && (
            <div className={`text-lg ${message.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
        </div>

        <Link
          href="/"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Back to Home
        </Link>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">Match as many colors as you can in 30 seconds!</p>
      </footer>
    </div>
  );
}