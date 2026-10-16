---
# Copied from D:/graduation_thesis/ai-var-thesis-brief.md. Re-copy it when the brief changes,
# keeping this block. layout: default because the brief has its own H1.
layout: default
title: Thesis
permalink: /papers/thesis/brief.html
---

# AI-VAR Thesis — Working Brief

> Context document for a coding agent. This is a *decision log and build plan*, not a literature
> review. Where something is unverified it is marked **[VERIFY]** — do not treat those as facts.
>
> Last updated: 2026-08-28

---

## 1. Project statement

Build a system that watches a **single commercial broadcast feed** of a football match and flags
incidents that a VAR would likely intervene on — without the specialised multi-camera setup, and
without being handed a pre-trimmed clip centred on the incident.

**Constraints:**
- Graduation thesis. Must contain *something new*, even if small, **and** must produce a working demo.
- Compute: unclear. Likely rented GPU (Vast.ai). Assume single-GPU, budget-constrained.
- Author has prior hands-on experience running small video-LLM inference pipelines (shot-level
  captioning with a ~1.5B video model on Colab), plus shot-boundary handling. That experience
  transfers to the temporal-localisation half of this project.

---

## 2. The task formulation (this is the important part)

### 2.1 Why "is this foul VAR-able?" is not a well-posed video task

Two blockers, both structural:

1. **Category gating.** VAR only applies to four match-changing situations: goals, penalty
   decisions, direct red cards, mistaken identity. A brutal midfield tackle is never reviewable.
   So reviewability depends on *game context* (pitch position, ball in box, goal scored), not just
   on the contact itself.

2. **It is conditioned on the referee's original decision.** The threshold is a "clear and obvious
   error" *relative to what the on-field referee gave*. The same contact is VAR-able if the referee
   waved play on, and not VAR-able if he already awarded the penalty. A pixels-only model cannot
   answer the question because the decision is a missing input.

Additionally: every incident in those four categories is silently checked anyway, so "was it
reviewed" as a label mostly measures VAR-team behaviour, not correctness, and positives are
vanishingly rare.

### 2.2 The formulation actually adopted

> Given **(broadcast clip, on-field decision)** → predict a distribution over offence / severity →
> raise an intervention flag when the model confidently disagrees with the given decision **and**
> the incident falls in a reviewable category.

This turns the thesis into a **selective prediction / calibration** problem rather than a pure
classification problem, which is both more defensible and more interesting.

### 2.3 Framing to avoid

- Do **not** say "replace VAR". Say **referee-support triage**. Even the original VARS paper is
  careful to position itself as a support system with the final decision remaining with the referee.
- Do **not** frame the whole thesis as anomaly detection (see §6).

---

## 3. Architecture: two-stage cascade

```
live broadcast stream
        │
        ▼
┌───────────────────────────────────────────┐
│ STAGE 1 — cheap, always-on                │
│  • spot candidate events (foul/card/pen)  │
│  • rule-based context gate:               │
│      pitch position, ball in box,         │
│      goal followed, reviewable category   │
│  • tuned for RECALL, not precision        │
└───────────────────────────────────────────┘
        │ candidate flagged at live time t
        ▼
   [ BUFFER — replay angles do not exist yet ]
        │  wait 5–15s for broadcast director
        │  detect "replay of flagged incident on screen"
        ▼
┌───────────────────────────────────────────┐
│ STAGE 2 — expensive, on-demand            │
│  • VLM assessment over live + replay views│
│  • conditioned on on-field decision       │
│  • outputs decision + confidence + reason │
│  • ABSTAINS below threshold               │
│  • OOD check: is this even a usable view? │
└───────────────────────────────────────────┘
```

### 3.1 Why the cascade is justified

Not primarily efficiency — **fidelity to the protocol**. The real VAR silently checks everything in
the background and escalates to a full review only when something looks like a clear and obvious
error. Lead with that in the defence.

### 3.2 The replay-timing insight (centrepiece of the novelty claim)

Replay angles **do not exist at the moment the incident happens** — they are broadcast 5–15 seconds
later. So "on the fly" and "multi-view" are in tension unless the delay is modelled.

The system therefore: flags at live time `t` → buffers → fires stage 2 when the replay angles
actually arrive in the feed. This is what a human VAR does.

Nobody has done this because all prior work starts from pre-trimmed MVFouls clips where every view
is handed over simultaneously and for free. SoccerNet-v2's camera-shot segmentation + replay-link
annotations provide exactly the supervision needed to detect "a replay of the flagged incident is
now on screen".

