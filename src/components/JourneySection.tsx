/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 05 — JOURNEY
 * Faithfully matches 06-journey.png:
 * - Huge JOURNEY headline
 * - Central Green Thread vertical spine
 * - Flexible expandable timeline with YYYY + placeholders
 * - Sculpture at bottom right
 * - Viewport reveal animation and compact spacing
 */

import React, { useState } from 'react';
import { JOURNEY_DATA, JourneyItem } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { Plus, Minus } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const JourneySection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="journey"
      ref={ref}
      className={`relative min-h-[70vh] flex flex-col justify-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="Journey"
    >
      <div className="w-full">
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-none text-center mb-10 sm:mb-12 select-none">
          JOURNEY
        </h2>

        <div className="relative max-w-xl mx-auto flex flex-col items-center">
          <div
            className="absolute top-0 bottom-8 w-[2px] bg-gradient-to-b from-[#8FA88B] via-[#7D9A78] to-[#8FA88B]/40 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          />

          <div className="w-full space-y-8 sm:space-y-11 relative z-10">
            {JOURNEY_DATA.map((item: JourneyItem, index: number) => {
              const isExpanded = expandedId === item.id;
              return (
                <div key={item.id} className="flex flex-col items-center">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    aria-expanded={isExpanded}
                    className="group relative flex items-center justify-center gap-2.5 px-4.5 py-2 rounded-full bg-[#FAF7F2] border border-[#8FA88B] shadow-xs hover:border-[#7D9A78] hover:bg-white active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] cursor-pointer"
                    data-cursor="link"
                  >
                    <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-[#6B7E67] group-hover:text-[#1F1F1D] transition-colors">
                      {item.yearLabel}
                    </span>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center text-[#7D9A78]">
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2]" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3.5 sm:p-4 rounded-xl glass-panel border border-[#E7E3DA] text-center max-w-md animate-in fade-in duration-200">
                      <p className="text-[10px] font-mono tracking-widest text-[#7D9A78] uppercase mb-1">
                        Timeline Entry 0{index + 1}
                      </p>
                      <p className="text-xs sm:text-sm text-[#5A5750]">
                        {item.description}
                      </p>
                      <p className="text-[11px] text-[#8A8780] mt-1.5 italic">
                        Milestone details will appear here as the journey progresses.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-end mt-6 sm:mt-9 pr-4 sm:pr-8">
            <div className="w-20 h-28 sm:w-24 sm:h-32">
              <SignatureSculpture size="mini" interactive={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
