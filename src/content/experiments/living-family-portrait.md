---
title: The Living Family Portrait
number: 2
drawer: personal
highlight: 1
case_status: Complete
type: Hardware
date: 2026-11-13
summary: "Someone could spend a day in the room and notice nothing. That’s the magic."
lesson: "Make requirements explicit, keep decisions inspectable, and verify the result where it will actually be used."
description: "A framed e-paper portrait that responds to real weather, time, and seasons. Powered by a Raspberry Pi, with a custom visual editor for arranging the scene."
concepts: [Hardware, Claude Code, APIs, State, E-paper]
thumb: /experiments/portrait/portrait-thumb.jpg
draft: false
---

<!-- Copied verbatim from the reviewed Site Draft (portrait-publish-kit). The HTML around the
     text only sets layout: figures, collapsible technical notes, the pull quote, columns. -->

<p class="hook">Someone could spend a day in the room and notice nothing. That’s the magic.</p>

I wanted a living portrait, like something out of Harry Potter: a framed picture of my family and our house where people quietly move to new spots, day turns to night, and when it rains outside, it rains in the picture.

The finished portrait runs on a Raspberry Pi and a color e-paper display. Behind the artwork are three weather integrations, a custom visual editor, a placement engine, and a display-specific image pipeline.

Nothing animates. Between changes, the picture sits still, like a print. Then you look up and someone is standing in a window.

<figure class="fig">
  <img src="/experiments/portrait/portrait-frame-photo.jpg" width="1600" height="1200" fetchpriority="high" alt="Photo of the framed e-paper portrait hanging on a wall: the illustrated house in fall colors with pumpkins on the porch, family members in the windows, and the dog on the lawn.">
  <figcaption><span class="kind">Photo</span> The actual frame on the wall. House number blurred.</figcaption>
</figure>

<p class="jump"><a href="#refresh">Watch the physical display refresh ↓</a></p>

<section class="glance" aria-labelledby="at-a-glance">
<h2 id="at-a-glance" class="label">At a glance</h2>
<dl>
  <div><dt>Result</dt><dd>A completed, autonomous family portrait, with seasonal additions since launch.</dd></div>
  <div><dt>Build</dt><dd>Six weeks to the first finished version.</dd></div>
  <div><dt>Hardware</dt><dd>Raspberry Pi 4 and a 13.3-inch Waveshare Spectra 6 e-paper display.</dd></div>
  <div><dt>My role</dt><dd>Concept, requirements, art direction, hardware setup, integration evaluation, placement calibration, and acceptance testing.</dd></div>
  <div><dt>Development</dt><dd>AI-assisted implementation using ChatGPT, Codex, and Claude Code.</dd></div>
</dl>
<p class="own">I decided how it would work and what it would do. The coding agents wrote how the code executed, and an artist created the family and house artwork.</p>
</section>

## A day in the picture

<figure class="fig grid4">
  <div><img src="/experiments/portrait/portrait-day.jpg" width="1200" height="900" loading="lazy" alt="Software render of an ordinary day: family members spread around the yard and the porch of the illustrated house."><span class="label">Day</span></div>
  <div><img src="/experiments/portrait/portrait-rain.jpg" width="1200" height="900" loading="lazy" alt="Software render of the fall scene with rain falling and the family inside at the windows."><span class="label">Rain</span></div>
  <div><img src="/experiments/portrait/portrait-night.jpg" width="1200" height="900" loading="lazy" alt="Software render of the house at night: dark sky, warm lit windows, and a figure inside."><span class="label">Night</span></div>
  <div><img src="/experiments/portrait/portrait-snow.jpg" width="1200" height="900" loading="lazy" alt="Software render of a winter scene with snow on the roof and the ground, and the family posed in front of the house."><span class="label">Snow</span></div>
  <figcaption><span class="kind">Software renders</span> The same compositor the Pi uses. House number blanked.</figcaption>
</figure>

