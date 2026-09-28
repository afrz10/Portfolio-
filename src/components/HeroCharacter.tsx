/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HeroCharacter Component (.tsx)
 * - Fixed persistent stage layer: fixed inset-0 z-20 pointer-events-none flex items-center justify-center
 * - Transparent cutout character image with drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]
 * - Luxury product-glide animation across sections:
 *   * Section 1 (Hero): Center (xPercent: 0, yPercent: 0, scale: 1) + subtle yoyo bobbing
 *   * Section 2 (Philosophy): Glides to RIGHT (xPercent: 45, rotation: 2; mobile: yPercent: -15, scale: 0.85)
 *   * Section 3 (Projects): Glides to LEFT (xPercent: -45, rotation: -2; mobile: yPercent: -25, scale: 0.75)
 *   * Section 4 (Contact): Recedes to center (scale: 0.6, opacity: 0.35)
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroCharacter: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const bobbingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const characterEl = characterRef.current;
    const bobbingEl = bobbingRef.current;
    if (!characterEl || !bobbingEl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Initial center position
    gsap.set(characterEl, {
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      transformOrigin: '50% 50%',
    });

    if (reducedMotion) {
      return;
    }

    // Section 1 Idle Floating Motion
    const bobTween = gsap.to(bobbingEl, {
      y: '+=12px',
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const ctx = gsap.context(() => {
      // Section 1 ➔ Section 2 (Philosophy / About): Glide to RIGHT with slight tilt
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#philosophy',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
        xPercent: isMobile ? 0 : 45,
        yPercent: isMobile ? -15 : 0,
        scale: isMobile ? 0.85 : 0.98,
        rotation: isMobile ? 0 : 2,
        ease: 'power2.inOut',
      });

      // Section 2 ➔ Section 3 (Projects): Glide from right across to LEFT with inverted tilt
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
        xPercent: isMobile ? 0 : -45,
        yPercent: isMobile ? -25 : 0,
        scale: isMobile ? 0.75 : 0.92,
        rotation: isMobile ? 0 : -2,
        ease: 'power2.inOut',
      });

      // Section 3 ➔ Section 4 (Contact): Return to center and recede gracefully
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
        xPercent: 0,
        yPercent: isMobile ? 18 : 22,
        scale: 0.6,
        rotation: 0,
        opacity: 0.35,
        ease: 'power2.inOut',
      });
    });

    return () => {
      bobTween.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* GSAP Scroll Choreography Transform Container */}
      <div
        ref={characterRef}
        className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[4/5] will-change-transform flex items-center justify-center select-none"
      >
        {/* Inner Bobbing Container */}
        <div ref={bobbingRef} className="w-full h-full flex items-center justify-center">
          <img
            src="/character.svg"
            alt="AFRUZ Character Cutout"
            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCharacter;
