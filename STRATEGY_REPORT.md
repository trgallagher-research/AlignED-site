# AlignED Strategic Report: Site Quality, Growth, and Professional Leverage

**Date:** 7 February 2026
**Prepared for:** Solo researcher managing AlignED with AI assistance
**Scope:** Site quality assessment, follow-up benchmarks, traffic strategy, monetisation path, implementation roadmap
**Sources:** Synthesised from five independent analyses of the AlignED site

---

## 1. Executive Summary

AlignED occupies a genuinely empty niche. There is no other independent, transparent benchmarking platform that evaluates AI models specifically on professional teaching tasks. Existing AI education benchmarks (MMLU, ARC, HellaSwag) test what students should know. AlignED tests how models handle what teachers need to know. That distinction is real, it is defensible, and it matters to a growing audience of education policymakers, EdTech procurement teams, and researchers studying AI in schools.

The site itself is already in good shape. The writing is epistemically disciplined, the methodology is transparent, and the data is presented without the overclaiming that plagues most AI-in-education commentary. The benchmark design (neuromyths, diagnostic scenarios, certification items, student work judgement) is thoughtful and covers multiple dimensions of teaching knowledge. The recent copy rewrite brought the language into tighter alignment with what AlignED actually measures. These are real strengths.

The gap is distribution, not quality. AlignED has a strong product with no audience infrastructure. There is no email list, no social media presence, no academic pre-print, and no SEO strategy. The site publishes excellent work and waits for people to find it. The strategic opportunity is to build a distribution engine around content that already exists, then layer on new benchmarks and commentary that generate recurring traffic. The path from current state to professionally valuable asset requires roughly 5-10 hours per week for 6 months, with the first measurable results appearing within 4-8 weeks.

---

## 2. Site Quality Assessment

### Overall Writing Quality

The writing across the site is strong. It avoids the overclaiming and breathless language common in AI-education spaces. The tone is confident without being promotional. The site reads like it was written by someone who understands both the research literature and the practical limitations of benchmark data. Specific strengths include:

- The "Stories from the data" section on the benchmark items page (Q21 contested item, Q15 vs Q27 learning styles trap) is the best writing on the entire site. It demonstrates intellectual honesty and domain expertise simultaneously.
- The limitations section on the about page is unusually thorough for a benchmarking project. Acknowledging training data contamination, LLM-as-judge bias, cultural specificity, and preliminary weighting builds credibility.
- The separation of ACARA from the main composite, with a clear rationale for why, shows methodological care.

### Prioritised Editorial Fixes

#### Critical (fix this week)

**1. Footer tagline inconsistency.**

The CLAUDE.md specifies the canonical tagline as: "Benchmarking AI performance on professional teaching tasks." Every footer on the site currently uses the old tagline "Transparent benchmarks for AI in education" instead. The index.html footer concatenates both phrases. Standardise all footers to the canonical tagline.

Files affected (12 total):
- `about.html` line 106
- `benchmark-items.html` line 301
- `contact.html` line 61
- `data-access.html` line 99
- `index.html` line 540 (concatenated: uses both old and new taglines together)
- `methodology/index.html` line 177
- `methodology/neuromyths.html` line 159
- `methodology/scenarios.html` line 232
- `methodology/pedagogy.html` line 174
- `methodology/acara.html` line 156
- `methodology/dimensions.html` line 196
- `methodology/scoring.html` line 230

**2. Meta descriptions using outdated or overclaiming language.**

Three pages have meta descriptions that violate the site's epistemic framing rules:

- `about.html` line 7: `"Learn why evaluating AI alignment with educational research evidence matters for responsible AI deployment in education."` This uses the exact phrasing CLAUDE.md says never to use. Replace with something like: `"What AlignED tests, who it's for, and the limits of what benchmark data can tell you about AI in education."`

- `methodology/index.html` line 7: `"How AlignED benchmarks are constructed, scored, and validated. Transparent methodology for evaluating AI alignment with educational research."` The phrase "evaluating AI alignment with educational research" overclaims. Replace with: `"How AlignED benchmarks are constructed, administered, and scored. Full methodology for testing AI performance on professional teaching tasks."`

- `index.html` line 7: `"AlignED tests whether AI responses align with evidence-based educational research. Educational Alignment Index rankings for 21 AI models."` The phrase "tests whether AI responses align with evidence-based educational research" implies AlignED measures alignment with the research base generally, rather than performance on specific benchmark items. Replace with: `"AlignED benchmarks 21 AI models on tasks related to professional teaching knowledge. Educational Alignment Index rankings and results."`

**3. Broken HTML in scenarios.html footer.**

Line 248 has a malformed list item. The `<a>` tag is missing its opening `<li>`:
```
<a href="https://github.com/trgallagher-research/AlignED-site" target="_blank">GitHub</a></li>
```
Should be:
```
<li><a href="https://github.com/trgallagher-research/AlignED-site" target="_blank">GitHub</a></li>
```
- File: `methodology/scenarios.html` line 248

**4. Naming inconsistency: "tasks" vs "knowledge."**

The CLAUDE.md recently changed from "teaching knowledge" to "teaching tasks." Some pages still use the old framing:
- `about.html` line 55: "four areas related to professional teaching" (missing "tasks" or "knowledge")
- `index.html` line 6 (title): "Transparent benchmarks for AI in education" (should reference professional teaching tasks)

The hero copy on index.html (line 403) correctly says "professional teaching tasks." Standardise on "tasks related to professional teaching knowledge" or "professional teaching tasks" across all pages.

**5. No favicon.**

