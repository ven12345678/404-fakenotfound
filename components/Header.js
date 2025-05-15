import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiUser, FiInfo, FiRss, FiCreditCard } from 'react-icons/fi';
import Logo from './Logo';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

export default function Header() {
  const router = useRouter();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer hover:opacity-90 transition-opacity">
              <Logo variant="text" theme="light" size="normal" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/news-feed"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                router.pathname === '/news-feed'
                  ? 'bg-gray-100 text-cyan-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all`}
            >
              <FiRss className="w-5 h-5 mr-2" />
              Your Feed
            </Link>

            <Link 
              href="/about"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                router.pathname === '/about'
                  ? 'bg-gray-100 text-cyan-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all`}
            >
              <FiInfo className="w-5 h-5 mr-2" />
              About
            </Link>

            <Link 
              href="/profile"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                router.pathname === '/profile'
                  ? 'bg-gray-100 text-cyan-600'
                  : 'text-gray-700 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all`}
            >
              <FiUser className="w-5 h-5 mr-2" />
              Profile
            </Link>

            <div className="wallet-adapter-button-trigger">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}