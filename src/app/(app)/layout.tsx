'use client'
import Navbar from '../../components/Navbar';
import {Footer} from '../../components/Footer';
import { usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); 
  const showHeaderFooter = pathname === '/' || 
  pathname === '/sign-in' || 
  pathname === '/sign-up' || 
  pathname === '/verify';

  const showSidebar=pathname==="/home" || pathname==="/history";
  return(
    <div className={`min-h-screen bg-gray-950 ${showSidebar?"flex":""} `}>
      {showHeaderFooter && <Navbar />} 
      {showSidebar &&  <DashboardSidebar />}
      <main className={`flex-1 overflow-auto`}>
        <div className="container mx-auto py-6 px-4">
          {children}
        </div>
      </main>
      {showHeaderFooter && <Footer />} 
    </div>
  )
}
