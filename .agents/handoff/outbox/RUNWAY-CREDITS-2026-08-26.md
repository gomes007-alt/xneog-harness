---
objective: "Snapshot runway tokens/créditos 2026-08-26 (carvão)"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/RUNWAY-CREDITS-2026-08-26.md"
evidence: "OpenRouter GET /api/v1/credits + /api/v1/key 26/08 ~17:32 ART; DeepSeek GET /user/balance; vs OUT 25/08. Sem Anthropic no report. Sem inventar USD."
status: done
blockers: "OpenRouter usage_daily=0 nesta key (burn da conta vs 25/08 = +US$0.10). DeepSeek usage-hoje API = desconhecido."
next_action: "Chief fecha 4–8 linhas ao owner. OR restam US$16.13. DS US$26.38 (−0.01 vs ontem)."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# RUNWAY créditos — 2026-08-26

Gerado 2026-08-26 17:32 ART. Read-only. Sem session nova. Sem Anthropic.

## Tabela

| provider | usado hoje | saldo/crédito | runway |
|---|---|---|---|
| openrouter (esta key) | US$ 0.00 (`usage_daily`) | US$ 16.13 restantes (20.00 − 3.8705 usage total da conta) | sem burn nesta key hoje |
| openrouter (conta vs 25/08 17:34) | US$ 0.10 (3.8705 − 3.7752) | US$ 16.13 (ontem 16.22) | ~161 d se repetir 0.10; ~36 d se voltar o 0.45 de 25/08; ~21 d se voltar 0.76 |
| deepseek-official | US$ 0.01 (26.39 → 26.38) | US$ 26.38 | desconhecido (sem usage-hoje da API) |

Números USD só o que a API devolveu.

## Fontes

- `GET https://openrouter.ai/api/v1/credits` → total_credits=20, total_usage=3.870539454
- `GET https://openrouter.ai/api/v1/key` → usage_daily=0, usage=0.14023175 (igual 25/08), limit=null
- `GET https://api.deepseek.com/user/balance` → total_balance=26.38 USD
- 3081 HTTP 200 PID 821 localhost + PID 842 Tailscale (não matei)
- Sessions tocadas hoje (mtime / RPC): 3; tokenUsage acumulado nessas sessions (não é spend USD): in 241873 / out 11718 / cacheRead 143872
