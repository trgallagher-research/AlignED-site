# Phase B Implementation Plan

Phase B addresses user feedback about content framing, consistency, and transparency across the AlignED site. Phase A (completed) removed the composite EAI score. This plan synthesises three sub-plans into a sequenced set of implementation steps with dependencies clearly marked.

---

## Overview

Phase B is organised into five sequential steps. Each step is self-contained and can be committed independently. Steps are ordered so that earlier changes do not need to be revisited during later steps.

| Step | Summary | Files touched | Type |
|------|---------|---------------|------|
| 1 | Data fixes and terminology standardisation | ~15 files | Mechanical find-replace + JSON edit |
| 2 | Navigation restructure (merge Data+Contact, rename Scoring page) | All 13 HTML files | Structural HTML |
| 3 | Content rewrites (homepage, about, methodology hub, results) | ~8 files | Content rewrite (Opus) |
| 4 | Benchmark page fixes and prompt transparency | ~8 files | Mixed: factual corrections + new content (Opus) |
| 5 | Polish: footers, status indicators, version stamp | ~5 files | Structural HTML + short copy |

**Total scope:** All 13 HTML files, 1 JSON file, 1 JS file. Approximately 120-150 individual edits.

---

## Step 1: Data Fixes and Terminology Standardisation

**Why first:** These are factual corrections and renames that affect text across many pages. Doing them first means all later content rewrites start from a correct baseline. No content judgement required; these are mechanical changes.

### 1A. Rename "consistency" to "reliability" in ACARA CJ data and code

**Type:** Mechanical find-replace

**Rationale:** "Consistency" is used on `methodology/dimensions.html` to refer to prompt sensitivity (a different concept). ACARA CJ's "consistency" metric measures test-retest agreement across forward/reverse pair orientations. "Reliability" is the correct psychometric term.

**Files and changes:**

| File | Change |
|------|--------|
| `data/acara_scores.json` | Rename JSON key `"consistency"` to `"reliability"` in all 12 model entries |
| `js/charts.js` | Rename variable `consistencyValues` to `reliabilityValues`; update chart label from "Consistency" to "Reliability"; update tooltip/axis labels |
| `index.html` | Update any chart subtitle or text referencing "consistency" for ACARA CJ (verify: 1 occurrence) |
| `results.html` | Update chart subtitle and key findings text referencing "consistency" (verify: 2 occurrences) |
| `methodology/acara.html` | Update all references to "consistency" that refer to the CJ metric (verify: 6 occurrences) |
| `methodology/index.html` | Update reference to "consistency" in ACARA CJ description (verify: 1 occurrence) |
| `methodology/scoring.html` | Update reference to "consistency" in ACARA CJ scoring description (verify: 1 occurrence) |
| `benchmark-items.html` | Update reference if present (verify: 1 occurrence) |
| `methodology/scenarios.html` | Update if present (verify: 1 occurrence) |
| `data-access.html` | Update if present (verify: 1 occurrence) |

**DO NOT change:** `methodology/dimensions.html` uses "consistency" to refer to prompt sensitivity testing. This is a different concept and must remain as "consistency."

**Definition to use wherever the metric is explained:**
> The percentage of pairs where the model gave the same answer regardless of presentation order (forward vs reverse). This is a test-retest reliability measure.

### 1B. Standardise evaluation names across all pages

**Type:** Mechanical find-replace

**Canonical names and required changes:**

| Canonical name | Wrong name found | File | Line |
|----------------|-----------------|------|------|
| Neuromyth Identification | "Educational Neuroscience Survey" | `benchmark-items.html` | Line 49 (h2 heading) |
| Diagnostic Reasoning | "Classroom Reasoning Scenarios" | `benchmark-items.html` | Line 144 (h2 heading) |
| Diagnostic Reasoning | "Implementation Scenarios" | `methodology/scenarios.html` | Title (line 6), meta description (line 7), h1 (line 35), body text (lines 44, 211) |
| Diagnostic Reasoning | "Implementation Scenarios" | `methodology/neuromyths.html` | "Next" button text (line 146) |
| Diagnostic Reasoning | "Implementation Scenarios" | `methodology/pedagogy.html` | Table reference (line 127) |

