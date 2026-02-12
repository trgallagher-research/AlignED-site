# AlignED Site Guidelines

## Project Overview

AlignED is an independent benchmarking platform that evaluates AI model performance on tasks related to professional teaching knowledge. This is a static HTML/CSS/JS site hosted on GitHub Pages. No build tools, no templating. Text is written directly in each page's HTML file.

## File Structure

- Homepage: index.html (has inline styles)
- Results: results.html (has inline styles)
- About: about.html
- Benchmark Items: benchmark-items.html
- Data Access: data-access.html
- Contact: contact.html
- Methodology hub: methodology/index.html
- Methodology sub-pages: methodology/neuromyths.html, scenarios.html, pedagogy.html, acara.html, dimensions.html, scoring.html
- Shared styles: css/style.css (used by all pages except index.html and results.html)
- Charts: js/charts.js
- Methodology sub-page: methodology/scoring.html is now "Why No Composite Score?"
- Data: data/neuromyths_scores.json, data/scenarios_scores.json, data/pedagogy_scores.json, data/acara_scores.json, data/acara_standards_grading_scores.json, data/model_metadata.json
- Legacy: data/composite_scores.json (no longer referenced; retained for historical reference)

## Writing Rules (MUST follow for all copy changes)

### Epistemic Precision (most important rule)

AlignED exists because overclaiming is common in EdTech. The website must not do the same.

What AlignED does: benchmarks how models respond to specific tasks related to professional teaching knowledge. What it does NOT do (never claim or imply): determine whether a model "understands" education, certify safety or suitability, prove a model "can teach" or "knows how learning works", or replace professional judgement.

General principle: Report what was measured. Let the reader draw the inference.

| Never write | Write instead |
|-------------|---------------|
| "Model X understands pedagogy" | "Model X scored 34/36 on diagnostic scenarios" |
| "Tests whether AI knows how learning works" | "Tests how models handle tasks related to professional teaching knowledge" |
| "Ensures educational safety" | "Provides benchmark data to inform decisions" |

### Tone

- Short, confident sentences. Vary sentence length.
- Active voice. Be direct about limitations.
- Trust the reader's intelligence.
- Lead with findings, not methodology on results pages.
- Use British/Australian spelling (prioritise, recognise, organisation, behaviour).

### AI Slop Blacklist

DO NOT USE any of the following:

Punctuation: Em dashes as all-purpose connectors (max one per page, zero is fine). Excessive colons. Semicolons as sentence glue.

Phrasing: "It's not X, it's Y" / "Not just X, but Y". "In today's rapidly evolving...". "It's worth noting that...". "This is particularly important because...". "Whether you're a teacher, a policymaker, or a developer...". "The short answer is...". "Here's the thing:". "Let's dive in" / "Let's explore" / "Let's unpack". "At the end of the day". "Importantly," / "Crucially," / "Notably,".

Words: Groundbreaking, Revolutionary, Ensure, Empower, Leverage, Harness, Holistic, Cutting-edge, State-of-the-art, Stakeholders, Ecosystem, Deep dive, Robust (as general praise; fine when referring to temperature robustness as a measured property), Genuine/Genuinely.

Structural: Don't use rhetorical questions for every section header. Mix with declarative headers. Don't repeat "complementary" when describing ACARA. Say it once.

### The Student/Teacher Distinction

This is AlignED's key framing: "Most benchmarks test what students should know. AlignED tests how models handle what teachers need to know." Use it to orient the reader, then move to specifics. Do not build the entire site narrative around this single sentence.

### Footer Tagline (all pages)

Use: "Benchmarking AI performance on professional teaching tasks."
Do NOT use: "Evaluating AI alignment with educational research evidence."
