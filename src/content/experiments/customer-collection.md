---
title: "The Customer Collection"
number: 5
drawer: work
highlight: 1
case_status: Complete
type: Work tool
date: 2026-10-26
summary: "A searchable customer index that joins public catalogues with CRM data. Built at a company hackathon, distributed to the entire sales team, and handed to engineering with a reproducible build kit."
description: "A searchable customer index that joins public catalogues with CRM data. Built at a company hackathon, distributed to the entire sales team, and handed to engineering with a reproducible build kit."
concepts: ["Data pipelines", "CRM", "Deterministic search"]
thumb: /experiments/customer-collection/demo.png
draft: false
---

Every few weeks someone in sales, marketing or customer success asked the same thing in chat. “Which customers already do this?” We’d answer it, then somebody would ask again.

Our hackathon team built a search page that could answer with an actual customer and the exact item they offered. I led the team during the hackathon. Afterward, I built out the worldwide version and packaged it so engineering could rebuild the file.

<figure class="fig">
  <img src="/experiments/customer-collection/demo.png" width="1280" height="800" fetchpriority="high" alt="A fictional customer collection searched for 'bike rental', showing six matching customers with filters for type, region, integrations and resources.">
  <figcaption><span class="kind">Screenshot</span> The real search tool, rebranded and loaded with fictional customers. Demonstration data.</figcaption>
</figure>

<section class="glance" aria-labelledby="at-a-glance">
<h2 id="at-a-glance" class="label">At a glance</h2>
<dl>
  <div><dt>Result</dt><dd>Won the company hackathon, distributed to the entire sales team, and handed off to engineering.</dd></div>
  <div><dt>Build</dt><dd>Public catalogues and CRM data, a Python build, and search in a single HTML file.</dd></div>
  <div><dt>My role</dt><dd>Team facilitation, requirements, data sources, worldwide build, verification and handoff.</dd></div>
</dl>
</section>

## What using it looks like

A rep searches for an offering and narrows the results by region or integration. Each match shows the catalogue item behind it. That gives the rep something specific to check while they’re preparing a call or running a demo.

## Intentional choices

I wanted somebody on a call to be able to check the answer. Search ranks and filters the records in the file using fixed rules. The model helped collect and organize the data during the build. The search itself runs in the browser.

I kept missing fields visible. If we couldn’t establish that a customer used a particular integration, I wanted the rep to see a gap.

## How it works

1. At the hackathon, we started with customer records from the CRM and worked out how to find their public catalogue pages.
2. For the worldwide build, I used a site list from engineering alongside CRM exports and collected catalogues.
3. The build joined records, cleaned item names, grouped variants and assigned search terms. I used review lists to spot missing CRM matches and items that fell outside the search vocabulary.
4. Python bundled the data and search logic into one HTML file. The browser searches the included records and displays the evidence for a match.

<details class="tech">
<summary><span class="label">Technical notes</span> Details</summary>

The standard-library Python build works from saved inputs without a network connection. A SHA-256 check compares the rebuilt HTML with the shipped file. The browser tests cover multilingual search, filters and how missing information is shown.

</details>

## The question we would answer wrong

In the hackathon demo, I showed a filter that returned almost nothing for an integration we knew customers used. We hadn’t found usable public pages for some of the customers using it. The search did what we asked. The coverage was the problem.

I said so in the pitch. It also told us what to fix. An authoritative export could cover records that public pages left out.

## What broke

Similar items landed in the wrong categories, so we audited the taxonomy. Some catalogue records had no CRM match, so I kept a list of unmatched records for review. A downloaded file would also go stale as customers and offerings changed. That became a reason to pursue an auto-updating version.

## What it taught me

A search result is only as good as the records behind it. I’d check coverage on a question I knew the answer to before showing somebody the cleanest demo.

## Where it stands

We built it first for the US team. The head of sales then asked to expand it to the entire sales team, and the CEO asked to send it to engineering as an auto-updating version. I gave engineering the build kit and update instructions.

## Who did what

<div class="who">
  <div>
    <h3 class="label">Me</h3>
    <p>Led the hackathon team, refined the spec, identified the data sources, built the worldwide version with AI, and prepared the handoff.</p>
  </div>
  <div>
    <h3 class="label">The team</h3>
    <p>Brought the original idea and use cases, helped set the scope and checked the results.</p>
  </div>
  <div>
    <h3 class="label">The AI tools</h3>
    <p>Helped collect and classify catalogues and wrote the build scripts and browser interface.</p>
  </div>
</div>

## Looking back

The handoff was the point where it stopped being a file only I knew how to make. I’d build the verification step earlier next time.
