/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ Portfolio Data Store
 * Strictly restricted to approved information per wireframe requirements.
 * Zero marketing fluff, zero filler text.
 */

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  demoUrl: string;
}

export const BRAND_DATA = {
  name: 'AFRUZ',
  identity: 'Developer · Student · Editor',
  statement: 'A student, developer and editor, learning to build for the web.',
  details: 'Focused on clean structure, responsive craft, and creative digital experiences.',
  email: 'afruz5954@gmail.com',
  instagram: '@afrux.exe',
  instagramUrl: 'https://instagram.com/afrux.exe',
  githubUrl: 'https://github.com/afruz',
};

export const PHILOSOPHY_DATA = [
  {
    title: 'Web Development',
    description: 'Crafting responsive, clean, and accessible web experiences with semantic structure and modern component architectures.',
  },
  {
    title: 'Editing',
    description: 'Visual pacing, creative flow, and digital media craft. Bringing visual rhythm, timing, and framing into web interfaces.',
  },
  {
    title: 'Learning',
    description: 'Continuously expanding frontend standards, deconstructing refined interactive systems, and elevating craft.',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    number: '01',
    title: 'Web Application',
    category: 'Development',
    description: 'Responsive, accessible web application crafted with modular components, semantic structure, and clean interaction flow.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    demoUrl: '#',
  },
  {
    id: 'project-2',
    number: '02',
    title: 'Interactive Web Experience',
    category: 'Creative Web',
    description: 'Interactive organic visual experience with smooth animations, real-time depth, and scroll choreography.',
    tags: ['WebGL', 'GSAP', 'CSS'],
    demoUrl: '#',
  },
  {
    id: 'project-3',
    number: '03',
    title: 'Digital Media & Editorial',
    category: 'Editing / Visual',
    description: 'Visual rhythm, editorial pacing, and content composition bridging design principles with web layouts.',
    tags: ['Layout', 'Design Tokens', 'Video'],
    demoUrl: '#',
  },
];
