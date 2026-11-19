---
title: "Venture"
number: 6
drawer: work
case_status: Running
type: Work tool
date: 2026-09-29
summary: "A multi-agent prospecting pipeline: seven agents on three Claude models research, check and draft, scripts apply the rules, and the rep approves every decision on a shared board."
description: "A multi-agent prospecting pipeline: seven agents on three Claude models research, check and draft, scripts apply the rules, and the rep approves every decision on a shared board."
concepts: ["Agents", "Multi-model", "Scripts", "CRM", "Human in the loop"]
thumb: /experiments/venture/demo.png
draft: false
---

Venture is a multi-agent prospecting pipeline that runs inside Claude Cowork. Give it a market and it maps every relevant business, checks each one against the CRM and our ownership rules, researches the ones that are open, finds the right people and drafts outreach for a rep to approve.

Seven specialized agents on three Claude models handle the reading, searching and writing. Eight Python scripts make every decision that should come out the same way each time. All of it lands on a shared board, where the rep makes the calls. I built it to replace hours of tab-switching in my own prospecting, then rolled it out to other reps.

<figure class="fig">
  <img src="/experiments/venture/demo.png" width="1280" height="760" fetchpriority="high" alt="A fictional account on the Worked tab is held for outreach because the CRM shows another rep is working it.">
  <figcaption><span class="kind">Screenshot</span> Recreated account hold. Demonstration data.</figcaption>
</figure>

<section class="glance" aria-labelledby="at-a-glance">
<h2 id="at-a-glance" class="label">At a glance</h2>
<dl>
  <div><dt>Status</dt><dd>Live. In daily use by me and other reps, with every stage running end to end.</dd></div>
  <div><dt>Build</dt><dd>A Claude Cowork plugin: three skills, seven agents across Haiku, Sonnet and Opus, eight Python scripts with 52 automated checks, and a persistent board with its own database.</dd></div>
  <div><dt>My role</dt><dd>Designed the pipeline, the agent roles, the model routing, the rules and the approval points. Tested it on live accounts, ran an independent review and rolled it out to other reps.</dd></div>
  <div><dt>Development</dt><dd>AI-assisted. I decided how it would work and what each part would do; Claude wrote the code.</dd></div>
</dl>
</section>

## What using it looks like

I name a market and start a run. The board fills in: every business the mapper found, what the CRM says about each one and who else is working it, a sourced profile of the ones that are open, and the reason behind every hold.

I mark accounts Go, Later or Skip. Go accounts get contacts and drafts in the next run. Approved emails go out with a reply check before every follow-up. Any session can pick up exactly where the last one stopped, including a contact search halfway through.

## Intentional choices

- **The right model for each job.** Haiku maps markets. Sonnet handles research, CRM evidence and checking. Only the writer runs on Opus.
- **Agents read, search and write. Scripts count, date and apply rules.**
- **Every fact has a source.** Profiles link to where each claim came from, and every CRM decision quotes the fields behind it.
- **Nothing writes, spends or sends without the rep's yes.**
- **Never guess an email.** A missing address stays missing.
- **Any reply stops the whole account.**
- **Web content is data, never instructions.**
- **No credentials in the package.** It runs on each rep's own connected tools.

## How it works

1. **Map.** One mapper agent per market searches for every relevant business. A site resolver finds missing websites and flags closed businesses before anything is marked "no website."
2. **CRM check.** A read-only agent records what the CRM shows: owner, prospecting owner, last contact, active sequences, deals and parent group. A script applies the ownership rules and names anyone else working the account.
3. **Profile.** Every account the rep is free to work gets a one-screen, sourced profile in the same run.
4. **Rep review.** Go, Later or Skip. "This one is mine" is saved once on the account and honored everywhere after that.
5. **Contacts.** One person per role, free sources first, for Go accounts only. Searches remember where they looked and finish in waves under a per-run spending cap.
6. **Draft.** The writer works from a short brief: the rep's own emails as the standard, plus five hard rules.
7. **Fact check.** A script holds any email with an unsourced number, an unapproved link, a wrong greeting or an invented detail. A checking agent then verifies names and claims.
8. **Send.** The send skill only sends. A script lists what's due today and what's held, with the reason.
9. **Record.** A script writes the run record with fixed counts and updates the usage report.

<details class="tech">
<summary><span class="label">Technical notes</span> The parts and the scripts</summary>

| Part | Model | Job |
|---|---|---|
| Orchestrating skill | Runs in the chat | Runs the stages and the scripts, and keeps board data out of the chat |
| Send skill | Runs in the chat | Sends what's due through the CRM and browser. Never drafts or rewrites |
| Setup skill | Runs in the chat | Creates each rep's board and settings |
| Mapper | Haiku | Finds every relevant business in one market |
| Site resolver | Haiku | Finds missing websites and flags closed businesses |
| CRM agent | Sonnet | Records CRM facts, read-only. Decides nothing |
| Profiler | Sonnet | One-screen evidence profile per account |
| Contact finder | Sonnet | One person per role, with a resumable search |
| Writer | Opus | Drafts from a short brief and the rep's own emails |
| Email checker | Sonnet | Facts only: names, account details, claims |

