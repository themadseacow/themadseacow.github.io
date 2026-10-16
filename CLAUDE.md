# Mad Seacow website

## What this is
A public lab notebook of the AI and tech experiments I build on my own time: what I built, what broke, and what I learned. Anyone who lands here should understand what I've built in under a minute.
Built with **Astro**. Hosted free on GitHub Pages at themadseacow.github.io (built and deployed by a GitHub Action).

**Everything in this folder becomes public**, including this file. Private notes live in the "Mad Seacow Lab" notebook (`~/Documents/Mad Seacow Lab`), never here.

## Goal (updated Oct 15)
**Make this the most efficient, best-looking page we can.** I'm not hand-building this anymore, so optimize for the result, not for teaching. Use whatever makes the site better.

## Before any visual work
Read `DESIGN.md`, then open `design/mockup-v8.html` in a browser and click through it. **That mockup is the target.** It's a single HTML file with fake routing; rebuild it properly in Astro (real pages, components, content collection). `design/` is reference only: never served, never linked.

## How to work with me
- Use plan mode for big changes. Show me the plan in plain English; build once I approve.
- Bigger steps are fine. Commit after each working step with a plain-English message.
- **After each step, a short summary:** what changed, why, and anything I should look at or decide. Define any new term in one sentence. No line-by-line code walkthroughs unless I ask.
- Say what you see (run it, look at it at phone width), not just what you did.
- **Learning log:** at the end of a session, offer to add new concepts to `~/Documents/Mad Seacow Lab/Concepts/`. Ask before writing outside this folder.

## Stack
- **Astro** for pages and layout. Use **JavaScript wherever it makes the site better** (drawer motion, the concept filter, view transitions). React only if a piece clearly needs it.
- Use **Astro view transitions** for drawer-to-drawer page changes.
- Plain CSS with the tokens in `DESIGN.md`. No Tailwind or component kits.
- New packages are OK when they earn their place: tell me what it is and why in one line.
- Keep it fast: no heavy libraries for small effects, optimized images, self-hosted fonts.
- Keep it usable: good contrast, keyboard focus visible, respect reduced-motion.

## Layout
- `src/pages/`: `index` (Highlights), `work`, `personal`, `concepts`, `next`, `about`, `experiments/[id]`
- `src/content/experiments/`: one Markdown file per experiment. **Adding an experiment = adding one Markdown file.**
- `src/components/`: Cabinet, Folder, ConceptFilter, etc.
- `src/layouts/`: shared page frame (header, cabinet, footer)
- `src/lib/experiments.ts`: the one place drafts are filtered out
- `public/`: files served as-is (fonts, logo, Dead Air PDF)
- `assets/`: original logo files. Don't edit.
- `design/`: mockups and references. Not part of the site.

## Experiment fields (frontmatter)
`title`, `number` (shown as "EXP 001"; order built), `drawer` (`work` | `personal`), `highlight` (1–3 or empty), `case_status`, `type`, `date`, `summary` (one line), `lesson` (one line), `concepts` (list), `draft`.
**No cost field.** Costs go in the write-up's "What it cost" section only.

Next up items are not experiments yet: keep them in one small data file (`src/data/next.json`: title, why, order).

## Content rules

**Naming:** on the site, projects are "Experiments" (EXP 001...). My notebook still calls the drafts "Case File"; same thing.
**Name:** always "Mad Seacow" (never "Sea Cow"). Handle: themadseacow.

**Round one content:**
1. Home: headline "Figuring it out by building it.", subline, cabinet, Highlights
2. Mystery Pipeline experiment, with Dead Air playable as a free PDF and a "next case coming" note ("also for sale" only once a store listing is live)
3. Living Family Portrait experiment
4. About page

**Round two (later):** more experiments, including work tools written up without customer names or internal details, and the ThinkPad/Linux story.

**Where the words come from:**
- Experiment text comes from my notebook: `~/Documents/Mad Seacow Lab/Site Drafts/`.
- Only publish a draft once its frontmatter says `status: reviewed`. Copy it in verbatim.
- **Never write or invent case-file prose, summaries, lessons, the headline, or About text.** If text isn't ready, use an obvious placeholder in brackets.
- **No bracketed placeholder ever goes live.** Before every push, search the built site (`dist/`) for bracketed placeholders (e.g. `[DRAFT`, `[One line`, `[Your`, `[Intro`; the contact line's `[at]`/`[dot]` is fine). A page or section that still has one is hidden in production, or the push waits.
- Experiments have `draft: true` by default. Nothing with a placeholder goes live: a draft gets no page, no list entry and no link. I flip `draft: false`.
- About page and headline: only my own words. Show me locally before they go live.

**Privacy rules:**
- **Tone of everything public (site, repo files, commit messages):** a side lab I run on my own time. Keep it about the experiments.
- Keep it professional: no company, customer, prospect or colleague names, and no internal numbers.
- No family names, address, house number or location details.
- Check images for address markers and faces, and files (PDF, SVG, images) for names or emails in metadata, before publishing.
- Commits use the repo-local identity `Mad Seacow <338298105+themadseacow@users.noreply.github.com>`. No real name or personal email anywhere.
- Contact on the site is plain text `themadseacow [at] gmail [dot] com`, never a mailto link.
- Ask before writing anything outside the madseacow folder.

## How to check
- `npm run dev` → check every page at desktop and phone width (390px), with no sideways scrolling.
- `npm run build` must pass before anything is pushed.
- No errors in the browser console.
- Before every push, scan the repo for company, customer, family and personal names and emails.
- After a push, confirm the GitHub deploy run succeeded and the live site shows the change.

## Build phases (one per session; each one ends with a working, pushed site)
1. **Look:** dark tokens, fonts, bone Seacow, header, footer, home hero. Placeholder headline.
2. **Pages + cabinet:** a page per drawer, the cabinet as a plain menu (no animation yet), wide-row folders (style B), experiment page, new frontmatter fields. Drafts stay hidden.
3. **Motion:** drawer hover/open, folder pull-out, view transitions, the phone cabinet with tabs above the open drawer, the Cabinet button.
4. **By concept filter + Next up data file.**
Don't start a phase until the one before it is live and I've looked at it. Phases 1–2 plus at least one published experiment come before Phases 3–4.

## Status
- Done (Oct 14): Astro project, GitHub repo + deploy Action, shared layout and fonts, case-files collection with drafts hidden, two draft case files, list and case page templates.
- Decided (Oct 15): dark workshop look + filing-cabinet menu, per `DESIGN.md` and `design/mockup-v8.html`. The current light "paper" look gets replaced.
- Next: rebuild the site to match the mockup, **in phases** (see Build phases above). `src/pages/about.astro` is an uncommitted draft waiting for my review; don't commit it.
- Later: favicon, share image, round two experiments.
