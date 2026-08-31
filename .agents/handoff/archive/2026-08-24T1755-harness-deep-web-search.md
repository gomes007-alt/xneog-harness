---
objective: "Deep search 2026 (oficial+campo) Grok Bot teammates/routines/approvals + harness swarm cost + o que xNeog copia sem API Grok"
artifact: ""
evidence: "MISSION-CONTRACT, BRIEF-GROK-BOT-TEAMMATES, OUT live-test, spec bridge 2026-08-24; Mac CLI system context sob demanda do owner"
status: queued
blockers: "2 PIDs :3081 (não matar); WT dirty (não commit)"
next_action: "Harness — session.create + parent + 2–3 subagents WEB; 1 write OUT; archive inbox"
gates: YELLOW
owner_needed: false
from: Chief
to: Harness
session_id: ""
cwd: /Users/erck/xneog-harness
preset: yellow
---

# JOB — deep web search (lógica padrão)

Outcome: 1 outbox md com 7 campos + tabela fontes (URL + 1 linha) + 5 ações acionáveis pro owner/Chief.
Espelhar se possível em /workspace/xneog-harness/ no box.

## Lógica padrão (obrigatória)
1. Parent orquestra; max 3 subagents WEB em paralelo (não serial).
2. Filhos: modelo barato; só search/read/summarize. Parent escreve 1 OUT.
3. Claims factuais com URL + data. Sem inventar API/webhook/CLI Grok.
4. Cruzar fontes oficiais (docs.x.ai, forum Cursor, x.ai news) com campo 2026 (harness/swarm papers).
5. Cruzar com evidência local: MISSION-CONTRACT-HANDOFF.md, BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md, OUT-HARNESS-TEAMMATES-LIVE-TEST-2026-08-24.md, OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md, spec .agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md.
6. Contexto extra do Mac CLI (sistema Gomes/xNeog) entra como Evidence se chegar; não espera se atrasar.

## 3 frentes (1 subagent cada)
A. Grok Bot teammates always-on / routines / approvals (docs.x.ai + forum Cursor 2026)
B. Agent harness + swarm / multi-subagent cost (papers + harness dsh 2026)
C. O que xNeog pode copiar AGORA sem API Grok (drop path, HANDOFF, presets G/Y/R, Three-Run Proof)

## Constraints
- YELLOW: web + write outbox/archive. RED: push, launchd, spend, publish, kill PID, leftover commit.
- Sem fan-out Ads/Content/zeroone/Inbox.
- Não inventar API/webhook.

## DoD
- Outbox com frontmatter 7 campos preenchido
- Tabela fontes
- 5 ações
- session_id no frontmatter
- inbox → archive (mv)