Family members appear around the house and yard during the day and move inside at night. Weather changes where they can stand. Snow can stay on the ground after it stops falling. Trees change with the season, and holidays bring decorations and a posed family portrait.

Movement usually happens at intervals of one to two hours, with occasional holds. I wanted an object that quietly belongs in a room, with enough variation to keep surprising us.

## Intentional choices

<div class="calls">

- **Still scenes instead of animation.** I originally imagined animated characters, but commissioning the artwork made me rethink what that would involve. I wanted something that felt like a magical framed picture. The paper-doll approach fit: separately drawn characters appear in new positions between refreshes, then stay still long enough that you might not notice anything changed.
- **E-paper, not a screen.** We all know what a screen looks like. The backlight gives it away. When I found the Waveshare color panel, there was really no way I could not use it.
- **Commissioned art, not generated.** A real artist drew my family. The software only arranges it.
- **Judge it on the real panel.** The monitor preview didn’t predict color or contrast, so every visual decision got made looking at the frame.
- **Replaced Codex.** It couldn’t work out how to put multiple characters on the screen. It kept placing them in the same spot, as if they were one image. Claude Code finished the job.

</div>

## How the pieces fit together

The software follows a clear sequence:

<div class="steps">

1. Collect weather, time, and calendar information.
2. Apply rules for the scene and each family member.
3. Choose compatible positions from locations I calibrated.
4. Compose the layered artwork into a 1600 × 1200 image.
5. Convert the image for the panel’s six-color palette.
6. Refresh the display only when the final output changes.

</div>

The running portrait does not use an LLM. AI helped build the software; the appliance follows defined rules and composes prepared artwork.

<details class="tech">
<summary><span class="label">Technical notes</span> The main components</summary>

| Technology | Purpose |
|---|---|
| Python | Application logic, scene rules, and runtime control. |
| Flask | The local Portrait Studio web application. |
| Pillow | Image composition shared by Studio and the Pi. |
| Open-Meteo, Tomorrow.io, and NWS | External weather inputs. |
| Node and EPDOptimize | Display-specific color conversion. |
| Waveshare’s driver | Communication with the physical panel. |
| systemd | Running the portrait as a service on the Pi. |

</details>

## Connecting three weather services

One weather source did not meet every requirement, so the portrait combines three:

- **Open-Meteo** provides background weather, solar and timezone information, and ground snowpack.
- **Tomorrow.io** provides active precipitation.
- **The National Weather Service** provides severe-weather warnings.

The application normalizes these inputs before the scene rules use them. Rendering code doesn’t need to know which provider supplied a weather fact.

That separation became useful when it rained outside but the portrait stayed dry. We traced the problem back through the system and tested the provider requests directly. The picture was accurately displaying data that didn’t match the conditions outside.

An initial Tomorrow.io request also reported dry conditions. Its current Timelines endpoint matched the observed rain and became the source for active precipitation. Open-Meteo retained its other responsibilities.

The fix was a targeted integration change. We could replace the source of one input without rebuilding the scene engine or renderer.

It also changed how I evaluate integrations: a successful response is only the beginning. The data has to support the behavior the product promises.

## Portrait Studio: the application behind the art

Before the portrait could arrange everyone automatically, I needed a way to define what a believable arrangement looked like.

That became Portrait Studio, a local browser application for positioning characters and preparing approved compositions. Building it was one of the largest parts of the project. It also damn near killed me.

<figure class="fig">
  <img src="/experiments/portrait/portrait-studio.jpg" width="1600" height="967" loading="lazy" alt="Screenshot of Portrait Studio: the scene canvas with one dog figure selected in a yard position, beside a panel of controls for the approved slot, position label, figure picker, portrait mode, scenery and decoration layout.">
  <figcaption><span class="kind">Screenshot</span> Portrait Studio, the editor I used to place and approve every location.</figcaption>
</figure>

A location needed more than coordinates. Each figure had to match the perspective, stand at the right height, and appear behind the correct parts of the house. Different characters and dog poses did not fit every location equally well.