### 3.3 Stage 1 design notes

- Target is **"match-changing"**, not "foul". Most of that is context, not contact.
- Use **cheap perception + explicit rule-based gating** (pitch position, box, game state) rather
  than hoping a network learns the Laws. Rules are debuggable and defensible in a defence.
- Do not build from scratch. Take a published SoccerNet action-spotting model, retarget its
  Foul / Penalty / Card classes, run on pre-extracted frame features at **1–2 fps**, not full video.
- Note the type mismatch: action *spotting* gives a **timestamp**; stage 2 needs a **window**.
  BMN's boundary-matching confidence map over candidate intervals is the concept that bridges this.

### 3.4 Cascade discipline

- Stage 1 is a **recall device**: tune for ~95–98% recall on reviewable incidents, accept bad
  precision. Then report **candidates per match** that stage 2 must process — that number *is* the
  compute budget and is itself an interesting result to publish.
- **Stage 1 recall is a hard ceiling on the whole system.** State it explicitly, report it as a
  ceiling. Examiners respect this more than a single end-to-end number.
- **Train/test mismatch:** stage 2 trains on clips perfectly centred on the contact frame, but at
  test time receives clips centred wherever stage 1 guessed. Measure stage 1's localisation error,
  then augment stage 2's training with **temporal jitter drawn from that same distribution**.

---

## 4. Data

### 4.1 Inventory

| Dataset | What it gives | Role |
|---|---|---|
| **SoccerNet-MVFouls** | 3,901 actions, 2–4 synced views, 224p/720p, 25fps. 10 annotated properties per foul (offence, severity, action class, contact, bodypart, upper-body part, tried to play, played ball, handball, handball offence) + **exact point-of-contact frame**. Each foul has ≥1 live-action clip (main camera) + ≥1 synced replay clip (close-up). | Stage 2 training/eval. View 0 = the broadcast-only subset. |
| **SoccerNet-XFoul** | 22k video-question-answer triplets from 70+ referees, **on the same MVFouls clips**. Avg **1.5 answers per action** — i.e. roughly half of actions have a second opinion. | Explanations + the disagreement eval slice. |
| **SoccerNet-v2** | 500 broadcast games, 110,458 actions / 17 classes. "Foul" annotated at the moment of commission. **Camera-shot segmentation + replay→live-action links.** | Stage 1 training + replay-arrival routing. **Currently missing from the Notion page — add it.** |

### 4.2 Access

- Videos: `SoccerNet` pip package, `downloadDataTask(task="mvfouls", ...)`, requires an **NDA form**
  to obtain the password. **Start this form immediately** — it gates everything and is not instant.
- XFoul **annotations are on a public Google Drive folder with no NDA**, so they can be inspected
  *today*, before video access clears.
- Add `version="720p"` for high-res. Known issue: `train_720p.zip` may fail with default unzip
  extractors.

### 4.3 The single highest-value check — do this first  **[VERIFY]**

**Does MVFouls expose the source game and timestamp for each clip?**

- **If YES:** join MVFouls' expert labels to SoccerNet-v2's live stream and card/penalty
  annotations. That yields the *on-field decision* (did a card actually come out?) alongside the
  *expert's correct decision* — exactly the `(incident, decision)` pair the §2.2 formulation needs,
  at zero annotation cost. Unlocks the strong version of the thesis.
- **If NO:** MVFouls clips are orphaned from their matches, and a small hand-annotated end-to-end
  evaluation set (~150 clips) is required instead.

Also **[VERIFY]** in the same pass: how the multi-answer XFoul structure is encoded (which actions
have ≥2 answers, and from distinct annotators).

### 4.4 Weak supervision available for free

The **replay-link annotations** are close to free money: the broadcast director *chose* to replay
that incident, which is a weak label for "contentious enough to look at again", available at scale
with zero annotation cost. Treat as positive-unlabeled — absence of a replay does not imply absence
of an incident.

### 4.5 The label that does not exist

There is **no public label for "was this actually reviewed"**. MVFouls gives a referee's *correct*
decision, not the on-field referee's *actual* decision, and not the VAR's action.

Sidestep: **use inter-referee disagreement as an operational proxy for "clear and obvious"**.
Because XFoul averages only 1.5 answers per action, a reliable per-clip agreement *rate* is not
computable. What survives:

- On the subset with ≥2 answers, a **binary agree/disagree flag**.
- Use it as an **evaluation slice, not a training target**: report accuracy and confidence
  separately on unanimous vs. split actions. Claim: *"the model is confident where referees agree
  and uncertain where they don't."* Costs nothing extra and is a legitimate small contribution.

