# Mission Contract + Handoff — time Grok Bot × xNeog

**Status:** draft interno · 23/08/2026 · update superfície Mac CLI 24/08 · harness SOP 25/08/2026
**Fonte de inspiração:** playbook público @0xCodila (adaptado ao time real; sem fan-out)
**Dono do board:** Chief · **Intelligence:** Research · **App Store:** zeroone

---

## 1. Regras de ouro

1. **Mission > título.** Ninguém existe como “agente de pesquisa”; existe um outcome mensurável.
2. **Evidence travels with the work.** O próximo bot não reconstrói contexto do chat.
3. **Reviewer rejeita; não reescreve tudo.** Correção volta na lane que errou.
4. **RED = humano.** Send / publish / purchase / delete / contact people / production = só com ok explícito do owner.
5. **Briefs sob demanda** (Week 34): Research não espalha update sem pedido do Chief/owner.
6. **Three-Run Proof** antes de rotina permanente: observar → corrigir charter → liberar.

---

## 2. Mission Contract (template — 7 campos)

Cole no 1º msg da lane / rotina:

| Campo | Pergunta | Exemplo (radar Master) |
|-------|----------|------------------------|
| **Outcome** | O que é vitória? | Alertar só quando houver fato material novo no caso Master |
| **Inputs** | Fontes/contas permitidas? | Folha, Valor, G1, CNN, Metrópoles, Agência Brasil; memória do radar |
| **Output** | Artefato exato? | Brief PT: contexto 1 linha → 3–6 bullets → gatilho → links |
| **Frequency** | Quando roda? | A cada 2h (:38) |
| **Definition of Done** | Aceitável se…? | Fato novo ≠ rewrites; silêncio se nada material; 1 frase em memória log |
| **Constraints** | Nunca…? | Não postar/publicar; sem filler “(sem novidade)”; sem rumor sem fonte |
| **Approval Gates** | O que precisa do owner? | Qualquer envio externo / DNS / e-mail a terceiros |

### Checklist DoD (anti-vago)

- [ ] Toda claim factual tem fonte + data
- [ ] Sem duplicata do último pulse
- [ ] Recomendações citam evidência
- [ ] Cabe no formato combinado (1 página / bullets)
- [ ] Nenhuma ação RED sem ok

---

## 3. Níveis de permissão

| Nível | Pode | Exemplos |
|-------|------|----------|
| **GREEN** | Sem perguntar | Search, read, summarize, compare, organize, draft, calculate |
| **YELLOW** | Só em tools aprovadas | Editar arquivos internos `/workspace`, drafts, rotinas salvas, board updates (zeroone) |
| **RED** | Sempre pedir owner | Send, publish, purchase, delete, contact people, DNS, ASC Submit, Ads mutate |

---

## 4. Time real (quem faz o quê)

| Agent | Role | Input típico | Output | Aceite |
|-------|------|--------------|--------|--------|
| **Chief** | Orquestra; protege Mission Contract | Pedido grande / week board | Plano + despacho (sem fan-out indevido) | Lanes certas; sem spam |
| **Research** | Intelligence briefs | Pedido / rotina radar | Brief 1 pág + fontes | Evidência; sem ação externa |
| **zeroone** | App Store ops | Board ASC / ship | Status board; build path | Gates manuais claros |
| **Content** | Audiência Glasswing/xNeog | Sinal diário | Drafts (não publish) | Tom + aprovação owner |
| **Ads Ops** | Funil Ads→WA→APK | Spend / leads | Digest + blockers | Sem mutate sem ok |
| **Finance** | Close diário/mensal | Spend/receita | Snapshot CPR | Números com fonte |
| **Inbox Pessoal** | Triagem e-mail | Inbox Gmail | Digest curto | Filtro agressivo |
| **Mac CLI** | Terminal Mac owner + harness local via **ACP + answerer** (owner 24/08; não headless puro); preset default `workspace-write`+`ask` | Pedido ExternalShell / HANDOFF / ACP session | Resultado comando + Artifact paths; docs em `.agents/notes/proposed/` | Approval card OS (Grok) **e** answerer harness em YELLOW/RED |

