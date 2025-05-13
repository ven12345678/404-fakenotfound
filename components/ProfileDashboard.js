import { useState } from 'react';
import { 
  FiUser, FiAward, FiDollarSign, FiCheckCircle, FiBarChart, 
  FiTrendingUp, FiClock, FiAlertCircle, FiThumbsUp, FiShare2 
} from 'react-icons/fi';

const ProfileDashboard = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Mock data - replace with actual user data from your backend
  const defaultUserData = {
    name: "John Doe",
    email: "john@example.com",
    level: 3,
    tokens: 150,
    balance: 500,
    newsVerified: 25,
    accuracy: 92,
    rank: "Truth Seeker",
    joinDate: "Jan 2024",
    verificationStreak: 7,
    recentActivity: [
      { id: 1, type: 'verify', title: 'Climate Change Report', status: 'Fake', reward: 15, time: '2 hours ago' },
      { id: 2, type: 'verify', title: 'Political Statement Analysis', status: 'True', reward: 10, time: '5 hours ago' },
      { id: 3, type: 'achievement', title: 'Accuracy Master', reward: 50, time: '1 day ago' },
      { id: 4, type: 'verify', title: 'Economic News Review', status: 'Misleading', reward: 12, time: '2 days ago' },
    ],
    achievements: [
      { id: 1, title: 'First Verification', description: 'Complete your first news verification', completed: true },
      { id: 2, title: '10 Streak', description: 'Verify news for 10 days in a row', completed: false, progress: 7 },
      { id: 3, title: 'Accuracy Expert', description: 'Maintain 90% accuracy for a month', completed: true },
      { id: 4, title: 'Community Leader', description: 'Help 50 users with verifications', completed: false, progress: 28 },
    ],
    stats: {
      totalEarned: 2500,
      accuracyTrend: [88, 90, 92, 89, 94, 91, 92],
      verificationsByCategory: {
        politics: 35,
        science: 28,
        technology: 22,
        health: 15
      }
    }
  };

  const data = userData || defaultUserData;

  const handleEditProfile = () => {
    window.location.href = '/profile/edit';
  };

  const handleShareProfile = () => {
    setShareModalOpen(true);
  };

  const handleCopyLink = async () => {
    const profileUrl = `${window.location.origin}/profile/${data.name}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Level</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{data.level}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FiAward className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '75%' }} />
        </div>
        <p className="text-sm text-gray-500 mt-2">Next level in 25 verifications</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tokens</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{data.tokens}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <FiBarChart className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        <div className="flex items-center text-sm text-green-500">
          <FiTrendingUp className="mr-1" />
          +45 this week
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Earnings</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">${data.balance}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <FiDollarSign className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <p className="text-sm text-gray-500">Total earned: ${data.stats.totalEarned}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{data.verificationStreak} days</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <FiClock className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <p className="text-sm text-gray-500">Keep it up! 3 days to new badge</p>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {data.recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              {activity.type === 'verify' ? (
                <FiCheckCircle className="w-5 h-5 text-blue-500" />
              ) : (
                <FiAward className="w-5 h-5 text-purple-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800 dark:text-white">{activity.title}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              {activity.status && (
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${
                    activity.status === 'Fake' ? 'text-red-500' :
                    activity.status === 'True' ? 'text-green-500' :
                    'text-yellow-500'
                  }`}>
                    {activity.status}
                  </span>
                  <span className="text-sm text-gray-500 ml-4">+{activity.reward} tokens</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.achievements.map((achievement) => (
          <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full ${
                  achievement.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'
                } flex items-center justify-center mr-4`}>
                  <FiAward className={`w-6 h-6 ${
                    achievement.completed ? 'text-green-500' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
            </div>
            {!achievement.completed && achievement.progress && (
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-500">{achievement.progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Verification Categories</h3>
        <div className="space-y-4">
          {Object.entries(data.stats.verificationsByCategory).map(([category, count]) => (
            <div key={category}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="capitalize text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-gray-500">{count} verifications</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full" 
                  style={{ width: `${(count / Math.max(...Object.values(data.stats.verificationsByCategory))) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Weekly Accuracy Trend</h3>
        <div className="h-48 flex items-end justify-between">
          {data.stats.accuracyTrend.map((accuracy, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="w-8 bg-blue-500 rounded-t"
                style={{ height: `${accuracy}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">Day {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              {data.name.charAt(0)}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
              <FiCheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{data.email}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 justify-center md:justify-start">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {data.rank}
              </span>
              <span className="text-sm text-gray-500">Member since {data.joinDate}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={handleShareProfile}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Share Profile</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/profile/${data.name}`}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg ${
                    copySuccess
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-lg">
        {['overview', 'activity', 'achievements', 'stats'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
              activeTab === tab
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'activity' && renderActivityTab()}
        {activeTab === 'achievements' && renderAchievementsTab()}
        {activeTab === 'stats' && renderStatsTab()}
      </div>
    </div>
  );
};

export default ProfileDashboard; 