"use client";

import { cn } from "@/utils/cn";
import { History, Home, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppLogo } from "../ui/app-logo";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", icon: Home, href: "/home" },
  { name: "History", icon: History, href: "/history" },
];

interface MobileNavProps {
  pathname: string;
}

export function MobileNav({ pathname }: MobileNavProps) {
  const router = useRouter();
  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <nav className="flex justify-around p-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                isActive ? "text-purple-400 bg-purple-500/10" : "text-gray-400"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.name}</span>
            </div>
          );
        })}
        <button
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-800/50 transition-colors"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Logout</span>
        </button>
      </nav>
    </motion.div>
  );
}
