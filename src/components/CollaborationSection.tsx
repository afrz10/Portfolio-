/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 08 — COLLABORATION
 * Faithfully matches 08-collaboration.png:
 * - Top label: Collaboration
 * - Two symmetrical cards: CREATORS & DEVELOPERS
 * - Subtext: "Creative collaborations." & "Web and technical collaborations."
 * - Signature sculpture centered between cards
 * - Viewport reveal animation and compact spacing
 */

import React from 'react';
import { SignatureSculpture } from './SignatureSculpture';
import { useReveal } from '../hooks/useReveal';

interface CollaborationSectionProps {
  onCollaborateClick: () => void;
}

export const CollaborationSection: React.FC<CollaborationSectionProps> = ({
  onCollaborateClick,
}) => {
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  return (
    <section
      id="collaboration"
      ref={ref}
      className={`relative min-h-[70vh] flex flex-col justify-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="Collaboration"
    >
      <div className="w-full">
        <div className="text-center mb-6 sm:mb-9">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#7D9A78] uppercase">
            Collaboration
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          <div
            onClick={onCollaborateClick}
            className="lg:col-span-5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-[#8FA88B]/60 hover:border-[#8B5CF6]/70 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 flex flex-col justify-center items-center text-center cursor-pointer group min-h-[220px] sm:min-h-[260px]"
            data-cursor="link"
          >
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1F1F1D] tracking-tight group-hover:text-[#8B5CF6] transition-colors select-none">
              CREATORS
            </h3>
            <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base text-[#5A5750] font-normal">
              Creative collaborations.
            </p>
            <span className="mt-3 inline-flex items-center text-xs font-semibold tracking-wider text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity">
              Connect →
            </span>
          </div>

          <div className="lg:col-span-2 h-[160px] sm:h-[190px] lg:h-[240px] flex items-center justify-center select-none">
            <SignatureSculpture size="mini" interactive={true} />
          </div>

          <div
            onClick={onCollaborateClick}
            className="lg:col-span-5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-[#8FA88B]/60 hover:border-[#3B82F6]/70 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 flex flex-col justify-center items-center text-center cursor-pointer group min-h-[220px] sm:min-h-[260px]"
            data-cursor="link"
          >
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1F1F1D] tracking-tight group-hover:text-[#3B82F6] transition-colors select-none">
              DEVELOPERS
            </h3>
            <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-sm md:text-base text-[#5A5750] font-normal">
              Web and technical collaborations.
            </p>
            <span className="mt-3 inline-flex items-center text-xs font-semibold tracking-wider text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity">
              Connect →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
