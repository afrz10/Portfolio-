/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Vertical Rolling Role Ticker Component (.jsx)
 * - Sequence: DEVELOPER (2s) ➔ EDITOR (2s) ➔ STUDENT (2s) ➔ AFRUZ (10s hold) ➔ Loop
 * - Smooth vertical slide-down transition
 * - Luxury leaf-green palette: creamy ivory (#f9f6ee), muted sage (#8fa291), glowing emerald neon dot
 */

import React, { useState, useEffect } from 'react';

const ROLES = [
  { text: 'DEVELOPER', duration: 2000 },
  { text: 'EDITOR', duration: 2000 },
  { text: 'STUDENT', duration: 2000 },
  { text: 'AFRUZ', duration: 10000 },
];

export const RoleTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const currentDuration = ROLES[currentIndex].duration;

    const timer = setTimeout(() => {
      setPrevIndex(currentIndex);
      setAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % ROLES.length);

      const animTimer = setTimeout(() => {
        setAnimating(false);
        setPrevIndex(null);
      }, 500);

      return () => clearTimeout(animTimer);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentRole = ROLES[currentIndex].text;
  const prevRole = prevIndex !== null ? ROLES[prevIndex].text : null;

  return (
    <div
      className="inline-flex items-center gap-2 select-none pointer-events-auto"
      aria-label={`Role: ${currentRole}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" aria-hidden="true" />
      <div className="relative h-6 sm:h-7 overflow-hidden w-28 sm:w-36 flex items-center">
        {/* Outgoing role sliding down */}
        {animating && prevRole && (
          <span
            className="absolute left-0 top-0 h-full flex items-center font-mono text-xs sm:text-sm font-bold tracking-wider text-[#8fa291] transition-all duration-500 ease-out"
            style={{
              transform: 'translateY(100%)',
              opacity: 0,
            }}
          >
            {prevRole}
          </span>
        )}

        {/* Current incoming role */}
        <span
          className={`absolute left-0 top-0 h-full flex items-center font-mono text-xs sm:text-sm font-bold tracking-wider text-[#f9f6ee] ${
            animating ? 'transition-all duration-500 ease-out' : ''
          }`}
          style={{
            transform: 'translateY(0%)',
            opacity: 1,
            animation: animating ? 'slideDownFromTop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
          }}
        >
          {currentRole}
        </span>
      </div>

      <style>{`
        @keyframes slideDownFromTop {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default RoleTicker;
