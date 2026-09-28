/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 03 — WHAT I DO
 * Faithfully matches 04-what-i-do.png:
 * - WHAT I DO headline
 * - Three expandable rows: Web Development, Editing, Learning
 * - Miniature sculpture accent at bottom right
 * - Viewport reveal animation and compact spacing
 */

import React, { useState } from 'react';
import { WHAT_I_DO_DATA } from '../data/portfolioData';
import { Plus, Minus } from 'lucide-react';
import { SignatureSculpture } from './SignatureSculpture';
import { useReveal } from '../hooks/useReveal';

export const WhatIDoSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('web-development');
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="what-i-do"
      ref={ref}
      className={`relative min-h-[66vh] flex flex-col justify-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="What I Do"
    >
      <div className="w-full">
        {/* Headline matching 04-what-i-do.png */}
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-none mb-6 sm:mb-9 select-none">
          WHAT I DO
        </h2>

        {/* 3 Sleek Expandable Rows */}
        <div className="space-y-3 max-w-5xl">
          {WHAT_I_DO_DATA.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl glass-panel hover:glass-panel-elevated overflow-hidden transition-all duration-300 border border-[#E7E3DA]"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] cursor-pointer"
                  data-cursor="link"
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-[#1F1F1D] group-hover:text-[#7D9A78] transition-colors">
                    {item.title}
                  </span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[#7D9A78] group-hover:bg-[#7D9A78]/10 transition-colors">
                    {isExpanded ? (
                      <Minus className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2]" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-1 border-t border-[#E7E3DA]/60 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-[#5A5750] font-normal mb-2.5">
                      {item.summary}
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#1F1F1D]/80">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1 shrink-0" aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Miniature Signature Sculpture Accent at Bottom Right */}
        <div className="flex justify-end mt-4 sm:mt-6 mr-4 sm:mr-8">
          <div className="w-18 h-24 sm:w-22 sm:h-28">
            <SignatureSculpture size="mini" interactive={false} />
          </div>
        </div>
      </div>
    </section>
  );
};
