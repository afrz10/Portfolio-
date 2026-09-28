/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AFRUZ Portfolio Data Store
 * Source of truth strictly matching the approved uploaded reference images:
 * - 02-hero-section.png
 * - 03-about.png
 * - 04-what-i-do.png
 * - 05-work.png
 * - 06-journey.png
 * - 07-playground.png
 * - 08-collaboration.png
 * - 09-now.png
 * - 10-contact.png
 */

export interface ProjectData {
  id: string;
  title: string;
  status: string;
  year: string;
  technology: string;
  caseStudy: {
    overview: string;
    process: string;
    build: string;
    result: string;
  };
}

export interface JourneyItem {
  id: string;
  yearLabel: string;
  description: string;
}

export interface PlaygroundItem {
  id: string;
  title: 'UI' | 'Animation' | 'Web' | 'Creative';
  aspectRatio: string;
}

export const BRAND_DATA = {
  name: 'AFRUZ',
  identity: 'Developer · Student · Editor',
  statement: 'A student, developer and editor, learning to build for the web.',
  email: 'afruz5954@gmail.com',
  instagram: '@afrux.exe',
  instagramUrl: 'https://instagram.com/afrux.exe',
  currentStatus: 'Currently Building',
  personalFacts: [
    'A student, developer and editor.',
    'Enjoys web development.',
    'Currently learning web building.',
    'Wants to become highly skilled at creating for the web.',
  ],
  interests: ['Gaming', 'Web Development'],
  goal: 'To become highly skilled at creating websites.',
};

export const WHAT_I_DO_DATA = [
  {
    id: 'web-development',
    title: 'Web Development',
    summary: 'Crafting responsive, clean, and accessible web experiences.',
    details: [
      'Semantic structure, modern layouts, and component architectures.',
      'Responsive design from compact mobile screens to desktop viewports.',
      'Focus on clean code, performance, and interaction design.',
    ],
  },
  {
    id: 'editing',
    title: 'Editing',
    summary: 'Visual pacing, creative flow, and digital media craft.',
    details: [
      'Timing, visual rhythm, and editorial composition.',
      'Framing, color balance, and creative restraint.',
      'Bringing editing instincts into digital user interfaces.',
    ],
  },
  {
    id: 'learning',
    title: 'Learning',
    summary: 'Continuously expanding web building techniques and mastery.',
    details: [
      'Practicing modern frontend standards and design principles.',
      'Deconstructing refined interactive systems and user flows.',
      'Aiming to elevate development skills to professional mastery.',
    ],
  },
];

export const WORK_DATA: ProjectData[] = [
  {
    id: 'project-1',
    title: '—',
    status: 'Currently Building',
    year: '—',
    technology: '—',
    caseStudy: {
      overview: 'A new web project is currently being created and assembled.',
      process: 'Focusing on clean layout principles, semantic structure, and responsive precision.',
      build: 'Active development phase. All components, styling, and interactions are in progress.',
      result: 'Currently building. Documentation and final case study will be published upon completion.',
    },
  },
];

export const JOURNEY_DATA: JourneyItem[] = [
  { id: 'j-1', yearLabel: 'YYYY +', description: 'Upcoming milestone slot' },
  { id: 'j-2', yearLabel: 'YYYY +', description: 'Upcoming milestone slot' },
  { id: 'j-3', yearLabel: 'YYYY +', description: 'Upcoming milestone slot' },
];

export const PLAYGROUND_DATA: PlaygroundItem[] = [
  { id: 'ui', title: 'UI', aspectRatio: 'aspect-[4/3]' },
  { id: 'animation', title: 'Animation', aspectRatio: 'aspect-[4/3]' },
  { id: 'web', title: 'Web', aspectRatio: 'aspect-[16/10]' },
  { id: 'creative', title: 'Creative', aspectRatio: 'aspect-square' },
];

export const NOW_DATA = [
  { id: 'learning', category: 'LEARNING', focus: 'Web Building' },
  { id: 'building', category: 'BUILDING', focus: 'Current Project' },
  { id: 'exploring', category: 'EXPLORING', focus: 'Creative Web Craft' },
];

export const COLLABORATION_DATA = [
  {
    id: 'creators',
    title: 'CREATORS',
    subtitle: 'Creative collaborations.',
  },
  {
    id: 'developers',
    title: 'DEVELOPERS',
    subtitle: 'Web and technical collaborations.',
  },
];
