'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
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