/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Section 04 — WORK
 * Faithfully matches 05-work.png & 16-project-preview.png:
 * - Kicker WORK + huge WORK headline
 * - Large project visual preview container
 * - Metadata strip: Project title —, Status Currently Building, Year —, Technology —, View case study
 * - Pagination: ← 01 →
 * - Case Study modal trigger
 * - Viewport reveal animation and compact spacing
 */

import React, { useState } from 'react';
import { WORK_DATA, ProjectData } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';
import { CaseStudyModal } from './CaseStudyModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export const WorkSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, isRevealed } = useReveal<HTMLElement>(0.12);

  const currentProject: ProjectData = WORK_DATA[currentIndex] || WORK_DATA[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : WORK_DATA.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < WORK_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="work"
      ref={ref}
      className={`relative min-h-[78vh] flex flex-col justify-center py-12 sm:py-16 px-5 sm:px-10 lg:px-16 max-w-7xl mx-auto overflow-hidden reveal-init ${
        isRevealed ? 'reveal-visible' : ''
      }`}
      aria-label="Work"
    >
      <div className="w-full">
        <div className="mb-5 sm:mb-8">
          <span className="text-xs font-semibold tracking-widest text-[#7D9A78] uppercase block mb-1">
            WORK
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1F1F1D] tracking-tight leading-none select-none">
            WORK
          </h2>
        </div>

        <div className="rounded-2xl sm:rounded-3xl glass-panel-elevated overflow-hidden border border-[#E7E3DA] p-4 sm:p-7 shadow-xs">
          <div className="relative w-full h-[250px] sm:h-[320px] md:h-[370px] rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#F7F4ED] to-[#F1EDE4] border border-[#E7E3DA]/80 overflow-hidden flex items-center justify-center">
            <div className="w-full h-full max-w-xl flex items-center justify-center">
              <SignatureSculpture size="hero" interactive={true} />
            </div>

            <div className="absolute top-3.5 left-4 text-[10px] font-mono tracking-widest text-[#8A8780] uppercase">
              PROJECT PREVIEW
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 border-t border-[#E7E3DA]/80 flex flex-wrap items-center justify-between gap-y-3 gap-x-6 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2">
              <div>
                <span className="text-[#8A8780] mr-1.5">Project title</span>
                <span className="font-medium text-[#1F1F1D]">{currentProject.title}</span>
              </div>

              <div>
                <span className="text-[#8A8780] mr-1.5">Status</span>
                <span className="font-medium text-[#1F1F1D] inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#F43F5E] animate-pulse" />
                  {currentProject.status}
                </span>
              </div>

              <div>
                <span className="text-[#8A8780] mr-1.5">Year</span>
                <span className="font-medium text-[#1F1F1D]">{currentProject.year}</span>
              </div>

              <div>
                <span className="text-[#8A8780] mr-1.5">Technology</span>
                <span className="font-medium text-[#1F1F1D]">{currentProject.technology}</span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-1 text-[#7D9A78] hover:text-[#5E7B5A] font-medium tracking-wide transition-colors focus:outline-none focus-visible:underline cursor-pointer"
              data-cursor="link"
            >
              <span>View case study</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3.5 mt-5 sm:mt-7 select-none">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-black/5 active:scale-90 text-[#8A8780] hover:text-[#1F1F1D] transition-all focus:outline-none cursor-pointer"
            aria-label="Previous Project"
            data-cursor="link"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs sm:text-sm tracking-wider font-medium text-[#1F1F1D]">
            0{currentIndex + 1}
          </span>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-black/5 active:scale-90 text-[#8A8780] hover:text-[#1F1F1D] transition-all focus:outline-none cursor-pointer"
            aria-label="Next Project"
            data-cursor="link"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CaseStudyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={currentProject}
      />
    </section>
  );
};
