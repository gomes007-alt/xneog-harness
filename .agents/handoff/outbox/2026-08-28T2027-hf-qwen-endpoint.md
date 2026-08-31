---
objective: "Accountability HF Inference Endpoint Qwen 3.8 — custo real, sem wake"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2027-hf-qwen-endpoint.md"
evidence: "Owner colou console HF 28/08 ~20:27 ART (nztfortyh). Números só do print. Endpoint scaled-to-zero. Sem request de wake. Sem mutate settings."
status: done
blockers: "Endpoint dormindo. Novo revision no repo (b7ff257). Dois endpoints no período. Sem auto-recharge. Crédito HF US$13.61."
next_action: "Não Wake Up sem GO. Job de custo lê pack 1843 + este OUT. Volume continua OR/DS. Sem top-up HF."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — HF Qwen endpoint (custo real)

Fonte: console que o owner colou. Sem inventar USD. Sem acordar o GPU.

## Estado agora
- Conta `nztfortyh` (Leandro Gomes).
- Endpoint vivo no harness: `qwen3-8-27b-q4km` · **Scaled to Zero** (inatividade). Plataforma editou 28/08 18:32.
- Private + HF token. Llama.cpp. `Qwen3.8-27B-Uncensored-Q4_K_M.gguf`.
- Host: AWS us-east-1 · L40S 48GB · **US$1.80/h** só enquanto running. Scale-to-zero 15 min. Zerado = US$0.
- URL/base já no `settings.yaml` (`hf-qwen38-q4`). Sem URL nova.
- Aviso: revision mais nova no repo `JonathanColetti/Qwen3.8-27B-Uncensored-GGUF` (atual `b7ff257`). Sem upgrade sem GO.

## Período 26/08–01/09 (print billing)
| item | tempo | US$ |
|---|---|---|
| `qwen3-8-27b-q4km` L40S | 18h57 / 1137 min | 34.11 |
| `qwen3-8-27b-uncensored-gguf-lrl` L40S | 1h17 | 2.31 |
| **Endpoints total** | | **36.42** |
| Inference Providers | | 0.00 |
| Créditos restantes | | **13.61** |
| Auto-recharge | | off |

Conta: 1137/60 × 1.80 = 34.11. 34.11 + 2.31 = 36.42. Fecha.

## Accountability
1. O burn de infra desta semana **não foi OpenRouter** (flat 16.13). Foi GPU HF.
2. Dois endpoints no mesmo período = risco de double-idle. O `…-lrl` (US$2.31) parece leftover — confirmar se ainda existe; não apagar sem GO.
3. Qwen continua o start de análise (preferência). Acordar = US$1.80/h. Um deepen de 20 min ≈ US$0.60 se o scale-to-zero pegar. Esquecer ligado = ~US$43/dia.
4. Crédito 13.61 dá ~7.5 h de L40S. Período fecha 01/09. Sem top-up / sem auto-recharge.
5. Volume/failover continua cano B (OR MiniMax pago) ou A (DS oficial off-peak). Não usar L40S pra swarm.

## Regras (HF)
- Sem Wake Up / request de teste daqui.
- Sem upgrade de revision.
- Sem segundo endpoint novo.
- Próxima session Qwen: só se o owner acordar no console; senão analisa no pack + OUT, modelo OR/DS.
