/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 02 — ABOUT
 * Faithfully matches 03-about.png:
 * - Huge ABOUT headline
 * - Vertical green thread divider bar
 * - Approved personal facts only
 * - Signature 3D sculpture
 * - Viewport reveal animation and compact spacing
 */

import React from 'react';
import { BRAND_DATA } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { useReveal } from '../hooks/useReveal';

export const AboutSection: React.FC = () => {
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  return (
    <section
      id="about"
      ref={ref}
      className={`relative min-h-[68vh] sm:min-h-[74vh] flex items-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="About AFRUZ"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Column: ABOUT Headline */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-none select-none">
            ABOUT
          </h2>
        </div>

        {/* Middle Column: Vertical Green Thread Bar + Approved Facts */}
        <div className="lg:col-span-4 flex items-start gap-4 sm:gap-5">
          {/* Vertical Green Thread Bar with subtle blue accent top marker */}
          <div className="relative w-[3px] self-stretch bg-[#8FA88B] rounded-full shrink-0" aria-hidden="true">
            <span className="absolute -top-1 -left-[2.5px] w-2 h-2 rounded-full bg-[#3B82F6]" />
          </div>

          {/* Approved Fact Statements */}
          <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base md:text-lg font-medium text-[#1F1F1D] leading-snug">
            {BRAND_DATA.personalFacts.map((fact, index) => (
              <p key={index} className="tracking-tight hover:text-[#7D9A78] transition-colors duration-200">
                {fact}
              </p>
            ))}
          </div>
        </div>

        {/* Right Column: Sculpture Accent */}
        <div className="lg:col-span-3 h-[250px] sm:h-[320px] flex items-center justify-center relative select-none">
          <SignatureSculpture size="section" interactive={true} />
        </div>
      </div>
    </section>
  );
};
