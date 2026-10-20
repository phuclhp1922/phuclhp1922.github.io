---
# Published at /papers/reading-list/checklist.html. layout: default because the file has its own H1.
layout: default
title: Reading List
permalink: /papers/reading-list/checklist.html
---

# AI Reading Path — Checklist

Tick each box as you finish. **★ = Essential.** 🎓 = from your CS598 LLM Agents course. ⚖️ = skeptic paper, read alongside its neighbour.

## The Deep Learning (Pre-LLM) era
**Neural Network**
- [ ] **Adam** - Kingma et al., 2014 - [1412.6980](https://arxiv.org/abs/1412.6980)
- [ ] **AdamW** - Loshchilov et al., 2017 - [1711.05101](https://arxiv.org/abs/1711.05101)
- [ ] **Batch Norm** - Ioffe et al., 2015 - [1502.03167](https://arxiv.org/abs/1502.03167)
- [ ] **Layer Norm** - Ba et al., 2016 - [1607.06450](https://arxiv.org/abs/1607.06450)
- [ ] **Skip Connection: ResNet** - He et al., 2015 - [1512.03385](https://arxiv.org/abs/1512.03385)

---

## Scaling & Efficient Architectures

**Core spine**
- [ ] **Scaling Laws for Neural LMs** — Kaplan et al., 2020 — [2001.08361](https://arxiv.org/abs/2001.08361)
- [ ] **Chinchilla (Compute-Optimal LLMs)** — Hoffmann et al., 2022 — [2203.15556](https://arxiv.org/abs/2203.15556)
- [ ] **Requential Coding** - Qiu et al., 2026 - [2607.11883](https://arxiv.org/abs/2607.11883)
- [ ] **RoPE / RoFormer** — Su et al., 2021 — [2104.09864](https://arxiv.org/abs/2104.09864)
- [ ] **FlashAttention** — Dao et al., 2022 — [2205.14135](https://arxiv.org/abs/2205.14135)
- [ ] **Switch Transformers (MoE)** — Fedus et al., 2021 — [2101.03961](https://arxiv.org/abs/2101.03961)
- [ ] **Let's Scale Step by Step** - Kim et al., 2026 - [2608.20061](https://arxiv.org/abs/2608.20061)
- [ ] **Latent MoE** - Elango et al., 2026 - [2601.18089](https://arxiv.org/abs/2601.18089)
- [ ] **LoRA** — Hu et al., 2021 — [2106.09685](https://arxiv.org/abs/2106.09685)
- [ ] **Mamba (Selective SSM)** — Gu & Dao, 2023 — [2312.00752](https://arxiv.org/abs/2312.00752)

**Recent frontier**
- [ ] ★ **It's All Connected / Miras** — Google, 2025 — [2504.13173](https://arxiv.org/abs/2504.13173)
- [ ] ★ **Gated Attention** — Qwen/Alibaba, 2025 — [2505.06708](https://arxiv.org/abs/2505.06708)
- [ ] **Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention** - Katharopoulos et al., 2020 - [2006.16236](https://arxiv.org/abs/2006.16236)
- [ ] **Linear Transformers Are Secretly Fast Weight Programmers** - Schlag et al., 2021 - [2102.11174](https://arxiv.org/abs/2102.11174)
- [ ] **Parallelizing Linear Transformers with the Delta Rule over Sequence Length** - Yang et al., 2024 - [2406.06484](https://arxiv.org/abs/2406.06484)
- [ ] **Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality** - Dao et al., 2024 - [2405.21060](https://arxiv.org/abs/2405.21060)
- [ ] **Gated Delta Networks: Improving Mamba2 with Delta Rule** - Yang et al., 2024 - [2412.06464](https://arxiv.org/abs/2412.06464)
- [ ] **Kimi Linear: An Expressive, Efficient Attention Architecture** - Kimi, 2025 - [2510.26692](https://arxiv.org/abs/2510.26692)
- [ ] **Attention to Mamba** — Apple/Mila, 2026 — [2604.14191](https://arxiv.org/abs/2604.14191)
- [ ] **Gated DeltaNet-2** — NVIDIA, 2026 — [2605.22791](https://arxiv.org/abs/2605.22791)
- [ ] **Fast Byte Latent Transformer** — Meta/Stanford, 2026 — [2605.08044](https://arxiv.org/abs/2605.08044)
- [ ] **Continuous Autoregressive LMs (CALM)** — 2025 — [2510.27688](https://arxiv.org/abs/2510.27688)
- [ ] **The Free Transformer** — Fleuret (Meta), 2025 — [2510.17558](https://arxiv.org/abs/2510.17558)
- [ ] **Lost in Backpropagation: The LM Head is a Gradient Bottleneck** - Godey & Artzi, 2026 - [2603.10145](https://arxiv.org/abs/2603.10145)
- [ ] **Memory Mosaics** - 2024 - [2405.06394](https://arxiv.org/abs/2405.06394)
- [ ] **Memory Mosaics at scale** - 2025 - [2507.03285](https://arxiv.org/abs/2507.03285)

---

## Training, Alignment, Safety & Model Lineage

**Core spine**
- [ ] **Deep RL from Human Preferences** — Christiano et al., 2017 — [1706.03741](https://arxiv.org/abs/1706.03741)
- [ ] **PPO** — Schulman et al., 2017 — [1707.06347](https://arxiv.org/abs/1707.06347)
- [ ] 🎓 **InstructGPT** — Ouyang et al., 2022 — [2203.02155](https://arxiv.org/abs/2203.02155)
- [ ] 🎓 **DPO** — Rafailov et al., 2023 — [2305.18290](https://arxiv.org/abs/2305.18290)
- [ ] **Constitutional AI** — Anthropic, 2022 — [2212.08073](https://arxiv.org/abs/2212.08073)
- [ ] **LLaMA** — Meta, 2023 — [2302.13971](https://arxiv.org/abs/2302.13971)
- [ ] **Llama 2** — Meta, 2023 — [2307.09288](https://arxiv.org/abs/2307.09288)
- [ ] **Llama 3 Herd** — Meta, 2024 — [2407.21783](https://arxiv.org/abs/2407.21783)
- [ ] **GPT-4 Technical Report** — OpenAI, 2023 — [2303.08774](https://arxiv.org/abs/2303.08774)
- [ ] **DeepSeek-V3** — DeepSeek-AI, 2024 — [2412.19437](https://arxiv.org/abs/2412.19437)
- [ ] **Demystifying Reinforcement Learning Post-Training of Language Models** - Clay et al., 2026 - [2608.24949](https://arxiv.org/abs/2608.24949)

**Safety & adversarial** 🎓 *(new — was a gap)*
- [ ] 🎓 **Universal & Transferable Adversarial Attacks (GCG)** — Zou et al. (CMU), 2023 — [2307.15043](https://arxiv.org/abs/2307.15043)
- [ ] 🎓 **DecodingTrust** — Wang et al. (UIUC), 2023 — [2306.11698](https://arxiv.org/abs/2306.11698) *(NeurIPS 2023 oral + Outstanding Benchmark Award)*

**Recent frontier**
- [ ] **The MASK Benchmark** — CAIS + Scale, 2025 — [2503.03750](https://arxiv.org/abs/2503.03750)
- [ ] ★ **Why Language Models Hallucinate** — OpenAI, 2025 — [2509.04664](https://arxiv.org/abs/2509.04664)
- [ ] ★ **Natural Emergent Misalignment from Reward Hacking** — Anthropic + Redwood, 2025 — [2511.18397](https://arxiv.org/abs/2511.18397)
- [ ] **Training-Free GRPO** — 2025 — [2510.08191](https://arxiv.org/abs/2510.08191)
- [ ] **GLM-5** — Zhipu AI, 2026 — [2602.15763](https://arxiv.org/abs/2602.15763)
- [ ] **MiniMax-M2** — MiniMax, 2026 — [2605.26494](https://arxiv.org/abs/2605.26494)
- [ ] **Kimi K3** - Kimi, 2026 - [2607.24653](https://arxiv.org/abs/2607.24653)

**🎓 Optional — alignment & privacy extras**

- [ ] **Extracting Training Data from LLMs** — Carlini et al., 2020 — [2012.07805](https://arxiv.org/abs/2012.07805) *(USENIX Security 2021)*
- [ ] **Aligning AI with Shared Human Values (ETHICS)** — Hendrycks, 2020 — [2008.02275](https://arxiv.org/abs/2008.02275) *(ICLR 2021)*
- [ ] **A Roadmap to Pluralistic Alignment** — Sorensen et al., 2024 — [2402.05070](https://arxiv.org/abs/2402.05070)
- [ ] **Emerged Security & Privacy of LLM Agents (survey)** — 2024 — [2407.19354](https://arxiv.org/abs/2407.19354)

---

## Multimodality

**Understanding line**
- [ ] **CLIP** — OpenAI, 2021 — [2103.00020](https://arxiv.org/abs/2103.00020)
- [ ] **Flamingo** — DeepMind, 2022 — [2204.14198](https://arxiv.org/abs/2204.14198)
- [ ] **BLIP-2** — Salesforce, 2023 — [2301.12597](https://arxiv.org/abs/2301.12597)
- [ ] **LLaVA (Visual Instruction Tuning)** — 2023 — [2304.08485](https://arxiv.org/abs/2304.08485)
- [ ] 🎓 ⚖️ **Eyes Wide Shut? Visual Shortcomings of MLLMs** — Tong et al. (NYU), 2024 — [2401.06209](https://arxiv.org/abs/2401.06209) *(the skeptic for this line)*

**Generation line**
- [ ] **DDPM** — Ho, Jain, Abbeel, 2020 — [2006.11239](https://arxiv.org/abs/2006.11239)
- [ ] **Latent Diffusion / Stable Diffusion** — Rombach et al., 2022 — [2112.10752](https://arxiv.org/abs/2112.10752)

**Recent frontier**
- [ ] **Gemini Embedding 2** — Google DeepMind, 2026 — [2605.27295](https://arxiv.org/abs/2605.27295)
- [ ] **Harnessing the Universal Geometry of Embeddings** - Jha et al., 2025 - [2505.12540](https://arxiv.org/abs/2505.12540)
- [ ] **Audio Flamingo Next** — NVIDIA + UMD, 2026 — [2604.10905](https://arxiv.org/abs/2604.10905)
- [ ] **Improved Large Language Diffusion Models (iLLaDA)** — 2026 — [2606.25331](https://arxiv.org/abs/2606.25331)

**🎓 Optional — multimodal grounding**

- [ ] **GroundingGPT** — Li et al., 2024 — [2401.06071](https://arxiv.org/abs/2401.06071) *(ACL 2024)*

---

## Retrieval & RAG

- [ ] **DPR (Dense Passage Retrieval)** — FAIR, 2020 — [2004.04906](https://arxiv.org/abs/2004.04906)
- [ ] 🎓 **RAG** — Lewis et al., 2020 — [2005.11401](https://arxiv.org/abs/2005.11401)
- [ ] 🎓 **Self-RAG** — Asai et al., 2023 — [2310.11511](https://arxiv.org/abs/2310.11511)
- [ ] 🎓 **Adaptive-RAG** — Jeong et al. (KAIST), 2024 — [2403.14403](https://arxiv.org/abs/2403.14403) *(routes by question complexity — sits between Self-RAG and CRAG)*
- [ ] 🎓 **Corrective RAG (CRAG)** — Yan et al., 2024 — [2401.15884](https://arxiv.org/abs/2401.15884)
- [ ] **GraphRAG** — Microsoft, 2024 — [2404.16130](https://arxiv.org/abs/2404.16130)
- [ ] 🎓 **HippoRAG** — Ohio State, 2024 — [2405.14831](https://arxiv.org/abs/2405.14831) *(graph memory + PageRank; bridges into Agent Scaffolding & Architecture)*
- [ ] **Agentic RAG survey** — Singh et al., 2025 — [2501.09136](https://arxiv.org/abs/2501.09136)
- [ ] **PIXELRAG** - Wang et al., 2026 - [2606.28344](https://arxiv.org/abs/2606.28344)

---

## Agents, Tools, Planning & Multi-Agent

**Core spine**
- [ ] 🎓 **Chain-of-Thought** — Wei et al., 2022 — [2201.11903](https://arxiv.org/abs/2201.11903)
- [ ] **Emergent Abilities** — Wei et al., 2022 — [2206.07682](https://arxiv.org/abs/2206.07682)
- [ ] 🎓 **ReAct** — Yao et al., 2022 — [2210.03629](https://arxiv.org/abs/2210.03629)
- [ ] **Toolformer** — Meta, 2023 — [2302.04761](https://arxiv.org/abs/2302.04761)
- [ ] **Reflexion** — Shinn et al., 2023 — [2303.11366](https://arxiv.org/abs/2303.11366)

**Tool use at scale** 🎓 *(new)*
- [ ] 🎓 **Gorilla: LLM Connected with Massive APIs** — Patil et al. (Berkeley), 2023 — [2305.15334](https://arxiv.org/abs/2305.15334)
- [ ] 🎓 **ToolLLM (16000+ APIs)** — Qin et al. (Tsinghua), 2023 — [2307.16789](https://arxiv.org/abs/2307.16789) *(ICLR 2024 spotlight)*

**Planning** 🎓 *(new — was a total gap)*
- [ ] 🎓 **LLM+P: Optimal Planning Proficiency** — Liu et al. (UT Austin), 2023 — [2304.11477](https://arxiv.org/abs/2304.11477) *(LLM → PDDL → classical planner)*
- [ ] 🎓 **LATS: Language Agent Tree Search** — Zhou et al. (UIUC), 2023 — [2310.04406](https://arxiv.org/abs/2310.04406) *(MCTS unifying ReAct + ToT + Reflexion)*
- [ ] 🎓 **TravelPlanner** — Xie & Zhang, 2024 — [2402.01622](https://arxiv.org/abs/2402.01622) *(the planning benchmark; GPT-4+ReAct scores 0.6%)*
- [ ] **ReAcTree: Hierarchical LLM Agent Trees with Control Flow for Long-Horizon Task Planning** — 2025 — [2511.02424](https://arxiv.org/abs/2511.02424)
- [ ] **Plan-and-Act: Improving Planning of Agents for Long-Horizon Tasks** - 2025 - [2503.09572](https://arxiv.org/abs/2503.09572)

**Multi-agent** 🎓 *(new — was a total gap)*
- [ ] 🎓 **AutoGen** — Wu et al. (Microsoft), 2023 — [2308.08155](https://arxiv.org/abs/2308.08155)
- [ ] 🎓 **CAMEL: Communicative Agents** — Li et al. (KAUST), 2023 — [2303.17760](https://arxiv.org/abs/2303.17760)

**Coding agents** 🎓 *(new — was a total gap)*
- [ ] 🎓 **SWE-bench** — Jimenez & Yang (Princeton), 2023 — [2310.06770](https://arxiv.org/abs/2310.06770) *(the defining coding-agent benchmark)*
- [ ] 🎓 **OpenHands** — Wang et al. (UIUC/CMU), 2024 — [2407.16741](https://arxiv.org/abs/2407.16741)

**Embodied / gaming**
- [ ] **Voyager** — NVIDIA et al., 2023 — [2305.16291](https://arxiv.org/abs/2305.16291)

**Evaluation** 🎓 *(new — was a gap)*
- [ ] 🎓 **Chatbot Arena** — Chiang et al. (Berkeley/LMSYS), 2024 — [2403.04132](https://arxiv.org/abs/2403.04132)
- [ ] 🎓 ⚖️ **AI Agents That Matter** — Kapoor et al. (Princeton), 2024 — [2407.01502](https://arxiv.org/abs/2407.01502) *(read right after Chatbot Arena — the cost-controlled critique of agent benchmarking)*
- [ ] 🎓 **VisualWebArena** — Koh et al. (CMU), 2024 — [2401.13649](https://arxiv.org/abs/2401.13649) *(multimodal web agents; pairs with Multimodality)*

**🎓 Optional — distinguished but narrower**

- [ ] **ToolkenGPT** — Hao et al. (UCSD), 2023 — [2305.11554](https://arxiv.org/abs/2305.11554) *(NeurIPS 2023 oral)*
- [ ] **MineDojo** — Fan et al. (NVIDIA), 2022 — [2206.08853](https://arxiv.org/abs/2206.08853) *(NeurIPS 2022 Outstanding Benchmark Award; Voyager's predecessor)*
- [ ] **A Generalist Agent (Gato)** — DeepMind, 2022 — [2205.06175](https://arxiv.org/abs/2205.06175)
- [ ] **SOTOPIA** — Zhou et al. (CMU), 2023 — [2310.11667](https://arxiv.org/abs/2310.11667) *(ICLR 2024 spotlight; social agents)*
- [ ] **SOTOPIA-π** — Wang et al. (CMU), 2024 — [2403.08715](https://arxiv.org/abs/2403.08715)
- [ ] **Autonomous Evaluation & Refinement of Digital Agents** — Pan et al., 2024 — [2404.06474](https://arxiv.org/abs/2404.06474)
- [ ] **LLM Reasoners** — Hao et al., 2024 — [2404.05221](https://arxiv.org/abs/2404.05221)
- [ ] **What Are Tools Anyway? (survey)** — Wang (CMU), 2024 — [2403.15452](https://arxiv.org/abs/2403.15452)
- [ ] **If LLM Is the Wizard, Code Is the Wand (survey)** — Yang (UIUC), 2024 — [2401.00812](https://arxiv.org/abs/2401.00812)
- [ ] **Survey on LLMs for Code Generation** — Jiang, 2024 — [2406.00515](https://arxiv.org/abs/2406.00515)
- [ ] **Survey on LLM-Based Game Agents** — Hu (Georgia Tech), 2024 — [2404.02039](https://arxiv.org/abs/2404.02039)
- [ ] **BAGEL** — Murty et al. (Stanford), 2024 — [2403.08140](https://arxiv.org/abs/2403.08140)
- [ ] **SOAR (Autonomous Improvement of Instruction Following)** — Berkeley, 2024 — [2407.20635](https://arxiv.org/abs/2407.20635)
- [ ] **Latent Action Pretraining from Videos (LAPA)** — KAIST/UW, 2024 — [2410.11758](https://arxiv.org/abs/2410.11758)

---

## Reasoning Models & Test-Time Compute

**Core spine**
- [ ] **Self-Consistency** — Google, 2022 — [2203.11171](https://arxiv.org/abs/2203.11171)
- [ ] **Least-to-Most Prompting** — Google, 2022 — [2205.10625](https://arxiv.org/abs/2205.10625)
- [ ] 🎓 **Tree of Thoughts** — Yao et al., 2023 — [2305.10601](https://arxiv.org/abs/2305.10601)
- [ ] 🎓 **Multiagent Debate** — Du et al. (MIT), 2023 — [2305.14325](https://arxiv.org/abs/2305.14325) *(society-of-minds reasoning; pairs with AutoGen and CAMEL)*
- [ ] **Let's Verify Step by Step** — OpenAI, 2023 — [2305.20050](https://arxiv.org/abs/2305.20050)
- [ ] **DeepSeekMath / GRPO** — DeepSeek-AI, 2024 — [2402.03300](https://arxiv.org/abs/2402.03300)
- [ ] **Scaling Test-Time Compute** — Snell et al., 2024 — [2408.03314](https://arxiv.org/abs/2408.03314)
- [ ] **OpenAI o1** — 2024 — [blog/system card](https://openai.com/index/learning-to-reason-with-llms/) *(no arXiv)*
- [ ] **DeepSeek-R1** — DeepSeek-AI, 2025 — [2501.12948](https://arxiv.org/abs/2501.12948)

**Recent frontier**
- [ ] ★ **Reasoning with Sampling** — Harvard, 2025 — [2510.14901](https://arxiv.org/abs/2510.14901)
- [ ] ★ **Recursive Language Models (RLMs)** — MIT CSAIL, 2025 — [2512.24601](https://arxiv.org/abs/2512.24601)
- [ ] **Gold-Medal Olympiad Reasoning** — 2026 — [2605.13301](https://arxiv.org/abs/2605.13301)
- [ ] **VibeThinker-3B** — Sina Weibo, 2026 — [2606.16140](https://arxiv.org/abs/2606.16140)
- [ ] **Ring-Zero** — Ant Group, 2026 — [2607.12395](https://arxiv.org/abs/2607.12395)
- [ ] **Empty Shelves or Lost Keys? Recall Is the Bottleneck for Parametric Factuality** - Calderon et al., 2026 - [2602.14080](https://arxiv.org/abs/2602.14080)

---

## Inference Optimization *(optional depth)*

**Canonical anchors — read first**
- [ ] **Grouped-Query Attention (GQA)** — Google, 2023 — [2305.13245](https://arxiv.org/abs/2305.13245)
- [ ] **Speculative Decoding** — Leviathan et al., 2022 — [2211.17192](https://arxiv.org/abs/2211.17192)
- [ ] **GPTQ** — Frantar et al., 2022 — [2210.17323](https://arxiv.org/abs/2210.17323)
- [ ] **PagedAttention / vLLM** — Kwon et al., 2023 — [2309.06180](https://arxiv.org/abs/2309.06180)

**Recent frontier**
- [ ] **Fast KV Compaction via Attention Matching** — 2026 — [2602.16284](https://arxiv.org/abs/2602.16284)
- [ ] **Still: Amortized KV Cache Compaction** — 2026 — [2606.07878](https://arxiv.org/abs/2606.07878)
- [ ] **End-to-End Context Compression at Scale** — 2026 — [2606.09659](https://arxiv.org/abs/2606.09659)
- [ ] **DFlash: Block Diffusion Speculative Decoding** — 2026 — [2602.06036](https://arxiv.org/abs/2602.06036)
- [ ] **Hierarchical Sparse Attention Done Right** — Tencent, 2026 — [2607.02980](https://arxiv.org/abs/2607.02980)
- [ ] **Post-Trained MoE Can Skip Half Experts** — 2026 — [2605.18643](https://arxiv.org/abs/2605.18643)
- [ ] **Delta Attention: Fast and Accurate Sparse Attention Inference by Delta Correction** — 2025 — [2505.11254](https://arxiv.org/abs/2505.11254) 
- [ ] **Cache-to-Cache: Direct Semantic Communication Between Large Language Models** - 2025 - [2510.03215](https://arxiv.org/abs/2510.03215)

**Extended cluster — skim only if going deep**

- [ ] **TokenPilot** — [2606.17016](https://arxiv.org/abs/2606.17016)
- [ ] **TriAttention** — [2604.04921](https://arxiv.org/abs/2604.04921)
- [ ] **Prefill-as-a-Service** — [2604.15039](https://arxiv.org/abs/2604.15039)
- [ ] **The Efficiency Frontier** — [2605.23071](https://arxiv.org/abs/2605.23071)
- [ ] **Decoding as Optimisation on the Probability Simplex** — [2602.18292](https://arxiv.org/abs/2602.18292)
- [ ] **CODA (GEMM-epilogue kernels)** — [2605.19269](https://arxiv.org/abs/2605.19269)
- [ ] **MoBA: Mixture of Block Attention for Long-Context LLMs** - [2502.13189](https://arxiv.org/abs/2502.13189)

---

## Agent Scaffolding & Architecture *(optional depth)*

**Canonical anchors — read first**
- [ ] 🎓 **Cognitive Architectures for Language Agents (CoALA)** — Sumers et al. (Princeton), 2023 — [2309.02427](https://arxiv.org/abs/2309.02427) *(the conceptual framework for agent memory + action space + decision cycle — read this before anything else in this phase)*
- [ ] 🎓 **Generative Agents** — Park et al. (Stanford), 2023 — [2304.03442](https://arxiv.org/abs/2304.03442)
- [ ] **MemGPT: LLMs as Operating Systems** — Berkeley, 2023 — [2310.08560](https://arxiv.org/abs/2310.08560)

**Recent frontier**
- [ ] **Adaptation of Agentic AI (survey)** — 2025 — [2512.16301](https://arxiv.org/abs/2512.16301) *(read as taxonomy)*
- [ ] **Agentic Context Engineering** — Stanford/SambaNova, 2025 — [2510.04618](https://arxiv.org/abs/2510.04618)
  - [ ] *(companion)* Context Engineering 2.0 — [2510.26493](https://arxiv.org/abs/2510.26493)
- [ ] **Small Language Models are the Future of Agentic AI** — NVIDIA, 2025 — [2506.02153](https://arxiv.org/abs/2506.02153)
- [ ] **Harness cluster** — HarnessX [2606.14249](https://arxiv.org/abs/2606.14249) + Harness Handbook [2607.13285](https://arxiv.org/abs/2607.13285)
  - [ ] ⚖️ *read with the skeptic:* Harness Updating Is Not Harness Benefit — [2605.30621](https://arxiv.org/abs/2605.30621)
- [ ] **Skill cluster** — SkillOS [2605.06614](https://arxiv.org/abs/2605.06614) + Compositional Skill Routing [2606.18051](https://arxiv.org/abs/2606.18051)
- [ ] **Agent-memory cluster** — MEMTIER [2605.03675](https://arxiv.org/abs/2605.03675) + Agent-Native Memory? [2606.24775](https://arxiv.org/abs/2606.24775)
  - [ ] ⚖️ *read with the skeptic:* Contextual Agentic Memory is a Memo, Not True Memory — [2604.27707](https://arxiv.org/abs/2604.27707)
  - [ ] **Memento: Fine-tuning LLM Agents without Fine-tuning LLMs** — 2025 — [2508.16153](https://arxiv.org/abs/2508.16153)
  - [ ] **Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents** — 2026 — [2606.06036](https://arxiv.org/abs/2606.06036)
- [ ] **Compiled/small agents** — AgenticQwen [2604.21590](https://arxiv.org/abs/2604.21590) + Compiling Agentic Workflows into Weights [2605.22502](https://arxiv.org/abs/2605.22502)
- [ ] **ContextPilot: Teaching Agents for Proactive Context Management via Fine-grained RL** - Pan et al., 2026 - [2608.28476](https://arxiv.org/abs/2608.28476)

**Auto-research** 🎓
- [ ] 🎓 **The AI Scientist** — Lu et al. (Sakana AI), 2024 — [2408.06292](https://arxiv.org/abs/2408.06292) *(the anchor of the autoresearch cluster you keep seeing — read the original, skip the derivatives)*

**🎓 Optional — agent optimization & auto-research extras**

- [ ] **Fine-Tuning and Prompt Optimization (DSPy BetterTogether)** — Soylu et al. (Stanford), 2024 — [2407.10930](https://arxiv.org/abs/2407.10930)
- [ ] **ResearchTown** — Yu et al. (UIUC), 2024 — [2412.17767](https://arxiv.org/abs/2412.17767)
- [ ] **Can LLMs Provide Useful Feedback on Research Papers?** — Liang et al. (Stanford), 2023 — [2310.01783](https://arxiv.org/abs/2310.01783)

---

## Notes

- **🎓 course overlap:** 10 of your course's papers were already on the map (CoT, ReAct, ToT, RAG, Self-RAG, CRAG, Generative Agents, Voyager, InstructGPT, DPO) — good sign the spine is sound. ~20 more filled real gaps: planning, multi-agent, coding agents, tool-use at scale, evaluation, safety.
- **Excluded from the course list:** Baars, *Global Workspace Theory of Consciousness* — a cognitive-neuroscience paper with no direct methodological role here. Its only link is as background inspiration for CoALA; read it there if curious, not as a node.
- **Not a queue.** Read the core spine of phases matching your goals; pull frontier/optional items only when their connection to a node is obvious to you.
- **Inference Optimization and Agent Scaffolding & Architecture are optional.** The first if you serve/deploy models; the second if you build agents.
- **⚖️ pairs:** read the skeptic alongside the hype.
- **Adding anything new:** it joins only if you can (a) confirm it and (b) connect it to one existing node in one sentence.
