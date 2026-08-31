---
objective: "Live test: alavancar código + mídia na infra local (harness 3081, Mac M4) seguindo HANDOFF/G/Y/R e otimizando o fluxo"
artifact: ""
evidence: "G/Y/R composition live PID 79836; OUT workflow 1848; RUNWAY 24/08; spec bridge"
status: queued
blockers: "não matar PIDs; WT dirty hold; não reusar sessions full-access"
next_action: "Harness — session yellow nova; 2 filhos baratos (código + mídia); 1 OUT"
gates: YELLOW
owner_needed: false
from: owner
to: Harness
session_id: ""
cwd: /Users/erck/xneog-harness
preset: yellow
---

# JOB — live test código + mídia

Infra: ~/xneog-harness · 127.0.0.1:3081 PID 79836 SEM --patch · DSH_HOME ~/.xneog-harness · Air M4. NÃO matar 826.

2 subagents PARALELO, openrouter/minimax-m3 (ou deepseek-v4-flash). Sem Anthropic.

A CÓDIGO: um script pequeno em `.agents/handoff/outbox/live-gyr-probe.mjs` (ou .py) que lê a composition `packages/bundle/base/cordis.patch.yml` row permission e imprime JSON {presets, defaultPreset, redTools}. Rodar 1× e colar stdout no OUT. Sem deps novas, sem commit, sem mexer em packages/ além de LER.

B MÍDIA: um arquivo `.agents/handoff/outbox/live-teammates-flow.mmd` (mermaid flowchart) do fluxo real:
owner → Chief HANDOFF → inbox → Harness session yellow → 1 OUT → archive
+ lanes (Research/Mac CLI). Estilo simples, PT-BR curto.

Parent escreve:
`.agents/handoff/outbox/2026-08-24T1912-harness-live-code-media.md`
7 campos + session_id + paths dos 2 artefatos + 3 otimizações YELLOW concretas (sem launchd/push).
NÃO mv inbox. Sem danger-full-access.