The local server returns 404 for `favicon.ico`. This affects browser tabs, bookmarks, and professional appearance. Add a simple favicon to the root directory.

#### Epistemic Precision Flags

These are instances where the site's language overclaims, anthropomorphises, or implies causation beyond what the data supports. Each violates AlignED's core editorial principle: report what was measured, let the reader draw the inference.

**EP-1. "Robust knowledge" in about.html (line 67).**
Text: "High scores may partly reflect memorisation rather than robust knowledge."
Problem: "Robust knowledge" implies AlignED can distinguish knowledge from memorisation. The benchmark cannot make that distinction. It measures correct responses to items.
Fix: "High scores may partly reflect memorisation rather than consistent capability across contexts."

**EP-2. "Robust knowledge or surface-level pattern matching" in dimensions.html (line 44).**
Text: "AlignED evaluates multiple dimensions to reveal whether correct responses reflect robust knowledge or surface-level pattern matching."
Problem: Same issue. AlignED's robustness probes (temperature, prompt framings) test response stability, not whether a model "knows" something. The language implies a knowledge/memorisation distinction the benchmark cannot make.
Fix: "AlignED evaluates multiple dimensions to test whether correct responses remain stable across temperature settings and prompt framings."

**EP-3. "Educational knowledge, once learned, is relatively stable" in dimensions.html (line 86).**
Text: "This suggests that educational knowledge, once learned, is relatively stable."
Problem: Anthropomorphises the model. Models do not "learn" knowledge in the way this sentence implies. Temperature robustness tells us about response consistency, not about the nature of what a model has absorbed.
Fix: "This suggests that model responses on these items are largely unaffected by temperature variation."

**EP-4. "Suggesting deliberate reasoning improves judgement stability" in acara.html (line 136).**
Text: "Several reasoning-focused models (o3, Claude 4 Sonnet) show high consistency (92%), suggesting deliberate reasoning improves judgement stability."
Problem: Implies causation. The correlation between reasoning-focused architecture and consistency does not establish that "deliberate reasoning" causes improved stability.
Fix: "Several reasoning-focused models (o3, Claude 4 Sonnet) show high consistency (92%)."

**EP-5. "A potential gap in training data" in results.html (line 302).**
Text: "Models generally score lower on inclusive education than general pedagogy, a potential gap in training data."
Problem: Speculates about the cause (training data gaps) without evidence. Lower SEND scores could reflect item difficulty, cultural specificity, or other factors.
Fix: "Models generally score lower on inclusive education than general pedagogy."

**EP-6. "Suggesting factual neuroscience knowledge is relatively strong" in results.html (line 240).**
Text: "Several mid-tier models score above 85%, suggesting factual neuroscience knowledge is relatively strong across providers."
Problem: Attributes "knowledge" to models. The data shows high accuracy on these items, not "knowledge."
Fix: "Several mid-tier models score above 85% on these items."

**EP-7. "Suggesting general pedagogical knowledge is more evenly distributed" in results.html (line 284).**
Text: "The gap between top and bottom is smaller here than on other benchmarks, suggesting general pedagogical knowledge is more evenly distributed across models."
Problem: Same anthropomorphisation pattern.
Fix: "The gap between top and bottom is smaller here than on other benchmarks."

**EP-8. "EAI scores indicate alignment with research evidence" in scoring.html (line 205).**
Text: "EAI scores indicate alignment with research evidence as measured by these specific benchmarks."
Problem: Uses the "alignment with research evidence" phrasing that the CLAUDE.md explicitly prohibits.
Fix: "EAI scores reflect performance on these specific benchmark tasks. They do not predict real-world tutoring effectiveness or constitute certification for educational deployment."

**EP-9. "Suggesting strong position-invariance" in results.html (line 326).**
Text: "GPT-5 has the highest consistency (94.1%) but not the highest accuracy, suggesting strong position-invariance."
Problem: Minor. "Suggesting" is fine here since it describes a property of the responses rather than attributing cognition, but the phrasing could be tighter.
Fix: "GPT-5 has the highest consistency (94.1%) but not the highest accuracy."

**EP-10. "Suggesting position bias in its judgements" in results.html (line 327).**
Text: "Gemini 3 Flash shows a notable accuracy-consistency gap (81% vs 69%), suggesting position bias in its judgements."
Problem: "Its judgements" anthropomorphises. These are response patterns, not judgements.
Fix: "Gemini 3 Flash shows a notable accuracy-consistency gap (81% vs 69%), consistent with position bias in its responses."

#### Important (fix this month)

**6. Mobile navigation hidden on index.html and results.html.**

These two pages use a different header structure (inline styles, `.nav-links` class) from the other pages (shared CSS, `nav` element with `.nav-toggle` button). On mobile, the CSS rule at `index.html` line 373-375 and `results.html` line 145-147 sets `.nav-links { display: none; }`. There is no hamburger menu. Mobile users on the two most important pages have no way to navigate.
- Files: `index.html` (line 373-375), `results.html` (line 145-147)

**7. Broken anchor link to Limitations.**

The results.html page links to `about.html#limitations` (line 377) but there is no `id="limitations"` attribute on the Limitations heading in about.html (line 64). The link lands at the top of the page.
- File: `about.html` line 64 (add `id="limitations"` to the h2)
- Also: `data-access.html` line 78 links to `about.html#limitations` and is similarly broken.

**8. Disconnected audience list on homepage.**

The line at `index.html` lines 422 reads: "Teachers evaluating AI tools. Leaders making procurement decisions. Developers choosing which model to build on. Policymakers setting the standards." This sits below the benchmark description without a heading or transition. It reads as a sentence fragment. Give it a subheading ("Who uses this data") or integrate it into the preceding paragraph.

