---
title: "The Mystery Pipeline"
number: 1
drawer: personal
case_status: Complete
type: Pipeline
date: 2026-07-01
summary: "A seven-stage local AI pipeline that writes, solves, draws and checks a printable mystery game. A different model family tries to solve each case cold before anything goes to print."
description: "A seven-stage local AI pipeline that writes, solves, draws and checks a printable mystery game. A different model family tries to solve each case cold before anything goes to print."
concepts: ["Agents", "Evals", "Human in the loop", "Python"]
thumb: /experiments/mystery-pipeline/dead-air-preview.jpg
highlight: 2
draft: false
---

I gave a team of AI agents a broad brief: make a printable mystery I could sell, and spend no money. I'd just played a paper mystery on a trip and wanted to see if agents could make one.

The agents timed out, lost their outputs and turned in puzzles that were really long arithmetic problems. I couldn't see enough of the work to tell what to fix. So I rebuilt it as a local tool where every stage is visible and can be rerun on its own. That version produced *Dead Air*, a 26-page fair-play mystery you can print and solve.

<figure class="fig">
  <img src="/experiments/mystery-pipeline/dead-air-preview.jpg" width="1080" height="716" fetchpriority="high" alt="The Dead Air cover beside an early evidence page with a shift roster and radio signal diagram.">
  <figcaption><span class="kind">Software render</span> The Dead Air cover and an early evidence page.</figcaption>
</figure>

**[Download the printable Dead Air PDF](/experiments/mystery-pipeline/dead-air.pdf)** · 26 pages · 1–2 players · free

Liked it? The next case is coming.

<section class="glance" aria-labelledby="at-a-glance">
<h2 id="at-a-glance" class="label">At a glance</h2>
<dl>
  <div><dt>Result</dt><dd>A working local pipeline and one finished, playtested case.</dd></div>
  <div><dt>Build</dt><dd>One Python file, about 2,500 lines, standard library only. A local web server with a browser UI. Seven stages on four agents across two model families, called through OpenClaw.</dd></div>
  <div><dt>My role</dt><dd>Chose the product, scrapped the autonomous version, designed the pipeline and its evaluation, revised every brief and approved the finished case.</dd></div>
  <div><dt>Development</dt><dd>AI-assisted. Claude helped diagnose the first attempt and wrote most of the rebuild.</dd></div>
</dl>
</section>

## What using it looks like

I type a one-paragraph premise and pick a deduction mechanic. Seven stages run in order in the browser. For each one I can read its input and output, leave a written instruction and rerun it alone, or rerun everything from that point forward. At the end I get a print-ready packet: a narrative opening, evidence documents, a hint ladder and a sealed solution.

## Intentional choices

- **A human at every seam.** In my notes: "A bench with a human at every seam, not a machine with a button."
- **An independent solver.** The solving stage runs on a different model family, in its own session, with the solution withheld.
- **Code checks over model opinions.** Anything measurable is measured in code: text overflow, type size, number consistency and contrast.
- **Report, never auto-repair.** The pipeline flags problems and fixes none of them on its own.
- **No image generation.** Every document is SVG: text that describes a piece of paper.
- **No dependencies.** One file you can read top to bottom in an afternoon.

## How it works

| # | Stage | Agent | Job |
|---|---|---|---|
| 1 | Storyteller | game-designer | Premise → cast, setting, timeline and solution |
| 2 | Puzzle Architect | game-designer | The deduction chain and the evidence that carries it |
| 3 | Blind Solver | game-qa, on a different model family | Solves the packet cold, never having seen the solution |
| 4 | Editor | game-designer | Repairs what the solver broke, in priority order |
| 5 | Document Maker | art-director | Specifies each exhibit as a physical object |
| 6 | Draftsman | art-director | Draws every exhibit as SVG, plus the cover mark |
| 7 | Proofreader | packaging-qa | Checks the drawings before print |

