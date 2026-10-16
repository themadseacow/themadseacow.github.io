// The cabinet's drawers, top to bottom. Each drawer is a real page.
// ready: false = shown on my Mac only, hidden on the live site.
// introApproved: false = the intro is a mockup placeholder, shown on my Mac only.
export type DrawerId = 'highlights' | 'work' | 'personal' | 'concepts' | 'next' | 'about';

export interface Drawer {
  id: DrawerId;
  href: string;
  label: string;
  intro?: string;
  introApproved?: boolean;
  ready: boolean;
}

const all: Drawer[] = [
  { id: 'highlights', href: '/', label: 'Highlights', intro: '[Intro, one line: start here.]', ready: true },
  { id: 'work', href: '/work/', label: 'Work', ready: true },
  { id: 'personal', href: '/personal/', label: 'Personal', intro: 'Things built because I wanted to see if I could.', ready: true },
  { id: 'concepts', href: '/concepts/', label: 'By concept', intro: 'Pull every file that taught me something about one idea.', ready: false },
  { id: 'next', href: '/next/', label: 'Next up', intro: '[Intro, one line: things I want to learn or build next.]', ready: false },
  { id: 'about', href: '/about/', label: 'About', ready: false },
];

const dev = import.meta.env.DEV;

export const drawers = all
  .filter((d) => d.ready || dev)
  .map((d) => ({ ...d, intro: d.introApproved || dev ? d.intro : undefined }));

export const getDrawer = (id: DrawerId) => drawers.find((d) => d.id === id);
export const isReady = (id: DrawerId) => drawers.some((d) => d.id === id);