**9. Dual copyright / footer text inconsistencies.**

Pages using the shared CSS have `"All rights reserved"` in their footer (e.g., `about.html` line 126, `contact.html` line 81, and all methodology sub-pages). The index.html footer says `"Data hosted on OSF"` (line 566). The results.html footer says `"Data hosted on OSF. Back to Home"` (line 392). Pick one standard footer line and use it everywhere.

**10. No Open Graph / Twitter Card meta tags.**

When someone shares an AlignED link on social media or Slack, there is no preview image, title, or description. Add these to at least `index.html` and `results.html`:

```html
<!-- Open Graph -->
<meta property="og:title" content="AlignED - Benchmarking AI on Professional Teaching Tasks">
<meta property="og:description" content="We tested 21 AI models on neuromyth identification, diagnostic reasoning, and teacher certification knowledge. See the rankings.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://trgallagher-research.github.io/AlignED-site/">
<meta property="og:image" content="https://trgallagher-research.github.io/AlignED-site/images/og-preview.png">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="AlignED - Benchmarking AI on Professional Teaching Tasks">
<meta name="twitter:description" content="We tested 21 AI models on neuromyth identification, diagnostic reasoning, and teacher certification knowledge. See the rankings.">
<meta name="twitter:image" content="https://trgallagher-research.github.io/AlignED-site/images/og-preview.png">
```

You will need to create an OG preview image (1200x630px). A simple branded card with the AlignED name and "21 AI models tested on professional teaching tasks" is sufficient.

**11. Em dash usage.**

The CLAUDE.md limits em dashes to a maximum of one per page, with zero being preferred. The HTML files use `&mdash;` in `benchmark-items.html` (3 occurrences: lines 54, 85, 184). These are all in section headings (e.g., "15 items &mdash; correct answer: False"). Consider replacing with colons or restructuring the headings.

#### Nice-to-Have (fix when convenient)

**12. Inline CSS duplication.** Both `index.html` and `results.html` have extensive inline styles that overlap with `css/style.css`. Consolidating to a single stylesheet would reduce maintenance burden. Not urgent.

**13. Chart accessibility.** The Chart.js canvases have no aria-labels or text alternatives. Screen readers get nothing from the charts. Adding a visually-hidden data table beneath each chart would improve accessibility and give search engines indexable content.

**14. Copyright line.** "All rights reserved" may be misleading given that data is available via OSF. Consider a simple copyright notice or Creative Commons attribution for site content, with a separate note about data terms.

**15. HuggingFace link.** The link on `benchmark-items.html` line 222 points to the generic HuggingFace datasets page rather than the specific pedagogy-benchmark dataset. Update to the direct URL.

**16. Page titles on methodology sub-pages.** Most are fine but could be more descriptive for search engines:
- `methodology/dimensions.html` line 6: "Evaluation Dimensions - AlignED Methodology" is adequate but "Temperature Robustness, Prompt Sensitivity, and Calibration - AlignED" would be more searchable.
- `methodology/scoring.html` line 6: "Educational Alignment Index (EAI) Scoring - AlignED Methodology" is good.

---

## 3. Follow-Up Benchmarks (Ranked Top 10)

The following ten benchmarks are ranked by a combination of strategic value (does it generate attention and serve a clear audience?), feasibility (can a solo researcher build it with AI assistance?), and additive value (does it measure something AlignED does not already cover?). This list was compiled from three independent analyses, with duplicates merged and the strongest framing from each retained.

### 1. Lesson Planning Quality

**What it tests:** Give models a curriculum objective, year level, and student context. Ask them to produce a lesson plan. Score against a rubric covering learning objectives, sequencing, differentiation, assessment alignment, and curriculum fidelity.

**Why it ranks first:** Lesson planning is the single most common use case for AI in schools. Teachers, school leaders, EdTech companies, and curriculum authorities all want to know which model produces better plans. A benchmark that ranks models on lesson plan quality would be the most shareable, most cited, and most traffic-generating addition to AlignED. It also directly tests curriculum-aligned output, which strengthens the connection to ACARA and other national frameworks.

**Feasibility:** Medium. The rubric is the hard part. Use published curriculum frameworks (Australian Curriculum, English National Curriculum) to create 15-20 prompts covering different subjects and year levels. Scoring will need LLM-as-judge with a well-calibrated rubric. Build on the existing judge infrastructure from the scenarios benchmark.

**Data sources:** Custom prompts based on published curriculum frameworks. No external dataset needed.

### 2. Feedback Quality on Student Work

**What it tests:** Present models with student writing or mathematics work, plus a marking rubric. Ask the model to provide formative feedback. Score against criteria: specificity (does it point to concrete elements?), actionability (does it tell the student what to do next?), tone (is it encouraging without being dishonest?), and rubric alignment (does it reference the assessment criteria?).

**Why it ranks second:** AI-generated feedback on student work is one of the fastest-growing use cases in education. Many EdTech tools already offer this. Teachers and administrators need to know which models give better feedback. The practical relevance is immediate.

**Feasibility:** Medium. Requires curating student work samples (ACARA portfolio samples could be repurposed). The rubric for evaluating feedback quality is the challenging part, but published feedback frameworks (Hattie and Timperley, Sadler) provide a starting point.

**Data sources:** ACARA work samples (already in use). Published writing assessment rubrics (NAPLAN, SATs). Mathematics assessment exemplars.

### 3. Misconception Identification by Subject Area

