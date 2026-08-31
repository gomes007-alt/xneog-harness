# Brief — melhores formas de usar Grok Bot teammates (tempo real)

**Data:** 24/08/2026 00:03 ART · **Lane:** Research
**Público:** Owner / Chief
**Cruzamento:** Mission Contract xNeog já existente

---

## 1) Contexto (o que o produto é hoje)

Grok Bot (beta ago/2026, Cursor × xAI) = **roster de colegas always-on**, não thread descartável. Cada Bot tem nome, job, conversa contínua, memória e **desktop próprio**; todos compartilham **um computer de conta** (arquivos/logins). Coordenam por DM e group chat. Routines + skills; conectores/MCP primeiro, browser depois.

Fontes oficiais: [Introducing Grok Bot](https://forum.cursor.com/t/introducing-grok-bot/168053) · [docs/bots](https://docs.x.ai/grok-bot/bots) · [x.ai news](https://x.ai/news/introducing-grok-bot)

---

## 2) Achados — práticas que se repetem (oficial + campo + industry)

### A. Modelo mental certo
| Errado | Certo |
|--------|--------|
| Um Bot “faz-tudo” | **Um Bot por job** (outcome + tools + approval boundary) |
| Thread = arquivo de tópico | Bot = coworker; arquivo = files/memória/Cmd-K; tópico morto → **Hide**, não delete |
| Sub-agent Cursor ≈ teammate | Sub-agent = braço desta mensagem; Bot = staff do papel |
| Fan-out em 7 Bots no mesmo pedido | Chief despacha **1 lane** (ou group com contrato) |

Docs: criar Bot separado quando muda goal, tools, style, **approval boundary** ou schedule. Evitar “General Helper”. Cap ~50 Bots+groups.

### B. Roster mínimo útil (padrão SpaceXAI / docs)
1. **Chief of Staff** — orquestra, não faz o trabalho especial
2. **Specialists** — só quando o papel é estável (inbox, research, ship, ads…)
3. **Group chat** — quando o *handoff* precisa ser visível
4. **RED atrás de humano** — send/publish/pay/delete/contact/prod

Seu time já espelha isso (Chief, Research, zeroone, Content, Ads, Finance, Inbox, Mac CLI).

### C. Skill → Test → Routine (ordem obrigatória)
BlitzMetrics / docs convergem:
1. Fazer o job **uma vez** com o humano
2. Salvar **skill** (como)
3. **Test run** (trabalho real)
4. Só então **routine** (quando) — cron ou event (Slack/GitHub/…)
Não criar rotina com meter vazio; não automatizar antes de provar.

### D. Handoff = contrato, não dump de chat (industry 2026)
Consenso técnico (AffinityBots, Clord, CellCog, reliability kits):
- Payload tipado: goal, state, artifacts, evidence, authority, DoD, stop/escalation
- Receiver **rejeita** se aceitação falha (não “adivinha”)
- Approval = **decision packet** (ação recomendada + evidência + o que acontece depois do ok)
- Loop guard / max retries em handoffs não-idempotentes

Seu `MISSION-CONTRACT-HANDOFF.md` (7 campos + GREEN/YELLOW/RED + Three-Run Proof) **já está alinhado** ao estado da arte.

### E. Segurança / shared computer
- Login/arquivo no box = **visível a todos os Bots da conta** — não é boundary de segurança entre Bots
- Preferir **MCP/connector** a browser para dados sensíveis
- Privacy: Legacy Privacy Mode **bloqueia** Grok Bot; usar modo que permite cloud storage
- Teams: allowlist MCP + team rules scoped a Grok Bot

### F. Always-on vs topic threads (forum Cursor, ago/2026)
Resposta oficial (Mohit): intended pattern = **one Bot per clear job**. Para higiene tipo Claude threads:
- Hide when topic wraps
- Duplicate role Bot to fork scope (profile/skills, not old transcript)
- Cmd-K / search = archive; groups = multi-role topics

### G. Onde Grok Bot é fraco (avaliar com calma)
- Sem escolha explícita de modelo por tarefa (auto)
- Ainda beta; enterprise em waitlist
- Per-agent browser às vezes exige sign-in separado apesar do “shared computer”

---

## 3) Recomendação Research → xNeog (ação)

| # | Faça | Por quê |
|---|------|---------|
| 1 | **Congelar roster** — não criar Bot novo sem job estável + boundary no profile | Docs + anti-arquipélago |
| 2 | Colar **Mission Contract §2+§5** no charter de cada lane (Chief) | Handoff industry-grade |
| 3 | Toda rotina nova: **Three-Run Proof** antes de enabled permanente | Skill→Test→Routine |
| 4 | RED só com decision packet (artefato + o que muda após ok) | Approval ≠ ping solto |
| 5 | Preferir connector; browser só se não houver MCP | Shared computer + audit |
| 6 | Tópico fechado → Hide; fork → Duplicate; não Reset pra “limpar” histórico útil | Forum pattern |
| 7 | Group chat só quando handoff multi-lane precisa de audit trail visível | Menos fan-out no DMs |
| 8 | Substack/Content: publish continua RED; Content drafta, Owner aprova (já feito no post 01) | Consistency |

**Não fazer:** segundo “Chief”; Strategy/Execution/Reviewer genéricos se a lane já existe; rotina daily sem DoD de silêncio (radar Master é o bom exemplo).

---

## 4) Checklist 1 página (colar no Chief)

```
[ ] Bot = 1 outcome mensurável no profile (nunca/ sempre / gates)
[ ] Pedido grande → Chief → 1 Mission Contract → 1 specialist
[ ] Handoff com Artifact + Evidence + Next + Gates
[ ] Skill existe? Test run ok? Só então Routine
[ ] RED = humano com decision packet
[ ] Sem fan-out sem ok do owner
[ ] Hide > delete; Duplicate > Reset
[ ] Connector > browser
```

---

## 5) Fontes

1. https://forum.cursor.com/t/introducing-grok-bot/168053
2. https://forum.cursor.com/t/grok-bots-as-always-on-workers-vs-topic-threads/168183
3. https://docs.x.ai/grok-bot/bots
4. https://docs.x.ai/grok-bot/teams-and-enterprises
5. https://x.ai/news/introducing-grok-bot
6. https://blitzmetrics.com/grok-bot/
7. https://affinitybots.com/blog/ai-agent-handoffs-technical-breakdown
8. https://clord.dev/blog/agent-handoffs-need-contracts-2026/
9. https://github.com/AlekseiUL/ai-agent-team-reliability-kit
10. Interno: `/workspace/xneog-harness/MISSION-CONTRACT-HANDOFF.md`

---

_Fim · Research · 24/08/2026_