### 4.6 Data traps

- **Replay views leak the label.** Broadcasts only replay notable incidents, in slow motion, zoomed.
  A model can learn "slow-mo close-up ⇒ serious foul" and score well while learning nothing. This is
  a real risk in MVFouls multi-view and a strong argument *for* the broadcast-only framing — say so
  explicitly, it is a genuine methodological point in the thesis's favour.
- **The trimming is itself an oracle.** Even view-0 clips are centred on the contact frame.
  End-to-end evaluation must start from untrimmed video or the removed assumption is quietly back.
- **Do not build the main dataset from YouTube VAR compilations.** Licensing aside: heavily edited,
  no consistent labels, and the editing correlates with the outcome. Fine for a demo reel, poison
  for training.
- **Label-noise ceiling.** MVFouls annotation took a *single global decision per foul*, applied to
  all its clips, on subjective calls. Do not chase the last 3% of balanced accuracy — it is noise.
- **Class imbalance:** red cards are rare. Budget multi-seed runs or the numbers will not be stable.
- **Storage.** 500 games of video is a serious disk/egress bill on rented GPUs. Extract features
  once, cache embeddings, delete the video.

---

## 5. Novelty — what is and isn't new

### 5.1 Already covered by prior work (do not claim these)

- "Single or multi-camera → flag probable clear-and-obvious error" — **that is VARS, 2024.**
- "Broadcast footage instead of specialised rig" — MVFouls *is* broadcast footage; view 0 is the
  live feed, and a SoccerNet 2024 challenge entry (MVF-3) already did single-view using only view 0
  at full-resolution 720×1280 grayscale.
- "Use a VLM" — in the SoccerNet 2025 challenge, zero-shot video LLMs prompted with rule-based
  context, dataset priors and in-context examples already achieved high-quality foul classification
  with no fine-tuning. SoccerNet 2026 now runs a VQA challenge including multi-view foul recognition.

### 5.2 The defensible contributions

1. **Removing the trimming oracle** — end-to-end untrimmed stream → spot → gate → assess. Everyone
   else is handed the clip. This is the primary claim.
2. **Replay-arrival routing** (§3.2) — modelling the fact that multi-view arrives *late*.
3. **Calibration against referee disagreement** (§4.5) — small, cheap, novel.
4. **The rationalisation critique** (§5.3) — cheap experiment, sharp result.
5. **Fallback if all else fails:** quantify the cost of broadcast-only. Same model, same protocol,
   view-0-only vs full multi-view, error analysis by foul type and severity. Modest but clean, and
   it doubles as the baseline chapter.

### 5.3 The X-VARS soft spot worth attacking

X-VARS = fine-tuned CLIP visual encoder → spatio-temporal features → linear projection → Vicuna-v1.1
initialised with LLaVA weights, **with the text predictions from the two classification heads passed
into the LLM alongside the video features**. Two-stage training. Built on Video-ChatGPT.

Because the LLM receives the classifier's decision as input, the explanation is generated
*conditioned on a decision the CNN already made* — structurally, the LLM rationalises a classifier's
output rather than reading the video.

**Cheap sharp experiment:** perturb or swap the injected classification prediction and check whether
the explanation flips to justify whatever it is told. If it does, that demonstrates current
"explainable refereeing" explanations are decoupled from visual evidence. Runs on a single rented
GPU in a few days, and it motivates the thesis's own design.

Supporting evidence: recent grounding work (SoccerLens) found state-of-the-art soccer VLMs attend to
irrelevant regions and, on "foul with no card", fail to identify the offending player, the fouled
player, and the referee.

### 5.4 Do not reproduce X-VARS

Vicuna-v1.1 + LLaVA + Video-ChatGPT is a 2024 stack. Repo is small (29 stars, 3 forks, 5 open
issues, no releases) — odds that `requirements.txt` installs cleanly on a 2026 image are poor (torch
/ transformers / CUDA pins). **Hard one-week timebox.** If it does not run, take the idea and
rebuild on a current open VLM.

Preferred backbone: **SoccerMaster** (CVPR 2026 Oral, award candidate) — a soccer-specific vision
foundation model that jointly optimises athlete detection and identification, **pitch registration**,
**event classification**, and vision–language alignment in one shared representation. Pitch
registration + event classification in a single backbone is exactly what stage 1 needs (spot the
candidate, then gate on where it happened). **[VERIFY]** whether weights are actually released and
usable.