**What it tests:** Present models with common student misconceptions in specific subjects (mathematics, science, English/literacy). Test whether the model can identify the misconception, explain why students hold it, and suggest targeted instructional responses.

**Why it ranks third:** Subject-specific teaching knowledge is what most teachers actually need from AI tools. The current AlignED benchmarks test cross-domain knowledge. Adding subject-specific modules would make the benchmark more practically relevant and attract subject-teacher audiences. Each subject becomes a separate publishable sub-benchmark, multiplying content opportunities.

**Feasibility:** Medium. Misconception databases exist for maths and science (Diagnostic Questions platform, AAAS Project 2061, NCTM common student errors). Building a 50-100 item set per subject is achievable.

**Data sources:** Published misconception research. Diagnostic Questions platform. AAAS Science Assessment Items. NCTM literature.

### 4. Wellbeing and Pastoral Support (Sensitive Student Disclosures)

**What it tests:** Present models with realistic student welfare scenarios: bullying disclosure, mental health concerns, mandated reporting situations, self-harm indicators. Evaluate whether responses follow appropriate protocols, avoid armchair diagnosis, recommend professional referral where appropriate, and maintain confidentiality boundaries.

**Why it ranks fourth:** This is the highest-stakes area for AI in education. A model that gives bad advice about a student welfare concern can cause real harm. Policymakers and child safety advocates would pay close attention to a benchmark in this space. Media interest would be strong.

**Feasibility:** Medium-high. Scenarios are straightforward to write (based on published government guidance documents). The evaluation rubric draws on mandatory reporting frameworks and school counselling protocols. The sensitivity of the topic requires extra care in framing and in how results are communicated publicly.

**Data sources:** Government mandatory reporting guidelines (varies by jurisdiction). School counselling protocol documents. Published guidance from child protection agencies.

### 5. Differentiation and Adaptive Teaching

**What it tests:** Present models with a classroom scenario containing students at different ability levels. Ask the model to differentiate an activity for three tiers (below, at, and above expected level). Score against criteria: appropriateness of challenge, maintaining the same learning objective across tiers, scaffolding quality, and practical implementability.

**Feasibility:** Medium. Scenario design is manageable. Evaluation rubric needs careful calibration to distinguish genuinely differentiated tasks from superficial modifications (e.g., "give the struggling students fewer questions" is not differentiation).

**Data sources:** Published differentiation frameworks (Tomlinson). Curriculum documents with differentiation guidance.

### 6. Cross-Cultural Pedagogical Knowledge Expansion

**What it tests:** Replicate the existing CDPK/SEND benchmark using teacher certification items from other countries. UK QTS items, Australian AITSL standards, US Praxis exam items. Compare model performance across cultural contexts.

**Why it matters:** The current pedagogy benchmark uses Chilean items, which the site honestly acknowledges as a limitation. Expanding to UK, Australian, and US contexts strengthens generalisability and makes the benchmark directly relevant to those national audiences.

**Feasibility:** Medium. The main challenge is sourcing items. Some teacher certification exams publish sample questions; others are proprietary. UK QTS skills tests have been archived but sample items exist. US Praxis practice tests have publicly available subsets. Australian AITSL standards documents could be adapted into assessment items.

### 7. Assessment Item Quality

**What it tests:** Give models a curriculum standard and ask them to generate assessment items (multiple-choice, short-answer, or rubric-based). Score the items against established assessment design criteria: alignment with the standard, appropriate cognitive demand (Bloom's/Webb's DOK), absence of bias, clear wording, defensible answer key.

**Why it matters:** Teachers increasingly use AI to generate quizzes and tests. Poor assessment items (ambiguous wording, wrong answer keys, trivial cognitive demand) are a real risk. This benchmark would attract assessment specialists and curriculum authorities.

**Feasibility:** Medium-high. Assessment quality rubrics are well-established in the literature.

### 8. Parent Communication

**What it tests:** Present models with scenarios requiring parent/carer communication: explaining a child's learning difficulty, responding to a complaint about a classroom incident, drafting a report card comment. Score for professionalism, accuracy, appropriate tone, and avoidance of jargon.

**Why it matters:** Parent communication is a significant time burden for teachers. Many teachers are already using AI to draft these communications. A benchmark would reveal quality differences across models.

**Feasibility:** High. Scenarios are easy to design. Evaluation can use a combination of rubric scoring and LLM-as-judge.

### 9. Multi-Turn Instructional Dialogue

**What it tests:** Engage models in multi-turn conversations simulating a teacher asking for help planning a unit, then asking follow-up questions, then challenging a suggestion. Evaluate whether the model maintains coherence, adapts to new information, and does not contradict earlier responses.

**Why it matters:** Real AI use in education is conversational, not single-turn. A model that gives a good first answer but contradicts itself on follow-up is not practically useful.

**Feasibility:** Low-medium. Multi-turn evaluation is technically more complex. Scoring rubrics are harder to standardise.

### 10. Educational Research Literacy

**What it tests:** Present models with summaries of educational research studies (real and fabricated). Test whether the model can identify methodological flaws, distinguish correlation from causation, evaluate sample sizes, and spot p-hacking or HARKing.

**Why it matters:** AI models are increasingly used to help teachers and leaders interpret research. If a model cannot distinguish a well-designed RCT from a poorly controlled quasi-experiment, it will give misleading advice about "what works."

**Feasibility:** High. Items are straightforward to create. Binary or rubric-based scoring is manageable. Could include fabricated studies to test critical evaluation.

**Priority rationale:** Academically interesting and builds researcher credibility, but the audience is narrower than lesson planning or feedback quality.

