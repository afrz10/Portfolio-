/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ — Master Website
 * Built strictly according to the 20 approved uploaded reference images:
 * - 01 HERO (02-hero-section.png)
 * - 02 ABOUT (03-about.png)
 * - 03 WHAT I DO (04-what-i-do.png)
 * - 04 WORK (05-work.png & 16-project-preview.png)
 * - 05 JOURNEY (06-journey.png)
 * - 06 PLAYGROUND (07-playground.png)
 * - 07 NOW (09-now.png)
 * - 08 COLLABORATION (08-collaboration.png)
 * - 09 CONTACT (10-contact.png)
 * 
 * Dominant warm creamy background, charcoal typography, sage green accents.
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressThread, ThreadDivider } from './components/GreenThread';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WhatIDoSection } from './components/WhatIDoSection';
import { WorkSection } from './components/WorkSection';
import { JourneySection } from './components/JourneySection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { NowSection } from './components/NowSection';
import { CollaborationSection } from './components/CollaborationSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'what-i-do',
      'work',
      'journey',
      'playground',
      'now',
      'collaboration',
      'contact',
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportMid = scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (viewportMid >= top) {
            if (id === 'what-i-do' || id === 'about') {
              setActiveSection('about');
            } else if (id === 'work' || id === 'journey' || id === 'playground' || id === 'now') {
              setActiveSection('work');
            } else if (id === 'collaboration' || id === 'contact') {
              setActiveSection('contact');
            } else {
              setActiveSection('hero');
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1F1F1D] selection:bg-[#7D9A78]/25 selection:text-[#1F1F1D] overflow-x-hidden">
      {/* 1. AFRUZ Green Thread: Fixed Viewport Top Scroll Progress */}
      <ScrollProgressThread />

      {/* 2. Custom Interaction Cursor (Desktop only, 4 states) */}
      <CustomCursor />

      {/* 3. Floating Capsule Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 4. Subtle Green Sweep Ambient Ribbon Background (matching 15-green-sweep.png) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-45 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 800 C400 650 600 200 1540 100"
            stroke="#7D9A78"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            opacity="0.3"
          />
          <path
            d="M-50 850 C380 700 650 250 1500 150"
            stroke="#8FA88B"
            strokeWidth="1.2"
            opacity="0.22"
          />
          <path
            d="M100 -50 C300 350 700 600 1500 850"
            stroke="#7D9A78"
            strokeWidth="0.6"
            strokeDasharray="6 8"
            opacity="0.18"
          />
        </svg>
      </div>

      {/* 5. Main Single-Page Sequential Journey matching 20 uploaded images */}
      <main className="relative z-10 w-full">
        {/* 01 — HERO */}
        <HeroSection onExploreWork={() => handleNavigate('work')} />

        <ThreadDivider />

        {/* 02 — ABOUT */}
        <AboutSection />

        <ThreadDivider />

        {/* 03 — WHAT I DO */}
        <WhatIDoSection />

        <ThreadDivider />

        {/* 04 — WORK */}
        <WorkSection />

        <ThreadDivider />

        {/* 05 — JOURNEY */}
        <JourneySection />

        <ThreadDivider />

        {/* 06 — PLAYGROUND */}
        <PlaygroundSection />

        <ThreadDivider />

        {/* 07 — NOW */}
        <NowSection />

        <ThreadDivider />

        {/* 08 — COLLABORATION */}
        <CollaborationSection onCollaborateClick={() => handleNavigate('contact')} />

        <ThreadDivider />

        {/* 09 — CONTACT */}
        <ContactSection />
      </main>
    </div>
  );
}
