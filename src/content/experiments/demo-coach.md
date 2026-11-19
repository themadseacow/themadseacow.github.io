---
title: "Demo Coach"
number: 7
drawer: work
case_status: Complete
type: Work tool
date: 2026-07-01
summary: "A self-contained demo training tool built from 27 recorded sales demos: an outline, a click-by-click script, a 164-point scorecard and an AI coach that scores practice transcripts."
description: "A self-contained demo training tool built from 27 recorded sales demos: an outline, a click-by-click script, a 164-point scorecard and an AI coach that scores practice transcripts."
concepts: ["Sales enablement", "Evals", "Claude", "HTML"]
thumb: /experiments/demo-coach/demo.png
draft: false
---

New reps get a few weeks to learn the product and a long, detailed demo. The best version of that demo lived in other reps' recorded calls, spread across dozens of hours of video. Nobody had pulled it into something a new rep could practice against.

So during my own onboarding I had Claude analyze 27 recorded demos from across the sales team, from January to June. Out of that I built Demo Coach: one HTML file with the demo outline, a click-by-click script, a scorecard, and an AI coach that grades a practice run from its transcript.

<figure class="fig">
  <img src="/experiments/demo-coach/demo.png" width="1280" height="760" fetchpriority="high" alt="A fictional Demo Coach scorecard showing 118 of 164 talking points covered, next to an AI score that marks key phrases as hit, partial or missed and suggests what to drill next.">
  <figcaption><span class="kind">Screenshot</span> Recreated scorecard and AI score. Demonstration data.</figcaption>
</figure>

<section class="glance" aria-labelledby="at-a-glance">
<h2 id="at-a-glance" class="label">At a glance</h2>
<dl>
  <div><dt>Result</dt><dd>Leadership was very impressed by my first demo. The tool caught their attention and led to my being named a team captain for the company AI hackathon.</dd></div>
  <div><dt>Build</dt><dd>One self-contained HTML file with four tabs, an embedded coaching file for Claude and a fallback scoring prompt. No server, no install.</dd></div>
  <div><dt>My role</dt><dd>Wrote the demo script, directed the call analysis, designed the scorecard and scoring rules, and used it to train for my own demos.</dd></div>
  <div><dt>Development</dt><dd>AI-assisted. Claude analyzed the calls and built the file from my direction.</dd></div>
</dl>
</section>

## What using it looks like

I record a practice demo, paste the transcript into Claude along with the coaching file, and ask for a score. Claude comes back with a percentage, a section-by-section breakdown, every key phrase marked hit, partial or missed, and what to drill next. Then I run it again.

## Intentional choices

- **Built from real calls, not opinions.** The outline and talk tracks come from what was actually landing across 27 demos.
- **Two kinds of points.** Standard talking points count in any order and "close enough" passes. Key phrases, the must-say moments, have to be near-verbatim.
- **Partial is its own grade.** The right idea without the specific words that make it land is worth knowing about.
- **One file, no server.** Anyone can open it in a browser, and nothing can break in setup.
- **The coach travels with the tool.** The full coaching brief is embedded in the HTML and downloads with one click.
- **A living document.** Anyone can upload the file to Claude, ask for a change and pass the updated version around.

## How it works

1. **Demo outline:** eleven phases with target times, talk tracks, "what lands" and "watch for" notes, plus how to adjust the demo by customer type.
2. **Full script:** the click-by-click demo, screen by screen, with the set pieces written out.
3. **Scorecard:** 164 talking points in sections, key phrases flagged, a live progress bar, notes for each section and a reset button.
4. **AI scoring:** download the embedded coaching file, upload it to Claude, paste a transcript and get scored. The same file turns Claude into a demo coach you can quiz ("what should I say when a prospect asks about…") or use to modify the tool itself.

<details class="tech">
<summary><span class="label">Technical notes</span> The scoring rules</summary>

| Rule | Detail |
|---|---|
| Order | Any talking point counts as covered, regardless of order |
| Matching | "Close enough" counts for standard points; key phrases must be near-verbatim |
| Key phrase grades | Hit, Partial (right concept, missing the language that makes it land) or Missed |
| Output | Overall percentage, section-by-section breakdown, what was covered well, what was missed, what to drill next |
| Tone | Encouraging but honest |
| Fallback | A standalone prompt with the full scorecard built in, for a quick score without the coaching file |

</details>

## What the calls showed

Analyzing the calls together surfaced patterns no single rep would see. The clearest: asking "who else would need to be involved?" late in a demo let that question become a blocker in about a quarter of calls. So the outline moves it to the first five minutes. Pre-call prep even tells reps to ask my sales assistant for the account's CRM history and recent calls before they join.

## Battle Cards

A companion tool, built the same way: an interactive HTML battle card made from call data, covering the objections and competitor questions that actually came up. It was as much an exercise in learning what Claude could build as a team tool.

## What it taught me

Practicing against a clear standard works. Knowing exactly which phrases mattered, and getting an honest score after every run, made my demos better faster than rewatching calls ever would have.

## Where it stands

Complete. I built it for onboarding, and no new reps have started since, so I've been its main user. I used it a lot to prepare, and leadership was very impressed by my first demo. It's also what got their attention for the company AI hackathon, where I was named a team captain.

## Who did what

<div class="who">
  <div>
    <h3 class="label">Me</h3>
    <p>Wrote the demo script, decided what the tool needed to do, designed the scorecard and scoring rules, and trained with it.</p>
  </div>
  <div>
    <h3 class="label">The sales team</h3>
    <p>Their recorded demos were the raw material.</p>
  </div>
  <div>
    <h3 class="label">The AI tools</h3>
    <p>Claude analyzed the calls, synthesized the outline and built the HTML file and coaching brief.</p>
  </div>
</div>

## Looking back

Demo Coach was where I learned that the useful part of AI isn't the chat. It's turning messy material, like hours of recorded calls, into a structured tool with clear rules for what good looks like.
