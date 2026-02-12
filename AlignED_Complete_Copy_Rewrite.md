# AlignED Website — Revised Copy for Implementation

This document contains revised copy for every page on the AlignED website.
It is organised page by page, matching the site's file structure.

For each page:
- CHANGE LEVEL indicates how much was modified (MAJOR / MODERATE / MINOR / NO CHANGE)
- NEW COPY is the complete replacement text for that page's content
- IMPLEMENTATION NOTES explain specific decisions

Where [Chart], [Button], [Flowchart] appear, these are placeholders for existing interactive
elements that should be preserved as-is.

Read the companion file AlignED_Writing_Guidelines.md before implementing.
It contains the rules that informed every edit here.

Global changes applied throughout:
- Em dashes replaced with full stops, commas, or restructured sentences
- Rhetorical question headers reduced (mixed with declarative alternatives)
- "Can AI..." formula used sparingly instead of as default framing
- "Complementary" used once, then not repeated
- Overclaims reduced to performance observations
- British/Australian spelling used throughout
- Footer tagline changed on all pages (see below)

FOOTER TAGLINE (all pages):
Old: "Evaluating AI alignment with educational research evidence."
New: "Benchmarking AI performance on professional teaching knowledge."


================================================================================
1. HOMEPAGE
   File: index.html
   Change level: MAJOR
================================================================================

# How well do AI models handle what teachers need to know?

We benchmarked 21 models on neuromyth identification, diagnostic classroom reasoning, and teacher certification knowledge. The results vary more than you'd expect.

### Latest Results: February 2026

21 models tested across educational neuroscience, classroom reasoning, and pedagogical knowledge, plus a separate evaluation of student work judgement.

[Button: View Rankings]

### Methodology

How we construct, administer, and score each benchmark.

[Button: Learn More]


## What does AlignED measure?

Most AI benchmarks for education test whether a model can answer exam questions. They don't test whether it will confidently repeat a neuromyth, or whether it can explain why a lesson strategy failed.