### Superfície Mac CLI (owner 24/08/2026)

- **Escolhido:** ACP (`@xneog/dsh-acp`) + **answerer real** — não headless puro.
- **Preset:** `workspace-write` + `ask` (ver `packages/interaction/permission-presets`).
- **Notes:** `.agents/notes/proposed/process/2026-08-24-mac-cli-acp-answerer-surface.md` · `.agents/notes/proposed/feature/2026-08-24-permission-presets-green-yellow-red.md`
- **Answerer (24/08):** `hooks-claude-code` + escalate Grok/Terminal. Telegram deferred. Draft: `.agents/notes/proposed/process/mac-cli-hooks-draft/`. Código só com GO.

*Não criar Strategy/Execution/Reviewer genéricos se a lane já existe.* Reviewer = Chief + owner em RED, ou peer check sob demanda.

---

## 5. Handoff padrão (colar entre bots)

```text
HANDOFF
Objective: …
Artifact: (link/path ou texto)
Evidence: (fontes / datas / IDs)
Status: done | blocked | partial
Blockers: …
Next Action: (agente + verbo concreto)
Gates: GREEN | YELLOW | RED (precisa owner: sim/não)
```

**Ruim:** “Aqui o que achei.”
**Bom:** “Artifact: brief Master 23/08. Evidence: Valor 20/08 + CNN 6h. Status: done. Next: Chief — só se owner pedir deep-dive C. Gates: GREEN.”

---

## 6. Three-Run Proof (antes de rotina)

| Run | Objetivo |
|-----|----------|
| **1 Observe** | Anotar perda de contexto, duplicata, gate inesperado, falha de qualidade — **não** “consertar só o output” |
| **2 Correct** | Missão diferente, mesma lane; erro não pode voltar |
| **3 Release** | Intervém só em RED / Mission ambígua / 3 falhas no loop |

Métricas: completion rate · intervenções humanas · review loops · tempo até aceite · custo/resultado.

---

## 7. Mission Contracts ativos (snapshot)

| Mission | Owner lane | Frequency | Status |
|---------|------------|-----------|--------|
| Radar Master (alert-only) | Research | 2h | Live |
| Glasswing weekly brief | Research | Seg 9:45 | Live |
| Daily Glasswing content | Content | dias úteis 10:15 | Content owns; Research paused dup |
| xNeog App Store → live | zeroone | board + Mon 11:00 | Hold Cloud enable |
| Domínios Vorcaro outreach | Owner (+ Research draft) | one-shot | Texto Bialski pronto; owner envia |
| Ads WA Cloud migrate | Ads Ops | sob demanda | Inventário 4 WA TBD |

---

## 8. Próximo passo sugerido

1. Chief cola §2+§5 no charter de cada lane.
2. Research usa handoff em todo brief → Chief.
3. Nova rotina só após Three-Run Proof.
4. Sem fan-out: 1 pedido → 1 lane (ou Chief decide).

---

## 9. Harness SOP (owner 24–25/08)

Loop: **inbox → 1 session → 1 OUT**. Sem os 7 campos, recusa. Sem DM como fonte de job.

1. **CTWA** — criativo com custo observável (sinal Spence), não stack de viés.
2. **WA** — 1ª msg = prompt Fogg (MAP no mesmo instante), não nurture.
3. **HANDOFF** — inbox público (common knowledge). 1 OUT. Archive o inbox.
4. **Partners** — cap 3 filhos; timeout/card/sleep ≠ defection; parent fecha o OUT.
5. **Designer** — GO escrito. RED = owner. Sem Anthropic em swarm.

Janelas: 7h30–9h e 17h30–19h weekdays. Watcher Grok Bot nesses horários. Three-Run do loop: 1848 + 1912 + 2357 (24/08) — **liberado**.
Default local de session nova = Full access (`settings.yaml`); job ainda declara YELLOW/RED no HANDOFF.
Wrapper launchd: `~/.local/bin/xneog-harness-web` → `~/xneog-harness`. Sem push deste SOP.
