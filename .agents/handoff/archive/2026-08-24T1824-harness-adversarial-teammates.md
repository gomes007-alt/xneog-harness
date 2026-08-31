---
objective: "Red-team protocolo teammates/harness (HANDOFF 7, G/Y/R, inbox, custo, anti-fan-out)"
artifact: ""
evidence: "OUT deep-web 17:55, BRIEF, MISSION-CONTRACT raiz, spec bridge, policy custo Anthropic ~US$5"
status: queued
blockers: "não matar PIDs 3081; WT dirty hold; não reabrir session-41a6e9da"
next_action: "Harness — nova session; filhos baratos A=defesa B=ataque; haiku 1× no fim se couber"
gates: YELLOW
owner_needed: false
from: Chief
to: Harness
session_id: ""
cwd: /Users/erck/xneog-harness
preset: yellow
---

# JOB — análise ADVERSARIAL (teammates logic + model test)

Parent Chief-style. Max 2 subagents em paralelo (NÃO 3-wide Anthropic).
Filhos: openrouter/minimax-m3 OU deepseek-official/deepseek-v4-flash.
Parent barato (mesmo default).
Reviewer Anthropic haiku: no máximo 1 chamada no FINAL, no parent, NUNCA como filho swarm. Se risco de queimar ~US$5, SKIP e avisa.

## Frentes
A defesa: o protocolo atual segura? (HANDOFF 7, G/Y/R, inbox/outbox, custo, anti-fan-out)
B ataque: como quebrar gates, gastar Anthropic, misturar lanes, skip ask.

## DoD
1 outbox: `/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-24T1824-harness-adversarial-teammates.md`
frontmatter 7 campos + session_id + falhas reais + 5 patches YELLOW (sem código prod se não precisar).
NÃO mv inbox (eu arquivo). NÃO push/launchd/commit/kill PID/opus/fan-out Ads.

Ler: MISSION-CONTRACT-HANDOFF.md (raiz), BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md, .agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md, .agents/handoff/outbox/2026-08-24T1755-harness-deep-web-search.md
