---
objective: "Disparar workflow teammates no harness live (PID 3261): inbox→1 session→1 OUT. Travar 5 regras SOP. Three-Run #3."
artifact: ""
evidence: "wrapper cd ~/xneog-harness; default Full; OUT pesquisa 1927; sem Anthropic"
status: running
blockers: "WT dirty hold; não matar 3261/1514; launchd booted out"
next_action: "Harness — nova session; 1 OUT; archive inbox"
gates: YELLOW
owner_needed: false
from: owner
to: Harness
session_id: "session-3c6f1b03-2a71-4473-a69e-5cc2ba638bf1"
cwd: /Users/erck/xneog-harness
preset: yellow
---
# JOB — workflow fire (owner 23:56)

Outcome: 1 OUT em `/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-24T2357-harness-workflow-fire.md` com 7 campos +:
1. Health 1 linha (PID/cwd/HTTP/preset)
2. As 5 regras SOP (sinal caro CTWA; 1ª msg WA=prompt; HANDOFF público; partners cap 3; 7 campos ou recusa)
3. Contagem Three-Run (este é #3) e se já pode watcher de inbox nas janelas 7h30–9h / 17h30–19h

YELLOW: write só outbox. Sem commit/push/launchd/kickstart. Sem Anthropic. Modelo openrouter/minimax-m3. Sem spawn >1 filho. Não reabrir sessions antigas.