---

## 6. Relationship to anomaly detection

**Do not frame the thesis as anomaly detection.** Two reasons:

1. Fouls are not rare (~20+ per match) and labels exist (110k labelled actions with timestamps).
   Unsupervised VAD exists because nobody can enumerate "abnormal" in UCF-Crime / ShanghaiTech.
   Throwing away supervision invites the obvious question.
2. **A rule violation is not a statistical outlier.** A spectacular clean sliding tackle is visually
   anomalous and legal. A routine shirt-pull in the box is visually unremarkable and a penalty.
   Refereeing is normative ("does this violate the Laws"); anomaly detection is distributional
   ("is this unusual"). They come apart precisely on the hard cases.

**Where the connection is real — all in the *decision* layer, not perception:**

- **Selective prediction / reject option.** "Only intervene on a clear and obvious error" = predict,
  estimate confidence, abstain below threshold. Report **risk–coverage curves**, not a single
  accuracy number.
- **OOD detection as a live-system safety component.** A broadcast feed serves crowd shots, dugout
  close-ups, graphics overlays, rain, floodlight glare. The system must know when its input is not a
  usable view and stay silent. Cheap to add (energy score or Mahalanobis distance in feature space)
  and it visibly improves the demo.
- **Evaluation conventions transfer.** The headline number should be **false alarms per match at a
  fixed recall on genuine errors**, not balanced accuracy. A system flagging four incidents a match
  is unusable however accurate.
- **Weakly-supervised VAD / multiple-instance learning** maps well onto "I know this 30-second
  window contains a reviewable incident, find the three seconds that matter."

**One-line framing:** *the anomaly is not in the video, it is in the gap between the model's
judgement and the referee's.*

---

## 7. Evaluation plan

- **Primary:** false alarms per match at fixed recall on genuine errors.
- **Risk–coverage curve** for the abstention threshold.
- **Stage 1 recall** reported as an explicit system ceiling.
- **Candidates per match** forwarded to stage 2 (= compute budget).
- **Balanced accuracy**, view-0-only vs multi-view, broken down by foul type and severity (the
  "cost of broadcast-only" table).
- **Calibration split:** accuracy + confidence on unanimous vs. split referee actions (§4.5).
- **Stage 1 localisation error** distribution (feeds the jitter augmentation in §3.4).
- Explanation quality: be sceptical of LLM-judge protocols; the §5.3 perturbation test is the more
  informative measurement.

---

## 8. Build order (deliberately de-risked)

Two stages means two systems, an unclear GPU budget, and a deadline. Protect against that by
building the demoable half first.

- [ ] **0.** Submit the SoccerNet NDA form (gates everything).
- [ ] **1.** Inspect the XFoul annotation JSON from the public Drive folder — resolve §4.3
      **[VERIFY]** items. Thirty minutes; decides three months of work.
- [ ] **2.** Write the Overview / problem statement (see §10). Before reading paper four.
- [ ] **3.** **Stage 2 first, with ground-truth timestamps standing in for stage 1.** Gives a
      working, demoable system early.
- [ ] **4.** Replay-arrival routing (detect replay-of-flagged-incident in the feed).
- [ ] **5.** Stage 1 spotting + rule-based context gate.
- [ ] **6.** Swap in real stage 1, measure the degradation — the degradation is itself a result.
- [ ] **7.** End-to-end numbers + the §5.3 perturbation experiment.

If stage 1 underperforms or time runs out, there is still a demo and a thesis. Building stage 1
first risks two months with nothing to show.

---

## 9. Reading list, tiered by ROI

### Tier 1 — read properly

| Paper | Why |
|---|---|
| **Towards AI-Powered VARS** — arXiv 2407.12483 · repo `SoccerNet/sn-mvfoul` | Highest ROI. Journal extension of the direct competitor; should contain the single-view vs multi-view ablation = the baseline chapter, handed over. Read before writing the Overview. |
| **SoccerMaster** — arXiv 2512.11016 · repo `haolinyang-hlyang/SoccerMaster` | Read as an *engineering decision*, not lit review. Candidate backbone; replaces reproducing the 2024 CLIP+Vicuna stack. Biggest available compute saving. |
| **SoccerNet 2025 Challenge Results** — arXiv 2508.19182 | **Not currently on the Notion page.** MVFoul section only. Where the zero-shot video-LLM results landed = current state. ~20 min. |
| **SoccerNet 2024 Challenge Results** — arXiv 2409.10587 | MVFoul section only, esp. the single-view (MVF-3) entry. ~20 min. |
| **X-VARS** — arXiv 2404.06332 · repo `heldJan/X-VARS` | Read for the evaluation protocol and the exact wiring of classifier-predictions-into-LLM (§5.3). |

