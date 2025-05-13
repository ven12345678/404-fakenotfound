import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiAward, FiBarChart, FiCheckCircle } from 'react-icons/fi';

export default function PublicProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;

      try {
        const response = await fetch(`/api/profile/${username}`);
        if (!response.ok) {
          throw new Error('Profile not found');
        }

        const data = await response.json();
        setProfile(data.user);
      } catch (error) {
        setError('Profile not found');
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
        <p className="text-gray-600 mb-8">The profile you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {/* Profile Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {profile.name.charAt(0)}
                  </div>
                  {profile.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <FiCheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 mt-3 justify-center sm:justify-start">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {profile.rank}
                    </span>
                    <span className="text-sm text-gray-500">Member since {profile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{profile.level}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verifications</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{profile.newsVerified}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{profile.accuracy}%</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <FiBarChart className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{profile.verificationStreak} days</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.achievements
                  .filter(achievement => achievement.completed)
                  .map((achievement) => (
                    <div key={achievement.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <FiAward className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 