AlignED tests three areas of professional teaching knowledge: educational neuroscience (can the model identify common myths about the brain and learning?), classroom reasoning (can it diagnose why an evidence-based strategy isn't working?), and pedagogical knowledge (how does it perform on teacher certification items?). A separate module evaluates student work judgement against Australian curriculum standards.

Teachers evaluating AI tools. Leaders making procurement decisions. Developers choosing which model to build on. Policymakers setting the standards.


HIGHLIGHTS

### Overall Ranking
Composite score across all benchmark modules
[Chart]

### Neuromyth Identification
32 items adapted from Dekker et al. (2012). Average teacher accuracy: ~50%.
[Chart]

### Teacher Certification Knowledge
Performance on 1,143 items from certification assessments
[Chart]

Legend: Anthropic | OpenAI | Google

Top models score above 90%. The gap between best and worst exceeds 30 percentage points. Provider and model size both matter. See full results -->


EXPLORE

No model ever expressed uncertainty, even when wrong. How do models handle neuromyths?
View analysis -->

See the actual benchmark items
View all items -->

How stable are results across temperatures and prompt framings?
View robustness data -->

What does AlignED test and why?
Learn about our approach -->


IMPLEMENTATION NOTES:
- Hero headline changed from vague "align with educational knowledge" to specific "handle what teachers need to know"
- "What is educational alignment?" renamed to "What does AlignED measure?" and rewritten to avoid normative claims
- "Who should care" block is now four short declarative sentences, intended as a standalone visual block
- Highlight chart labels simplified and made more precise
- Headline finding rewritten without em dashes
- First Explore card now leads with the overconfidence finding as a hook
- "Methodology Overview" shortened to "Methodology"


================================================================================
2. FULL RESULTS
   File: results.html
   Change level: MODERATE
================================================================================

# Evaluation Results

AlignED v2 tested 21 models across three benchmark modules (educational neuroscience, classroom reasoning, and pedagogical knowledge), with a separate evaluation of student work judgement (ACARA).

Legend: OpenAI | Anthropic | Google | Meta | DeepSeek


## Overall Ranking

The Educational Alignment Index (EAI) combines three benchmarks: educational neuroscience (25%), classroom reasoning (25%), and pedagogical knowledge (50%). All 21 models are ranked on the same composite.

[Chart]

Key observations:
- GPT-5 leads the composite at 91.7%.
- A 31-point gap separates the highest and lowest scoring models.
- OpenAI and Anthropic models both appear in the top 5.


## Neuromyth Identification

32 items: 15 widely-believed myths about the brain and learning, plus 17 verified neuroscience facts. Models must correctly classify each one. The average teacher gets about 50% right on this survey (Dekker et al., 2012).

[Chart]

Key observations:
- GPT-5 and Claude 4.5 Opus (Thinking) lead at 92.9%.
- Even the lowest-scoring model (GPT-4o Mini, 54.5%) edges past the human teacher baseline of ~50%.
- Several mid-tier models score above 85%, suggesting factual neuroscience knowledge is relatively strong across providers.


## Diagnostic Reasoning

12 realistic situations where an evidence-based teaching strategy isn't working. The model must explain why, not just describe the strategy. Each response is scored 0-3 by an LLM judge (Claude 4.5 Sonnet), with a sample of judgements validated by humans.

[Chart]

Key observations:
- Two models achieve perfect scores: GPT-5 and o3.
- Reasoning-focused models (o3, thinking variants) perform well on this diagnostic task.
- This benchmark has the widest spread of any, from 100% down to 55.6%, making it the most discriminating module.


## Teacher Certification Knowledge

1,143 items from teacher certification assessments, split into general pedagogical knowledge (920 items) and inclusive education (223 items), shown separately below.


### General Pedagogical Knowledge

920 items covering cross-domain pedagogical knowledge from teacher certification exams.

[Chart]

Key observations:
- Gemini 2.5 Pro leads at 89.3% despite ranking #14 overall, the highest pedagogical knowledge score of any model tested.
- Anthropic models cluster in the 78-89% range, showing consistent but varied performance.
- The gap between top and bottom is smaller here than on other benchmarks, suggesting general pedagogical knowledge is more evenly distributed across models.


### Inclusive Education

223 items on special education needs and disability (SEND) from teacher certification exams.

[Chart]

Key observations:
- Claude 4.5 Opus leads at 85.7%, closely followed by Gemini 2.5 Pro at 85.2%.
- Models generally score lower on inclusive education than general pedagogy, a potential gap in training data.
- The smallest models (Claude 3 Haiku, GPT-4o Mini) fall below 70%, a sharper drop-off than on general pedagogical knowledge.


## Student Work Judgement (Separate Evaluation)

The EAI measures performance on educational knowledge benchmarks. ACARA measures something different: applied assessment judgement, specifically whether a model can compare real student work against curriculum standards. Because it tests a different capability and uses a partially different pool of models (12 models, including 4 not in the main evaluation), ACARA results are reported separately.

### Accuracy and Consistency

79 pairs of Australian student work samples. Tested in both orders to check for position bias. 12 models evaluated. View methodology -->

[Chart]

Key observations:
- No clear correlation with the EAI. Claude 4.5 Haiku (#15 on the composite) is #3 on ACARA accuracy.
- GPT-5 has the highest consistency (94.1%) but not the highest accuracy, suggesting strong position-invariance.
- Gemini 3 Flash shows a notable accuracy-consistency gap (81% vs 69%), suggesting position bias in its judgements.


## Cost and Efficiency

How many tokens does each model use to complete the survey and scenarios? Thinking models generate internal reasoning tokens that increase cost substantially, even when the final answer is the same length.

### Token Usage: Survey + Scenarios

Total tokens (prompt + completion + reasoning) for 32 educational neuroscience items and 12 classroom scenarios. 18 models with available data.

[Chart]

Key observations:
- Thinking models average ~20,000 tokens versus ~6,000 for standard models, roughly 3x more.
- Gemini 2.5 Pro uses the most tokens (38,069) due to extensive internal reasoning, despite moderate accuracy.
- Standard Claude and GPT-4o models cluster tightly around 5,300-6,700 tokens.
- Token counts here cover only the survey and scenarios. The full evaluation (including 1,143 pedagogy items) costs significantly more.


### Model Release Timeline

When each model was released and how it scored. Later models tend to score higher, but the relationship is not linear. Architecture and training choices matter as much as release date.

[Chart]

Key observations:
- Models from late 2025 generally outperform those from early 2024, but with wide variation within each period.
- Claude 3 Haiku (March 2024) scores 60.3% while Claude 4.5 Opus (November 2025) scores 89.8%, a 29.5-point improvement in 20 months from the same provider.
- GPT-4 Turbo (November 2023) and GPT-4o (May 2024) score similarly (~73%), while GPT-5 (August 2025) jumps to 91.7%.

Note: These results should be interpreted alongside our documented limitations. Scores may be influenced by training data overlap, LLM judge bias, and cultural specificity of items.


## What do these results tell us?

The best models exceed 90% on the composite, well above the ~50% human teacher baseline on the neuromyths survey specifically. But high performance on one benchmark does not predict high performance on another. Gemini 2.5 Pro scores highest on pedagogical knowledge (#1 on CDPK) yet ranks #14 overall. ACARA rankings do not predict EAI rankings either, which is why they are reported separately.

Reasoning-focused models (o3, thinking variants) excel at diagnostic scenarios but don't consistently lead on factual knowledge. Model size matters: smaller and cheaper models consistently score lowest across all benchmarks. And thinking models use roughly 3x more tokens without always scoring higher, which has cost implications for deployment.


IMPLEMENTATION NOTES:
- Section headers changed from all-rhetorical-questions to a mix of declarative and descriptive
- "Can AI separate educational neuroscience from myths?" → "Neuromyth Identification"
- "Can AI diagnose why teaching strategies fail?" → "Diagnostic Reasoning"
- "Does AI know what certified teachers know?" → "Teacher Certification Knowledge"
- "What do these results mean?" → "What do these results tell us?" and converted from bullets to prose
- The human baseline comparison is now properly scoped to the neuromyths survey rather than implied across all assessments
- "Complementary but distinct capability" (ACARA section) simplified to avoid repeating "complementary" across the site
- Em dashes replaced throughout
- "Full Evaluation Results" → "Evaluation Results" (dropped redundant "Full")


================================================================================
3. ABOUT
   File: about.html
   Change level: MAJOR
================================================================================

# About AlignED

What we test and the limits of what it can tell you


## The problem

When AI is used in educational settings, the quality of its responses depends partly on what it has absorbed about teaching and learning. Some widely-believed claims about the brain and learning are wrong. About half of teachers endorse them (Dekker et al., 2012). If AI models repeat these same misconceptions, or if they give generic advice when a teacher needs a specific diagnosis of why a strategy failed, that is worth knowing before deploying them in schools.

Most AI benchmarks for education test whether a model can answer exam questions. They don't test whether a model will confidently repeat a neuromyth, or whether it can reason about why a lesson strategy isn't working. AlignED addresses that gap.


## Who this is for

- Teachers and school leaders choosing which AI tools to use in classrooms
- Policymakers writing guidelines for AI in education
- EdTech companies selecting which model powers their tools
- Researchers looking for transparent, reproducible benchmarks


## What AlignED tests

AlignED benchmarks AI across four areas of professional teaching knowledge:

- Educational neuroscience: 32 items testing identification of myths and facts about the brain and learning, adapted from Dekker et al. (2012).
- Classroom reasoning: 12 scenarios testing diagnostic reasoning about why evidence-based strategies fail when implemented incorrectly.
- Pedagogical knowledge: 1,143 teacher certification items covering general pedagogy (920 items) and inclusive education (223 items).
- Student work judgement: 79 pairs of student work compared against Australian curriculum standards (ACARA).

The Educational Alignment Index (EAI) composite combines the first three: 25% educational neuroscience + 25% classroom reasoning + 50% pedagogical knowledge. ACARA is reported separately because it tests a different capability (applied assessment judgement rather than knowledge recall or reasoning). See Methodology for full details and Benchmark Items for the actual test content.


## Limitations

We want to be transparent about what this benchmark can and cannot tell you:

- Training data contamination: Some benchmark items (especially the 32 neuromyths from Dekker et al., 2012) are published and may appear in model training data. High scores may partly reflect memorisation rather than robust knowledge.
- LLM-as-judge scoring: The 12 classroom scenarios are scored by an LLM judge (Claude 4.5 Sonnet), which introduces potential judge model bias. We validate a sample manually, but systematic bias is possible.
- Cultural specificity: The 1,143 pedagogical knowledge items are from Chilean teacher certification exams. While pedagogical principles are broadly universal, some items may reflect Chilean educational policy or context.
- Varying sample sizes: The benchmarks range from 32 items (educational neuroscience) to 1,143 items (pedagogy), which affects statistical power differently across benchmarks.
- Preliminary weighting: The composite score weights are our initial best judgement, not empirically optimised.


## What we claim and what we don't

AlignED measures how well AI models perform on specific benchmark tasks related to professional teaching knowledge. It does not measure whether a model is a good tutor, whether it can teach effectively, or whether it is safe to deploy in a classroom.

A high score means the model answered these benchmark items correctly. It does not mean the model can apply that knowledge in a real classroom. These benchmarks are a starting point, not a finish line.

AlignED tests performance on tasks related to educational knowledge. High performance is necessary but not sufficient for good educational AI. A model that cannot identify common neuromyths is unlikely to give good educational advice. But a model that can still needs to be evaluated for safety, bias, and pedagogical effectiveness before deployment.


## Planned work

AlignED is an ongoing project. Planned directions include:

- Tracking capabilities over time as models improve and costs decrease
- New benchmark modules covering lesson planning quality, unit design, and wellbeing/pastoral support
- Composite score refinement with empirically-grounded alternatives to the current weighting
- Human validation studies comparing model performance to teacher panels
- Cross-cultural expansion extending pedagogical knowledge items beyond the Chilean context

[Button: Explore Methodology]
[Button: View Results]


IMPLEMENTATION NOTES:
- "What is educational alignment?" section replaced with "The problem" framed as a gap statement
- "Why it matters" folded into "The problem" to reduce repetition
- "Who should care" shortened significantly, editorialising about EdTech cost decisions removed
- "What AlignED tests" rewritten with declarative descriptions instead of rhetorical questions
- "What we claim and don't claim" tightened: "the model knows what researchers know" replaced with "the model answered these benchmark items correctly"
- "In short:" throat-clearing removed
- "genuine understanding" replaced with "robust knowledge" (avoid "genuine")
- "Future research" → "Planned work" (more direct)
- Em dashes removed from the future work bullets
- Page subtitle changed from "Why educational alignment matters and what we test" to "What we test and the limits of what it can tell you"


================================================================================
4. BENCHMARK ITEMS
   File: benchmark-items.html
   Change level: MINOR
================================================================================

# Benchmark Items

What we test and why, with the full items, scoring, and stories behind the data

AlignED evaluates AI across four benchmark areas. This page shows the actual items used, explains the scoring, and highlights patterns worth knowing about.


## Educational Neuroscience Survey

32 true/false statements about the brain and learning, adapted from Dekker et al. (2012). 15 are widely-believed myths (correct answer: False). 17 are verified neuroscience facts or established findings (correct answer: True, with two exceptions). The average teacher gets about 50% right.

Eight items marked with * are high-prevalence myths that also receive a confidence probe. After answering, the model is asked how confident it is. Every model tested selected "Very Confident" or "Somewhat Confident" on every item. No model ever expressed uncertainty.


### Neuromyths (15 items — correct answer: False)

[Table: preserved exactly as original]


### General Assertions (17 items — correct answer: True, except Q10 and Q11)

[Table: preserved exactly as original]


### Prompt Variants

Each item is tested in four framings to measure prompt sensitivity. Here is Q01 ("We use our brains 24 hours a day") in all four:

Standard: "We use our brains 24 hours a day."

Interrogative: "Do we use our brains 24 hours a day?"

Embedded: "A teacher claims that we use our brains 24 hours a day. Is this claim correct or incorrect?"

Adversarial: "It's commonly believed that we only use our brains when awake and actively thinking. Is the statement 'We use our brains 24 hours a day' correct or incorrect?"


### Stories from the data

Q21: A contested item that highlights benchmark limitations. "Environments that are rich in stimulus improve the brains of pre-school children" is classified as a neuromyth in the Dekker et al. (2012) instrument because the original finding was in rats raised in deprived conditions, and the broad claim for human children is not well-supported by the evidence. However, this classification is debatable. There is evidence that early enrichment benefits child development, and the statement's wording is ambiguous enough that a well-informed "True" response could be reasonably defended.

Every model tested answered this item incorrectly (endorsing it as true) with high confidence. We retain this item because it is part of the established Dekker et al. instrument widely used in educational neuroscience research, and because it illustrates an important point: some items in neuromyth instruments have genuine ambiguity that benchmark designers should acknowledge. This is a limitation of the instrument, not necessarily a failing of the models.

Q15 vs Q27: The learning styles trap. Q15 ("Individuals learn better when they receive information in their preferred learning style") is false. It is the most widely-believed myth in education. But Q27 ("Individual learners show preferences for the mode in which they receive information") is true. People do have preferences; those preferences just don't improve learning outcomes. Many models confuse these two statements, getting Q15 right but Q27 wrong, or vice versa.


## Classroom Reasoning Scenarios

12 realistic situations where an evidence-based teaching strategy isn't working. Models must explain why the strategy is failing, not just describe what the strategy is. Each response is scored 0-3 by an LLM judge (Claude 4.5 Sonnet).


### All 12 Scenarios

[Table: preserved exactly as original]


### Example: S01 — Retrieval Practice

[Scenario text: preserved exactly as original]


### Scoring Rubric (0-3)

[Table: preserved exactly as original]

GPT-5 and o3 achieve perfect scores (36/36). These are the only two models to get every scenario completely right. Diagnostic reasoning about why strategies fail appears to be a strength of frontier reasoning models, while smaller models tend to give generic advice rather than specific diagnoses.


## Pedagogical Knowledge

1,143 multiple-choice items from Chilean national teacher certification examinations, sourced via the HuggingFace pedagogy-benchmark dataset. Items are not reproduced in full here (they are an external dataset), but we describe the structure and scope.


### CDPK: Cross-Domain Pedagogical Knowledge (920 items)

General pedagogical knowledge that applies across subject areas:

- Curriculum design and planning
- Assessment and evaluation
- Classroom management
- Learning theory and development
- Instructional strategies
- Professional responsibilities


### SEND: Special Education Needs and Disability (223 items)

Inclusive education knowledge for supporting diverse learners:

- Identification of learning difficulties
- Differentiation strategies
- Accommodations and modifications
- Inclusive classroom practices
- Legal and ethical frameworks
- Collaboration with specialists and families

All items are multiple-choice with four options (A-D). Scoring is binary: correct (1) or incorrect (0).

Gemini 2.5 Pro is #1 on pedagogical knowledge but #14 overall. With 89.3% on CDPK, it outperforms every other model on this benchmark, but its weaker scenario reasoning (69.4%) and educational neuroscience (75.9%) pull its composite score down. Performance on one benchmark does not predict performance on others.


## Student Work Judgement (ACARA)

79 verified pairs of student work samples from the Australian Curriculum, Assessment and Reporting Authority (ACARA) work sample portfolios. 12 models evaluated (4 ACARA-only models not in the main composite).


### Task Structure

Each pair presents two student work samples at different achievement levels for the same curriculum area. The model must choose which sample better meets the curriculum standard. Example structure:

Subject: English
Year Level: Year 4
Comparison: Above Standard vs At Standard

Sample A: [Student work text]
Sample B: [Student work text]

Which sample better demonstrates achievement of the Year 4 English standard?

Each pair is tested in both forward (A vs B) and reverse (B vs A) orientations across 3 trials, yielding 237 evaluations per model. This tests for position bias: does the model prefer whichever sample is listed first?


### Scoring

- Accuracy: Percentage of pairs where the model chose the correct (higher-achieving) sample
- Consistency: Percentage of pairs where the model gave the same answer in both orientations

High accuracy with low consistency suggests the model is guessing correctly some of the time. High consistency with low accuracy would mean systematically wrong. The ideal is high on both.

ACARA results are reported separately from the EAI because it tests a different capability (applied assessment judgement rather than knowledge recall or reasoning) and uses a partially different pool of models. See Results for the full ranking.

[Button: View Methodology]
[Button: View Results]


IMPLEMENTATION NOTES:
- "Stories from the data" section preserved almost verbatim. This is the strongest writing on the site.
- Em dashes in the CDPK/SEND bullet descriptions removed (they were used to add explanatory clauses to each bullet; the bullets are clear enough without them)
- "This shows that factual knowledge alone doesn't capture educational alignment" → "Performance on one benchmark does not predict performance on others" (avoids inferential overclaim)
- "complementary but distinct capability" in ACARA section simplified to avoid repeating the word "complementary" across the site
- The tables for neuromyths, general assertions, scenarios, and scoring rubric should be preserved exactly as they are


================================================================================
5. DATA ACCESS
   File: data-access.html
   Change level: MINOR
================================================================================

# Data Access

All AlignED data is hosted on the Open Science Framework


## Available Data

All AlignED benchmark data is hosted on the Open Science Framework (OSF). To request access, contact us at the address below with your intended use case.

The dataset includes:

- Composite scores and individual benchmark scores for all 21 models
- ACARA accuracy and consistency scores for 12 models
- Item-level responses for all benchmarks
- Raw model outputs and reasoning
- Judge scoring with explanations (for classroom scenarios)
- Temperature robustness data (T=0, 0.5, 1.0)
- Prompt sensitivity results (4 framings)
- Confidence probe responses
- Token usage statistics

Contact for data access: aligned.benchmark [at] gmail.com

Include your intended use (research, policy analysis, development, etc.) and institutional affiliation if applicable. Access is typically granted within 2-3 business days.


## Citation

If you use AlignED data in your work, please cite:

AlignED Benchmark (2026). Benchmarking AI performance on professional teaching knowledge.
https://trgallagher-research.github.io/AlignED-site/

If you cite AlignED in academic publications, please contact us at aligned.benchmark [at] gmail.com so we can provide an up-to-date citation and track usage of the benchmark.


## Terms of Use

AlignED data is provided for research, policy analysis, and educational purposes. When using the data:

- Cite AlignED appropriately
- Do not misrepresent scores as "certification" or "approval"
- Acknowledge limitations noted in our methodology
- Contact us if you plan to redistribute modified versions


## Updates

We plan to update benchmark results as new models are released. Watch the GitHub repository to be notified of updates.

[Button: Contact Us]
[Button: View Results]


IMPLEMENTATION NOTES:
- Citation block updated to use new tagline
- No other significant changes needed. This page is functional and clean.


================================================================================
6. CONTACT
   File: contact.html
   Change level: NO CHANGE
================================================================================

[Preserve exactly as-is. This page is clean and functional.]


================================================================================
7. METHODOLOGY HUB
   File: methodology/index.html
   Change level: MODERATE
================================================================================

# Methodology

How we construct, administer, and score AlignED benchmarks

This section covers the technical details of how AlignED works. For a general overview, see About. To see the actual items used, visit Benchmark Items.


## What AlignED measures

AlignED reports two things: a composite index covering three knowledge benchmarks, and a separate evaluation of applied assessment judgement.

**EAI Composite (21 models)**

- Educational Neuroscience (25%): 32 items testing identification of myths and facts about the brain and learning. 15 widely-believed myths + 17 verified facts.
- Classroom Reasoning (25%): 12 real-world scenarios scored 0-3 by an LLM judge (Claude 4.5 Sonnet). Models must diagnose why an evidence-based strategy is failing.
- Pedagogical Knowledge (50%): 1,143 items from teacher certification assessments. General pedagogy (920 items, weighted 40%) and inclusive education (223 items, weighted 10%).

EAI = (0.25 x Neuroscience) + (0.25 x Scenarios) + (0.40 x CDPK) + (0.10 x SEND)

**Reported separately**

- Student Work Judgement / ACARA: 79 verified pairs of student work compared against Australian curriculum standards. 12 models evaluated. Scored for accuracy and consistency. Reported separately because it tests applied assessment judgement rather than knowledge recall or reasoning. See ACARA methodology for details.


## Validation protocol

Each benchmark passes through a structured validation pipeline before results are reported:

[Flowchart: Item Preparation --> Model Administration --> Response Collection --> Scoring --> Tier 1: Baseline Reliability --> Tier 2: Robustness Probes --> Tier 3: Judge Validation --> Composite Calculation]

- Tier 1, Baseline Reliability: Each model is run 5 times at T=0 to establish stable scores. Reported scores are means across iterations.
- Tier 2, Robustness Probes: Temperature variation (T=0, 0.5, 1.0), prompt sensitivity (4 framings), and confidence calibration probes.
- Tier 3, Judge Validation: For scenario scoring, a sample of LLM-judge scores is manually verified against the rubric.


## Evaluation dimensions

Beyond baseline accuracy, we assess multiple dimensions of model performance:

- Temperature Robustness: Performance stability across temperature settings (T=0, 0.5, 1.0).
- Prompt Sensitivity: Consistency across four prompt framings (standard, interrogative, embedded, adversarial).
- Confidence Calibration: Whether stated confidence tracks actual accuracy.
- Token Efficiency: Performance relative to reasoning length and cost.


## Composite scoring

- Educational Alignment Index (EAI): How we combine benchmark scores into a single composite metric. See EAI Scoring for the full methodology.


## Models evaluated

21 models from three providers have complete EAI composite scores. 12 models (including 4 ACARA-only) were evaluated separately on student work judgement.

Anthropic: Claude 3 through Claude 4.5 family, including extended thinking variants.

OpenAI: GPT-4 Turbo, GPT-4o, GPT-5 family, o3 and o4-mini.

Google: Gemini 2.0 Flash, 2.5 Pro, 3 Flash.

See the Results page for the full list of evaluated models and their scores.


## Reproducibility

All evaluation parameters are documented and fixed:

- Pinned model versions (specific API model strings)
- Fixed random seeds where applicable
- Standardised prompt templates
- Documented scoring rubrics with examples

Raw data and scoring details are available through our Data Access page.


IMPLEMENTATION NOTES:
- Fixed the confusing 25%/25%/25%/25% list that contradicted the actual 25%/25%/50% formula. The new version clearly separates the EAI composite from ACARA, shows the correct weightings, and includes the full formula.
- "Alignment between stated confidence and actual accuracy" → "Whether stated confidence tracks actual accuracy" (removes "alignment" which is overloaded on this site)
- Tier formatting changed from em-dash to comma for consistency
- Rhetorical questions removed from benchmark descriptions


================================================================================
8. NEUROMYTHS METHODOLOGY
   File: methodology/neuromyths.html
   Change level: MINOR
================================================================================

<-- Methodology

# Neuromyths Survey

Testing identification of brain-based misconceptions


## Overview

The Neuromyths Survey tests whether AI systems can correctly classify true and false claims about the brain and learning. This benchmark is adapted from the 2012 Dekker et al. study, which documented the prevalence of neuromyths among educators worldwide.

32 Total Items | 15 Neuromyths | 17 General Assertions | ~50% Human Teacher Baseline


## Source Research

Dekker, S., Lee, N. C., Howard-Jones, P., & Jolles, J. (2012). Neuromyths in education: Prevalence and predictors of misconceptions among teachers. Frontiers in Psychology, 3, 429.

This study surveyed 242 teachers across the UK and Netherlands, finding that 49% of neuromyths were endorsed by participants on average. Certain myths showed particularly high prevalence:

- "Learning styles" (93% belief rate)
- "We only use 10% of our brain" (48% belief rate)
- "Enriched environments improve brain function" (95% belief rate)


## Benchmark Composition

The survey contains two item types:

### Neuromyths (15 items)

False statements about the brain and learning that are widely believed. The correct response is "False" for all items. Examples:

- "Individuals learn better when they receive information in their preferred learning style."
- "We only use 10% of our brain."
- "Short bouts of co-ordination exercises can improve integration of left and right hemispheric brain function."

### General Assertions (17 items)

True statements about neuroscience and learning, included to prevent response bias. Examples:

- "Learning occurs through modification of the brain's neural connections."
- "Mental practice can improve motor performance."


## Administration

Each item is presented as a true/false question with standardised framing:

Consider the following statement about how the brain works and how people learn:

"[Statement text]"

Based on current scientific evidence, is this statement TRUE or FALSE?

Respond with only: TRUE or FALSE


## Scoring

Responses are scored as correct (1) or incorrect (0). The Neuromyths Survey score is the percentage of correct responses across all 32 items.

Response | Neuromyth Item  | General Assertion
---------|-----------------|------------------
TRUE     | Incorrect (0)   | Correct (1)
FALSE    | Correct (1)     | Incorrect (0)


## Reliability

Each model is evaluated with 5 iterations at T=0 to establish baseline reliability. The reported score is the mean across iterations.


## Key Findings

Our evaluation reveals significant variation across models:

- Top-performing models exceed 90% accuracy, substantially above the ~50% human teacher baseline
- Some items remain challenging across all models (e.g., Q21 on enriched environments)
- No model ever expressed uncertainty when asked about its confidence, even on items it answered incorrectly

See the Results page for detailed model comparisons.

[Button: Next: Implementation Scenarios -->]
[Button: Back to Methodology]


IMPLEMENTATION NOTES:
- "Testing rejection of brain-based misconceptions" → "Testing identification of brain-based misconceptions" (more precise; the task is classification, not just rejection)
- "foundational research by Dekker et al. (2012)" → "the 2012 Dekker et al. study" (less reverent, more neutral)
- "which documented the prevalence" → kept, this is factually accurate
- "believed by participants" → "endorsed by participants" (more precise survey terminology)
- "Examples include:" → "Examples:" (tighter)
- Key findings: "Models show universal overconfidence — no model ever expressed uncertainty when asked" restructured without the em dash
- Otherwise largely preserved. This page is well-written.


================================================================================
9. SCENARIOS METHODOLOGY
   File: methodology/scenarios.html
   Change level: MINOR
================================================================================

[Preserve almost entirely as-is. This page is well-written and appropriately technical.]

Only changes:
- Line 807: "not because the research is wrong, but because implementation conditions matter" → keep, this is good
- Em dashes in the rationale bullet points: replace with full stops where possible
- No other changes needed. The rationale, scenario table, scoring rubric, and example scenario are all clear and precise.


================================================================================
10. PEDAGOGY METHODOLOGY
    File: methodology/pedagogy.html
    Change level: MINOR
================================================================================

[Preserve almost entirely as-is.]

Only changes:

Line 948: "Knowledge in this area is essential for any AI system providing educational advice, as it affects recommendations for diverse student populations."
→ "This area is relevant for AI systems that provide educational advice affecting diverse student populations."
(Removes normative claim about what is "essential." AlignED doesn't establish that.)

No other changes needed. The page is clean and appropriately technical.


================================================================================
11. ACARA METHODOLOGY
    File: methodology/acara.html
    Change level: MINOR
================================================================================

[Preserve almost entirely as-is. This is a well-structured methodology page.]

Only changes:

Line 1021: "Unlike the other AlignED benchmarks which test pedagogical knowledge directly, this benchmark tests a practical classroom skill"
→ "Unlike the other AlignED benchmarks, which test knowledge recall and reasoning, this benchmark tests applied assessment judgement"
(More precise about what the other benchmarks actually do, and avoids calling it a "practical classroom skill" since it's tested in a benchmark context, not a classroom.)

Line 1085: Remove "complementary" (already established elsewhere). Change to:
"ACARA evaluates a different capability (applied assessment judgement rather than knowledge recall or reasoning) and uses a different pool of models, so it is presented as a separate evaluation."

No other changes needed.


================================================================================
12. EVALUATION DIMENSIONS
    File: methodology/dimensions.html
    Change level: MINOR
================================================================================

[Preserve almost entirely as-is. The opening line is strong and the technical content is clear.]

Only changes:
- Replace em dashes with full stops or commas where they appear
- No content changes needed


================================================================================
13. EAI SCORING
    File: methodology/scoring.html
    Change level: MINOR
================================================================================

[Preserve almost entirely as-is.]

Only changes:

The disclaimer at the bottom is excellent:
"EAI scores indicate alignment with research evidence as measured by these specific benchmarks. They do not predict real-world tutoring effectiveness or constitute certification for educational deployment."

Consider also placing this (or a shortened version) near the top of the page, immediately after the overview paragraph. Suggested addition after the overview:

"Note: EAI scores reflect performance on these specific benchmarks. They do not predict real-world tutoring effectiveness or constitute certification for educational deployment."

Interpretation table wording:
"Strong alignment with educational research evidence" → "Strong performance across benchmark modules"
"Good alignment with some areas for improvement" → "Good performance with some areas of weakness"
"Moderate alignment; significant gaps in some areas" → "Moderate performance; notable gaps in some modules"
"Limited alignment; substantial misconceptions or knowledge gaps" → "Low performance; substantial gaps across modules"

(Removes "alignment" language from the interpretation bands. The scores measure benchmark performance, and the interpretation should describe that rather than infer alignment as a property.)

No other changes needed.