**Note:** The methodology page for scenarios (`methodology/scenarios.html`) should keep its filename as `scenarios.html` (no rename needed), but the displayed title and all text references should use "Diagnostic Reasoning."

### 1C. Fix factual errors

**Type:** Mechanical correction

| File | Line | Current (wrong) | Correct |
|------|------|-----------------|---------|
| `benchmark-items.html` | 214 | "GPT-5 and o3 achieve perfect scores (36/36)" | "Claude 4.5 Sonnet, GPT-5, and GPT-5.2 achieve perfect scores (36/36). o3 scored 33/36." (Verify against `data/scenarios_scores.json`) |
| `methodology/index.html` | 142 | "Gemini 2.0–3.0" | "Gemini 2.0–3" (data has Gemini 3 Flash, not Gemini 3.0) |
| `methodology/index.html` | 129 | "32 models from five providers" | Verify: `model_metadata.json` has 32 entries. If correct, this line is fine. The hero paragraph on `index.html` (line 404) says "Up to 31 models per benchmark" which is also correct (31 is the max per single benchmark). No change needed here unless counts have shifted. |

### 1D. Fix "four independent evaluations" framing

**Type:** Mechanical text replacement across multiple files

**Problem:** The site says "four independent evaluations" but shows six charts (pedagogy splits into CDPK + SEND, ACARA splits into CJ + SG). This confuses readers.

**New framing:** "four evaluation areas, six benchmarks"

| File | Location | Change |
|------|----------|--------|
| `index.html` | Line 404, hero paragraph | "Four independent evaluations" becomes "Four evaluation areas, six benchmarks" |
| `about.html` | Line 7, meta description | Update to reference "four evaluation areas" |
| `methodology/index.html` | Line 7, meta description | Update to reference "four evaluation areas" |
| `methodology/index.html` | Line 48, opening paragraph | "four independent evaluations" becomes "four evaluation areas" |
| `results.html` | Line 7, meta description | Update to reference "four evaluation areas" |
| `results.html` | Line 207, intro paragraph | "Four independent evaluations" becomes "Four evaluation areas, six benchmarks" |

---

## Step 2: Navigation Restructure

**Why second:** This step touches the nav and footer of every HTML file. Doing it before content rewrites means the rewrites happen against the final page structure. This step is purely structural HTML and requires no content judgement.

### 2A. Merge data-access.html and contact.html

**Type:** Structural HTML

**Plan:**
1. Rewrite `data-access.html` as "Data & Contact" with these sections:
   - **Open Data** (remove "request access" gating language; data is openly available)
   - **Citation** (how to cite AlignED)
   - **Terms of Use**
   - **Contact** (absorb content from `contact.html`)
   - **Updates** (how to stay informed)
2. Delete `contact.html` after merge
3. Update nav in all 13 HTML files (see nav change table below)

**Content for the rewritten page:** Opus writes the new `data-access.html` content. The key change in tone: data is openly available, not gated behind a request process.

### 2B. Rename scoring.html to "Scoring and Reporting"

**Type:** Structural HTML + content rewrite (Opus)

**Plan:**
1. Change `methodology/scoring.html` title from "Why No Composite Score?" to "Scoring and Reporting"
2. Restructure content:
   - Scoring methods by benchmark (how each benchmark is scored)
   - Different model pools (why each benchmark tests different models)
   - Why results are reported separately (absorb the existing "why no composite" content as a subsection)
3. Update all internal links that reference this page with old title text

**Links to update:**

| File | Current link text | New link text |
|------|------------------|---------------|
| `methodology/index.html` | "Why No Composite Score?" (line 123, heading and link) | "Scoring and Reporting" |
| `about.html` | Any link to scoring.html | Update text |
| `methodology/dimensions.html` | Any link to scoring.html | Update text |

### 2C. Navigation changes (apply across all 13 HTML files)

**Type:** Mechanical HTML edit

**Two nav patterns exist in the codebase:**
- **Pattern A** (`index.html`, `results.html`): `<nav class="navbar">` with `<div class="nav-links">`
- **Pattern B** (all other 11 files): `<header>` with `<nav>` element

**Current nav (7 items):**
```
Home | About | Methodology | Results | Benchmark Items | Data | Contact
```

**New nav (6 items):**
```
Home | About | Methodology | Results | Benchmark Items | Data & Contact
```

