/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * HeroCharacter Component (.jsx)
 * - Fixed persistent stage layer: fixed inset-0 z-20 pointer-events-none flex items-center justify-center
 * - Uses /images/first.webp with drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroCharacter = () => {
  const stageRef = useRef(null);
  const characterRef = useRef(null);
  const bobbingRef = useRef(null);

  useEffect(() => {
    const characterEl = characterRef.current;
    const bobbingEl = bobbingRef.current;
    if (!characterEl || !bobbingEl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

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

    const bobTween = gsap.to(bobbingEl, {
      y: '+=12px',
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    const ctx = gsap.context(() => {
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
      <div
        ref={characterRef}
        className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] aspect-[4/5] will-change-transform flex items-center justify-center select-none"
      >
        <div ref={bobbingRef} className="w-full h-full flex items-center justify-center">
          <img
            src="/images/first.webp"
            alt="AFRUZ Character Cutout"
            className="w-full h-full object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCharacter;
