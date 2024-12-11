'use client'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { usePathname } from 'next/navigation';

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

  return(
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {showHeaderFooter && <Navbar />} 
      <main>
        {children}
      </main>
      {showHeaderFooter && <Footer />} 
    </div>
  )
}
