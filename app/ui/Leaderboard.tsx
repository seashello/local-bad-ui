interface LeaderboardEntry {
  name: string;
  time: number; // time in seconds
}

const dummyData: LeaderboardEntry[] = [
  { name: "Alice", time: 12.4 },
  { name: "Bob", time: 15.7 },
  { name: "Charlie", time: 18.2 },
  { name: "Diana", time: 13.1 },
  { name: "Ethan", time: 20.5 },
  { name: "Fiona", time: 11.8 },
  { name: "George", time: 16.3 },
  { name: "Hannah", time: 14.9 },
];

export default function Leaderboard() {
  const sortedData = [...dummyData].sort((a, b) => a.time - b.time);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Rank</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => (
            <tr 
              key={index}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{entry.name}</td>
              <td className="px-6 py-4">{entry.time.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
