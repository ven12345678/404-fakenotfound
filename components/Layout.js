import { useSession } from 'next-auth/react';
import WalletContextProvider from './WalletContextProvider';
import ProfileDropdown from './ProfileDropdown';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-indigo-600">
                  FakeNotFound
                </a>
              </div>
              
              {session && (
                <div className="flex items-center">
                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </WalletContextProvider>
  );
} 