**Changes per file (all 13 HTML files):**
1. Remove `<a href="contact.html">Contact</a>` (or `../contact.html` for methodology sub-pages)
2. Change `<a href="data-access.html">Data</a>` to `<a href="data-access.html">Data & Contact</a>` (or `../data-access.html` for methodology sub-pages)

**Footer changes (11 files with full footer, not index.html or results.html):**
1. Remove `<li><a href="contact.html">Contact</a></li>` from footer "Resources" section
2. Update `<a href="data-access.html">Data</a>` to `<a href="data-access.html">Data & Contact</a>` in footer "Navigation" section

**results.html footer:** Currently minimal ("Back to Home" only). Will be upgraded in Step 5.

**index.html footer:** Check whether it has a full footer or minimal. Update accordingly.

---

## Step 3: Content Rewrites

**Why third:** By this point, terminology is correct, evaluation names are standardised, navigation is final, and page structure is settled. Opus can write final copy without worrying about structural changes later.

**All items in Step 3 are content rewrites requiring Opus.** They can be done in parallel (no dependencies between them).

### 3A. Rewrite index.html hero and framing

**Type:** Content rewrite (Opus)

**Changes:**
1. **Hero paragraph** (line 404): Replace "The results vary more than you'd expect" with "Performance on one benchmark does not predict performance on another." (This is a direct substitution, but Opus should review the full paragraph for flow.)
2. **Remove promo card** (lines 407-412): The "Methodology" promo card in the hero section feels like marketing. Remove it. The methodology link is already in the nav.
3. **Add version/date stamp**: Add a small text element below the hero (e.g., "v1.0 | February 2026") to reinforce the "living academic paper" framing.
4. **Add global research notice**: Add a subtle banner or note, either below the nav or at the top of the hero:
   > "AlignED is an active research project. Benchmarks, model pools, and reported results are updated as new evaluations are completed."

### 3B. Rewrite about.html

**Type:** Content rewrite (Opus)

**Current structure:** The problem > Who this is for > What AlignED tests > Limitations > Claims > Planned work

**New structure:**
1. What AlignED is (brief, 2-3 sentences)
2. What it tests (the four evaluation areas)
3. Current status (what is complete, what is in progress, what is planned)
4. Limitations (keep existing, review for accuracy)
5. Claims we do and do not make (keep existing, review)
6. Planned work (fix duplicate bullet, update content)
7. Revision history (new section: a simple changelog, e.g., "Feb 2026: Phase A removed composite EAI score; Phase B restructured content and framing")

**Specific fixes:**
- Fix duplicate bullet in "Planned work" section (identify and remove)
- Update meta description to use "four evaluation areas" (done in Step 1D, but review final wording here)

### 3C. Rewrite methodology/index.html as navigation hub

**Type:** Content rewrite (Opus)

**Problem:** Currently duplicates content with `results.html`. Both list all benchmarks with item counts, model counts, and scoring methods in full paragraph form.

**New structure:**
1. Opening paragraph (what this section covers)
2. Validation protocol (lead with this; currently buried)
   - Keep the Mermaid diagram but annotate tiers with actual completion status
   - Replace "Each benchmark passes through..." with "This is the validation framework AlignED is working towards."
   - Add per-tier status: Tier 1 (partial), Tier 2 (neuromyths only), Tier 3 (sample-based only)
3. Compact benchmark navigation table (not full descriptions; those live on sub-pages)
   - Table columns: Evaluation area | Benchmarks | Items | Models | Scoring | Status
   - Each row links to the relevant sub-page
4. Evaluation framework section (new)
   - Show the 9 evaluation framework components with completion status
   - Reference the framework document
5. Scoring and reporting link (updated from "Why No Composite Score?")
6. Models evaluated (keep, fix Gemini range)
7. Reproducibility (keep existing)

### 3D. Tighten results.html chart subtitles

**Type:** Content rewrite (Opus)

**Problem:** Chart subtitles are 35-42 words each and contain methodology-level detail that belongs on methodology sub-pages, not on a results page.

