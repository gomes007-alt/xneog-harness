---
objective: "Pack de contexto que sobrevive ao 32k: custo + dois canos + lucro do ecossistema"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T1843-ecosystem-survive.md"
evidence: "OUT 1758 + 1831 + 1838. Runway 28/08. Session ac8d86a3 23k/32k — sem 3º turno Qwen. settings.yaml NÃO mutado. 3081 HTTP 200."
status: done
blockers: "Dois canos ainda draft. SENT lead Hub ainda não. Sem top-up OR."
next_action: "Próxima session lê ESTE arquivo primeiro. Sem reler AGENTS.md. Sem aplicar yaml sem GO."
gates: YELLOW
from: Harness
to: Chief
session_id: "session-ac8d86a3-4172-40a8-b27f-215beb102bcb"
cwd: /Users/erck/xneog-harness
preset: yellow
---

# CONTEXT PACK — sobreviver + lucrar (28/08)

Ler isto no lugar de reconstruir chat. 1 página.

## Objetivo
Gastar token só quando move dinheiro no ecossistema xNeog: Ads→WA→APK, Hub cliente, App Store, audiência Glasswing. O resto é ruído.

## Custo (28/08, API — não inventar)
- OpenRouter: US$16.13 flat, usage_daily=0. Taxa 5.5% só no top-up. **Não top-up.**
- DeepSeek oficial: US$22.40 (−1.71 no dia). Peak 22h–1h e 3h–7h ART seg–sex = 2x.
- Anthropic: fora do swarm. Nunca opus.
- **HF Qwen L40S (print 28/08):** endpoint `qwen3-8-27b-q4km` scaled-to-zero. US$1.80/h running. Período 26/08–01/09 = US$36.42 (34.11 + leftover `…-lrl` 2.31). Crédito HF US$13.61. Sem wake/top-up daqui. Detalhe: `outbox/2026-08-28T2027-hf-qwen-endpoint.md`
- Qwen 32k (`hf-qwen38-q4` / `qwen3.8-27b-uncensored-q4`): single-shot curto. `ac8d86a3` = 23k — **não continuar**. `6e19c20d` = 54k — morta pro Qwen.

## Dois canos (DRAFT — yaml intacto)
- **A volume off-peak + cache-hit:** DeepSeek oficial flash 0731 (`api.deepseek.com`). Miss/peak: caro.
- **B MiniMax / failover:** OR `minimax/minimax-m3` **pago** no crédito 16.13. Sem `:free`.
- **Start (owner 28/08 19:14):** custo + dados reais + accountability de infra começa em Qwen 3.8 uncensored (`hf-qwen38-q4` / `qwen3.8-27b-uncensored-q4`). Já é o `agent-default-model`. Session nova, pack primeiro, single-shot.
- Volume/swarm: `session.selectModel` MiniMax M3 pago ou DS oficial 0731 off-peak. Sem `:free`. Sem mudar default Qwen.
- Sem GO: não colar o snippet 1838 no `settings.yaml`. Sem restart.

## O que já está feito (não refazer)
- OR vs DS: `outbox/2026-08-28T1758-or-deepseek.md`
- Deepen Qwen: `outbox/2026-08-28T1831-or-ds-qwen.md`
- Snippet dois canos: `outbox/2026-08-28T1838-qwen-two-pipe-draft.md`
- Hub 0.2.8 Mac+iPhone. Conta 1. Lead `1F9D964F` texto Fogg pronto, SENT=não. Sem 2º send / Ivi / autoflow.
- Harness live: `~/xneog-harness` · 127.0.0.1:3081 · DSH_HOME `~/.xneog-harness`

## Regras de gasto (resultado > teatro)
1. 1 session, cap 3 filhos, modelo barato. Parent fecha OUT.
2. Sem arquivo 7 campos = sem job.
3. Token que não muda CPR, lead, ship ou crédito = stop.
4. Compact/max-tokens = session nova + este pack. Não retomar gorda.
5. RED (send Hub, publish, ads mutate, push, colar yaml): GO escrito.

## Lucro — 4 alavancas (1 por vez)
1. **Funil:** 1 lead cliente, 1 msg Fogg, idioma do lead. Sem nurture. Sem preço inventado.
2. **CPR:** Ads Ops/Finance fecham o número; harness não gasta token pra “analisar ads” sem HANDOFF.
3. **Produto:** Hub/App Store só com lane dona (zeroone / owner). Sem build iOS daqui.
4. **Audiência:** Content weekday; harness não redige post.

## Bootstrap da próxima session
1. Ler este arquivo.
2. Se o job for rota/custo: 1838 + 1758.
3. Se o job for Hub: OUT 26/08 observe+teste. SENT ainda não.
4. Abrir session **Qwen** (default). Ler este pack. Se o trabalho virar volume/failover, aí sim `selectModel` cano A/B.
5. Escrever 1 OUT 7 campos. Archive inbox. Avisar Chief.
