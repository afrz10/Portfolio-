/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Persistent Character Component (.jsx)
 * Wireframe specification:
 * - Single persistent DOM node in a fixed, pointer-events-none layer (`fixed inset-0 z-10`)
 * - GSAP ScrollTrigger timeline smoothly interpolates coordinates across 4 sections:
 *   * Section 1 (Hero): Centered directly in front of giant watermark AFRUZ
 *   * Section 2 (2nd Section): Glides from CENTER to RIGHT side
 *   * Section 3 (3rd Section): Glides across from RIGHT to LEFT side
 *   * Section 4 (4th Section): Scales down with subtle lower opacity at center accent
 * - Zero twisted tube 3D mesh, zero canvas overhead, zero layout thrashing
 * - Respects prefers-reduced-motion
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PersistentCharacter = () => {
  const containerRef = useRef(null);
  const characterRef = useRef(null);

  useEffect(() => {
    const characterEl = characterRef.current;
    if (!characterEl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Initial position: Section 1 Center
    gsap.set(characterEl, {
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      opacity: 1,
      transformOrigin: '50% 50%',
    });

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero ➔ Section 2: Center ➔ Right
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#section-2',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
        xPercent: isMobile ? 0 : 28,
        yPercent: isMobile ? -14 : 0,
        scale: isMobile ? 0.75 : 0.95,
        opacity: isMobile ? 0.45 : 1,
        ease: 'power1.inOut',
      });

      // 2. Section 2 ➔ Section 3: Right ➔ Left
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#section-3',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
        xPercent: isMobile ? 0 : -30,
        yPercent: isMobile ? -22 : 0,
        scale: isMobile ? 0.6 : 0.9,
        opacity: isMobile ? 0.35 : 0.95,
        ease: 'power1.inOut',
      });

      // 3. Section 3 ➔ Section 4: Left ➔ Center Accent (scales down, lower opacity)
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#section-4',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
          invalidateOnRefresh: true,
        },
        xPercent: 0,
        yPercent: 20,
        scale: 0.65,
        opacity: 0.22,
        ease: 'power1.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Choreographed Character Node */}
      <div
        ref={characterRef}
        className="relative w-[280px] h-[390px] sm:w-[350px] sm:h-[480px] md:w-[410px] md:h-[560px] flex items-center justify-center will-change-transform select-none"
      >
        {/* Clean Character Silhouette & Frame */}
        <div className="relative w-full h-full rounded-[40px] sm:rounded-[48px] bg-gradient-to-b from-[#FBF8F3] via-[#F4EFE6] to-[#ECE5D8] border border-[#E4DDD0] shadow-xl shadow-black/4 p-6 sm:p-8 flex flex-col items-center justify-between overflow-hidden">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/60 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#7D9A78]/15 blur-2xl pointer-events-none" />

          {/* Top subtle brand badge */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-widest text-[#8A8780] uppercase z-10">
            <span>AFRUZ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7D9A78]" />
          </div>

          {/* Stylized Minimal Character Artwork */}
          <div className="relative w-40 h-52 sm:w-48 sm:h-64 flex items-center justify-center my-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#FAF7F2] to-[#EAE4D7] opacity-80" />

            <svg
              viewBox="0 0 200 280"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="100" cy="265" rx="55" ry="10" fill="rgba(31,31,29,0.08)" />
              <path
                d="M100 45 C122 45 135 60 135 85 C135 110 120 125 100 125 C80 125 65 110 65 85 C65 60 78 45 100 45 Z"
                fill="#1F1F1D"
              />
              <path
                d="M50 240 C50 160 72 140 100 140 C128 140 150 160 150 240 Z"
                fill="#1F1F1D"
              />
              <path
                d="M62 240 C62 175 80 155 100 155 C120 155 138 175 138 240 Z"
                fill="#FAF7F2"
              />
              <path
                d="M95 155 C85 190 75 220 85 240"
                stroke="#7D9A78"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M108 165 C118 195 125 215 115 240"
                stroke="#8FA88B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bottom metadata strip */}
          <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-wider text-[#8A8780] border-t border-[#E7E3DA]/80 pt-3 z-10">
            <span>PORTFOLIO SUBJECT</span>
            <span className="text-[#1F1F1D] font-semibold">2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersistentCharacter;
