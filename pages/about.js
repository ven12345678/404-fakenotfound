import { BsCoin, BsCheckCircle, BsTrophy } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="flex-grow bg-gray-50 min-h-screen text-gray-900">
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto relative p-8">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl -z-0"></div>

        {/* Title Section */}
        <div className="relative z-10 mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4 flex items-center gap-4">
            Verify, Earn, Transform News
            <BsCoin className="text-yellow-400 inline-block" size={40} />
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        </div>

        {/* Three Steps Section with Illustration */}
        <div className="relative z-10 mb-20 flex items-center gap-8">
          {/* Steps Content */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4 text-xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4d8bff] text-white font-bold">
                1
              </div>
              <p className="text-gray-700">Participate with crypto deposits to verify trending news content.</p>
            </div>

            <div className="flex items-center gap-4 text-xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4d8bff] text-white font-bold">
                2
              </div>
              <p className="text-gray-700">Get incentives for accurate fact-checking.</p>
            </div>

            <div className="flex items-center gap-4 text-xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4d8bff] text-white font-bold">
                3
              </div>
              <p className="text-gray-700">Withdraw deposits and grow your verification authority.</p>
            </div>
          </div>

          {/* Side Illustration */}
          <div className="w-72 h-64 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#243757]/50 to-transparent rounded-2xl"></div>
            <svg viewBox="0 0 200 200" className="w-full h-full p-6 relative z-10">
              {/* Central verification symbol */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#4d8bff" strokeWidth="2" className="animate-pulse-slow" />
              <path 
                d="M70 100 L90 120 L130 80" 
                stroke="#4d8bff" 
                strokeWidth="4" 
                fill="none" 
                className="animate-draw"
              />
              
              {/* Orbiting elements */}
              <g className="animate-orbit">
                <circle cx="160" cy="100" r="8" fill="#4d8bff" fillOpacity="0.6" />
                <BsCoin x="156" y="96" className="text-yellow-400" />
              </g>
              <g className="animate-orbit-delayed">
                <circle cx="100" cy="40" r="8" fill="#4d8bff" fillOpacity="0.6" />
                <BsCheckCircle x="96" y="36" className="text-cyan-400" />
              </g>
              <g className="animate-orbit-delayed-more">
                <circle cx="40" cy="100" r="8" fill="#4d8bff" fillOpacity="0.6" />
                <BsTrophy x="36" y="96" className="text-yellow-400" />
              </g>
            </svg>
          </div>
        </div>

        {/* Platform Features Section */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-blue-600">Platform Features</h2>
            <div className="flex gap-2">
              <FiSettings className="animate-spin text-[#4d8bff]" size={28} />
              <FiSettings className="animate-spin-slow text-cyan-400" size={24} />
              <FiSettings className="animate-spin-slower text-blue-300" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Share News</h3>
              <p className="text-gray-600 text-sm">Submit news articles for the community to verify</p>
              <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Verify & Earn</h3>
              <p className="text-gray-600 text-sm">Check facts and earn rewards for accurate verification</p>
              <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Community Vote</h3>
              <p className="text-gray-600 text-sm">Join others to decide if news is real or fake</p>
              <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Reputation Score</h3>
              <p className="text-gray-600 text-sm">Build your credibility through accurate verifications</p>
              <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Community Watch</h3>
              <p className="text-gray-600 text-sm">Help monitor and maintain quality verifications</p>
              <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Rewards System</h3>
              <p className="text-gray-600 text-sm">Get tokens and bonuses for your contributions</p>
              <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Add custom styles for animations */}
        <style jsx global>{`
          @keyframes spin-slow {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes draw {
            from {
              stroke-dashoffset: 1000;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(60px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(60px) rotate(-360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
          }
          .animate-spin-slower {
            animation: spin-slow 6s linear infinite;
          }
          .animate-draw {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease-out forwards;
          }
          .animate-pulse-slow {
            animation: pulse 2s ease-in-out infinite;
          }
          .animate-orbit {
            animation: orbit 10s linear infinite;
          }
          .animate-orbit-delayed {
            animation: orbit 10s linear infinite;
            animation-delay: -3.33s;
          }
          .animate-orbit-delayed-more {
            animation: orbit 10s linear infinite;
            animation-delay: -6.66s;
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AboutPage; 