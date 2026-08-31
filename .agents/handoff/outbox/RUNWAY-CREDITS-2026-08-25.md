---
objective: "Snapshot runway tokens/créditos 2026-08-25 (carvão)"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/RUNWAY-CREDITS-2026-08-25.md"
evidence: "OpenRouter GET /api/v1/credits + /api/v1/key 25/08 ~17:33 ART; DeepSeek GET /user/balance; vs OUT 24/08. Sem Anthropic completion. Sem inventar USD."
status: done
blockers: "ANTHROPIC_API_KEY ausente neste processo; usage Anthropic desconhecido. OpenRouter usage_daily=0 nesta key (burn da conta vs ontem = +US$0.45)."
next_action: "Chief fecha 4–8 linhas ao owner. OR restam US$16.22. DS US$26.39 (−0.32 vs ontem). Sem swarm Anthropic."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# RUNWAY créditos — 2026-08-25

Gerado 2026-08-25 17:34 ART. Read-only. Sem session nova. Sem Anthropic.

## Tabela

| provider | usado hoje | saldo/crédito | runway |
|---|---|---|---|
| openrouter (esta key) | US$ 0.00 (`usage_daily`) | US$ 16.22 restantes (20.00 − 3.775 usage total da conta) | sem burn nesta key hoje |
| openrouter (conta vs 24/08 19:09) | US$ 0.45 (3.775 − 3.323) | US$ 16.22 (ontem 16.68) | ~36 d se repetir 0.45; ~21 d se voltar o 0.76 de ontem |
| deepseek-official | US$ 0.32 (26.71 → 26.39) | US$ 26.39 | desconhecido (sem usage-hoje da API) |
| anthropic | desconhecido (key ausente neste processo) | ~US$ 5 (declaração owner 24/08) | não queimar em swarm |

Números USD só o que a API devolveu ou o owner já declarou.

## Fontes

- \`GET https://openrouter.ai/api/v1/credits\` → total_credits=20, total_usage=3.775186648
- \`GET https://openrouter.ai/api/v1/key\` → usage_daily=0, usage=0.14023175, limit=null
- \`GET https://api.deepseek.com/user/balance\` → total_balance=26.39 USD
- Anthropic: sem key no env deste processo; não chamei completion
- 3081 HTTP 200 PID 861 (não matei)
