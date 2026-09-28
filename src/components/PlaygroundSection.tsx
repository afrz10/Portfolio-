/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 06 — PLAYGROUND
 * Faithfully matches 07-playground.png:
 * - PLAYGROUND title has ZERO collision with sculpture (completely readable)
 * - Exactly four categories: UI, Animation, Web, Creative
 * - Modular experimentation system with subtle corner ticks
 * - Viewport reveal animation and compact spacing
 */

import React, { useState } from 'react';
import { PLAYGROUND_DATA, PlaygroundItem } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { Sparkles, X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const PlaygroundSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  // Subtle accent tint per category (Rule 5)
  const categoryAccents: Record<string, string> = {
    UI: '#8B5CF6',
    Animation: '#10B981',
    Web: '#3B82F6',
    Creative: '#F59E0B',
  };

  return (
    <section
      id="playground"
      ref={ref}
      className={`relative min-h-[70vh] flex flex-col justify-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="Playground"
    >
      <div className="w-full">
        {/* Title Row with zero collision with sculpture */}
        <div className="flex items-center justify-between gap-6 mb-8 sm:mb-11">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-none select-none z-10">
            PLAYGROUND
          </h2>
          <div className="w-16 h-20 sm:w-22 sm:h-28 shrink-0 hidden sm:flex items-center justify-center">
            <SignatureSculpture size="mini" interactive={false} />
          </div>
        </div>

        {/* 4 Modular Frosted Cards matching 07-playground.png */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PLAYGROUND_DATA.map((item) => {
            const accent = categoryAccents[item.title] || '#7D9A78';
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative flex flex-col justify-between p-4.5 sm:p-5.5 rounded-2xl glass-panel hover:glass-panel-elevated hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 cursor-pointer min-h-[175px] sm:min-h-[205px]"
                data-cursor="view"
              >
                {/* Corner Tick matching 07-playground.png with subtle category accent */}
                <div className="absolute top-3 right-3 w-2.5 h-2.5" aria-hidden="true">
                  <svg viewBox="0 0 10 10" className="w-full h-full transition-colors" style={{ fill: accent }}>
                    <polygon points="0,0 10,0 10,10" />
                  </svg>
                </div>

                <div className="flex-1 flex items-center justify-center py-3">
                  <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E7E3DA] group-hover:scale-105 flex items-center justify-center transition-all">
                    <Sparkles className="w-3.5 h-3.5 transition-colors" style={{ color: accent }} />
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1F1F1D] tracking-tight transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono tracking-wider text-[#8A8780] uppercase mt-0.5 block">
                    Active Sandbox
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {selectedItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1F1D]/40 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#E7E3DA] p-5 sm:p-7 shadow-2xl">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#6B6862] hover:text-[#1F1F1D] hover:bg-black/5 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close playground preview"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryAccents[selectedItem.title] || '#7D9A78' }} />
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D9A78] font-semibold">
                  Category: {selectedItem.title}
                </span>
              </div>

              <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#1F1F1D] mb-2">
                {selectedItem.title} Playground
              </h4>

              <div className="w-full h-40 rounded-xl glass-panel border border-[#E7E3DA] flex flex-col items-center justify-center p-4 text-center">
                <p className="text-xs sm:text-sm font-medium text-[#1F1F1D]">Modular Experimentation Space</p>
                <p className="text-[11px] text-[#8A8780] mt-1 max-w-sm">
                  This sandbox is engineered to host future live interactive prototypes and experiments for {selectedItem.title}.
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#1F1F1D] hover:bg-black/5 border border-[#E7E3DA] transition-colors cursor-pointer"
                >
                  Close Sandbox
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
