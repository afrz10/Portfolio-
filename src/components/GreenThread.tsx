/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ Green Thread System
 * Continuous visual identity system:
 * - Scroll progress thread at viewport top
 * - Minimal, thin, precise, leaf-green (#7D9A78)
 * - Timeline spine & accent connector utilities
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

    // Initial calculation on mount
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
        className="h-full bg-gradient-to-r from-[#7D9A78] to-[#8FA88B] transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export const ThreadDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-full flex items-center justify-center my-8 sm:my-14 relative ${className}`}
      aria-hidden="true"
    >
      {/* Horizontal subtle gradient line */}
      <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#8FA88B]/30 to-transparent" />
      {/* Central thread node for visual continuity */}
      <div className="absolute w-1.5 h-1.5 rounded-full bg-[#7D9A78]/60" />
    </div>
  );
};
