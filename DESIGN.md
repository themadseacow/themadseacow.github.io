# Design: Mad Seacow

**Status:** Decided (Oct 15). Dark workshop + filing cabinet menu. **The visual reference is `design/mockup-v8.html`** (open it in a browser and click around). Match it; where this file and the mockup disagree, this file wins.

## The idea in one line
A filing cabinet in a workshop at night. Serious enough that a visitor thinks "competent," with enough personality that they think "and fun to work with."

## Tone
- **The site gets one fun thing: the Seacow.** Everything else is calm and professional.
- Content is serious. Jokes live in the margins (About page, footer), not the headline.
- First 10 seconds: what I do, and proof (Highlights). Personality second.

## Name and tagline
- Always **Mad Seacow** (never "Sea Cow"). Handle: themadseacow.
- **Headline (decided Oct 15, for now): "Figuring it out by building it."** Sentence case. Don't change it without asking.
- Kicker under the headline (decided Nov 13, my words, use exactly): **"Ideas into working things."** Short typewriter label.
- Intro paragraphs (decided Nov 13, my words, use exactly): **"I build tools, automations, and the occasional thing that belongs on a wall. Some solve problems at work. Others start with “could I make that?”"** then **"These are the projects, the decisions behind them, and what it took to get them working."**

## Color (dark only, no light mode)
| Token | Value | Job |
|---|---|---|
| `--bg` | `#1c1b19` | warm charcoal background |
| `--raised` | `#24221f` | folder bodies, cards |
| `--text` | `#e8e2d4` | bone text |
| `--soft` | `#a39d8f` | secondary text |
| `--rule` | `#3a3732` | hairlines |
| `--folder` | `#d6be8c` | **tan = "you can open this"**: folder tabs, current drawer |
| `--hazard` | `#f5c518` | **yellow = "look here"**: the Highlights drawer label, status stamps, link underline. Never on folders. Use sparingly. Always dark text on yellow, never yellow body text. |

- **Color rule:** tan only on things you can open or click (folder tabs/backs, the open drawer). Labels like "What I learned" are soft gray. No other colors.
- Never pure black or pure white. Body text weight is slightly heavier on dark (about 430).

## Type
- **Courier Prime** (typewriter): labels, drawer labels, tabs, metadata, stamps, wordmark.
- **Source Serif 4**: headlines and body.
- Self-hosted from `public/fonts/`.

## The Seacow
- Use the **reversed logo recolored to bone** (`#e8e2d4`). Source: `assets/msc-logo-reversed.png` / `.svg`. The black line version disappears on dark.
- Appears **once**: medium size beside the headline on the home page. The header uses the text wordmark "MAD SEACOW."

## Layout
- **Home:** headline + subline (left), Seacow (right). Below: cabinet (left), Highlights drawer open (right).
- **Every other page:** no hero. Cabinet stays on the left (sticky), with that page's drawer pulled out; content on the right.
- **Phone:** a short real cabinet, not a tab bar. Five thin drawers, label centered with the handle underneath (same front as desktop), about 270px tall.
  - Tap: the drawer presses in. Open drawer: pulled toward you (slightly wider than the cabinet, shadow beneath).
  - The open drawer's folders appear **above** its front, sticking up out of it, the way you look down into a real open drawer. Never below the front (that reads as coming out of the next drawer).
  - The open drawer shows **only its folder tabs with titles** (seen from above, staggered like real folders), not preview cards. Tap a tab to open the file.
  - Home opens with **Highlights pulled out**, so the three highlight titles are visible without a tap.
  - On drawer pages that are just lists (Highlights, Work, Personal, Next up), the tabs *are* the list; no cards below. By concept and About show their content below the cabinet.
  - Once the cabinet scrolls out of view, a small "Cabinet" button (bottom right) scrolls back to it.

## The cabinet (the site menu)
- Drawers, top to bottom: **Highlights** (yellow label) · **Work** · **Personal** · **By concept** · **Next up** · **About**.
- "Work" (not "GTM") because it covers any work tool. **GTM is a concept** in By concept and a chip on those files.
- Each drawer is a **real page** with its own URL (`/`, `/work/`, `/personal/`, `/concepts/`, `/next/`, `/about/`). Experiments live at `/experiments/<id>/`.
- **Hover a drawer:** it slides out a little and folder tabs peek above it.
- **Current drawer:** pulled out further, tan label (Highlights keeps yellow).
- Page changes animate with **Astro view transitions**, so the cabinet stays put and only the contents change. It should feel like one cabinet, not a page reload.