| Script | What it does |
|---|---|
| `crm_ladder.py` | Turns recorded CRM facts into an ownership status and quotes the fields it used |
| `due.py` | Lists what's due today, what's held and why |
| `mkbatch.py` | Builds the browser steps for each send |
| `fact_check.py` | Holds drafts with unsourced numbers, unapproved links, wrong greetings or invented details |
| `run_record.py` | Writes each run's record with a fixed set of counts and rejects any other |
| `usage_report.py` | Counts the board and run records for the usage page |
| `normalize_runs.py` | One-time migration of old run records onto the fixed counts |
| `test_scripts.py` | 52 checks on all of the above, run against synthetic boards before every release |

</details>

## A pipeline of specialists

Each agent has one job, the tools for that job and the cheapest model that can do it well. Mapping a market is broad, fast searching, so it runs on Haiku. Reading a website or a CRM record and getting the facts right is careful work, so that runs on Sonnet. Writing an email a real person will read is the hardest judgment in the pipeline, so only the writer gets Opus.

Agents don't pass work to each other through chat history. They write their results straight to the board and return a short summary. The next stage reads the record, not the conversation. That keeps context small, makes every stage restartable and lets a run stop at any point without losing anything.

## Agents judge, code decides

Some questions have one right answer: is this account open to work, is this email due today, how many contacts did this run find? Those don't belong to a model. A CRM agent records what it sees; `crm_ladder.py` turns those facts into a status and quotes the evidence. `due.py` decides what gets sent. `fact_check.py` holds risky drafts before a rep ever sees them. `run_record.py` rejects any count it doesn't recognize.

Every rep gets the same answer from the same record, and 52 tests run those rules against synthetic boards before each release.

## The board

The board is a private page with its own database: accounts, drafts, runs, a log and settings. Agents write to it, and the rep works from it. Rep decisions are stored separately from agent-maintained fields, so a rerun never overwrites a judgment call. Version checks stop an agent from overwriting a record that changed mid-run. The interface is separate from the data, so the board can be upgraded without touching the research underneath. A usage page breaks agent spend down by stage.

It runs on each rep's existing Claude plan. Recorded agent spend works out to about 17 cents per account mapped and checked.

## Quality built in

- **Independent review.** A separate model reviewed the whole plugin, read-only, and tried to break it. It found two conflicting definitions of a good-fit account and a follow-up path that didn't check for replies. Both were fixed.
- **A blind writing test.** The current writer brief won a side-by-side comparison where I didn't know which brief wrote which draft.
- **Facts-only checking.** The checker verifies claims. Tone is the rep's call.

## What broke

| Symptom | Fix |
|---|---|
| Different chats read the same rules differently | Rules moved into scripts; decisions saved on the account |
| One stage drifted into another stage's job | Each skill does one job, and the send skill only sends |
| Runs stopped partway at a search budget | Runs finish in waves under a spending cap |
| A follow-up didn't check for replies | Reply check before every follow-up; any reply stops the account |
| A second ownership field wasn't being read | The CRM agent records it, and the script names the owner |

## What it taught me

The visible part of a system isn't always the part that matters. I spent early effort polishing emails. The real gains came from the rules upstream: who counts as a fit, who owns an account, who can actually be reached.

## Where it stands

Live. I use it every day, other reps run it on their own territories, and every stage, from mapping to sending, runs end to end on the current build.

## Who did what

<div class="who">
  <div>
    <h3 class="label">Me</h3>
    <p>Designed the pipeline, the agent roles, the model routing and the guardrails. Wrote the rules, tested every stage on live accounts, ran the independent review and supported the other reps.</p>
  </div>
  <div>
    <h3 class="label">The other reps</h3>
    <p>Ran it on their own accounts and surfaced gaps in the ownership rules and setup.</p>
  </div>
  <div>
    <h3 class="label">The AI tools</h3>
    <p>Claude wrote the skills, agents, scripts and board. A separate model reviewed the system read-only.</p>
  </div>
</div>

## Looking back

Building Venture taught me how to work with agents. Give each one a narrow job, the right model and a clear place to write its results, and they're remarkably capable. Don't ask them to remember rules or keep count; that belongs in code. And design the handoffs between them as carefully as the agents themselves, because shared records beat long chat history every time.

The sophistication isn't in any single agent. It's in how the pieces pass work to each other, and in knowing where a person needs to make the call.