**Change:** Shorten each chart subtitle to ~15-20 words. Lead with findings, not method. Example:
- Current: "32 items from Dekker et al. (2012): 15 widely-believed myths about the brain and learning, plus 17 verified neuroscience facts. Models must correctly classify each one. 31 models tested. The average teacher scores about 50% on this survey."
- Target: "31 models tested on 32 neuromyth identification items. Human teacher baseline: ~50%."

Apply the same principle to all chart subtitles on `results.html`.

### 3E. Reframe validation protocol honestly

**Type:** Content rewrite (Opus)

**Files:** `methodology/index.html`, `about.html` (brief mention)

**Problem:** The validation protocol section implies all tiers are complete. They are not.

**Changes:**
- Replace aspirational language with honest status reporting
- Opening line: "This is the validation framework AlignED is working towards. Not all tiers are complete for all benchmarks."
- Add per-tier status notes:
  - Tier 1 (Content validation): Partial. Neuromyths items validated against Dekker et al. source. Scenarios reviewed by author. Pedagogy items are an external dataset (not independently validated). ACARA pairs selected from published curriculum samples.
  - Tier 2 (Human benchmarking): Neuromyths only. ~50% teacher baseline from Dekker et al. (2012). No human baseline yet for scenarios, pedagogy, or ACARA.
  - Tier 3 (Reliability testing): Sample-based only. Temperature sensitivity tested on neuromyths and scenarios. ACARA CJ tested with forward/reverse pair orientations. Full test-retest reliability not yet conducted.
- Reference the evaluation framework document

---

## Step 4: Benchmark Pages and Prompt Transparency

**Why fourth:** These changes add new content sections to methodology sub-pages. By this point the navigation, page structure, and terminology are all final.

### 4A. Add prompt templates to methodology sub-pages

**Type:** New content sections (Opus writes the framing text; prompts are quoted verbatim from source files)

