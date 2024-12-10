'use client'

import Leaderboard from '@/app/ui/Leaderboard';
import { useUserContext } from '../UserContext';
import { useRouter } from "next/navigation"



export default function LeaderboardPage() {
  const { user, setUser } = useUserContext();
  const router = useRouter();
    
  const handleNext = () => {
    setUser({ ...user, startTime: 'test'});
    router.push("/nice")
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <Leaderboard />
      <div className="flex items-center justify-center">
      <button className="px-20 py-2 mt-12 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none content-center" onClick={handleNext}
    >
      New Game
      </button>
      </div>

    </main>
  );
}
