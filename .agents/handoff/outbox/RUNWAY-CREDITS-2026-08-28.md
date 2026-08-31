---
objective: "Snapshot runway tokens/créditos 2026-08-28 (carvão)"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/RUNWAY-CREDITS-2026-08-28.md"
evidence: "OpenRouter GET /api/v1/credits + /api/v1/auth/key 28/08 ~17:43 ART; DeepSeek GET /user/balance (Keychain); vs OUT 27/08. Projcache sessionListMetadata.lastPromptAt hoje + tokenUsage. Sem Anthropic no report. Sem inventar USD."
status: done
blockers: "OpenRouter usage_daily=0 nesta key (burn da conta vs 27/08 = US$0.00). DeepSeek usage-hoje API = desconhecido (só delta de saldo). RPC session.list HTTP não respondeu; usei projcache local."
next_action: "Chief fecha 4–8 linhas ao owner. OR restam US$16.13 (flat). DS US$22.40 (−1.71 vs ontem) — ~13 d se repetir."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# RUNWAY créditos — 2026-08-28

Gerado 2026-08-28 17:43 ART. Read-only. Sem session nova. Sem Anthropic.

## Tabela

| provider | usado hoje | saldo/crédito | runway |
|---|---|---|---|
| openrouter (esta key) | US$ 0.00 (`usage_daily`) | US$ 16.13 restantes (20.00 − 3.8705 usage total da conta) | sem burn nesta key hoje |
| openrouter (conta vs 27/08 17:37) | US$ 0.00 (3.8705 − 3.8705) | US$ 16.13 (ontem 16.13) | flat vs ontem; ~36 d se voltar o 0.45 de 25/08; ~21 d se voltar 0.76 |
| deepseek-official | US$ 1.71 (24.11 → 22.40) | US$ 22.40 | ~13 d se repetir 1.71; desconhecido o usage-hoje da API |

Números USD só o que a API devolveu.

## Fontes

- `GET https://openrouter.ai/api/v1/credits` → total_credits=20, total_usage=3.870539454
- `GET https://openrouter.ai/api/v1/auth/key` → usage_daily=0, usage=0.14023175 (igual 25–27/08), limit=null
- `GET https://api.deepseek.com/user/balance` → total_balance=22.40 USD
- 3081 HTTP 200 PID 64316 localhost + PID 871 Tailscale (não matei)
- Sessions com lastPromptAt hoje (projcache): 10 (3 root + 7 child); tokenUsage acumulado nessas sessions (não é spend USD; pode overlap parent/filho): in 1001561 / out 279946 / cacheRead 48874583
