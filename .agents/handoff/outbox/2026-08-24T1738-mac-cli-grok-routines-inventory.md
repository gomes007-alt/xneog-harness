---
objective: "Inventário Grok Bot routines/triggers (roster+UI seed) vs docs oficiais"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-24T1738-mac-cli-grok-routines-inventory.md"
evidence: "seed Chief 24/08 ~17:37 ART; box automations.json 24/08 17:38 ART; https://docs.x.ai/grok-bot/skills-routines-and-automations (fetched); session-1c114245-3b31-4d7f-97df-6b79064162cb"
status: done
blockers: "sem API Grok; sem screenshot UI; session 3081 ainda running (2 subagents) no momento do outbox"
next_action: "Chief — decidir se algum cron never-run precisa de Test run; event Slack/GitHub/Origin = GO separado"
gates: YELLOW
owner_needed: false
from: Mac CLI
to: Chief
session_id: session-1c114245-3b31-4d7f-97df-6b79064162cb
cwd: /Users/erck/xneog-harness
preset: green
---

# JOB 1 OUT — Grok Bot routines inventory

## Context
- 14 routines no roster (8 lanes). Mac CLI: **0**.
- Todas as 14 são **cron**. Zero event trigger (Slack/GitHub/Origin/Teams/Linear/Sentry/PagerDuty).
- Seed Chief batia com o disco; correção pontual: zeroone alerta é `:15` (não `:00`).
- Docs oficiais **sim** documentam schedule **e** event. O seed “event NÃO documentado” está **errado**.

## Tabela (lane / nome / cron / enabled / lastRun ART)

| Lane | Nome (disk id) | Cron | Enabled | lastRun ART |
|------|----------------|------|---------|-------------|
| Research | Daily Glasswing content (`daily-glasswing-content`) | `15 10 * * 1-5` | OFF | never |
| Research | Glasswing+AppSec weekly (`glasswing-appsec-weekly`) | `45 9 * * 1` | ON | 2026-08-24 09:47 |
| Research | Radar Master/Vorcaro (`radar-caso-master-vorcaro`) | `38 */2 * * *` | ON | 2026-08-24 14:42 |
| Inbox Pessoal | Digest (`digest-di-rio-inbox-pessoal`) | `CRON_TZ=America/Argentina/Buenos_Aires 15 8 * * 1-5` | ON | 2026-08-24 08:17 |
| zeroone | Alerta blocker (`alerta-de-blocker-app-store`) | `15 9,13,17 * * 1-5` | ON | 2026-08-24 13:17 |
| zeroone | Digest semanal ASC (`digest-semanal-app-store`) | `15 9 * * 1` | ON | 2026-08-24 09:18 |
| zeroone | Higiene board (`higiene-leve-do-board`) | `15 10 * * 1-5` | ON | 2026-08-24 10:19 |
| Content | Carta semanal (`carta-semanal-glasswing-xneog`) | `15 10 * * 1` | ON | 2026-08-24 10:15 |
| Content | Pack diário (`pack-di-rio-glasswing-xneog`) | `15 10 * * 2-5` | ON | never |
| Chief | Digest ads W34+ (`digest-ads-di-rio-w34`) | `30 9 * * 1-5` | ON | never (rearmed hoje, seed) |
| Finance | Fechamento (`fechamento-di-rio-financeiro`) | `0 18 * * 1-5` | ON | never |
| Finance | P&L mensal (`p-l-mensal`) | `0 10 1 * *` | ON | never |
| Ads Ops | Digest (`digest-di-rio-ads-ops`) | `0 9 * * 1-5` | ON | never |
| Ads Ops | Follow-up CPL (`follow-up-cpl-variations`) | `0 9 * * 2` (Tue 09:00) | ON | never |
| Mac CLI | — | — | — | 0 routines |

TZ: Inbox é o único com `CRON_TZ=America/Argentina/Buenos_Aires`. Os demais herdam TZ do app (user zone). lastRun = `automation.json.lastRunAt` convertido ART. never = `lastRunAt` null.

## Docs oficiais vs roster

Fonte: https://docs.x.ai/grok-bot/skills-routines-and-automations

| Oficial | Roster hoje |
|---------|-------------|
| Routine = schedule **or** event | 14/14 schedule only |
| Event: Slack message, GitHub notification (Cursor account integrations, **não** plugin) | 0 event listeners |
| Origin / Linear / Sentry / PagerDuty / Teams / webhook | **não citados** nessa página |
| UI: Bot → View conversation details → Routines (enable/pause/test/edit/history/delete) | sem screenshot nesta passada |
| Até 50 routines/bot; 20 run records mais recentes | 14 no time; history além de lastRunAt **não exportável** |
| Sem API pública de list/export | confirmado (sem API Grok Bot) |

## Gaps (event vs cron)
1. Nada no roster usa event trigger — tudo é relógio. Docs já cobrem Slack/GitHub.
2. Origin **não** está na doc oficial desta página (existe no runtime Grok Bot; não documentado ali).
3. 6 ON nunca rodaram: Content pack, Chief digest, Finance×2, Ads Ops×2.
4. Research daily Glasswing está OFF (Content owns o pack).
5. Mac CLI sem routine — bridge inbox ainda é manual.

## O que NÃO dá pra exportar
- API / dump oficial do roster
- Histórico de runs além de `lastRunAt` (UI guarda 20; não lemos)
- Outcome de cada run (ok/fail/body)
- Screenshot da UI Routines
- Estado de conexão Cursor (Slack/GitHub) pra event triggers
- Prompt completo de cada routine (não copiado de propósito)

## Session
- id `session-1c114245-3b31-4d7f-97df-6b79064162cb` · título JOB1 routines inventory
- parent + 2 subagents: `4752846a` inventory · `ec13083f` docs (ainda running quando o outbox fechou)
- Este arquivo é a fonte: seed + disco + docs fetch. Session é prova de protocolo.

## Gates
YELLOW done. RED não tocado (sem mutate/delete/publish/push/launchd).
