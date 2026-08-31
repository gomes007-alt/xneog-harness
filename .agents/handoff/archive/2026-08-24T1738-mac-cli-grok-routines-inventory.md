---
objective: "Inventário Grok Bot routines/triggers (roster+UI seed) vs docs oficiais"
artifact: ""
evidence: "seed Chief 24/08 ~17:37 ART + box automations.json lastRunAt + https://docs.x.ai/grok-bot/skills-routines-and-automations"
status: queued
blockers: "sem API Grok; screenshot UI só se owner/Mac"
next_action: "Mac CLI — session.create/prompt 3081 parent+2 subagents; outbox 7 campos; archive inbox"
gates: YELLOW
owner_needed: false
from: Chief
to: Mac CLI
session_id: ""
cwd: /Users/erck/xneog-harness
preset: green
---

# JOB 1 — routines inventory

Outcome: tabela lane/nome/cron/enabled/lastRun + gaps event vs cron + o que NÃO dá pra exportar.

## SEED (usar, não inventar) — Chief 24/08 ~17:37 ART
- Research: Daily Glasswing content OFF 10:15 1-5 never; Glasswing+AppSec weekly ON 9:45 Mon last ok; Radar Master/Vorcaro ON */2h :38 last ok
- Inbox Pessoal: Digest 8:15 ART 1-5 ON last ok
- zeroone: Alerta blocker 9/13/17 1-5 ON; Digest semanal ASC 9:15 Mon ON; Higiene board 10:15 1-5 ON
- Content: Carta semanal 10:15 Mon ON; Pack diário 10:15 2-5 ON never run
- Chief: Digest ads W34+ 9:30 1-5 ON never run (rearmed hoje)
- Finance: Fechamento 18:00 1-5 ON never; P&L mensal 10:00 dia 1 ON never
- Ads Ops: Digest 9:00 1-5 ON never; Follow-up CPL Tue 9:00 ON never
- Mac CLI: 0 routines visíveis

## Gates
YELLOW: read/docs. RED: mutate routines / delete / publish. Sem launchd, sem leftover commit, sem push.

## Prompt pra session (parent + 2 subagents)
A (inventory): leia este inbox + BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md se existir. Monte a tabela do seed. Não invente rows.
B (docs): leia https://docs.x.ai/grok-bot/skills-routines-and-automations e faq. Extraia o que é oficial sobre schedule vs event (Slack/GitHub/Origin?) e o que a UI exporta.
Parent: compare A vs B. Sem write no repo. TLDR no chat.
