/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ProjectCards Component (.jsx)
 * Strictly complies with Wireframe & Zero-Hallucination Policy:
 * - Exactly 3 project showcase cards
 * - Desktop: Side-by-side horizontally (grid-cols-3)
 * - Mobile (<768px): Stacks vertically (grid-cols-1)
 * - Each card contains: Title, category, brief description, tech tags, link slots
 */

import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

const PROJECTS = [
  {
    id: 'project-1',
    number: '01',
    title: 'Web Application',
    category: 'Development',
    description: 'Responsive, accessible web application crafted with modular components, semantic structure, and clean interaction flow.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    liveUrl: '#',
    githubUrl: 'https://github.com/afruz',
  },
  {
    id: 'project-2',
    number: '02',
    title: 'Interactive 3D Experience',
    category: 'Creative Engineering',
    description: 'Procedural 3D organic ribbon sculpture with real-time lighting, physical materials, and scroll-synchronized choreography.',
    tags: ['Three.js', 'WebGL', 'GSAP'],
    liveUrl: '#',
    githubUrl: 'https://github.com/afruz',
  },
  {
    id: 'project-3',
    number: '03',
    title: 'Digital Media & Editorial',
    category: 'Editing / Visual',
    description: 'Visual rhythm, editorial pacing, and content composition bridging design-first principles with modern software.',
    tags: ['Layout', 'Design Tokens', 'Video'],
    liveUrl: '#',
    githubUrl: 'https://github.com/afruz',
  },
];

export const ProjectCards = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 select-none">
      {PROJECTS.map((project) => (
        <div
          key={project.id}
          className="group relative flex flex-col justify-between p-4.5 sm:p-5 rounded-2xl glass-panel hover:glass-panel-elevated hover:-translate-y-1 transition-all duration-300 border border-[#E7E3DA] min-h-[260px] sm:min-h-[290px]"
          data-cursor="view"
        >
          {/* Top Row: Index number & category */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DA]/80">
            <span className="font-mono text-xs font-bold text-[#7D9A78]">
              {project.number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8780] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E7E3DA]">
              {project.category}
            </span>
          </div>

          {/* Body: Title & Description */}
          <div className="my-3">
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#1F1F1D] tracking-tight group-hover:text-[#7D9A78] transition-colors mb-1.5">
              {project.title}
            </h3>
            <p className="text-xs text-[#5A5750] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Bottom Row: Tags & Link Slots */}
          <div className="pt-3 border-t border-[#E7E3DA]/80 space-y-2.5">
            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 border border-[#E7E3DA] text-[#6B6862]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link Slots */}
            <div className="flex items-center justify-between pt-1">
              <a
                href={project.liveUrl || '#'}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#7D9A78] hover:text-[#5E7B5A] transition-colors"
                data-cursor="link"
              >
                <span>Preview</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={project.githubUrl || '#'}
                target="_blank"
                rel="noreferrer noopener"
                className="p-1.5 rounded-full text-[#8A8780] hover:text-[#1F1F1D] hover:bg-black/5 transition-colors"
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

export default ProjectCards;