### Tier 2 — targeted skim, at the relevant build stage

| Item | Why / when |
|---|---|
| **SoccerAgent** — arXiv 2505.03735 · `jyrao/SoccerAgent`, esp. `toolbox/foul_recognition.py` | 20 minutes reading the code beats most papers here. Shapes the stage-1/stage-2 interface. |
| **UniSoccer** — arXiv 2412.01820 · `jyrao/UniSoccer` (CVPR 2025) | Lineage of SoccerMaster. Skim for SoccerReplay data + event classification handling. |
| **Open-o3-Video** — arXiv 2510.20579 | Technical answer to the grounding critique. Read when designing stage 2's output format. |
| **BMN** — arXiv 1907.09702 | Read for the boundary-matching / interval-proposal *concept* only. Do not implement. |
| **Video-LMM Post-Training** — arXiv 2510.05034 | A *manual*, not a paper. Open it the week fine-tuning starts. Do not read cover-to-cover. |
| **Foul prediction with estimated poses** — arXiv 2402.09650 · `FangJiale1999/Futurefoul_Soccer` | Skim only. Pose is appealingly cheap for stage 1 but breaks on wide broadcast shots where the incident is a handful of pixels. Read to know why it's not being used. |

### Tier 3 — skip (one-paragraph summary is enough)

Flamingo, BLIP-2, VideoCLIP, VideoCoCa, InternVideo, TimeSformer, SSN (1704.06228 — superseded by
BMN). Need the *concepts* (BLIP-2's Q-Former is the ancestor of X-VARS's projection layer;
TimeSformer's divided space-time attention is why video transformers are affordable), not the papers.

### Not for this thesis

The agentic long-video cluster — VideoExplorer, LongVT, LongVideoAgent, Deep Video Discovery,
VideoAgent2, LongVideo-R1, Agentic Video Intelligence, VideoThinker, Thinking With Videos,
Demystifying Video Reasoning, VideoMind, VideoRefer, Keye-VL. These solve needle-in-a-haystack
retrieval over hours of footage with tool calls and multi-turn search. This thesis is a real-time
cascade deciding inside a five-second window on a live stream. Different problem, different metrics.
(These belong to the separate AI Challenge retrieval project.)

### Lead, unassessed

`arXiv 2608.15869` — *Beyond Visual CoT: Internalized Visual Thinking for Proactive Video Reasoning*
(Zhu et al., Aug 2026). **[VERIFY]** — only the title is known. "Proactive video reasoning" is
suggestive for a system deciding continuously on a stream rather than answering about a finished
clip. Ten minutes on the abstract.

---

## 10. Outstanding: the Overview

The Notion page's Overview block is still empty. The references are in good shape; the argument is
not written down anywhere. This is the bottleneck.

Target — three or four sentences containing:

1. **The task** — decision-conditioned review triage from a single broadcast feed.
2. **The gap** — all prior work uses pre-trimmed clips with simultaneous multi-view.
3. **The approach** — cheap stage-1 spotting + context gating, escalating to stage 2 when replay
   angles arrive.
4. **One measurable claim with a number in it**, e.g.: *"an end-to-end pipeline that, from an
   untrimmed single broadcast feed, spots candidate incidents and flags likely clear-and-obvious
   errors conditioned on the on-field decision, at X% balanced accuracy with a Y% false-alarm rate
   per match."*

Once that exists, the reading list prunes itself: every paper either serves those sentences or it
does not.

---

## 11. Notion page — structural notes

Current structure is organised by **artifact type** (Paper with Repo and Dataset → Main / Expansion;
Standalone Repo; Standalone Dataset; Potential Lead).

Recommendation: add a **role** dimension — Stage 1 / Stage 2 / Backbone / Evaluation. Under a role
taxonomy the two live gaps would have been visibly empty rather than invisible:

- [ ] **SoccerNet-v2 / action spotting** missing from Standalone Dataset → add under *Main*. The
      whole "on the fly" premise depends on this untrimmed layer.
- [ ] **No action-spotting method anywhere** — stage 1 is an empty slot.
- [ ] SoccerNet challenge results papers (2024, 2025) don't fit the current schema — which is itself
      the hint that the schema is the wrong axis for this project.
