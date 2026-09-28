/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 07 — NOW
 * Strictly complies with Directive 20 & 09-now.png:
 * - The word NOW appears EXACTLY ONCE as the main headline (no NOW NOW stacking)
 * - Three vertical panels: LEARNING, BUILDING, EXPLORING
 * - Subtle indicator dots and plus signs
 * - Expandable cards without invented activities
 * - Signature sculpture accent
 * - Viewport reveal animation and compact spacing
 */

import React, { useState } from 'react';
import { NOW_DATA } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { Plus, Minus } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const NowSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>('building');
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  const dots: Record<string, string> = {
    learning: '#10B981',
    building: '#3B82F6',
    exploring: '#8B5CF6',
  };

  const toggleCard = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="now"
      ref={ref}
      className={`relative min-h-[70vh] flex flex-col justify-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="Now"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: EXACTLY ONE "NOW" Headline */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-none select-none">
            NOW
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-[#6B6862] max-w-xs font-normal">
            Current focuses, real-time priorities, and active directions.
          </p>
        </div>

        {/* Right Column: Three Vertical Frosted Panels */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 relative">
          {NOW_DATA.map((item) => {
            const isExpanded = expandedCard === item.id;
            const accent = dots[item.id] || '#7D9A78';
            return (
              <div
                key={item.id}
                onClick={() => toggleCard(item.id)}
                className="group relative flex flex-col justify-between p-4.5 sm:p-5.5 rounded-2xl sm:rounded-3xl glass-panel hover:glass-panel-elevated hover:border-[#8FA88B] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 min-h-[220px] sm:min-h-[270px] border border-[#E7E3DA] cursor-pointer"
                data-cursor="link"
              >
                <div className="flex items-center justify-between">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                  <div className="text-[#8FA88B] group-hover:text-[#7D9A78] transition-colors">
                    {isExpanded ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="my-4 sm:my-5">
                  <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight text-[#1F1F1D] group-hover:text-[#7D9A78] transition-colors">
                    {item.category}
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#7D9A78] mt-1 font-medium">
                    {item.focus}
                  </p>
                </div>

                <div className="text-xs text-[#5A5750] leading-relaxed pt-2.5 border-t border-[#E7E3DA]/60">
                  Active priority and focus direction for AFRUZ.
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-4 sm:mt-7 mr-4 sm:mr-8">
        <div className="w-18 h-24 sm:w-22 sm:h-28">
          <SignatureSculpture size="mini" interactive={false} />
        </div>
      </div>
    </section>
  );
};
