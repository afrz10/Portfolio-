/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ — Master Portfolio Architecture (.jsx)
 * Luxury Leaf-Green Inversion & Cinematic Scroll Pacing:
 * - Palette: Deep organic leaf-green (#19241d), creamy ivory (#f9f6ee), muted sage (#8fa291), emerald neon (#34d399)
 * - Cinematic Pacing: Expanded scroll tracks (130vh–140vh) with weighted GSAP momentum (scrub: 1.5)
 * - Disciplined Typography: Section headings text-2xl md:text-4xl, body text-[#8fa291]
 * - Kinetic Animations: Viewport staggered fade-ups (y: 35 -> 0, power3.out)
 * - Magnetic 'Back to Top' floating pill at bottom-right
 * - Persistent Character Stage & subtle centered watermark AFRUZ
 */

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail } from 'lucide-react';

import { RoleTicker } from './components/RoleTicker';
import { PersistentStage } from './components/PersistentStage';
import { ProjectShowcase } from './components/ProjectShowcase';
import { BackToTop } from './components/BackToTop';
import { ScrollProgressThread } from './components/GreenThread';
import { CustomCursor } from './components/CustomCursor';
import { BRAND_DATA, PHILOSOPHY_DATA } from './data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll with weighted physical momentum
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    // 2. Direct Lenis + GSAP Ticker synchronization
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 3. Viewport Staggered Entrances (Kinetic Living Feel)
    const ctx = gsap.context(() => {
      const sections = ['#hero', '#philosophy', '#projects', '#contact'];

      sections.forEach((secId) => {
        const sectionEl = document.querySelector(secId);
        if (!sectionEl) return;

        const animateItems = sectionEl.querySelectorAll('.kinetic-reveal');
        if (animateItems.length > 0) {
          gsap.fromTo(
            animateItems,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: sectionEl,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    });

    ScrollTrigger.refresh();

    // 4. Cleanup
    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen bg-[#19241d] text-[#f9f6ee] selection:bg-[#34d399]/30 selection:text-[#f9f6ee]">
      {/* Scroll Progress Thread: emerald neon indicator */}
      <ScrollProgressThread />

      {/* Desktop Interaction Cursor */}
      <CustomCursor />

      {/* Magnetic 'Back to Top' Floating Pill */}
      <BackToTop lenisRef={lenisRef} />

      {/* TOP NAVIGATION (Persistent across all sections) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-16 py-6 md:py-8 pointer-events-none w-full">
        {/* Top Left: Vertical rolling ticker (DEVELOPER ➔ EDITOR ➔ STUDENT ➔ AFRUZ [10s hold]) */}
        <div className="pointer-events-auto">
          <RoleTicker />
        </div>

        {/* Top Right: Clean link to INSTAGRAM only */}
        <div className="pointer-events-auto">
          <a
            href={BRAND_DATA.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-1.5 font-mono text-xs md:text-sm font-bold tracking-widest text-[#f9f6ee] hover:text-[#34d399] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] rounded px-2.5 py-1 bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            data-cursor="link"
          >
            <span>INSTAGRAM</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#34d399] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* PERSISTENT STAGE (Fixed Character Cutout & Restrained Watermark) */}
      <PersistentStage />

      {/* MAIN STORYTELLING TRACKS (Cinematic Pacing) */}
      <main className="relative z-10 w-full overflow-x-hidden">
        {/* ============================================================ */}
        {/* SECTION 1: HERO (min-h-[110vh]) */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[110vh] md:min-h-[120vh] flex flex-col justify-between px-6 md:px-16 py-8 md:py-12 overflow-hidden select-none"
          aria-label="Hero"
        >
          {/* Top spacer for navigation clearance */}
          <div className="w-full h-16 md:h-20" />

          {/* BOTTOM HERO ROW */}
          <div className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-12 pb-8">
            {/* Bottom Left: Name title AFRUZ with clean subtext/bio lines */}
            <div className="space-y-1.5 max-w-xl kinetic-reveal">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#f9f6ee] tracking-tight leading-none">
                {BRAND_DATA.name}
              </h1>
              <p className="text-sm md:text-base font-semibold text-[#f9f6ee]/90 tracking-tight">
                {BRAND_DATA.identity}
              </p>
              <p className="text-xs md:text-sm text-[#8fa291] max-w-prose leading-relaxed">
                {BRAND_DATA.statement}
              </p>
            </div>

            {/* Bottom Right: Brief detail text block */}
            <div className="max-w-xs md:max-w-sm text-left sm:text-right space-y-2.5 kinetic-reveal">
              <p className="text-xs md:text-sm text-[#8fa291] leading-relaxed">
                {BRAND_DATA.details}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#34d399]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]" />
                </span>
                <span>Currently Building</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section divider connector */}
        <div className="w-full flex items-center justify-center my-2" aria-hidden="true">
          <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#34d399]/20 to-transparent" />
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: PHILOSOPHY / ABOUT (min-h-[135vh] Paced Scroll) */}
        {/* Character glides smoothly to the RIGHT with slight tilt */}
        {/* ============================================================ */}
        <section
          id="philosophy"
          className="relative w-full min-h-[135vh] md:min-h-[140vh] flex flex-col justify-center px-6 md:px-16 py-16 md:py-24"
          aria-label="Philosophy / About"
        >
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-5 md:space-y-6 z-20 my-auto">
            <div className="kinetic-reveal">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#34d399] uppercase block mb-1">
                02 / Mindset
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-4xl text-[#f9f6ee] tracking-tight leading-none select-none">
                PHILOSOPHY
              </h2>
            </div>

            <div className="space-y-3.5 max-w-md">
              {PHILOSOPHY_DATA.map((item) => (
                <div
                  key={item.title}
                  className="kinetic-reveal p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md transition-all hover:bg-white/[0.07] hover:border-[#34d399]/30 shadow-md shadow-black/20"
                >
                  <h3 className="font-display font-bold text-base md:text-lg text-[#f9f6ee] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#8fa291] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section divider connector */}
        <div className="w-full flex items-center justify-center my-2" aria-hidden="true">
          <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#34d399]/20 to-transparent" />
        </div>

        {/* ============================================================ */}
        {/* SECTION 3: PROJECTS (min-h-[135vh] Paced Scroll) */}
        {/* Character glides from RIGHT across to LEFT with inverted tilt */}
        {/* ============================================================ */}
        <section
          id="projects"
          className="relative w-full min-h-[135vh] md:min-h-[145vh] flex flex-col justify-center px-6 md:px-16 py-16 md:py-24"
          aria-label="Projects"
        >
          {/* Right Layout: 3 cards horizontal on desktop, vertical stack on mobile */}
          <div className="w-full lg:w-3/5 lg:ml-auto flex flex-col justify-center z-20 my-auto">
            <div className="mb-6 kinetic-reveal">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#34d399] uppercase block mb-1">
                03 / Works
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-4xl text-[#f9f6ee] tracking-tight leading-none select-none">
                PROJECTS
              </h2>
            </div>

            <div className="kinetic-reveal">
              <ProjectShowcase />
            </div>
          </div>
        </section>

        {/* Section divider connector */}
        <div className="w-full flex items-center justify-center my-2" aria-hidden="true">
          <div className="w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#34d399]/20 to-transparent" />
        </div>

        {/* ============================================================ */}
        {/* SECTION 4: CONTACT (min-h-[110vh]) */}
        {/* Character recedes gracefully to center accent */}
        {/* ============================================================ */}
        <section
          id="contact"
          className="relative w-full min-h-[110vh] md:min-h-[120vh] flex flex-col justify-between items-center text-center px-6 md:px-16 py-12 md:py-16 z-20"
          aria-label="Contact"
        >
          <div className="w-full h-8" />

          <div className="space-y-6 md:space-y-7 max-w-xl my-auto">
            <div className="kinetic-reveal">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#34d399] uppercase block mb-2">
                04 / Direct Line
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#f9f6ee] tracking-tight leading-none select-none">
                CONTACT
              </h2>
            </div>

            {/* Centered Email Link */}
            <div className="pt-1 kinetic-reveal">
              <a
                href={`mailto:${BRAND_DATA.email}`}
                className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-[#f9f6ee] hover:text-[#34d399] transition-colors cursor-pointer break-all"
                data-cursor="link"
              >
                {BRAND_DATA.email}
              </a>
            </div>

            <p className="text-xs md:text-sm text-[#8fa291] leading-relaxed max-w-md mx-auto kinetic-reveal">
              Open for development, editing, and collaborative web projects. Reach out via email or direct channels.
            </p>

            {/* Direct Channel Slots */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 kinetic-reveal">
              <a
                href={BRAND_DATA.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-magnetic px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.1] hover:border-[#34d399]/40 text-xs font-mono font-semibold text-[#f9f6ee] hover:text-[#34d399] transition-all flex items-center gap-1.5 shadow-md shadow-black/20"
                data-cursor="link"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#34d399]" />
              </a>

              <a
                href={BRAND_DATA.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-magnetic px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.1] hover:border-[#34d399]/40 text-xs font-mono font-semibold text-[#f9f6ee] hover:text-[#34d399] transition-all flex items-center gap-1.5 shadow-md shadow-black/20"
                data-cursor="link"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#34d399]" />
              </a>

              <a
                href={`mailto:${BRAND_DATA.email}`}
                className="btn-magnetic px-6 py-2.5 rounded-full bg-[#34d399] text-[#19241d] hover:bg-[#6ee7b7] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-[#34d399]/20 cursor-pointer"
                data-cursor="link"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          <footer className="w-full text-center text-xs text-[#8fa291] pt-6 select-none">
            <span>© {new Date().getFullYear()} AFRUZ. Developer · Student · Editor.</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
