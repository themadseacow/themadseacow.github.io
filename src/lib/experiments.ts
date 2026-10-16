// The one place that decides which experiments are visible.
// Every list, link and page uses this, so a draft can't leak out by accident.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Experiment = CollectionEntry<'experiments'>;

// On my Mac (npm run dev) drafts are shown, marked DRAFT, so I can preview them.
// In the real build (npm run build, which is what goes live) drafts are left out completely.
const showDrafts = import.meta.env.DEV;

export async function getVisibleExperiments() {
  const all = await getCollection('experiments', ({ data }) => showDrafts || !data.draft);
  // In the order built: EXP 001 first.
  return all.sort((a, b) => a.data.number - b.data.number);
}

export async function getDrawerExperiments(drawer: 'work' | 'personal') {
  return (await getVisibleExperiments()).filter((exp) => exp.data.drawer === drawer);
}

export async function getHighlights() {
  return (await getVisibleExperiments())
    .filter((exp) => exp.data.highlight)
    .sort((a, b) => a.data.highlight! - b.data.highlight!);
}

export const expNumber = (n: number) => `EXP ${String(n).padStart(3, '0')}`;