I directed an editing workflow that grew to include:

<details class="tech">
<summary><span class="label">Technical notes</span> Studio’s editing features</summary>

- Dragging and fine-position adjustments.
- Scale, perspective, and depth controls.
- Window regions and foreground masking.
- Multiple visible characters with independent selection.
- Character-to-location compatibility review.
- Saved calibration, working revisions, and production approval.
- A posed family composition alongside normal ambient placement.
- Runtime previews for inspecting automatically generated scenes.

</details>

Studio uses the same Pillow compositor and image dimensions as the Pi. That lets me review the actual composition path rather than approving a separate browser approximation.

The runtime preview also made the automatic system inspectable. I could see the generated arrangement and examine why characters were placed, retained, or hidden before relying on it on the physical display.

I spent about a week calibrating the locations. The software could check whether a placement was allowed; I still had to decide whether it looked right.

The hardest lesson was that I had specified the finished portrait more clearly than the tool needed to build it. Selection, placement, window handling, and saving all required repeated clarification. I would map that workflow much earlier next time.

## Making the artwork work on e-paper

When the replacement panel finally displayed the image, the colors looked washed out.

The source artwork used full RGB color. The Waveshare panel had six native colors. Getting a good result required a better conversion between the two.

I spent roughly two days investigating the output and evaluating a new conversion path. We integrated EPDOptimize, running through Node, between the Python compositor and the Waveshare driver.

<ol class="pipe">
  <li>Pillow creates the scene.</li>
  <li>EPDOptimize prepares it for the panel’s palette.</li>
  <li>The Waveshare driver writes it to the display.</li>
</ol>

<figure class="fig pair">
  <div><img src="/experiments/portrait/portrait-rgb.jpg" width="1200" height="900" loading="lazy" alt="Software render of the fall scene in full RGB color, as designed on a monitor."><span class="label">Full RGB</span></div>
  <div><img src="/experiments/portrait/portrait-six-color.jpg" width="1200" height="900" loading="lazy" alt="The same fall scene converted to the panel’s six colors: louder greens and purples, with visible dithering grain."><span class="label">Six-color conversion</span></div>
  <figcaption><span class="kind">Software conversions</span> The same scene before and after conversion to the panel’s six colors. Not panel photos.</figcaption>
</figure>

The accepted configuration used palette matching and Floyd–Steinberg dithering, which represents additional tones through patterns of the available colors. We compared options on the actual panel, rejected unsuitable results, and pinned the accepted version and settings.

That gave the project a repeatable color pipeline across development and the Pi. From there, I could tune night lighting and small-character outlines against a consistent baseline.

This was one of the clearest examples of software and hardware needing to be evaluated together. A correct RGB image—and a passing test—didn’t guarantee a readable physical picture.

## Making it run without attention

Once the picture looked right, it needed to remain stable without a browser open or someone supervising it.

Several details mattered:

- Persistent state preserves the scene and movement timing across restarts.
- A single placement solver accounts for compatibility, occupied locations, and existing assignments.
- When no valid move is available, the scene can hold its current arrangement.
- Rain requires 30 dry minutes to clear, preventing one dry reading from immediately changing the picture.
- Falling snow and accumulated snow are tracked separately.
- Comparing the final panel output avoids unnecessary refresh flashes.
- A single display writer controls physical updates.

These behaviors are easy to overlook in a demo. They matter much more in something that runs continuously in your home.

## What broke

<div class="broke">

| Symptom | Cause | Fix |
|---|---|---|
| A yellow screen and two days of troubleshooting | The first panel was defective | Replaced the panel |
| The artwork arrived as one flat image | I hadn’t specified separate layers with transparent backgrounds | Worked with the artist to get the required files |
| Characters fell through window frames; placement took endless tweaking | Their placement edits were set up wrong, and I hadn’t mapped out how the placement tool needed to work | Reworked Studio so I could place, scale and review each character |
| Old behavior kept interfering | The original CSS system was still there after we changed direction | Removed the old path |
| Small figures washed out; night scenes were too dark | The monitor preview didn’t predict how the e-paper panel would look | Tested color, lighting, and outlines on the actual display |
| It rained outside, but not in the portrait | The selected weather data wasn’t reporting the rain I could see | Investigated the requests and changed the source for active precipitation |

