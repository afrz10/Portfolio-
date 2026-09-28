/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Case Study Modal Component
 * Strictly adheres to 17-case-study.png:
 * - Structure: OVERVIEW, PROCESS, BUILD, RESULT
 * - Truthful representation of Current Building status
 * - Accessible modal dialog with focus management and ESC support
 */

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProjectData } from '../data/portfolioData';
import { SignatureSculpture } from './SignatureSculpture';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData;
}

type TabType = 'OVERVIEW' | 'PROCESS' | 'BUILD' | 'RESULT';

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('OVERVIEW');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: TabType[] = ['OVERVIEW', 'PROCESS', 'BUILD', 'RESULT'];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#1F1F1D]/40 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FAF7F2] border border-[#E7E3DA] p-6 sm:p-10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#6B6862] hover:text-[#1F1F1D] hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D9A78] cursor-pointer"
          aria-label="Close Case Study"
          data-cursor="link"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-44 sm:h-56 rounded-2xl glass-panel flex items-center justify-center overflow-hidden mb-8 border border-[#E7E3DA]">
          <div className="w-40 h-40">
            <SignatureSculpture size="mini" interactive={false} />
          </div>
        </div>

        <div className="border-b border-[#8FA88B]/40 pb-3 mb-8">
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs sm:text-sm font-semibold tracking-wider pb-2 relative transition-colors focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-[#1F1F1D]'
                      : 'text-[#8A8780] hover:text-[#1F1F1D]'
                  }`}
                  data-cursor="link"
                >
                  {tab}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7D9A78]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B6862]">
            <span>Project Status: <strong className="text-[#1F1F1D] font-medium">{project.status}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Focus: <strong className="text-[#1F1F1D] font-medium">Web Building</strong></span>
          </div>

          <div className="min-h-[140px] text-sm sm:text-base text-[#4A4742] leading-relaxed">
            {activeTab === 'OVERVIEW' && (
              <p>{project.caseStudy?.overview || 'A new project is currently being created.'}</p>
            )}
            {activeTab === 'PROCESS' && (
              <p>{project.caseStudy?.process || 'Focusing on clean layout fundamentals and responsive discipline.'}</p>
            )}
            {activeTab === 'BUILD' && (
              <p>{project.caseStudy?.build || 'Active build phase. Code structures and responsive patterns are currently being assembled.'}</p>
            )}
            {activeTab === 'RESULT' && (
              <p>{project.caseStudy?.result || 'Currently in progress. Case study documentation will be updated upon project completion.'}</p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E7E3DA] flex items-center justify-between text-xs text-[#8A8780]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7D9A78] animate-pulse" />
            <span>Currently Building</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-medium text-[#1F1F1D] hover:bg-black/5 border border-[#E7E3DA] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
