---
objective: "Snapshot runway tokens/créditos 2026-08-24 (carvão)"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/RUNWAY-CREDITS-2026-08-24.md"
evidence: "OpenRouter GET /api/v1/credits + /auth/key 24/08 ~19:07 ART; DeepSeek GET /user/balance; session.history tokenUsage em 22 sessions mtime hoje; Anthropic saldo owner ~US$5 (API usage 401 neste processo). Sem chamada Anthropic de completion."
status: done
blockers: "Anthropic usage API desconhecido (401). DeepSeek usage-hoje desconhecido (só saldo). tokenUsage harness pode somar parent+filho (overlap). OpenAI key inválida."
next_action: "Owner — burn de hoje é OpenRouter ~US$0.76 nesta key; saldo OR ~US$16.68 (~22d se repetir). Anthropic ~US$5 não queimar em swarm."
gates: YELLOW
owner_needed: false
from: Harness
to: Chief
session_id: ""
cwd: /Users/erck/xneog-harness
preset: yellow
---

# RUNWAY créditos — 2026-08-24

Gerado 2026-08-24 19:09 ART. Read-only. Sem session nova. Sem Anthropic completion.

## Tabela

| provider | usado hoje | saldo/crédito | runway (se burn de hoje) |
|---|---|---|---|
| openrouter (esta key) | US$ 0.76 (`usage_daily`) | US$ 16.68 restantes (20.00 créditos − 3.32 usage total da conta) | ~22 dias (16.68 / 0.76) |
| openrouter (conta) | desconhecido (só total lifetime US$ 3.32) | US$ 16.68 | ver linha acima |
| deepseek-official | desconhecido (sem endpoint de usage-hoje) | US$ 26.71 disponível | desconhecido (sem burn medido hoje) |
| anthropic | desconhecido (API usage 401); jobs de hoje no harness foram MiniMax | ~US$ 5 (owner) | não queimar em swarm; 1× haiku só se GO |
| openai nativo | desconhecido (key 401) | desconhecido | desconhecido |

Números USD **não inventados**: só o que a API devolveu ou o owner disse.

## Volume harness hoje (tokens, logs)

Soma das projections `tokenUsage` das 22 sessions com mtime hoje em `~/.xneog-harness/sessions` (pais + filhos). **Pode haver overlap** parent/filho.

| | tokens |
|---|---|
| uncached input | 1,117,351 |
| output | 114,431 |
| cache read | 4,704,168 |

Jobs: deep-web `41a6e9da` · adversarial `5d35710e` · workflow `ff8e0093` · JOB1 `1c114245` · ROUND2/LIVE + subagents.

Provider nos jobs de hoje: default/instrução = `openrouter/minimax-m3`. Sem evidência de Anthropic/DeepSeek nesses turns.

## Como ler

- Carvão que importa pra amanhã: **OpenRouter ~US$16.68**. Se o dia repetir (~US$0.76), ~3 semanas.
- DeepSeek ~US$26.71 parado (não usamos hoje).
- Anthropic ~US$5: reserva de 1 review haiku; **não** 3-wide.
- Este report **não** gastou Anthropic.

## Fontes

- `GET https://openrouter.ai/api/v1/credits` → total_credits=20, total_usage=3.323151128
- `GET https://openrouter.ai/api/v1/auth/key` → usage_daily=0.76248332, usage=1.511297689, limit=null
- `GET https://api.deepseek.com/user/balance` → total_balance=26.71 USD
- Anthropic: models 401 neste processo; saldo = declaração owner
- `session.history` projections `tokenUsage` via 127.0.0.1:3081
