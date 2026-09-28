/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PersistentStage Component (.tsx)
 * - Fixed Stage Layer: fixed inset-0 z-20 pointer-events-none flex items-center justify-center
 * - Ultra-subtle background watermark: text-[clamp(3rem,9vw,8rem)] font-black tracking-tight opacity-[0.07]
 * - Persistent Character Cutout with subtle ambient drop-shadow
 * - Continuous subtle breathing idle motion (y: "+=8px" yoyo)
 * - Spatial luxury product-glide choreography across sections with weighted scrub: 1.5:
 *   * Section 1 (Hero): Center (xPercent: 0, yPercent: 0, scale: 1)
 *   * Section 2 (Philosophy): Glide to RIGHT (xPercent: 44, rotation: 2; mobile: yPercent: -15, scale: 0.85)
 *   * Section 3 (Projects): Glide to LEFT (xPercent: -44, rotation: -2; mobile: yPercent: -25, scale: 0.75)
 *   * Section 4 (Contact): Recedes to center (scale: 0.58, opacity: 0.28)
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PersistentStage: React.FC = () => {
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

    // Continuous subtle breathing / hover idle motion
    const bobTween = gsap.to(bobbingEl, {
      y: '+=8px',
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const ctx = gsap.context(() => {
      // 1. Hero ➔ Philosophy: Glide to RIGHT with slight tilt
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#philosophy',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
        xPercent: isMobile ? 0 : 44,
        yPercent: isMobile ? -14 : 0,
        scale: isMobile ? 0.85 : 0.98,
        rotation: isMobile ? 0 : 2,
        ease: 'power2.inOut',
      });

      // 2. Philosophy ➔ Projects: Glide across to LEFT with inverted tilt
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
        xPercent: isMobile ? 0 : -44,
        yPercent: isMobile ? -24 : 0,
        scale: isMobile ? 0.75 : 0.92,
        rotation: isMobile ? 0 : -2,
        ease: 'power2.inOut',
      });

      // 3. Projects ➔ Contact: Soft recede to center accent
      gsap.to(characterEl, {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
        xPercent: 0,
        yPercent: isMobile ? 16 : 22,
        scale: 0.58,
        rotation: 0,
        opacity: 0.28,
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
      {/* Restrained Background Watermark: Perfectly centered behind character */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-display font-black tracking-tight text-[clamp(3rem,9vw,8rem)] leading-none text-[#f9f6ee] opacity-[0.07] uppercase whitespace-nowrap">
          AFRUZ
        </span>
      </div>

      {/* GSAP Scroll Choreography Transform Container */}
      <div
        ref={characterRef}
        className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[4/5] will-change-transform flex items-center justify-center select-none"
      >
        {/* Inner Bobbing Container */}
        <div ref={bobbingRef} className="w-full h-full flex items-center justify-center">
          <img
            src="/character.svg"
            alt="AFRUZ Cutout"
            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PersistentStage;
