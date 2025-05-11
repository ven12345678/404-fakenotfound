import { Geist } from "next/font/google";
import { FiArrowLeft, FiAward, FiTrendingUp, FiDollarSign, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useRouter } from 'next/router';

const geist = Geist({
  subsets: ["latin"],
});

const leaderboardData = [
  {
    rank: 1,
    name: "Alice Tan",
    level: 7,
    tokens: 320,
    earnings: 1200,
    streak: 15,
  },
  {
    rank: 2,
    name: "Ben Lee",
    level: 6,
    tokens: 280,
    earnings: 1050,
    streak: 12,
  },
  {
    rank: 3,
    name: "Chloe Lim",
    level: 6,
    tokens: 250,
    earnings: 980,
    streak: 10,
  },
  {
    rank: 4,
    name: "David Ng",
    level: 5,
    tokens: 200,
    earnings: 800,
    streak: 8,
  },
  {
    rank: 5,
    name: "Emily Wong",
    level: 5,
    tokens: 180,
    earnings: 750,
    streak: 7,
  },
];

export default function Leaderboard() {
  const router = useRouter();
  return (
    <div className={`${geist.className} min-h-screen bg-gray-50`}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')} 
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
          <FiTrendingUp className="text-cyan-600" /> View Rankings
        </h1>
        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-2">Rank</th>
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Level</th>
                <th className="py-2 px-2">Tokens</th>
                <th className="py-2 px-2">Earnings</th>
                <th className="py-2 px-2">Streak</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user) => (
                <tr key={user.rank} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2 font-bold flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                      {user.rank}
                    </span>
                  </td>
                  <td className="py-2 px-2">{user.name}</td>
                  <td className="py-2 px-2 flex items-center gap-1"><FiAward className="text-yellow-500" /> {user.level}</td>
                  <td className="py-2 px-2 flex items-center gap-1"><FiCheckCircle className="text-green-500" /> {user.tokens}</td>
                  <td className="py-2 px-2 flex items-center gap-1"><FiDollarSign className="text-blue-500" /> ${user.earnings}</td>
                  <td className="py-2 px-2 flex items-center gap-1"><FiClock className="text-red-500" /> {user.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 