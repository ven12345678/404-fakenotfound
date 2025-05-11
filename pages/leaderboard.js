import { useState } from 'react';
import { FiAward, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';

export default function Leaderboard() {
  const router = useRouter();
  const [timeFilter, setTimeFilter] = useState('all');

  // Mock data for demonstration - in a real app, this would come from your backend
  const leaderboardData = [
    { id: 1, name: "Sarah Johnson", points: 2500, verifications: 150, accuracy: "98%" },
    { id: 2, name: "Mike Chen", points: 2350, verifications: 142, accuracy: "96%" },
    { id: 3, name: "Alex Smith", points: 2200, verifications: 130, accuracy: "95%" },
    { id: 4, name: "Emma Davis", points: 2100, verifications: 125, accuracy: "94%" },
    { id: 5, name: "James Wilson", points: 2000, verifications: 120, accuracy: "93%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex space-x-4">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                timeFilter === 'all'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 rounded-lg ${
                timeFilter === 'month'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 rounded-lg ${
                timeFilter === 'week'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Leaderboard Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            <FiAward className="w-10 h-10 text-yellow-400 mr-3" />
            Fact-Checker Leaderboard
          </h1>
          <p className="mt-2 text-gray-600">Top contributors in our community</p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData.map((user, index) => (
                <tr key={user.id} className={index < 3 ? 'bg-cyan-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-semibold text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.verifications}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.accuracy}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 