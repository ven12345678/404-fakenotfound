import { Geist } from "next/font/google";
import Header from './Header';

const geist = Geist({
  subsets: ["latin"],
});

export default function Layout({ children }) {
  return (
    <div className={`${geist.className} min-h-screen bg-gray-50 flex flex-col`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
} 