Each stage names its model and reasoning effort in a stage table, so routing is data, not code. Every run gets a timestamped folder holding the premise, each stage's raw output and every drawing. Stopping never loses work. Reset writes a `.dismissed` marker instead of deleting, so old runs stay readable.

<details class="tech">
<summary><span class="label">Technical notes</span> Under the hood</summary>

| Piece | How it works |
|---|---|
| Server and UI | Python `http.server`, with the single-page UI served as a string literal. No framework, no build step, no package manifest. |
| Models | Called through OpenClaw as a subprocess. The writing stages run on one model family; the solver and proofreader run on another. |
| Agents | Four agents (game-designer, game-qa, art-director, packaging-qa) with their own workspace files, backed up because a reset regenerates stock templates. |
| Briefs | All seven stage briefs are versioned data, mirrored to JSON behind a `SPEC_VERSION` constant. Bump it and the stored briefs are rewritten from defaults. |
| Canon | Title, tagline and accent colour are saved to files and prepended to every later stage, so a case can't drift its own name. |
| `lint_svg` | Counts characters against canvas width (SVG doesn't wrap) and flags tight line spacing, elements outside the viewBox and type under 11pt. |
| `lint_set` | One page size, one typeface, one paper colour across the whole set. |
| `lint_consistency` | Matches every number, time and measurement in the drawings against the case text. |
| Contrast check | Resolves every text element against what's actually behind it, following `<g fill>` inheritance and layered rectangles. |
| Paper and ink | A lookup table maps words like "carbon flimsy" and "faded ochre" to real fills. Handwriting uses a generic cursive family with a slight per-line rotation. One accent colour per case, validated for luminance. |
| Output | `packet.html` and `packet-report.txt`, which lists every warning without fixing any of them. The browser prints the PDF. |

</details>

## The solver never sees the answer

You can't ask a model to forget what it wrote. You can only hand the material to something that never saw it. So stage 3 gets exactly what a player gets, on a different model family, in its own session.

On one run it found a timeline that took eight minutes when it was supposed to take twenty, a missing piece of evidence, and a clue that gave itself away. The Editor fixed all three without help. The same separation applies to the drawings: the stage that checks them is a different agent with a different brief from the one that made them.

## What broke

| Symptom | Cause | Fix |
|---|---|---|
| Replies cut off mid-JSON | An undrained subprocess pipe | Fixed the pipe handling |
| Drawings changed measurements (18.0 vs 18.1 cm) | The Draftsman saw only the layout brief | It now gets the full case. A stage asked to transcribe gets the source |
| Every cover was a tall vertical shape | All three example subjects in the brief were tall | Composition rules and a menu of approaches instead of examples |
| White text on white | An automatic contrast "repair" | Removed auto-repair; checks report, I decide |

## What it taught me

Once I could see each stage's input and output, most "model failures" turned out to be something else: a pipe that wasn't drained, or a brief that told the model to do the wrong thing. Examples in a prompt act as instructions. Make the system observable before trying to make it smarter.

## Where it stands

Complete. *Dead Air* was solved cold by the independent solver, checked against the sealed solution and playtested by two players. One known issue remains: a few exhibits print as both prose and a drawing. A second case is in progress.

## Who did what

<div class="who">
  <div>
    <h3 class="label">Me</h3>
    <p>Chose the product, scrapped the autonomous version, designed the human-at-every-seam pipeline and the blind-solver evaluation, revised every brief and approved the packet.</p>
  </div>
  <div>
    <h3 class="label">The playtester</h3>
    <p>Solved <em>Dead Air</em> on paper with me.</p>
  </div>
  <div>
    <h3 class="label">The AI tools</h3>
    <p>Claude helped diagnose the first attempt and wrote most of the rebuild. The pipeline's agents write, solve, draw and check each case.</p>
  </div>
</div>

## Looking back

I'd put it in front of a stranger earlier next time. A solver can tell me whether the clues add up. A player can tell me where they got stuck, and whether getting unstuck felt good.
