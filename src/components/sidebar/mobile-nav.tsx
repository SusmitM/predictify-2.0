'use client';

import { cn } from '@/utils/cn';
import { History, Home, LogOut } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppLogo } from '../ui/app-logo';

const menuItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'History', icon: History, href: '/dashboard/history' },
];

interface MobileNavProps {
  pathname: string;
}

export function MobileNav({ pathname }: MobileNavProps) {
  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <AppLogo showText={false} className="scale-75" />
          <span className="text-sm font-medium text-gray-200">Predictify</span>
        </Link>
      </div>

      <nav className="flex justify-around p-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors',
                isActive ? 'text-purple-400 bg-purple-500/10' : 'text-gray-400'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.name}</span>
            </Link>
          );
        })}
        <button
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800/50 transition-colors"
          onClick={() => {/* Handle logout */}}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Logout</span>
        </button>
      </nav>
    </motion.div>
  );
}