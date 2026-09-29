/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BackToTop Component (.tsx)
 * - Fixed at bottom-right: bottom-8 right-8 z-50
 * - Hidden during Hero fold; gracefully fades in once scrolled past Hero
 * - Magnetic interaction: subtly pulls toward cursor (max 8px offset) with spring damping
 * - Pure native smooth scroll back to top: window.scrollTo({ top: 0, behavior: 'smooth' })
 * - Minimal frosted pill style in creamy white with upward arrow icon & "TOP" label
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll past hero fold
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.7;
      const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (currentY > heroThreshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Magnetic hover pull
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.28;
    const deltaY = (e.clientY - centerY) * 0.28;

    const clampedX = Math.max(-8, Math.min(8, deltaX));
    const clampedY = Math.max(-8, Math.min(8, deltaY));

    setOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-mono text-xs font-semibold tracking-wider text-[#f9f6ee] bg-white/[0.06] border border-white/10 backdrop-blur-md hover:bg-white/[0.12] hover:border-[#34d399]/40 hover:text-[#34d399] transition-all duration-300 shadow-xl shadow-black/30 cursor-pointer select-none ${
        visible
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-90 pointer-events-none'
      }`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, background-color 0.2s ease, border-color 0.2s ease',
      }}
      aria-label="Back to Top"
      data-cursor="link"
    >
      <ArrowUp className="w-3.5 h-3.5" />
      <span>TOP</span>
    </button>
  );
};

export default BackToTop;
