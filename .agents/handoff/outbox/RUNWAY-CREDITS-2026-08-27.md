---
objective: "Snapshot runway tokens/créditos 2026-08-27 (carvão)"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/RUNWAY-CREDITS-2026-08-27.md"
evidence: "OpenRouter GET /api/v1/credits + /api/v1/key 27/08 ~17:37 ART; DeepSeek GET /user/balance; vs OUT 26/08. Sem Anthropic no report. Sem inventar USD."
status: done
blockers: "OpenRouter usage_daily=0 nesta key (burn da conta vs 26/08 = US$0.00). DeepSeek usage-hoje API = desconhecido (só delta de saldo)."
next_action: "Chief fecha 4–8 linhas ao owner. OR restam US$16.13 (flat). DS US$24.11 (−2.27 vs ontem) — ~11 d se repetir."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# RUNWAY créditos — 2026-08-27

Gerado 2026-08-27 17:37 ART. Read-only. Sem session nova. Sem Anthropic.

## Tabela

| provider | usado hoje | saldo/crédito | runway |
|---|---|---|---|
| openrouter (esta key) | US$ 0.00 (`usage_daily`) | US$ 16.13 restantes (20.00 − 3.8705 usage total da conta) | sem burn nesta key hoje |
| openrouter (conta vs 26/08 17:32) | US$ 0.00 (3.8705 − 3.8705) | US$ 16.13 (ontem 16.13) | flat vs ontem; ~36 d se voltar o 0.45 de 25/08; ~21 d se voltar 0.76 |
| deepseek-official | US$ 2.27 (26.38 → 24.11) | US$ 24.11 | ~11 d se repetir 2.27; desconhecido o usage-hoje da API |

Números USD só o que a API devolveu.

## Fontes

- `GET https://openrouter.ai/api/v1/credits` → total_credits=20, total_usage=3.870539454
- `GET https://openrouter.ai/api/v1/key` → usage_daily=0, usage=0.14023175 (igual 25/08 e 26/08), limit=null
- `GET https://api.deepseek.com/user/balance` → total_balance=24.11 USD
- 3081 HTTP 200 PID 22828 localhost + PID 899 Tailscale (não matei)
- Sessions tocadas hoje (RPC `session.list` updatedAt + `session.history` tail confirm): 19 (13 root + 6 child); tokenUsage acumulado nessas sessions (não é spend USD; pode overlap parent/filho): in 1662507 / out 488980 / cacheRead 17353919