</div>

## What the build taught me

### Specify the tools as carefully as the result

Portrait Studio took more work than I expected because I hadn’t fully defined how I needed to edit and review the artwork. The same issue appeared when the first art delivery arrived as a flat image: I hadn’t specified separate transparent layers.

Both problems came from assumptions that should have been explicit requirements.

### Make the real system observable

Early in the build, I used separate AI reviews to check implementation claims. Later, runtime previews, diagnostics, and physical testing gave me more direct ways to evaluate behavior.

I couldn’t personally verify every line of code. I could define expected outcomes, inspect the system’s decisions, and reject results that didn’t meet the requirement.

### Test at the point where the result matters

The first display was defective. Weather data missed rain I could see outside. Monitor previews hid problems with color and night readability.

Each failure required checking a different boundary: hardware, external data, or physical output. More tests in the wrong part of the system would not have resolved them.

## The moment it felt finished

The first successful image on the panel was a relief. Once the characters moved correctly on the real hardware, I could breathe—and the project got fun.

<figure class="fig" id="refresh">
  <video controls muted playsinline preload="metadata" width="1280" height="720" poster="/experiments/portrait/portrait-refresh-poster.jpg" aria-label="Video of the framed e-paper panel refreshing on the wall: it flashes through solid colors, then settles on the new scene.">
    <source src="/experiments/portrait/portrait-refresh.mp4" type="video/mp4">
  </video>
  <figcaption><span class="kind">Video</span> A real refresh on the wall. House number blurred.</figcaption>
</figure>

<blockquote class="quote"><p>On October 1, the leaves turned orange on their own.</p></blockquote>

Nobody touched it. The calendar, scene rules, artwork, and display had done exactly what they were supposed to do.

Since then, I’ve added Halloween decorations and a Thanksgiving turkey, with Christmas artwork in progress. The core experience remains the same: a quiet picture that occasionally gives someone a reason to look twice.

<figure class="fig pair">
  <div><img src="/experiments/portrait/portrait-halloween.jpg" width="1200" height="900" loading="lazy" alt="Software render of the portrait in fall with pumpkins and Halloween decorations on the porch."><span class="label">Halloween</span></div>
  <div><img src="/experiments/portrait/portrait-thanksgiving.jpg" width="1200" height="900" loading="lazy" alt="Software render of the portrait with a Happy Thanksgiving banner and a turkey in a top hat on the lawn."><span class="label">Thanksgiving</span></div>
  <figcaption><span class="kind">Software renders</span> House number blanked.</figcaption>
</figure>

## Who did what

<div class="who">
  <div>
    <h3 class="label">Me</h3>
    <p>Defined the concept and features, directed the artwork, selected and set up the hardware, specified the editing workflow, calibrated placements, evaluated integration behavior, and reviewed the physical results.</p>
  </div>
  <div>
    <h3 class="label">The artist</h3>
    <p>Created the family and house artwork and supplied the separate assets needed for composition.</p>
  </div>
  <div>
    <h3 class="label">The AI tools</h3>
    <p>ChatGPT helped translate my direction into work instructions. Codex, followed by Claude Code, chose implementation approaches and wrote the software. Checkpoints preserved decisions and progress between development conversations.</p>
  </div>
</div>

## Looking back

I started with a picture in my head and very little experience deploying software to hardware. Finishing it meant learning to work with Linux and SSH, connect external services, direct the development of an editing application, and test a system whose final output was a physical object.

The portrait is almost exactly what I imagined. The most useful thing I took from it was a more disciplined way to build: make requirements explicit, keep decisions inspectable, and verify the result where it will actually be used.
