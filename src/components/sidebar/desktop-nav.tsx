'use client';

import { cn } from '@/utils/cn';
import { History, Home, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppLogo } from '../ui/app-logo';

const menuItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'History', icon: History, href: '/dashboard/history' },
];

interface DesktopNavProps {
  pathname: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function DesktopNav({ pathname, isExpanded, onToggleExpand }: DesktopNavProps) {
  return (
    <motion.div
      className={cn(
        "hidden md:block h-screen bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 relative group",
        isExpanded ? "w-64" : "w-20"
      )}
      animate={{ width: isExpanded ? 256 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onToggleExpand}
        className="absolute -right-4 top-6 p-2 bg-gray-900 border border-gray-800 rounded-full hover:bg-gray-800 transition-colors"
      >
        <Menu className="w-4 h-4 text-gray-400" />
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-3">
            <AppLogo showText={isExpanded} />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-lg transition-colors relative group/item',
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-purple-500/10 rounded-lg"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <Icon className="w-5 h-5" />
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ml-3"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center px-3 py-2 w-full rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
            <LogOut className="w-5 h-5" />
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}