import { Geist } from "next/font/google";
import { useRouter } from 'next/router';
import { FiArrowLeft, FiEdit2, FiShare2, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

const geist = Geist({
  subsets: ["latin"],
});

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'John Doe Profile',
        url: window.location.href
      });
    } catch (err) {
      await navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <div className={`${geist.className} min-h-screen bg-gray-50`}>
      <div className="px-6 py-4">
        <nav className="bg-white shadow-sm mb-4 -mx-6 -mt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200 shadow-md">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-2xl font-semibold text-white shadow-lg">
                J
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 shadow-lg">
                <FiCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="ml-6 flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
                <span className="bg-blue-500/20 text-blue-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <FiCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-3">john@example.com</p>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Truth Seeker</span>
                <span className="text-gray-500 text-xs">Member since Jan 2024</span>
                <span className="flex items-center text-xs text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                  Active Member
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-all flex items-center gap-2 shadow-sm"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all flex items-center gap-2 shadow-sm"
              >
                <FiShare2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`text-lg font-medium py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`text-lg font-medium py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'activity'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`text-lg font-medium py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'achievements'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`text-lg font-medium py-4 px-2 border-b-2 transition-colors ${
              activeTab === 'stats'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Stats
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Level</p>
                  <h3 className="text-4xl font-bold text-gray-900">3</h3>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full mb-3">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
              </div>
              <p className="text-gray-500 text-sm">Next level in 25 verifications</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Tokens</p>
                  <h3 className="text-4xl font-bold text-gray-900">150</h3>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
              </div>
              <p className="text-green-600 text-sm font-medium">↗ +45 this week</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Earnings</p>
                  <h3 className="text-4xl font-bold text-gray-900">$500</h3>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Total earned: $2,500</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Streak</p>
                  <h3 className="text-4xl font-bold text-gray-900">7 days</h3>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Keep it up! 3 days to new badge</p>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="mt-8">
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 relative overflow-hidden hover:shadow-lg transition-all group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all"></div>
                <div className="relative flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.625 16.5a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75z" />
                          <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 001.06-1.06l-1.047-1.048A3.375 3.375 0 1011.625 18z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-black font-medium">Verified a news article</h3>
                        <p className="text-gray-700 text-sm mt-1">Earned 15 tokens for verification</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm">2 hours ago</span>
                        <div className="w-2 h-2 rounded-full bg-blue-500 ml-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 relative overflow-hidden hover:shadow-lg transition-all group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-green-500/10 transition-all"></div>
                <div className="relative flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-black font-medium">Completed daily challenge</h3>
                        <p className="text-gray-700 text-sm mt-1">Earned $50 reward and 25 tokens</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm">5 hours ago</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 ml-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 relative overflow-hidden hover:shadow-lg transition-all group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-all"></div>
                <div className="relative flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-black font-medium">Reached Level 3</h3>
                        <p className="text-gray-700 text-sm mt-1">Unlocked new verification features</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm">1 day ago</span>
                        <div className="w-2 h-2 rounded-full bg-purple-500 ml-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 relative overflow-hidden hover:shadow-lg transition-all group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-red-500/10 transition-all"></div>
                <div className="relative flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-black font-medium">Started 7-day streak</h3>
                        <p className="text-gray-700 text-sm mt-1">Keep verifying daily to earn bonus rewards</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm">2 days ago</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 ml-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">Truth Seeker</h3>
                      <p className="text-gray-700 text-sm">Verify 50 news articles</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-white">32/50</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[64%] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-blue-400">18 more to unlock this achievement</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">Token Master</h3>
                      <p className="text-gray-700 text-sm">Earn 1000 tokens</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-purple-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                          <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-white">150/1000</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[15%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-purple-400">850 more tokens needed</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">Early Adopter</h3>
                      <p className="text-gray-700 text-sm">Join in first month</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Status</span>
                      <span className="text-sm font-medium text-green-400">Completed!</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-green-400">Achievement unlocked</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">Streak Master</h3>
                      <p className="text-gray-700 text-sm">Maintain 10 days streak</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-white">7/10</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[70%] bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-red-400">3 more days to go!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg text-black font-medium mb-6">Verification Activity</h3>
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-900 mb-2">156</p>
                    <p className="text-black text-sm">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-500 mb-2">45</p>
                    <p className="text-gray-400 text-sm">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-500 mb-2">12</p>
                    <p className="text-gray-400 text-sm">Today</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <p className="text-gray-400 text-sm">Average 35 verifications per week</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-gray-400 text-sm">Top performer in your region</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg text-black font-medium mb-6">Earnings Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">This Week</span>
                      <span className="text-white font-medium">$500</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Last Week</span>
                      <span className="text-white font-medium">$350</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-3/5 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Last Month</span>
                      <span className="text-white font-medium">$2,100</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-11/12 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Total Earned</span>
                      <span className="text-white font-medium">$2,500</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Average Weekly Earnings</p>
                      <p className="text-xl font-bold text-white">$425</p>
                    </div>
                    <div className="flex items-center text-green-400">
                      <span className="text-sm font-medium">↗ +15% vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 