**Source directory:** `C:\Users\trgal\AlignED\prompts\`

**Available prompts (confirmed):**
- `survey_system.txt` (for neuromyths)
- `scenario_system.txt` (for diagnostic reasoning scenarios)
- `confidence_probe.txt` (for dimensions/confidence)

**Missing prompts (not in the prompts directory):**
- Pedagogy benchmark prompt (may be embedded in promptfoo config or HuggingFace dataset)
- ACARA CJ prompt
- ACARA SG prompt

**Changes by file:**

| File | Prompt to add | Source |
|------|--------------|--------|
| `methodology/neuromyths.html` | Survey system prompt | `prompts/survey_system.txt` (verbatim) |
| `methodology/scenarios.html` | Scenario system prompt | `prompts/scenario_system.txt` (verbatim) |
| `methodology/dimensions.html` | Confidence probe prompt | `prompts/confidence_probe.txt` (verbatim) |
| `methodology/pedagogy.html` | Pedagogy prompt | **Locate first.** Check `configs/` directory for the prompt. If not found, add a note: "Prompt sourced from the HuggingFace pedagogy-benchmark dataset." |
| `methodology/acara.html` | CJ prompt + SG prompt | **Locate first.** Check ACARA evaluation configs. If not found, note as "available in the project repository." |

**Each prompt section should include:**
- A `<h3>Prompt template</h3>` heading
- A brief sentence of context (Opus writes this)
- The prompt in a `<pre><code>` block (verbatim, no editing)
- A note: "This is the exact system prompt used. No additional instructions are provided to the model."

**Add a note to methodology/index.html:** "All system prompts used in evaluations are published on the relevant methodology sub-pages."

### 4B. Review dimensions.html Composite Robustness Score (CRS)

**Type:** Content review and possible removal (Opus decides)

**Problem:** `methodology/dimensions.html` contains a "Composite Robustness Score (CRS)" section (line 173+) that combines accuracy with robustness measures into a single number. Given that Phase A removed the composite EAI score and the overall project direction is away from composite metrics, this CRS section should be reviewed.

**Options:**
1. Remove the CRS section entirely if it is no longer used or referenced
2. Keep but add a note that this is exploratory and not reported in main results
3. Reframe as a methodological tool rather than a reported metric

**Decision:** Opus reviews the full dimensions.html page and recommends which option to take, then implements it.

### 4C. Fix benchmark-items.html factual errors (from Step 1C)

If not already completed in Step 1, verify and apply the corrections to `benchmark-items.html` line 214 (perfect score claim) and evaluation name headings.

---

## Step 5: Polish

**Why last:** These are cosmetic and structural improvements that do not affect content or data. They are the finishing touches.

### 5A. Upgrade results.html footer

**Type:** Structural HTML

**Current:** Minimal footer with just "Back to Home."

**Target:** Match the full footer pattern used on all other pages (brand, navigation links, resources links). Copy the footer structure from `about.html` and adjust links for the `results.html` path context (no `../` prefix needed since results.html is at root level).

### 5B. Add "last updated" to footer

**Type:** Mechanical HTML edit (all 13 HTML files, or 12 after contact.html deletion)

**Change:** Add "Last updated: February 2026" text to the footer on every page. Placement: below the existing copyright line.

### 5C. Add per-benchmark status indicators to methodology hub

**Type:** Small HTML additions to `methodology/index.html`

**In the compact benchmark navigation table (created in Step 3C), add a status column:**
- Neuromyth Identification: Complete (31 models)
- Diagnostic Reasoning: Complete (7 models)
- Teacher Certification Knowledge (CDPK): Complete (12 models)
- Teacher Certification Knowledge (SEND): Complete (12 models)
- Student Work Judgement (CJ): Complete (12 models)
- Student Work Judgement (SG): Pilot (12 models)

### 5D. Add evaluation framework reference

**Type:** Short content section (Opus)

**File:** `methodology/index.html`

Add a section listing the 9 evaluation framework components with their completion status. Format as a simple table:

| Component | Status |
|-----------|--------|
| (To be filled from the framework document) | Complete / Partial / Planned |

Also add a brief mention in `about.html` "Planned work" section referencing the evaluation framework.

---

## Do Not Change List

These items must remain as they are. They are explicitly excluded from Phase B changes.

1. **`methodology/dimensions.html` use of "consistency"** — This refers to prompt sensitivity (consistency of responses across prompt variations), which is a different concept from the ACARA CJ "consistency" being renamed to "reliability." Do not rename "consistency" on this page.

2. **`data/composite_scores.json`** — Legacy file retained for historical reference. Do not delete or modify.

3. **Chart rendering logic in `js/charts.js`** beyond the consistency-to-reliability rename — Chart layout, colours, sorting, and rendering logic are not in scope for Phase B.

4. **`css/style.css`** — No CSS changes are planned for Phase B. If any are needed for new elements (status badges, prompt code blocks), they should be minimal additions, not refactoring.

5. **Benchmark item content in `benchmark-items.html`** — The actual benchmark items (survey questions, scenario descriptions, rubrics) should not be edited. Only the factual error in line 214 and the evaluation name headings are changed.

6. **Score data in JSON files** (except the `consistency` to `reliability` key rename in `acara_scores.json`) — No score values should be modified.

7. **File names** — No HTML files are renamed. `methodology/scenarios.html` keeps its filename even though the displayed title changes to "Diagnostic Reasoning." `methodology/scoring.html` keeps its filename even though the displayed title changes to "Scoring and Reporting." Only `contact.html` is deleted (content merged into `data-access.html`).

8. **External links and references** — Links to Dekker et al., HuggingFace, and other external sources should not be changed unless they are broken.

9. **The student/teacher distinction framing** — "Most benchmarks test what students should know. AlignED tests how models handle what teachers need to know." This framing is correct and should be preserved wherever it appears.

10. **index.html and results.html inline styles** — These two pages use inline `<style>` blocks rather than the shared `css/style.css`. This architectural choice is not changed in Phase B.

---

## File Impact Summary

| File | Steps affected | Change types |
|------|---------------|--------------|
| `data/acara_scores.json` | 1A | JSON key rename |
| `js/charts.js` | 1A | Variable and label rename |
| `index.html` | 1A, 1D, 2C, 3A, 5B | Rename, text replace, nav, content rewrite, footer |
| `results.html` | 1A, 1D, 2C, 3D, 5A, 5B | Rename, text replace, nav, subtitle rewrite, footer upgrade |
| `about.html` | 1D, 2C, 3B, 5B, 5D | Text replace, nav, full content rewrite, footer |
| `methodology/index.html` | 1A, 1B, 1C, 1D, 2C, 3C, 3E, 4A, 5B, 5C, 5D | Multiple: rename, text, nav, full rewrite, prompts note, status indicators |
| `methodology/acara.html` | 1A, 2C, 4A, 5B | Rename, nav, prompt addition, footer |
| `methodology/scenarios.html` | 1A, 1B, 2C, 4A, 5B | Rename, name standardisation, nav, prompt, footer |
| `methodology/neuromyths.html` | 1B, 2C, 4A, 5B | Name standardisation, nav, prompt, footer |
| `methodology/pedagogy.html` | 1B, 2C, 4A, 5B | Name standardisation, nav, prompt, footer |
| `methodology/dimensions.html` | 2C, 4A, 4B, 5B | Nav, prompt, CRS review, footer |
| `methodology/scoring.html` | 1A, 2B, 2C, 5B | Rename ref, title change + rewrite, nav, footer |
| `benchmark-items.html` | 1A, 1B, 1C, 2C, 5B | Rename, name fix, factual fix, nav, footer |
| `data-access.html` | 1A, 2A, 2C, 5B | Rename, full rewrite (merge contact), nav, footer |
| `contact.html` | 2A | **Deleted** (content merged into data-access.html) |

**Total: 14 HTML files touched (1 deleted), 1 JSON file, 1 JS file = 16 files.**

---

## Change Type Summary

| Type | Count | Description |
|------|-------|-------------|
| Mechanical find-replace | ~50 edits | Consistency→reliability, evaluation names, "four independent evaluations" reframing, factual corrections |
| Structural HTML | ~30 edits | Nav updates (13 files), footer updates (12 files), page merge, footer upgrade |
| Content rewrite (Opus) | ~8 sections | Hero rewrite, about.html restructure, methodology hub rewrite, results subtitles, validation protocol, scoring page, data+contact merge, CRS review |
| New content (Opus) | ~7 sections | Prompt template sections (5 sub-pages), evaluation framework section, revision history |

---

## Implementation Notes

1. **Commit after each step.** Each of the five steps produces a coherent, testable state. Do not batch all changes into a single commit.

2. **Test charts after Step 1A.** After renaming the JSON key and JS variables, open `index.html` and `results.html` in a browser to verify ACARA CJ charts still render correctly with the new "Reliability" label.

3. **Test navigation after Step 2.** After the nav changes, click through every page to verify no broken links. Specifically check that the old `contact.html` URL no longer works (or redirects) and that all nav links resolve correctly from both root-level and methodology sub-pages.

4. **Prompt sourcing for Step 4A.** Three prompts are confirmed in `C:\Users\trgal\AlignED\prompts\`. The pedagogy and ACARA prompts need to be located. Check `C:\Users\trgal\AlignED\configs\` for promptfoo YAML files that may contain these prompts inline. If they cannot be found, note their absence on the relevant methodology pages rather than inventing them.

5. **Model count verification.** `model_metadata.json` contains 32 entries. `methodology/index.html` line 129 says "32 models" which is correct. `index.html` line 404 says "Up to 31 models per benchmark" which is also correct (31 is the largest single-benchmark pool). No change needed. If a discrepancy is discovered during implementation, update the text to match the data.

6. **British/Australian spelling.** All new copy must use British/Australian spelling per the site's CLAUDE.md writing rules (prioritise, recognise, organisation, behaviour, etc.).

7. **Epistemic precision.** All new copy must follow the site's epistemic precision rules. Report what was measured. Do not overclaim. See CLAUDE.md for the full constraint set.

---

## Addendum: Quality Review Corrections (12 Feb 2026)

A final quality review of this plan against the original 14 feedback items and data files found the following issues. These must be corrected during implementation.

### Correction 1: Step 5C model counts are wrong

The status table in Step 5C contains three incorrect model counts. The correct values from the data files are:

| Benchmark | Plan says | Data file says | Correct value |
|-----------|-----------|----------------|---------------|
| Diagnostic Reasoning | Complete (7 models) | `scenarios_scores.json` has `n_models: 30` | **Complete (30 models)** |
| Teacher Certification Knowledge (CDPK) | Complete (12 models) | `pedagogy_scores.json` has `n_models: 23` | **Complete (23 models)** |
| Teacher Certification Knowledge (SEND) | Complete (12 models) | `pedagogy_scores.json` has `n_models: 23` | **Complete (23 models)** |
| Student Work Judgement (SG) | Pilot (12 models) | `acara_standards_grading_scores.json` has `n_models: 7` | **Pilot (7 models)** |

The corrected Step 5C status table should be:

- Neuromyth Identification: Complete (31 models)
- Diagnostic Reasoning: Complete (30 models)
- Teacher Certification Knowledge (CDPK): Complete (23 models)
- Teacher Certification Knowledge (SEND): Complete (23 models)
- Student Work Judgement (CJ): Complete (12 models)
- Student Work Judgement (SG): Pilot (7 models)

### Correction 2: "Living academic paper" framing is not threaded consistently

Feedback item 13 asks for the site to be reframed as a "living academic paper." The plan addresses this partially through the version stamp (Step 3A), revision history (Step 3B), and global research notice (Step 3A). However, the "living academic paper" concept is not explicitly referenced in the content rewrite instructions for:

- **Step 3B (about.html):** The rewrite should frame AlignED as a living document that is updated as new evaluations are completed, not a static report.
- **Step 3C (methodology/index.html):** The hub page should reinforce the living-document framing, e.g., "This methodology section describes the current state of each evaluation. It is updated as benchmarks are added or revised."
- **Step 3D (results.html):** The results page should include a brief note that results are updated as new models and evaluations are added.

**Action:** When executing Steps 3B, 3C, and 3D, explicitly include language that frames the site as a living document with versioned updates.

### Correction 3: "Work in progress" framing needs broader coverage

Feedback item 9 says "everything should say work in progress." The plan adds a global research notice to `index.html` (Step 3A) and per-benchmark status indicators to `methodology/index.html` (Step 5C). But the following pages have no explicit "active research project" or "work in progress" language added:

- **results.html:** Should include a brief note (e.g., at the top of the results section) that this is an active research project and results are updated as new evaluations are completed.
- **benchmark-items.html:** Should note that the benchmark suite is under active development.
- **data-access.html:** The rewrite in Step 2A should mention that the dataset grows as new evaluations are added.

**Action:** Add a brief "active research project" note to results.html (Step 3D), benchmark-items.html (Step 4C or a new sub-step), and data-access.html (Step 2A).

### Correction 4: Implementation Note 5 needs updating

Implementation Note 5 says "Up to 31 models per benchmark" is correct because 31 is the largest single-benchmark pool. However, with the scenarios benchmark now at 30 models (up from an earlier count), the maximum per benchmark is 31 (neuromyths). This is still correct, but the note should acknowledge the updated scenario count for clarity. If scenarios were to add one more model, the "Up to 31" claim on the homepage would need to become "Up to 31" still, or be updated to match. No change is needed now, but this is worth verifying at implementation time.

### Verification: All 14 feedback items are addressed

| # | Feedback item | Where addressed | Status |
|---|---------------|-----------------|--------|
| 1 | Six evals, not "four independent evaluations" | Step 1D | Covered |
| 2 | Remove "The results vary more than you'd expect" | Step 3A | Covered |
| 3 | Results/methodology too similar | Steps 3C, 3D | Covered |
| 4 | ACARA CJ "consistency" should be "reliability" | Step 1A | Covered |
| 5 | About page has old content | Step 3B | Covered |
| 6 | Validation protocol is aspirational | Step 3E | Covered |
| 7 | "Why No Composite Score?" is unnecessary | Step 2B | Covered |
| 8 | Data access page content is wrong | Step 2A | Covered |
| 9 | Everything should say "work in progress" | Steps 3A, 5B, 5C + Correction 3 above | Covered (with correction) |
| 10 | Developing reliability/validity metrics from framework | Steps 3C, 5D | Covered |
| 11 | Benchmark items page accuracy | Steps 1B, 1C, 4C | Covered |
| 12 | Data and contact pages combined | Step 2A | Covered |
| 13 | Reframe as living academic paper | Steps 3A, 3B + Correction 2 above | Covered (with correction) |
| 14 | Be transparent about prompts used | Step 4A | Covered |

### Conclusion

The plan is ready for implementation with the corrections above applied. No circular dependencies. No contradictions between steps. No missing file changes beyond the corrections noted. Implementation order is correct.
