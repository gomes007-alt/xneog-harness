---
objective: "1º cliente live: Qwen uncensored no app nativo. 1 prompt de prova."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2043-first-client-uncensored.md"
evidence: "HF qwen3-8-27b-q4km resume 200 → running ready=1 em 21s. 3081 HTTP 200. XNeogHarness.app PID 66976. session-f144e35e create+selectModel+prompt accepted. Reply: Uncensored live + qwen3.8-27b-uncensored-q4. turns=1 out=260 ttft=8.8s. leftover …-lrl segue paused. TS:3080=401 sem Bearer (esperado)."
status: done
blockers: "Session nasceu danger-full-access + approval never (evento 'changed by the user' / default local). Não mutei settings.yaml. iPhone só se o app tiver o token do proxy."
next_action: "Owner DIGITA no XNeogHarness.app (Mac: http://127.0.0.1:3081). Session session-f144e35e. Sem 3º turno se ctx>23k. Scale-to-zero HF em 15 min idle = US$1.80/h enquanto up."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — first client uncensored

## HF
- `qwen3-8-27b-q4km`: **running** (acordado 20:43, ~21s). US$1.80/h.
- leftover `…-lrl`: paused. Não toquei.

## Prova
- session `session-f144e35e-8892-4e8d-9061-24284f22a810`
- modelo `hf-qwen38-q4` / `qwen3.8-27b-uncensored-q4`
- 1 prompt → 1 frase: "Uncensored live — estou no ar no XNeogHarness nativo, com o model id `qwen3.8-27b-uncensored-q4`."
- ctx ~12.7k/32k. Sem retomar f853fcca / ac8d86a3.

## Onde digitar
- Mac app: `/Applications/XNeogHarness.app` · base `http://127.0.0.1:3081`
- iPhone: Tailscale `https://macbook-air-de-cardoso.tail0360aa.ts.net:3080` (401 sem token; o app já provisiona)

Pode digitar agora nessa session. Sem yaml, sem restart, sem MiniMax.
