import { useState, useEffect } from 'react';
import { 
  FiUser, FiAward, FiDollarSign, FiCheckCircle, FiBarChart, 
  FiTrendingUp, FiClock, FiAlertCircle, FiThumbsUp, FiShare2,
  FiX, FiBell 
} from 'react-icons/fi';

const ProfileDashboard = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationList, setShowNotificationList] = useState(false);
  const [activities, setActivities] = useState([]);
  
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
    achievements: [
      { id: 1, title: 'First Verification', description: 'Complete your first fact verification', progress: 100, reward: 50, completed: true },
      { id: 2, title: 'Accuracy Master', description: 'Maintain 90% accuracy for a week', progress: 75, reward: 100, completed: false },
      { id: 3, title: 'Streak Champion', description: 'Maintain a 7-day verification streak', progress: 85, reward: 150, completed: false },
      { id: 4, title: 'Category Expert', description: 'Verify 50 articles in one category', progress: 60, reward: 200, completed: false }
    ],
    recentActivity: [
      { id: 1, type: 'verify', title: 'Climate Change Report', status: 'Fake', reward: 15, time: '2 hours ago' },
      { id: 2, type: 'verify', title: 'Political Statement Analysis', status: 'True', reward: 10, time: '5 hours ago' },
      { id: 3, type: 'achievement', title: 'Accuracy Master', reward: 50, time: '1 day ago' },
      { id: 4, type: 'verify', title: 'Economic News Review', status: 'Misleading', reward: 12, time: '2 days ago' },
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

  useEffect(() => {
    // Initialize activities from userData or defaultUserData
    setActivities(data.recentActivity);
  }, []);

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

  // Function to format time ago
  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  // Function to show notification
  const showNotification = (message, tokens) => {
    const newNotification = {
      id: Date.now(),
      message,
      tokens,
      timestamp: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 10)); // Keep last 10 notifications
    setNotification(newNotification);
    setTimeout(() => setNotification(null), 3000); // Hide popup after 3 seconds
  };

  // Notification popup component
  const NotificationPopup = ({ message, tokens, onClose }) => (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-50 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
            <FiCheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white">{message}</p>
            <p className="text-sm text-gray-500">Earned {tokens} tokens for verification</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  // Notifications list component
  const NotificationsList = ({ notifications, onClose }) => (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-40">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">{notif.message}</p>
                  <p className="text-sm text-gray-500">Earned {notif.tokens} tokens</p>
                  <p className="text-xs text-gray-400 mt-1">{getTimeAgo(notif.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Function to add new verification to activity feed
  const addNewVerification = (status) => {
    const newActivity = {
      id: Date.now(),
      type: 'verify',
      title: 'News Article Verification',
      status: status,
      reward: 15,
      time: 'just now'
    };

    setActivities(prev => [newActivity, ...prev]);
    showNotification("Verified a news article", 15);
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Fake':
        return 'bg-red-100 dark:bg-red-900/30 text-red-500';
      case 'True':
        return 'bg-green-100 dark:bg-green-900/30 text-green-500';
      case 'Misleading':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-500';
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
          +{data.weeklyTokens} this week
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Earnings</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">${data.tokens * 5}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <FiDollarSign className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <p className="text-sm text-gray-500">Total earned: ${data.stats.totalEarned * 5}</p>
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotificationList(!showNotificationList)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotificationList && (
              <NotificationsList 
                notifications={notifications} 
                onClose={() => setShowNotificationList(false)} 
              />
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => addNewVerification('True')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <FiCheckCircle className="w-4 h-4" />
              Verify as True
            </button>
            <button
              onClick={() => addNewVerification('Fake')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <FiAlertCircle className="w-4 h-4" />
              Mark as Fake
            </button>
            <button
              onClick={() => addNewVerification('Misleading')}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
            >
              <FiAlertCircle className="w-4 h-4" />
              Flag as Misleading
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
              index === 0 ? 'bg-blue-50 dark:bg-blue-900/20 shadow-md' : 'bg-gray-50 dark:bg-gray-700/50'
            } ${
              index === 0 ? 'scale-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              activity.type === 'verify' ? getStatusColor(activity.status) : 'bg-purple-100 dark:bg-purple-900/30'
            }`}>
              {activity.type === 'verify' ? (
                activity.status === 'Fake' ? (
                  <FiAlertCircle className="w-5 h-5" />
                ) : activity.status === 'Misleading' ? (
                  <FiAlertCircle className="w-5 h-5" />
                ) : (
                  <FiCheckCircle className="w-5 h-5" />
                )
              ) : (
                <FiAward className="w-5 h-5 text-purple-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800 dark:text-white">
                  {activity.title}
                  {index === 0 && (
                    <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              {activity.status && (
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${
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

  const renderAchievementsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.achievements.map((achievement) => (
        <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-white">{achievement.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FiAward className={`w-6 h-6 ${achievement.completed ? 'text-green-500' : 'text-blue-500'}`} />
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-2">
            <div 
              className={`h-1.5 rounded-full ${achievement.completed ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{achievement.progress}% complete</span>
            <span className="text-sm font-medium text-blue-500">+{achievement.reward} tokens</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {notification && (
        <NotificationPopup 
          message={notification.message}
          tokens={notification.tokens}
          onClose={() => setNotification(null)}
        />
      )}
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
        {activeTab === 'stats' && renderStatsTab()}
        {activeTab === 'achievements' && renderAchievementsTab()}
      </div>
    </div>
  );
};

export default ProfileDashboard; 