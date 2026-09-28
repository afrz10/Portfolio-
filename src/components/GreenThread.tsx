/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ Green Thread System
 * - Scroll progress thread at viewport top with emerald neon glow (#34d399)
 */

import React, { useEffect, useState } from 'react';

export const ScrollProgressThread: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        setScrollProgress(0);
      } else {
        const currentScroll = window.scrollY;
        const progress = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#34d399] to-[#6ee7b7] shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
