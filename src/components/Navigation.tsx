/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Floating Capsule Navigation Component
 * Strictly adheres to 11-navigation.png:
 * - Brand mark: AFRUZ
 * - Sections: ABOUT, WORK, CONTACT
 * - Subtle translucent cream/white glass capsule
 * - Green Thread active dot indicator
 */

import React, { useEffect, useState } from 'react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav
        aria-label="Primary Navigation"
        className={`pointer-events-auto flex items-center gap-4 sm:gap-7 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border border-[#E7E3DA] shadow-sm shadow-black/5 scale-[0.98]'
            : 'bg-white/70 backdrop-blur-md border border-[#E7E3DA]/80 shadow-xs hover:border-[#8FA88B]/40'
        }`}
      >
        {/* Brand Mark: AFRUZ */}
        <button
          onClick={() => onNavigate('hero')}
          className="group relative flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] rounded-full cursor-pointer transition-transform duration-200 active:scale-95"
          aria-label="AFRUZ - Return to top"
          data-cursor="link"
        >
          <span className="font-display font-extrabold text-sm sm:text-[15px] tracking-tight text-[#1F1F1D] group-hover:text-[#7D9A78] transition-colors">
            AFRUZ
          </span>
          {activeSection === 'hero' && (
            <span
              className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#7D9A78] transition-all duration-300 animate-in zoom-in-50"
              aria-hidden="true"
            />
          )}
        </button>

        {/* Divider separator */}
        <span className="w-[1px] h-3 sm:h-3.5 bg-[#E7E3DA]" aria-hidden="true" />

        {/* Section Links */}
        <div className="flex items-center gap-3.5 sm:gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center text-[11px] sm:text-xs tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] rounded-md py-0.5 active:scale-95 cursor-pointer ${
                  isActive
                    ? 'font-semibold text-[#1F1F1D]'
                    : 'font-medium text-[#6B6862] hover:text-[#1F1F1D]'
                }`}
                data-cursor="link"
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#7D9A78] transition-all duration-300 animate-in zoom-in-50"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
