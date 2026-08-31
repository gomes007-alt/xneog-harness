---
objective: "Pausar leftover HF …-lrl. Principal Qwen continua scaled-to-zero."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2029-hf-leftover-pause.md"
evidence: "GET v2/endpoint/nztfortyh: 2 endpoints. POST …/qwen3-8-27b-uncensored-gguf-lrl/pause HTTP 200 state=paused. qwen3-8-27b-q4km segue scaledToZero. Sem wake. Sem delete."
status: done
blockers: "Leftover ainda existe (paused). Delete só com GO. Principal acorda se alguém mandar request."
next_action: "Sem Wake Up no principal sem GO. Sem top-up. Volume = OR/DS."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — leftover HF pausado

- `qwen3-8-27b-q4km`: scaledToZero (principal, US$1.80/h se acordar). Não toquei.
- `qwen3-8-27b-uncensored-gguf-lrl`: **paused** (era leftover US$2.31 no período). Não acorda com request.
- Sem delete. Sem wake. Sem top-up. Sem upgrade de revision.
