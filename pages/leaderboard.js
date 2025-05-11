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
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-full">
          <div className="flex flex-col gap-6 w-full">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-4 pb-2 border-b font-semibold text-gray-700 text-lg w-full">
              <div>Rank</div>
              <div>Name</div>
              <div>Level</div>
              <div>Tokens</div>
              <div>Earnings</div>
              <div className="text-right">Streak</div>
            </div>
            {/* User Rows */}
            {leaderboardData.map((user) => (
              <div key={user.rank} className="border-b pb-4 mb-4 w-full">
                <div className="grid grid-cols-6 gap-4 items-center w-full">
                  <div>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                      {user.rank}
                    </span>
                  </div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center gap-1 text-yellow-600 font-semibold"><FiAward /> {user.level}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center gap-1 text-green-600 font-semibold"><FiCheckCircle /> {user.tokens}</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="flex items-center gap-1 text-blue-600 font-semibold"><FiDollarSign /> ${user.earnings}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1 text-red-600 font-semibold"><FiClock /> {user.streak} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 