/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 01 — HERO
 * Faithfully matches 02-hero-section.png, 19-desktop.png & 20-mobile.png:
 * - AFRUZ headline
 * - Developer · Student · Editor
 * - Personal statement: "A student, developer and editor, learning to build for the web."
 * - "Explore Work" capsule CTA + "Currently Building" status
 * - Green Thread horizontal divider line
 * - Signature 3D sculpture
 * - Polished with viewport reveal and subtle 10-15% compactness
 */

import React, { useState } from 'react';
import { BRAND_DATA } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

interface HeroSectionProps {
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork }) => {
  const [btnHover, setBtnHover] = useState(false);
  const { ref, isRevealed } = useReveal<HTMLElement>(0.1);

  return (
    <section
      id="hero"
      ref={ref}
      className={`relative min-h-[80vh] sm:min-h-[86vh] flex items-center pt-16 sm:pt-20 pb-8 sm:pb-10 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="AFRUZ Hero"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: Typographic & Brand Identity */}
        <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-1 z-10">
          <div className="space-y-2 sm:space-y-2.5">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-[0.96] select-none">
              {BRAND_DATA.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-[#1F1F1D] tracking-tight">
              {BRAND_DATA.identity}
            </p>
          </div>

          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-[#5A5750] max-w-lg leading-relaxed font-normal">
            {BRAND_DATA.statement}
          </p>

          {/* Action Row matching 18-cta-buttons.png */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={onExploreWork}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              className="btn-magnetic group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F2EFE8]/90 hover:bg-[#EAE6DE] active:scale-95 border border-[#E2DED6] hover:border-[#8FA88B]/60 text-xs sm:text-sm font-medium text-[#1F1F1D] shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] cursor-pointer"
              data-cursor="link"
            >
              <span>Explore Work</span>
              <ArrowRight className={`w-3.5 h-3.5 text-[#7D9A78] transition-transform duration-200 ${btnHover ? 'translate-x-1' : ''}`} />
            </button>

            {/* Status indicator: Unboxed clean text with subtle emerald pulsing dot */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1F1F1D]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>{BRAND_DATA.currentStatus}</span>
            </div>
          </div>

          {/* Green Thread horizontal divider line matching 02-hero-section.png */}
          <div className="mt-8 sm:mt-10 pt-5 border-t border-[#8FA88B]/35 max-w-xl">
            {/* Project Peek Capsule */}
            <div
              onClick={onExploreWork}
              className="w-full p-3.5 sm:p-4 rounded-xl glass-panel hover:glass-panel-elevated hover:border-[#8B5CF6]/40 transition-all duration-200 cursor-pointer flex items-center justify-between group"
              data-cursor="link"
            >
              <div>
                <span className="text-[10px] font-mono tracking-wider text-[#7D9A78] uppercase font-semibold">PROJECT</span>
                <p className="text-xs sm:text-sm font-medium text-[#1F1F1D] mt-0.5">Currently in Active Development</p>
              </div>
              <span className="text-xs font-medium text-[#7D9A78] group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all">View →</span>
            </div>
          </div>
        </div>

        {/* Right Column: Signature 3D Sculpture matching 01-hero-3d.png and 02-hero-section.png */}
        <div className="lg:col-span-5 h-[300px] sm:h-[380px] lg:h-[480px] flex items-center justify-center order-2 lg:order-2 relative select-none">
          <SignatureSculpture size="hero" interactive={true} />
        </div>
      </div>
    </section>
  );
};
