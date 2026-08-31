---
objective: "Integrar lógica Grok Bot teammates no harness local (Mac Air M4) de forma clara/fácil e otimizar workflows/loops diários"
artifact: ""
evidence: "OUT deep-web 1755, OUT adversarial 1824, spec bridge, MISSION-CONTRACT, G/Y/R composition live PID 79836, policy custo, snapshot Mac CLI se chegar"
status: queued
blockers: "não matar PIDs; WT dirty hold; não reusar session-5d35710e (full access manual)"
next_action: "Harness — nova session yellow; 3 filhos baratos; 1 OUT"
gates: YELLOW
owner_needed: false
from: owner
to: Harness
session_id: ""
cwd: /Users/erck/xneog-harness
preset: yellow
---

# JOB — teammates → harness, workflows diários

Contexto fixo (não inventar):
- Owner Gomes. MacBook Air, user erck, HOME /Users/erck. Harness live ~/xneog-harness.
- Web 127.0.0.1:3081 PID 79836 SEM --patch; G/Y/R na composition base. PID 826 = proxy Tailscale. NÃO matar.
- DSH_HOME ~/.xneog-harness. ~/xneog é repo velho. launchd harness-web BOOTED OUT.
- Time: Chief orquestra; Harness opera 3081+inbox; Mac CLI só shell; Research lê outbox. Sem fan-out Ads/Content/zeroone.
- HANDOFF 7 + G/Y/R + inbox/outbox/archive. Default job = yellow/workspace-write+ask. Full access só se owner ligar na UI; não é default.
- Custo: filhos openrouter/minimax-m3 ou deepseek-v4-flash. Sem Anthropic nestes filhos. Sem opus.
- Routines Grok já existem (Content 10:15, Research weekly/radar, Finance, Ads, Inbox, zeroone). Mac CLI 0 routines. Bridge ainda manual.

## Lógica (obrigatória)
Parent orquestra. 3 subagents PARALELO, baratos:
A. Contexto local: ler MISSION-CONTRACT-HANDOFF.md, spec bridge, OUT 1755, OUT 1824, composition permission em packages/bundle/base/cordis.patch.yml. Cruzar snapshot Mac se injetado.
B. Mapa claro teammates Grok Bot → harness (1 inbox → 1 lane → session yellow → 1 OUT). O que copiar AGORA sem API Grok.
C. Otimizar loops diários: quais routines ficam no Grok Bot vs quais viram job inbox no harness; Three-Run antes de rotina; anti-fan-out; model-cap.

## DoD
1 arquivo:
/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-24T1848-harness-teammates-workflow.md
frontmatter 7 campos + session_id +
1) mapa mental 1 página (quem escreve/lê/dispara)
2) fluxo diário recomendado (manhã/tarde) em passos curtos
3) 5 mudanças concretas YELLOW (docs/composition/handoff) — sem launchd permanente, sem push
NÃO mv inbox. Sem commit/kill/launchd/plist.
