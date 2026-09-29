/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * IOSRevealImage Component (.jsx)
 * Apple iOS Fluid Spring Physical Transition:
 * - Native IntersectionObserver with threshold: 0.2
 * - Initial State: opacity-0 scale-95 translate-y-6 blur-sm
 * - Visible State: opacity-100 scale-100 translate-y-0 blur-0
 * - Dual-tone soft drop shadow: rgba(0,0,0,0.55) & emerald tint rgba(52,211,153,0.18)
 * - Spring curve: cubic-bezier(0.16, 1, 0.3, 1)
 */

import React, { useEffect, useRef, useState } from 'react';

export function IOSRevealImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  variant = 'fade-up',
  delayMs = 0,
  opacityWhenVisible = 1,
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setIsVisible(true), delayMs);
          } else {
            setIsVisible(true);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [delayMs]);

  // Variant-based initial transform
  let initialTransform = 'translate3d(0, 24px, 0) scale(0.95)';
  let visibleTransform = 'translate3d(0, 0, 0) scale(1)';

  if (variant === 'pop') {
    initialTransform = 'scale(0.92) translate3d(0, 10px, 0)';
    visibleTransform = 'scale(1) translate3d(0, 0, 0)';
  } else if (variant === 'slide-left') {
    initialTransform = 'translate3d(-32px, 0, 0) scale(0.96)';
    visibleTransform = 'translate3d(0, 0, 0) scale(1)';
  } else if (variant === 'slide-right') {
    initialTransform = 'translate3d(32px, 0, 0) scale(0.96)';
    visibleTransform = 'translate3d(0, 0, 0) scale(1)';
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${containerClassName}`}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain pointer-events-none select-none ${className}`}
        draggable={false}
        style={{
          transform: isVisible ? visibleTransform : initialTransform,
          opacity: isVisible ? opacityWhenVisible : 0,
          filter: isVisible
            ? 'blur(0px) drop-shadow(0 25px 35px rgba(0,0,0,0.55)) drop-shadow(0 0 22px rgba(52,211,153,0.18))'
            : 'blur(6px) drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
          transition:
            'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, filter 0.65s ease',
          willChange: 'transform, opacity, filter',
        }}
      />
    </div>
  );
}

export default IOSRevealImage;
