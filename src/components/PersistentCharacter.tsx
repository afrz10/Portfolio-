/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PersistentCharacter Component (.tsx)
 * Bulletproof Native Scroller for Iframe Preview:
 * - Zero external scroll library dependencies
 * - Pure window.addEventListener("scroll") native listener
 * - Mathematical spatial glide and opacity crossfades based on scrollProgress (0 to 1)
 */

import React, { useEffect, useState } from "react";

export const PersistentCharacter: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const totalHeight = docHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const progress = Math.min(Math.max(currentY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Spatial glide math based on scrollProgress (0 to 1)
  // Section 1 (0 to 0.25): Center (x = 0)
  // Section 2 (0.25 to 0.55): Glide to Right (x = 36vw on desktop, 0 on mobile)
  // Section 3 (0.55 to 0.85): Glide to Left (x = -36vw on desktop, 0 on mobile)
  // Section 4 (0.85 to 1.0): Center & Fade (opacity = 0.35)
  let xTranslate = 0;
  let activePose = 1;
  let opacity = 1;

  if (scrollProgress < 0.25) {
    xTranslate = 0;
    activePose = 1;
  } else if (scrollProgress < 0.55) {
    xTranslate = isMobile ? 0 : 36; // Right
    activePose = 2;
  } else if (scrollProgress < 0.85) {
    xTranslate = isMobile ? 0 : -36; // Left
    activePose = 3;
  } else {
    xTranslate = 0;
    activePose = 4;
    opacity = 0.35; // Muted in contact
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center overflow-hidden">
      {/* Background Watermark AFRUZ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-display font-black tracking-tight text-[clamp(3rem,9vw,8rem)] leading-none text-[#f9f6ee] opacity-[0.07] uppercase whitespace-nowrap">
          AFRUZ
        </span>
      </div>

      <div 
        style={{
          transform: `translate3d(${xTranslate}vw, 0, 0)`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          opacity: opacity
        }}
        className="relative w-64 md:w-80 aspect-[4/5] flex items-center justify-center select-none"
      >
        {/* Pose 1 */}
        <img 
          src="/images/first.webp" 
          alt="Pose 1" 
          className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-opacity duration-500 pointer-events-none ${activePose === 1 ? "opacity-100" : "opacity-0"}`} 
          draggable={false}
        />
        {/* Pose 2 */}
        <img 
          src="/images/second.webp" 
          alt="Pose 2" 
          className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-opacity duration-500 pointer-events-none ${activePose === 2 ? "opacity-100" : "opacity-0"}`} 
          draggable={false}
        />
        {/* Pose 3 */}
        <img 
          src="/images/third.webp" 
          alt="Pose 3" 
          className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-opacity duration-500 pointer-events-none ${activePose === 3 ? "opacity-100" : "opacity-0"}`} 
          draggable={false}
        />
        {/* Pose 4 */}
        <img 
          src="/images/fourth.webp" 
          alt="Pose 4" 
          className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-opacity duration-500 pointer-events-none ${activePose === 4 ? "opacity-100" : "opacity-0"}`} 
          draggable={false}
        />
      </div>
    </div>
  );
};

export default PersistentCharacter;