---

## 4. Traffic and Growth Strategy

### The Core Insight

AlignED's traffic problem is not a content problem. The site has substantial, original, well-presented content that does not exist anywhere else on the internet. The problem is that this content is locked inside a static GitHub Pages site with no distribution mechanism.

The strategy is: extract shareable findings from existing data, distribute them through the right channels, and use new benchmark releases as recurring traffic events.

### Viral Content: Seven Findings Ranked by Shareability

Before building distribution channels, know what you are distributing. These are the seven most shareable findings from the existing data, ranked by expected engagement:

1. **"No AI model ever expressed uncertainty, even when wrong."** This is the single most attention-grabbing finding. It speaks to AI safety, overconfidence, and trust. Every audience cares about this: teachers, researchers, journalists, policymakers. Lead with it.

2. **"We tested 21 AI models on what teachers need to know. Here's the ranking."** The ranking itself is inherently shareable. People want to see where their preferred model lands.

3. **"The best model for pedagogical knowledge (#1 on 920 certification items) ranks only #14 overall."** This counterintuitive finding (Gemini 2.5 Pro) challenges the assumption that good performance on one task predicts good performance on others.

4. **"93% of teachers believe learning styles work. How did AI models do?"** The learning styles myth is the most widely-known neuromyth. Connecting it to AI performance creates an irresistible hook for education audiences.

5. **"Thinking models use 3x more tokens without always scoring higher."** Cost matters. Schools and EdTech companies making procurement decisions need to know that more expensive does not always mean better.

6. **"A 31-point gap separates the best and worst AI models on teaching knowledge."** The magnitude of the gap is the story. Not all models are created equal.

7. **"The cheapest models fail hardest on inclusive education."** This finding has equity implications that attract policy attention.

### Audience-Specific Hooks

Different audiences need different entry points. Tailor the pitch:

**Teachers and school leaders:** "Before you let AI write your lesson plans, see how it handles what teachers need to know. Some models can't even identify common neuromyths."

**Researchers:** "AlignED provides the first open, reproducible benchmark for AI performance on professional teaching tasks. All data on OSF. All items published."

**Journalists:** "We tested 21 AI models on professional teaching knowledge. No model ever admitted uncertainty, even when wrong. What does that mean for schools?"

**EdTech companies:** "Which model should power your education product? AlignED benchmarks 21 models across four dimensions of teaching knowledge. The results may change your architecture decisions."

**Policymakers:** "Governments are writing AI-in-education guidelines without data on which models actually perform well on teaching tasks. AlignED provides that data."

### Definitive Channel Ranking

Work the first three channels before adding others.

**1. LinkedIn (Primary)**

The target audience (education leaders, EdTech product managers, education researchers, AI policy people) lives on LinkedIn. Education-AI content performs well because the audience is professionally motivated and the topic generates genuine debate.

Format: Short-form posts (300-600 words) with a single finding, chart screenshot, and link to the full results. One post per week minimum.

Expected reach: 500-2,000 impressions per post within the first month, scaling to 5,000-15,000 with consistent posting and engagement.

First three posts (use the findings ranked above):
- Post 1: "We tested 21 AI models on what teachers need to know. Here's the ranking."
- Post 2: "No AI model ever expressed uncertainty, even when wrong. Here's what that means for schools."
- Post 3: "The best model for pedagogical knowledge (#1 on 920 certification items) ranks only #14 overall. Why?"

**2. Academic pre-print (one-time, high leverage)**

A pre-print on EdArXiv, SSRN, or arXiv (cs.CY) provides the single highest-credibility signal AlignED can create. It makes the benchmark citable, discoverable by researchers, and legitimate in policy discussions. It also generates a permanent backlink.

Format: A 15-25 page paper describing the benchmark methodology, results, and limitations. The site content already contains 80% of the text needed. An AI assistant can help structure and format it.

Expected impact: 500-2,000 downloads in the first year. Citations in policy documents and other research. A permanent foundation for credibility.

**3. Education-technology newsletters and publications**

Targeted publications (e.g., EdSurge, THE Journal, SchoolNews Australia, Teacher Magazine, Tes) reach the exact audience that needs this data. A well-pitched article or data piece can reach 50,000+ readers in a single placement.

Format: Pitch 2-3 publications with a "we benchmarked 21 AI models on what teachers need to know" angle. Offer to write a guest piece or provide exclusive data for an article.

Expected impact: One successful placement in a major education publication would generate more traffic than months of social media posting.

**4. X/Twitter (Secondary)**

The AI research community and education policy discussion happens here. Useful for threading interesting findings and building visibility among AI researchers.

Format: Short threads (3-5 posts) highlighting counterintuitive findings. Tag relevant researchers and organisations.

**5. Email list (build from month 2)**

An email list is the only traffic channel you own. Social media algorithms change; email subscribers are yours permanently. Even a small list (200-500 subscribers) of the right people is extremely valuable.

Tool: Buttondown (free for up to 100 subscribers, simple, respects privacy). Alternative: Substack (free, but they own your audience relationship).

Placement: A single line on the homepage, below the charts and above the footer:
> "New models and benchmarks as we publish them. No spam, no schedule."
> [Email input] [Subscribe]

**6. Academic conferences and webinars (from month 3)**

Submit abstracts to relevant conferences (AERA, BERA, ISTE, or national education technology conferences). Offer to present at university seminars or EdTech meetups.

### Technical SEO: Complete Specification

**Robots.txt** (create at site root):
```
User-agent: *
Allow: /
Sitemap: https://trgallagher-research.github.io/AlignED-site/sitemap.xml
```

