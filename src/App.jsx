/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ — Master Portfolio Architecture (.jsx)
 * Section-Anchored Images with Apple iOS Fluid Spring Physics:
 * - Purged global fixed overlay; each section owns its natural document-anchored image.
 * - Section 1 (Hero): Center-anchored /images/first.webp in front of AFRUZ watermark.
 * - Section 2 (Philosophy): 2-column grid; right-anchored /images/second.webp.
 * - Section 3 (Projects): 2-column grid; left-anchored /images/third.webp + 3 project cards right.
 * - Section 4 (Contact): Center/base-anchored /images/fourth.webp with muted opacity.
 * - Apple iOS Spring Curve: cubic-bezier(0.16, 1, 0.3, 1) via IntersectionObserver.
 * - Tight padding & compact min-h-[100dvh] viewports without dead gaps.
 */

import React, { useEffect } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

import { RoleTicker } from './components/RoleTicker';
import { IOSRevealImage } from './components/IOSRevealImage';
import { ProjectShowcase } from './components/ProjectShowcase';
import { BackToTop } from './components/BackToTop';
import { ScrollProgressThread } from './components/GreenThread';
import { CustomCursor } from './components/CustomCursor';
import { BRAND_DATA, PHILOSOPHY_DATA } from './data/portfolioData';

export default function App() {
  useEffect(() => {
    // Native IntersectionObserver for kinetic reveals on text elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.kinetic-reveal');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#19241d] text-[#f9f6ee] selection:bg-[#34d399]/30 selection:text-[#f9f6ee]">
      {/* Scroll Progress Thread: emerald neon indicator */}
      <ScrollProgressThread />

      {/* Desktop Interaction Cursor */}
      <CustomCursor />

      {/* Magnetic 'Back to Top' Floating Pill */}
      <BackToTop />

      {/* TOP NAVIGATION (Persistent across all sections) */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-14 py-5 md:py-6 pointer-events-none w-full">
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
            className="group inline-flex items-center gap-1.5 font-mono text-xs md:text-sm font-bold tracking-widest text-[#f9f6ee] hover:text-[#34d399] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] rounded px-3 py-1.5 bg-white/[0.04] border border-white/10 backdrop-blur-md"
            data-cursor="link"
          >
            <span>INSTAGRAM</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#34d399] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </header>

      {/* MAIN STORYTELLING SECTIONS (Natural Document Flow, Zero Sticky Overlay) */}
      <main className="relative z-10 w-full">
        {/* ============================================================ */}
        {/* SECTION 1: HERO (Center Anchored Image) */}
        {/* ============================================================ */}
        <section
          id="hero"
          className="relative w-full min-h-[100dvh] pt-24 pb-12 md:py-16 px-6 md:px-14 flex flex-col justify-between border-b border-white/[0.06] overflow-hidden select-none"
          aria-label="Hero"
        >
          {/* Background Watermark: Centered fluid typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
            <span className="text-[clamp(3.5rem,11vw,9rem)] font-black text-white/[0.07] uppercase select-none pointer-events-none whitespace-nowrap font-display">
              AFRUZ
            </span>
          </div>

          {/* Center Stage: Anchored Hero Image in front of watermark */}
          <div className="relative z-10 w-full flex-1 flex items-center justify-center py-4 my-auto">
            <IOSRevealImage
              src="/images/first.webp"
              alt="AFRUZ Character Hero"
              variant="pop"
              delayMs={100}
              containerClassName="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] aspect-[4/5]"
            />
          </div>

          {/* Bottom Hero Row */}
          <div className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4">
            {/* Bottom Left: Name title AFRUZ with subtext lines */}
            <div className="space-y-1 max-w-xl kinetic-reveal">
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
            <div className="max-w-xs md:max-w-sm text-left sm:text-right space-y-2 kinetic-reveal">
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

        {/* ============================================================ */}
        {/* SECTION 2: PHILOSOPHY (Right Anchored Image) */}
        {/* ============================================================ */}
        <section
          id="philosophy"
          className="relative w-full min-h-[100dvh] py-14 md:py-20 px-6 md:px-14 flex flex-col justify-center border-b border-white/[0.06] overflow-hidden"
          aria-label="Philosophy / About"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center my-auto">
            {/* Left Column: Philosophy Editorial Copy */}
            <div className="space-y-6">
              <div className="kinetic-reveal">
                <span className="text-xs font-mono font-semibold tracking-widest text-[#34d399] uppercase block mb-1">
                  02 / Mindset
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-4xl text-[#f9f6ee] tracking-tight leading-none select-none">
                  PHILOSOPHY
                </h2>
              </div>

              <div className="space-y-4">
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

            {/* Right Column: Anchored Image (second.webp) with Apple iOS Spring */}
            <div className="w-full flex items-center justify-center">
              <IOSRevealImage
                src="/images/second.webp"
                alt="AFRUZ Philosophy Cutout"
                variant="slide-right"
                containerClassName="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] aspect-[4/5]"
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: PROJECTS (Left Anchored Image + 3 Cards Right) */}
        {/* ============================================================ */}
        <section
          id="projects"
          className="relative w-full min-h-[100dvh] py-14 md:py-20 px-6 md:px-14 flex flex-col justify-center border-b border-white/[0.06] overflow-hidden"
          aria-label="Projects"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto my-auto space-y-6">
            <div className="kinetic-reveal">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#34d399] uppercase block mb-1">
                03 / Works
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-4xl text-[#f9f6ee] tracking-tight leading-none select-none">
                PROJECTS
              </h2>
            </div>

            {/* 2-Column Responsive Layout: Left Character / Right 3 Showcase Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Column (4 Cols): Anchored Image (third.webp) with iOS Slide-Left Spring */}
              <div className="w-full lg:col-span-4 xl:col-span-4 flex items-center justify-center">
                <IOSRevealImage
                  src="/images/third.webp"
                  alt="AFRUZ Projects Cutout"
                  variant="slide-left"
                  containerClassName="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] aspect-[4/5]"
                />
              </div>

              {/* Right Column (8 Cols): 3 Project Showcase Cards */}
              <div className="w-full lg:col-span-8 xl:col-span-8 kinetic-reveal">
                <ProjectShowcase />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: CONTACT (Center / Base Anchored Image) */}
        {/* ============================================================ */}
        <section
          id="contact"
          className="relative w-full min-h-[100dvh] py-14 md:py-20 px-6 md:px-14 flex flex-col justify-between items-center text-center overflow-hidden"
          aria-label="Contact"
        >
          <div className="w-full h-4" />

          {/* Center Contact Content */}
          <div className="relative z-10 space-y-6 max-w-xl my-auto">
            <div className="kinetic-reveal">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#34d399] uppercase block mb-1.5">
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

            {/* Direct Channel Action Buttons */}
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

            {/* Anchored Base Character: fourth.webp with muted opacity */}
            <div className="pt-4 flex items-center justify-center select-none">
              <IOSRevealImage
                src="/images/fourth.webp"
                alt="AFRUZ Contact Cutout"
                variant="fade-up"
                opacityWhenVisible={0.4}
                containerClassName="w-full max-w-[180px] sm:max-w-[220px] aspect-[4/5] mx-auto"
              />
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
