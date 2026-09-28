/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ProjectShowcase Component (.jsx)
 * - Exactly 3 project showcase cards
 * - Desktop: Side-by-side horizontal row (grid-cols-3)
 * - Mobile (<768px): Stacks cleanly vertically (grid-cols-1) without horizontal clipping
 * - Luxury leaf-green palette: bg-white/[0.04] border-white/10 backdrop-blur-md, emerald (#34d399) accents
 */

import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';

export const ProjectShowcase = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 select-none">
      {PROJECTS_DATA.map((project) => (
        <div
          key={project.id}
          className="project-card group relative flex flex-col justify-between p-5 md:p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-[#34d399]/40 hover:-translate-y-1 transition-all duration-300 min-h-[260px] md:min-h-[290px] shadow-lg shadow-black/20"
          data-cursor="view"
        >
          {/* Top Row: Index number & category badge */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-mono text-xs font-bold text-[#34d399]">
              {project.number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8fa291] bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">
              {project.category}
            </span>
          </div>

          {/* Body: Title & Description */}
          <div className="my-3.5">
            <h3 className="font-display font-bold text-lg md:text-xl text-[#f9f6ee] tracking-tight group-hover:text-[#34d399] transition-colors mb-2">
              {project.title}
            </h3>
            <p className="text-xs md:text-sm text-[#8fa291] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Bottom: Tags & Demo Link */}
          <div className="pt-3.5 border-t border-white/10 space-y-3">
            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#8fa291]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link Slots */}
            <div className="flex items-center justify-between pt-0.5">
              <a
                href={project.demoUrl}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#34d399] hover:text-[#6ee7b7] transition-colors"
                data-cursor="link"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/afruz"
                target="_blank"
                rel="noreferrer noopener"
                className="p-1.5 rounded-full text-[#8fa291] hover:text-[#f9f6ee] hover:bg-white/10 transition-colors"
                title="Source Code"
                data-cursor="link"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectShowcase;
