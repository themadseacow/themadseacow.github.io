---
title: "Mable"
number: 4
drawer: work
case_status: Running
type: Work tool
date: 2026-05-01
summary: "A Claude plugin that answers sales questions from five live work systems plus the web, routes every question through a knowledge map, cites every source and asks before it changes anything."
description: "A Claude plugin that answers sales questions from five live work systems plus the web, routes every question through a knowledge map, cites every source and asks before it changes anything."
concepts: ["Agents", "Guardrails", "CRM", "Skills"]
thumb: /experiments/mable/demo.png
draft: false
---

Every answer I needed lived somewhere, just never in one place. Account ownership was in the CRM. What a customer said was in a call recording. Pricing, territories and positioning were in shared drives. Integrations and security details were in the wiki. Prospect data was in a separate database. Anything else lived in a colleague's head, often in another time zone.

A simple question meant five tabs, a lot of searching, and usually a message to the team chat and a wait. It was a huge time sink, every day.

Mable is a Claude plugin that does the looking for me. It's connected to all five systems plus the web, knows which one holds which kind of answer, brings back a link to the exact record or document, and asks before it changes anything. It was my first agent, and I still use it every day, now mostly to manage deals and keep the CRM current.

<figure class="fig">
  <img src="/experiments/mable/demo.png" width="1280" height="800" fetchpriority="high" alt="Mable's knowledge base file: a map of eight sources showing what each holds and when to fetch it, the order sources are checked, and four guardrails including CRM ownership and approval before any change.">
  <figcaption><span class="kind">Excerpt</span> The plugin's knowledge map, source order and guardrails. Company details replaced.</figcaption>
</figure>

<section class="glance" aria-labelledby="at-a-glance">
<h2 id="at-a-glance" class="label">At a glance</h2>
<dl>
  <div><dt>Status</dt><dd>Live. In my daily workflow for about six months, and used by other reps.</dd></div>
  <div><dt>Build</dt><dd>A Claude plugin: a main skill, an onboarding skill and a knowledge base of about 400 lines. Six connectors: CRM, call recordings, shared drive, wiki, prospecting database and live web research.</dd></div>
  <div><dt>My role</dt><dd>Designed the knowledge map, source order and guardrails, wrote the knowledge base, set up the connectors and tested it in daily use.</dd></div>
  <div><dt>Development</dt><dd>AI-assisted. My first skill, built with Claude.</dd></div>
</dl>
</section>

## What using it looks like

I ask a question in plain language: who owns this account, do we integrate with this system, what came up on the last call, move this deal to the next stage. Mable checks the knowledge map, goes to the right live source, and answers first, briefly, like a colleague would. Every answer ends with a link to the record or document it came from. If it's about to change something in the CRM, it shows me exactly what will change and waits for a yes.

## Intentional choices

- **A link for every answer.** If it isn't sourced, I can't use it in front of a customer.
- **Live data for anything that changes.** Ownership, territories and case studies are fetched every time, never answered from memory.
- **Cache what the model reads badly.** Pricing comes from a verified table, because extracting it from multi-column brochure PDFs produced wrong numbers.
- **Copy links exactly.** Call-recording links come straight from the API response. Rebuilding them produced links that looked right and didn't work.
- **Propose, don't act.** CRM changes wait for approval, outreach is drafted but never sent, and paid lookups ask first.
- **An honest dead end.** If nothing turns up, it lists what it searched and offers to draft the question for the team chat instead of guessing.

## How it works

1. **Setup check.** On the first message of a session, Mable checks all six connectors and walks the rep through any that are missing.
2. **Route.** A knowledge map in the knowledge base says which system holds which kind of answer, down to specific documents and the questions they answer.
3. **Fetch,** following a fixed source order: cached reference data, then shared drives (searching a team folder fresh every time so new documents get picked up), the wiki, the CRM, call recordings, the prospecting database and finally the web.
4. **Answer and cite.** Lead with the answer, then a source line with links to the exact records used.
5. **Guardrails.** Ownership and fit checks before any outreach suggestion, approval before writes, and confirmation before spending credits.

<details class="tech">
<summary><span class="label">Technical notes</span> The plugin</summary>

| Part | What it holds |
|---|---|
| Main skill | Persona and tone, the source order, link rules for each source type, guardrails and escalation |
| Knowledge base | Ideal customer profile, stable facts, a verified pricing table, and a knowledge map of every source with what it contains and when to fetch it |
| Onboarding skill | A six-connector checklist, step-by-step setup for each connector, five test questions with expected sources, and troubleshooting |

| Rule | Why |
|---|---|
| Use the exact link returned by the connector | Reconstructed call links broke |
| Pricing from the cached table, never the PDFs | The PDF layout caused misread columns |
| Search the team folder on every relevant question | New documents get added there all the time |
| Flag internal and unpublished material before sharing | Not everything internal is safe to send a prospect |
| Ask before any paid lookup, in fixed wording | Credits cost money |
| Show the change and wait for approval before CRM writes | Talking through a record isn't permission to edit it |

</details>

## "We were talking"

The first version, then called Finn, would take a conversation as an instruction. I'd be talking through a record and it would update it, or send a message I hadn't asked for. My reaction: "No, I didn't want you to take that initiative. We were talking."

The rebuild into Mable made permission explicit: propose first, act only on a clear yes, and cite everything. That rule has been my starting point for every agent since.

## What broke

| Symptom | Fix |
|---|---|
| Wrong prices | A verified pricing table, with a link to the brochure |
| Call links that went nowhere | Copy the exact URL from the API response |
| It stopped working overnight | A CRM permissions change; I worked with the admins to restore access |
| Edits made mid-conversation | Explicit approval before any write |

## What it taught me

An assistant is only as good as its map of where answers live. Building it was the easy part. Keeping the knowledge base, links and permissions current is the ongoing work.

## Where it stands

Live. I started with sales questions; today I mainly use it for deal management and CRM updates, since Venture took over prospecting. Other reps use it too.

## Who did what

<div class="who">
  <div>
    <h3 class="label">Me</h3>
    <p>Defined the problem, designed the knowledge map, source order and guardrails, wrote the knowledge base, set up the connectors and tested it in daily use.</p>
  </div>
  <div>
    <h3 class="label">The other reps</h3>
    <p>Used it in their own work.</p>
  </div>
  <div>
    <h3 class="label">The AI tools</h3>
    <p>Claude helped build the plugin and runs every lookup through the connected systems.</p>
  </div>
</div>

## Looking back

Mable taught me the first rule of giving an agent access to real systems: spell out what counts as permission before you hand over the keys. It also showed me the value of a good map. Most of the intelligence isn't in the model; it's in telling the model exactly where to look.
