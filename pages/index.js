import { useRouter } from 'next/router';
import { FiSearch, FiTrendingUp, FiShield, FiUser, FiLogIn, FiCheck, FiX } from 'react-icons/fi';
import Logo from '../components/Logo';

export default function Home() {
  const router = useRouter();

  // Sample achievement data (normally would come from user data)
  const achievements = [
    {
      title: 'First Verification',
      description: 'Complete your first news verification',
      completed: false,
      progress: 0
    },
    {
      title: '10 Streak',
      description: 'Verify news for 10 days in a row',
      completed: false,
      progress: 0
    },
    {
      title: 'Accuracy Expert',
      description: 'Maintain 90% accuracy for a month',
      completed: false,
      progress: 0
    },
    {
      title: 'Community Leader',
      description: 'Help 50 users with verifications',
      completed: false,
      progress: 0
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end h-16 items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-cyan-700 hover:text-cyan-800 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all"
              >
                <FiLogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all shadow-sm"
              >
                <FiUser className="w-4 h-4 mr-2" />
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Achievement Bar */}
      <div className="bg-white shadow-sm mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  </div>
                  <div className={`rounded-full p-1 ${achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {achievement.completed ? <FiCheck className="w-5 h-5" /> : <FiX className="w-5 h-5" />}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${achievement.completed ? 'bg-green-500' : 'bg-cyan-500'}`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600 text-right">
                  {achievement.progress}% Complete
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden flex-grow">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-teal-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              TruthScope
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto">
              Your trusted source for information verification. We help you identify and validate facts with precision and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => router.push('/news-feed')}
                className="inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all shadow-sm"
              >
                <FiSearch className="w-6 h-6 mr-2" />
                Start Verifying
              </button>
              <button
                onClick={() => router.push('/leaderboard')}
                className="inline-flex items-center px-8 py-4 rounded-lg text-lg font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all"
              >
                <FiTrendingUp className="w-6 h-6 mr-2" />
                View Rankings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        {/* Subheader: What can you do */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What can you do</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
                <FiShield className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verify News</h3>
              <p className="text-gray-600">
                Submit news articles for verification and earn tokens for your valuable contributions to fighting misinformation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
                <FiTrendingUp className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compete & Earn</h3>
              <p className="text-gray-600">
                Rise through the ranks, earn rewards, and compete with other fact-checkers in our global leaderboard.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-cyan-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center mb-6">
                <FiUser className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Build Reputation</h3>
              <p className="text-gray-600">
                Establish yourself as a trusted fact-checker and gain recognition for your contributions to truth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-cyan-50">
        {/* Subheader: More about us */}
        <h2 className="text-3xl font-bold text-center text-gray-800 pt-12 mb-8">More about us</h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-cyan-600">10K+</div>
              <div className="mt-1 text-sm text-gray-600">Articles Verified</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-cyan-600">5K+</div>
              <div className="mt-1 text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-cyan-600">95%</div>
              <div className="mt-1 text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-cyan-600">50K+</div>
              <div className="mt-1 text-sm text-gray-600">Tokens Awarded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
