// The "form" every experiment must fill in. Astro checks each Markdown file
// in src/content/experiments/ against this and stops the build if one is wrong.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const experiments = defineCollection({
  loader: glob({ base: './src/content/experiments', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // Shown as "EXP 001". Numbered across the whole cabinet in the order built.
    number: z.number().int().positive(),
    drawer: z.enum(['work', 'personal']),
    // 1–3 puts it in the Highlights drawer, in that order.
    highlight: z.number().int().min(1).max(3).optional(),
    case_status: z.enum(['Running', 'Concluded', 'Failed', 'Abandoned']).optional(),
    type: z.string().optional(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(), // one line
    lesson: z.string().optional(), // one line
    concepts: z.array(z.string()).default([]),
    // Downloads shown in a box on the experiment page, e.g. the Dead Air PDF.
    files: z
      .array(z.object({ label: z.string(), href: z.string(), note: z.string().optional() }))
      .optional(),
    // Drafts never go live. Flip to false only once the Site Draft says status: reviewed.
    draft: z.boolean().default(true),
  }),
});

export const collections = { experiments };
