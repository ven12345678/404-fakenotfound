import Link from 'next/link';
import { FiUser, FiInfo, FiRss, FiCreditCard } from 'react-icons/fi';
import Logo from './Logo';

export default function Header() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <Logo variant="text" theme="light" size="normal" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/news-feed" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all">
              <FiRss className="w-5 h-5 mr-2" />
              Your Feed
            </Link>
            <Link href="/about" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all">
              <FiInfo className="w-5 h-5 mr-2" />
              About
            </Link>
            <Link href="/profile" className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all">
              <FiUser className="w-5 h-5 mr-2" />
              Profile
            </Link>
            <button
              onClick={() => {/* Add wallet connection logic */}}
              className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all shadow-md hover:shadow-lg"
            >
              <FiCreditCard className="w-5 h-5 mr-2" />
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 