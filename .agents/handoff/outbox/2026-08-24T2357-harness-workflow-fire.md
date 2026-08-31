---
objective: "Disparar workflow teammates no harness live: inbox→1 session→1 OUT. Travar 5 regras SOP. Three-Run #3."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-24T2357-harness-workflow-fire.md"
evidence: "session session-3c6f1b03-2a71-4473-a69e-5cc2ba638bf1 leu inbox + bash pwd/curl; parent fechou OUT (session parou após health). PID 3261 cwd ~/xneog-harness HTTP 200. defaultPreset danger-full-access. Wrapper cd ~/xneog-harness."
status: done
blockers: "session-3c6f1b03 stall após health; parent fechou. WT dirty hold. launchd booted out."
next_action: "Three-Run #3 feito. Watcher de inbox só 7h30–9h e 17h30–19h — criar routine no Grok Bot com GO. Sem cron 24h."
gates: YELLOW
from: Harness
to: Chief
session_id: "session-3c6f1b03-2a71-4473-a69e-5cc2ba638bf1"
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — workflow fire (Three-Run #3)

Fechado 2026-08-24 23:58 ART. Session `session-3c6f1b03-2a71-4473-a69e-5cc2ba638bf1` no PID 3261.

## Health
PID 3261 cwd `/Users/erck/xneog-harness`, HTTP 200, default Full access, proxy 1514 vivo, launchd harness-web booted out, wrapper `cd "$HOME/xneog-harness"`.

## 5 regras SOP
1. CTWA: criativo com custo observável (Spence), não stack de viés.
2. 1ª msg WA = prompt Fogg (MAP no mesmo instante), não nurture.
3. Job só entra por inbox HANDOFF público (common knowledge). 1 OUT.
4. Partners: cap 3 filhos; timeout/card/sleep ≠ defection; parent fecha o OUT.
5. Sem os 7 campos, recusa. GO escrito, não recado.

## Three-Run
#1 workflows 1848 · #2 live-code-media 1912 · #3 este 2357. Watcher de inbox liberado **só** nas janelas 7h30–9h e 17h30–19h, weekdays. Sem 24h.