**Sitemap.xml** (create at site root): Include all 13 HTML pages with `<lastmod>` dates and `<priority>` values. Homepage and results get priority 1.0; methodology hub gets 0.8; sub-pages get 0.6.

**Structured data (JSON-LD)** for `index.html`:
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AlignED",
  "url": "https://trgallagher-research.github.io/AlignED-site/",
  "description": "Independent benchmarks for AI model performance on professional teaching tasks"
}
</script>
```

And a separate Dataset schema for the data:
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "AlignED Educational Alignment Index",
  "description": "Benchmark scores for 21 AI models across educational neuroscience, diagnostic reasoning, pedagogical knowledge, and student work judgement tasks",
  "url": "https://trgallagher-research.github.io/AlignED-site/data-access.html",
  "license": "https://trgallagher-research.github.io/AlignED-site/data-access.html",
  "creator": {
    "@type": "Organization",
    "name": "AlignED"
  }
}
</script>
```

**Page title recommendations:**
- `index.html`: "AlignED - AI Benchmark for Professional Teaching Tasks" (currently uses "Transparent benchmarks for AI in education" which is the deprecated tagline)
- `results.html`: fine as-is ("Evaluation Results - AlignED")
- `about.html`: fine as-is
- Methodology sub-pages: consider more descriptive titles for search (see Nice-to-Have #16)

**Canonical URLs:** Add `<link rel="canonical" href="...">` to every page to prevent any duplicate content issues if the site is accessed via both `github.io` and a future custom domain.

**Full technical SEO checklist:**

| Item | Effort | Current State |
|------|--------|---------------|
| Add/update meta descriptions on all pages | 1 hour | Three pages have outdated/overclaiming descriptions |
| Add Open Graph and Twitter Card tags to index.html and results.html | 30 minutes | Missing entirely |
| Add favicon.ico | 15 minutes | Returns 404 |
| Add sitemap.xml | 30 minutes | Missing |
| Add robots.txt | 10 minutes | Missing |
| Add structured data (JSON-LD) for organisation and dataset | 1 hour | Missing |
| Fix #limitations anchor on about.html | 5 minutes | Broken link from results.html and data-access.html |
| Confirm all pages have unique, descriptive title tags | 30 minutes | Mostly good; index.html and some methodology pages could improve |
| Add canonical URLs to all pages | 20 minutes | Missing |
| Add alt text/aria-labels to chart canvases | 30 minutes | Missing |

**Total estimated SEO effort: 4-5 hours.** All of this can be done with AI assistance in a single session.

### Growth Milestones

| Milestone | Target Date | Metric |
|-----------|-------------|--------|
| Technical SEO complete | Week 1 | All items in SEO checklist done |
| First LinkedIn post published | Week 2 | Post live with chart screenshot |
| 500 unique monthly visitors | Month 1 | Google Analytics or Plausible |
| Pre-print uploaded | Month 2 | Live on EdArXiv/SSRN |
| First external publication mention | Month 2-3 | Article in an education publication |
| 50 email subscribers | Month 2 | Buttondown dashboard |
| 2,000 unique monthly visitors | Month 3 | Analytics |
| First conference abstract submitted | Month 3 | Submission confirmation |
| 200 email subscribers | Month 5 | Buttondown |
| 5,000 unique monthly visitors | Month 6 | Analytics |
| First new benchmark released | Month 4-5 | Live on site |

---

## 5. Monetisation and Professional Leverage Path

AlignED's primary value in the first 12 months is not revenue. It is professional positioning. The site establishes you as the person who runs the only independent benchmark for AI in education. That position has significant professional value.

### Month 1-2: Foundation

**Revenue:** $0. This phase is about technical quality and distribution setup.

**Professional value:** Site is technically sound. First LinkedIn posts establish presence. Pre-print is in progress.

**Traffic target:** 200-500 unique visitors/month.

### Month 3-4: Visibility

**Revenue potential:** $2,000-5,000 AUD from a single consulting engagement (e.g., a half-day workshop for a school district on "how to evaluate AI tools for education"). This becomes available once the pre-print is published and you have a visible LinkedIn presence.

**Specific opportunities:**
- Consulting for education departments and school systems making AI procurement decisions. Position yourself as available for paid advisory sessions. Rate: $1,000-2,500 AUD per half-day.
- Conference speaking invitations. A published pre-print and a visible benchmark make invitations likely. Initial speaking is unpaid (building credibility), but travel costs may be covered.

**Traffic target:** 1,000-2,000 unique visitors/month.
**Subscribers:** 50-100.

### Month 5-6: Authority

**Revenue potential:** $5,000-10,000 AUD cumulative from consulting and early speaking fees.

**Specific opportunities:**
- Speaking fees: $500-2,000 AUD per engagement at education conferences, university seminars, and EdTech events.
- Grant applications: A published benchmark with documented methodology, a pre-print, and external citations is a strong foundation for grant applications. Education research grants (ARC Discovery in Australia, ESRC in UK, IES in US) fund exactly this kind of work. A typical small grant is $30,000-80,000 AUD.
- Sponsorship (proceed cautiously): If an EdTech company or AI provider wants to sponsor new benchmark development, this is viable but requires strict independence safeguards. The sponsor's models must be evaluated on the same terms as everyone else.

**Traffic target:** 3,000-5,000 unique visitors/month.
**Subscribers:** 200-500.

### Month 12: Established Platform

**Revenue potential:** $5,000-20,000 AUD in year one, depending on how actively you pursue consulting and speaking.

**Specific opportunities:**
- Paid reports: A "State of AI in Education" annual report, with more depth than the free site content, could be sold for $500-2,000 per copy to institutional buyers (education departments, school systems, EdTech companies).
- Advisory board positions: EdTech companies and education bodies seek advisors who understand AI capabilities. Running the benchmark positions you for paid advisory roles ($5,000-15,000 AUD/year per board).
- Academic career: AlignED provides a publication record, a unique dataset, an established research programme, and a professional network. Strong foundation for a PhD application, postdoctoral position, or research fellowship.

**Traffic target:** 5,000-10,000 unique visitors/month.
**Subscribers:** 500-1,000.

---

## 6. Implementation Roadmap

### Week 1 (8-10 hours)

| Action | AI-Assisted? | Expected Outcome |
|--------|-------------|------------------|
| Fix all Critical editorial issues (section 2, items 1-5) | Yes | Clean, consistent site copy |
| Fix all 10 epistemic precision flags (EP-1 through EP-10) | Yes | Language matches what AlignED actually measures |
| Add favicon.ico | Yes | Professional browser tab appearance |
| Add sitemap.xml and robots.txt | Yes | Search engine crawlability |
| Add Open Graph and Twitter Card meta tags to index.html and results.html | Yes | Social media link previews work |
| Fix broken HTML in scenarios.html footer (item 3) | Yes | Valid HTML |
| Fix #limitations anchor on about.html (item 7) | Yes | Internal link works |
| Create LinkedIn account/page for AlignED (or decide to use personal profile) | No | Distribution channel ready |
| Write first 3 LinkedIn posts (drafts, using the viral findings list) | Yes (AI drafts, you edit) | Content stockpile |

### Week 2 (6-8 hours)

| Action | AI-Assisted? | Expected Outcome |
|--------|-------------|------------------|
| Fix all Important editorial issues (items 6-11) | Yes | Polished site with working mobile nav |
| Update meta descriptions on all pages | Yes | Accurate search snippets |
| Add structured data (JSON-LD) for organisation and dataset | Yes | Rich search results |
| Add canonical URLs to all pages | Yes | No duplicate content risk |
| Publish LinkedIn post #1 | No (you post) | First public distribution |
| Outline pre-print structure (introduction, method, results, discussion, limitations) | Yes (AI drafts outline) | Academic paper roadmap |
| Research 5 education-tech publications to pitch | No | Pitch target list |

### Week 3 (6-8 hours)

| Action | AI-Assisted? | Expected Outcome |
|--------|-------------|------------------|
| Begin drafting pre-print sections (methodology and results) | Yes (AI drafts from site content) | 60% of paper drafted |
| Publish LinkedIn post #2 | No | Continued visibility |
| Draft pitch email for 1-2 education publications | Yes (AI drafts, you personalise) | Outreach ready |
| Set up Buttondown account and email signup embed | Yes | Email capture infrastructure |
| Create OG preview image (1200x630px) | Yes (AI assists with design spec) | Social sharing looks professional |

### Week 4 (6-8 hours)

| Action | AI-Assisted? | Expected Outcome |
|--------|-------------|------------------|
| Complete pre-print first draft | Yes | Full draft ready for review |
| Add email signup form to homepage | Yes | Capturing interested visitors |
| Publish LinkedIn post #3 | No | Consistent presence |
| Send first publication pitch | No | Outreach initiated |
| Plan first "insight piece" for the site (deeper analysis of existing data) | Yes | Content pipeline for month 2 |
| Set up Google Search Console | Yes | Indexing visibility |

**Dependency chain:** Favicon, meta tags, and OG tags must be done before LinkedIn posting begins (so shared links look professional). Pre-print outline must be done before drafting begins. Email signup should be live before any publication placement drives traffic.

### Month 2 (20-25 hours total)

- Finalise and submit pre-print to EdArXiv/SSRN
- LinkedIn: 1 post per week (4 posts), using remaining findings from the viral content list
- Publish first insight piece on the site (e.g., "What the learning styles trap tells us about AI knowledge" or "Why the cheapest models fail hardest on inclusive education")
- Follow up on publication pitches; send 1-2 more if needed
- Begin designing Lesson Planning Quality benchmark rubric
- Review and respond to any email signups or contact form messages
- Check Google Search Console for indexing issues
- Install privacy-respecting analytics (Plausible or Umami) to track traffic

### Month 3 (20-25 hours total)

- LinkedIn: 1 post per week (4 posts)
- Publish second insight piece
- Complete Lesson Planning Quality benchmark design (rubric + 15-20 prompts across subjects and year levels)
- Pilot-test lesson planning benchmark on 3-5 models
- Submit abstract to one education/technology conference (BERA, AERA, ISTE, or a national conference)
- Send first email update to subscribers (if list > 50)
- Begin planning Feedback Quality benchmark

### Month 4-6 (15-20 hours/month)

- Release Lesson Planning Quality benchmark results (with new site page)
- LinkedIn announcement + publish findings
- Update composite scores if new models have been released
- Continue weekly LinkedIn posting
- Attend or present at one conference/webinar
- Begin building Feedback Quality and/or Misconception Identification benchmarks
- Grow email list toward 200 subscribers
- Evaluate first consulting opportunity if one arises
- If pre-print has been downloaded 200+ times, consider submitting to a peer-reviewed journal

---

## 7. Risks and Mitigations

### 1. Training data contamination undermines benchmark validity

**Risk:** As AlignED publishes its items (particularly the neuromyths and scenarios), future model training runs may include them. Scores would then reflect memorisation rather than capability.

**Mitigation:** Already acknowledged on the site. For new benchmarks, keep some items unpublished (a "held-out" set). Report scores on both published and held-out items separately. This is standard practice in benchmark design.

### 2. Solo operator burnout

**Risk:** 5-10 hours per week is sustainable, but only if the work is structured and expectations are realistic. The biggest risk is trying to do everything at once and burning out by month 3.

**Mitigation:** The roadmap above is deliberately sequenced. Do the technical fixes first (they are quick and AI-assisted). Then build the distribution channel. Then add new benchmarks. Do not try to build three new benchmarks while also writing a pre-print while also posting on LinkedIn daily. One thing at a time.

### 3. A major benchmarking organisation enters the space

**Risk:** Google, OpenAI, or a well-funded academic group could publish their own "AI in education" benchmark. This would reduce AlignED's uniqueness.

**Mitigation:** AlignED's independence is its permanent advantage. A benchmark run by an AI company will always face conflict-of-interest questions. AlignED does not. A major player entering the space would actually validate the category and likely drive more attention to AlignED as the independent alternative. Move quickly to establish the brand and academic record before this happens.

### 4. LLM-as-judge scoring is challenged

**Risk:** Using Claude 4.5 Sonnet as the judge for scenarios means the scoring is only as good as that model's evaluation capability. Critics could argue the judge is biased toward certain response styles.

**Mitigation:** Already partially addressed by manual validation of a sample. Strengthen by: (a) publishing the validation results (agreement rate, kappa), (b) testing with a second judge model and reporting inter-judge agreement, (c) expanding the manual validation sample with each new benchmark release.

### 5. Low traffic despite effort

**Risk:** Traffic growth is slow and the 6-month targets seem out of reach.

**Mitigation:** The pre-print and publication pitches are the highest-leverage traffic actions. If LinkedIn posting yields limited results, do not abandon it but recognise that organic social growth is slow. The pre-print and a single good publication placement will generate more traffic than 3 months of LinkedIn posts. Prioritise those.

### 6. Credibility questioned due to lack of institutional affiliation

**Risk:** Being a solo researcher without a university affiliation may reduce perceived credibility in some academic contexts.

**Mitigation:** The pre-print, open data on OSF, transparent methodology, and published limitations all build credibility independently of affiliation. Many respected benchmarks (Chatbot Arena, Open LLM Leaderboard) were created by small teams or individuals. If institutional affiliation becomes important, seek a visiting researcher position at a university education faculty.

---

## 8. The Business Case

### Why invest time in AlignED?

AlignED is the only independent platform that benchmarks AI models on what teachers need to know. There is no competitor. The question is not whether this niche matters (it does, and it will matter more as AI deployment in schools accelerates) but whether the opportunity justifies the time investment.

### What is the expected return?

The return is not primarily financial in year one. It is positional. Running AlignED establishes you as the person who created the standard benchmark for AI in education. That position generates:

- **Academic capital:** A pre-print, conference presentations, and a growing citation count. These are the building blocks of a research career, a PhD application, or a grant proposal.
- **Professional opportunities:** Consulting engagements ($2,000-5,000 per half-day), advisory board positions, speaking invitations ($500-2,000 per engagement), and job offers in education-AI policy or research.
- **A growing asset:** The email list, the traffic, the brand recognition, and the data all compound over time. AlignED becomes more valuable the longer it runs, because longitudinal benchmark data (tracking model improvement over time) is something no one else will have.
- **Potential revenue from month 3-4:** Paid consulting, sponsored benchmark expansions (with independence safeguards), annual reports for institutional buyers, and eventually grant funding. Realistic year-one revenue range: $5,000-20,000 AUD, depending on how actively you pursue consulting and speaking.

### What is the minimum viable effort?

**5 hours per week for 6 months.** That is the minimum to:
- Fix the site technically (week 1-2)
- Start LinkedIn distribution (week 2 onward)
- Publish one pre-print (month 1-2)
- Add one new benchmark (month 3-5)
- Build an email list to 200 subscribers (month 3-6)

If you can invest 8-10 hours per week, the timeline compresses and the outcomes improve. But 5 hours is the floor.

### Three things to do this week

These are the three highest-leverage actions you can take right now. Each takes under 2 hours with AI assistance.

1. **Fix the footer tagline and meta descriptions.** This is a 30-minute AI-assisted task that brings the entire site into alignment with your editorial rules. Every page footer, every meta description, every instance of the deprecated "alignment with educational research evidence" phrasing. Do it in one session.

2. **Add the OG tags and favicon.** Another 30-minute task. Until this is done, every link you share on LinkedIn or Slack looks unprofessional (no preview image, no description, no branded tab icon). This blocks all distribution work.

3. **Draft your first LinkedIn post.** Use Finding #1 from the viral content list: "No AI model ever expressed uncertainty, even when wrong." Write 300 words. Include a screenshot of the confidence calibration data. Link to the results page. Do not overthink it. The goal is to break the zero and establish that AlignED exists in public.

### The decision framework

Invest the time if:
- You want to build a professional identity in education-AI research
- You find the benchmark design work intellectually satisfying
- You have 5-10 hours per week available for the next 6 months
- You are comfortable with a delayed and partially non-monetary return

Do not invest the time if:
- You need immediate income from this project
- You are likely to lose interest after 2-3 months
- You would rather spend the time on a project with faster, more tangible outcomes

The honest assessment: AlignED is a high-upside, medium-effort, long-horizon project. The competitive position is strong. The niche is real. The question is whether you have the sustained interest to build the distribution engine around what is already a strong product.
