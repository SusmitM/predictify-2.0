import Link from 'next/link';
import { Brain } from 'lucide-react';
import { AppLogo } from './ui/app-logo';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
          <AppLogo showText={true} />
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 text-sm font-medium bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}