/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Custom Cursor Component
 * Strictly implements the Batch 02 cursor reference:
 * - States: DEFAULT, LINK, VIEW, DRAG
 * - Small, smooth, responsive, subtle
 * - Desktop only: disabled on touch/mobile
 */

import React, { useEffect, useState } from 'react';

export type CursorState = 'default' | 'link' | 'view' | 'drag';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device supports fine hover pointer
    const checkFinePointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(!hasFinePointer);
    };

    checkFinePointer();
    window.addEventListener('resize', checkFinePointer);

    if (isTouchDevice) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Detect hover target attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const state = cursorTarget.getAttribute('data-cursor') as CursorState;
        if (state) {
          setCursorState(state);
          return;
        }
      }

      // Standard links & buttons
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState('link');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth spring follow interpolation
    const updateCursorPosition = () => {
      const ease = 0.22;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafId = requestAnimationFrame(updateCursorPosition);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkFinePointer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, isVisible]);

  // Disable on mobile/touch per directive
  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-200"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      {/* State: DEFAULT */}
      {cursorState === 'default' && (
        <div className="relative -top-3.5 -left-3.5 flex items-center justify-center w-7 h-7">
          <div className="w-6 h-6 rounded-full border border-[#1F1F1D]/35 transition-transform duration-200" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#1F1F1D]" />
        </div>
      )}

      {/* State: LINK */}
      {cursorState === 'link' && (
        <div className="relative -top-4 -left-4 flex items-center justify-center w-8 h-8">
          <div className="w-8 h-8 rounded-full border-2 border-[#7D9A78] bg-[#7D9A78]/10 transition-transform duration-200 scale-110" />
          <div className="absolute w-2 h-2 rounded-full bg-[#1F1F1D]" />
        </div>
      )}

      {/* State: VIEW */}
      {cursorState === 'view' && (
        <div className="relative -top-4 -left-4 flex items-center justify-center w-8 h-8">
          <div className="w-8 h-8 rounded-full bg-[#7D9A78] flex items-center justify-center text-white text-[9px] font-medium tracking-wider shadow-sm transition-transform duration-150">
            VIEW
          </div>
        </div>
      )}

      {/* State: DRAG */}
      {cursorState === 'drag' && (
        <div className="relative -top-3.5 -left-5 flex items-center justify-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF7F2]/90 border border-[#7D9A78] shadow-sm text-[#1F1F1D] text-[11px] font-mono">
          <span className="text-[#7D9A78]">‹</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1F1F1D]" />
          <span className="text-[#7D9A78]">›</span>
        </div>
      )}
    </div>
  );
};
