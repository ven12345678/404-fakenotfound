import { Geist } from "next/font/google";
import ProfileDashboard from "../components/ProfileDashboard";
import { useRouter } from 'next/router';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const geist = Geist({
  subsets: ["latin"],
});

export default function Profile() {
  const router = useRouter();

  return (
    <div className={`${geist.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileDashboard />
      </div>
    </div>
  );
} 