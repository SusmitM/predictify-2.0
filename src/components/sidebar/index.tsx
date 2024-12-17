'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <DesktopNav
        pathname={pathname}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />
      <MobileNav pathname={pathname} />
    </>
  );
}