## Experiments (what we call each project)
- Every project is an **Experiment**, never "case file" or "project" in the UI. (Case-file language belongs only to Dead Air.)
- Numbered across the whole cabinet in the order built: **EXP 001, EXP 002, ...** The number is the folder tab.
- Status stamps: **Running · Complete · Failed · Abandoned**. ("Complete", not "Concluded": concluded sounds like giving up.)
- Next up items are **Proposed 01, Proposed 02, ...** (experiments not run yet).
- Unwritten round-two work: tab reads **Not filed**.

## Folders (how an experiment appears in a list)
- **The tab is the metaphor; the body is a clean modern row.** Style "B" in the mockup: the tan **back of the folder** shows as a strip behind the row, with the tab attached to it. The row itself is dark (`--raised`).
- Row shows: title, one-line summary, a short description of the project (`description`, one or two sentences, soft gray; the lesson stays on the experiment page only), status stamp, type · year, concept chips, "Open file →".
- **Highlights:** look exactly like every other folder (all tan, including on phone). The yellow Highlights drawer label is what marks them. No yellow on folders, ever: yellow next to tan clashes.
- **Hover:** the folder back and tab lift up out of the row; the row gets a shadow.
- Not-yet-written items: dashed outline, muted.
- **Snapshot:** one small real artifact per experiment (optional `thumb` field), so lists show pictures of real things at a glance.
  - Only on folder rows in the lists. Never on the cabinet or its drawers, never on the experiment page (images run full width there).
  - Far left inside the dark body; title, summary, description and chips sit beside it. A little wider than tall, about the height of the text block.
  - Thin bone border like a photo print, slight shadow, tilted about 1.5°, top edge poking just above the card.
  - One flat outline paperclip (inline SVG, bone) over the top edge. Same angle and position on every row. Never tan or yellow.
  - Lifts the same 6px as the folder back on hover, so it reads as clipped to it; no animation of its own. Unwritten rows get none. Hidden on phone (tabs and titles only).
  - Portrait: `portrait-thumb.jpg`. Later: a Dead Air evidence page for the Mystery Pipeline, the funnel chart for Venture.
- **No cost on folders or tags.** Cost is **optional per experiment**: work tools usually include it (cost per result, time saved); personal experiments usually skip it. If there's no cost, the experiment page hides that section entirely.
## Next up
- Things I want to learn or build but haven't started (e.g. SQL, Python). Each one is a dashed "not built yet" folder: title + one line on why.
- Keep it short and current. A stale list looks worse than none.

## By concept
- Concept buttons filter files from every drawer, live, with a count ("2 files on Agents").

## Experiment page
- Breadcrumb (drawer / EXP number), title, a tag strip (bone top line, not tan): Status · Type · Year · What I learned.
- Section order (set by EXP 002, the Portrait): intro → proof photo → at a glance → experience → calls I made → how it works (+ technical notes) → deep-dive sections → what broke → what it taught me → the finish → who did what → looking back. "What it cost" is optional and slots in when an experiment has one (usually work tools).
- Body text max width about 42rem; images can use the full column.
- Bottom: concept chips, then links back to the drawer and to About. No "next experiment" placeholder.

## Page design rules
- 2px corners everywhere. No soft rounded cards.
- Fewer boxed sections; let images break up the text. "At a glance" is plain rows with rules, "Who did what" is three columns with no boxes.
- Long technical detail (component tables, feature lists) goes in a collapsible "Technical notes" section.
- Label every image in its caption: **Photo**, **Video**, **Software render**, **Screenshot** or **Software conversion**. Every image also gets descriptive alt text.
- Video: controls, muted, plays inline, poster image, never autoplay.
- No bracketed placeholders on a live page.

## Motion
- Two or three small, meaningful animations: drawer slide, folder pull, page transition. Nothing else moves.
- Everything calms down when the visitor has reduced motion turned on.

## Words in the mockup
- Headline, subline, drawer intros, titles of unwritten work projects, concepts, stamps and types in the mockup are **placeholders**. Build them in, then list them for me to approve or rewrite. They do not count as my words until I say so.

## Never
- Purple/blue gradients, neon, glowing effects
- A row of three identical icon "feature cards"
- Sparkle emoji, "Welcome to my corner of the internet"
- *unlock*, *seamless*, *journey*, *leverage*
- Generated imagery. Imagery = the Seacow + real project artifacts (Dead Air pages, Portrait renders, screenshots with customer and internal details removed, charts).

## Dead Air
- Free and playable on the site (PDF), also sold elsewhere. Add a "Liked it? Next case coming" note; a buy/tip link only once the store listing is live.

## Later
- Lab Notes and Blueprints may become drawers.
- Favicon (Seacow head), share image.
