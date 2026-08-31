# Grok teammates ↔ xNeog harness — Fase 1 drop bridge

**Status:** proposed / YELLOW docs · **Data:** 24/08/2026
**Lane:** Mac CLI · **Board:** Chief
**GO:** owner quer conexão pra acelerar research/ops. **Sem API Grok Bot.**
**Related:** `MISSION-CONTRACT-HANDOFF.md` §2+§5 · `2026-08-24-mac-cli-acp-answerer-surface.md` · live Web `127.0.0.1:3081`

Não é connector, não é webhook, não é `SendToAgent` substituto. É um **drop path no disco do Mac** que os dois mundos já enxergam: Grok teammates (via Mac CLI / ExternalRead) e o harness (cwd `~/xneog-harness`).

---

## 1. Drop dirs

```
~/xneog-harness/.agents/handoff/
  inbox/     # jobs a disparar (Chief/owner → Mac CLI)
  outbox/    # resultados (Mac CLI/harness → Chief/Research)
  archive/   # inbox processado (mv, não delete)
```

Nome do arquivo: `YYYY-MM-DDTHHMM-<lane>-<slug>.md`
Ex.: `2026-08-24T1630-research-master-pulse.md`

Um arquivo = um job. YAML frontmatter + corpo livre. Sem fan-out: 1 arquivo → 1 lane.

---

## 2. Schema — HANDOFF 7 campos

Frontmatter obrigatório (os mesmos 7 do `MISSION-CONTRACT-HANDOFF.md` §5):

```yaml
---
objective: "uma linha, vitória mensurável"
artifact: ""          # path/link; vazio no inbox, preenchido no outbox
evidence: ""          # fontes / datas / IDs
status: queued        # queued | running | done | blocked | partial
blockers: ""
next_action: "Mac CLI — disparar session web/RPC"
gates: YELLOW         # GREEN | YELLOW | RED
owner_needed: false
from: Chief           # Chief | owner | Research | Mac CLI | …
to: Mac CLI
session_id: ""        # preenchido quando o harness aceitar
cwd: /Users/erck/xneog-harness
preset: yellow        # green | yellow | red | workspace-write
---
```

Corpo: Mission Contract curto (Outcome · Inputs · Output · Frequency · DoD · Constraints · Approval Gates) **ou** o prompt que a session deve receber.

**Ruim:** “olha isso.”
**Bom:** objective + gates + next_action + prompt colável.

---

## 3. Quem escreve / quem lê

| Direção | Escreve | Lê | Pasta |
|---------|---------|----|--------|
| Pedido de job | Chief ou owner (via Mac CLI se o Chief não tem disco) | **Mac CLI** | `inbox/` |
| Resultado | **Mac CLI** (e o parent harness, se o prompt pedir um OUT) | Chief, Research, a lane `to` | `outbox/` |
| Research/Content/Ads/Finance/Inbox | **não** escrevem inbox sozinhos | lêem outbox se `to` for eles | — |

Grok teammates **não** têm filesystem do Mac. O único bot que move bytes inbox↔RPC↔outbox é **Mac CLI**. Chief despacha por `SendToAgent` → Mac CLI (“processa inbox X”) *ou* o owner cola o path aqui.

Harness **não** polled sozinho nesta fase. Sem launchd novo. Sem watcher permanente até Three-Run Proof.

---

## 4. Como disparar um job

```
owner/Chief
  → (opcional) SendToAgent Mac CLI + path do inbox
  → Mac CLI lê inbox/*.md
  → POST 127.0.0.1:3081  session.create (cwd, agentPreset=standard)
  → session.selectModel (default: openrouter / minimax/minimax-m3)
  → /permission <preset> se G/Y/R estiverem live
  → session.prompt  (corpo do arquivo)
  → session.history até turn/end ou approval/asked
  → escreve outbox com os 7 campos + session_id + Artifact
  → mv inbox → archive
```

Se `approval/asked`: **não cancelar**. Avisar owner 1 linha. Outbox `status: blocked` / `owner_needed: true` até allow/deny.

Card nativo da Web UI (hoje). Answerer B / ACP `session/request_permission` = fase 2 (hooks ainda são copy).

`xneog` no PATH é o client **agentd**, não o harness. Harness = `xneog-harness web --port 3081` ou RPC em `127.0.0.1:3081`.

---

## 5. Gates

| Nível | Ponte |
|-------|--------|
| GREEN | Ler inbox/outbox, spec, history |
| YELLOW | Criar session, prompt, escrever outbox/archive, docs neste path |
| RED | push, spend, publish, Ads mutate, ASC submit, rewrite launchd, leftover commit, contact people — **ainda owner** |

Fase 1 **não** fecha: G/Y/R na composition base (hoje só via `--patch` overlay), RED list `write` vs `Write`, hooks B loaded, ACP client, launchd `com.xneog.harness-web` (ainda aponta `~/xneog`; booted out 24/08 no teste r2).

---

## 6. Three-Run Proof (antes de rotina)

1. Observe — este spec + 1 job manual (r1 teammates + r2 ask já foram observe).
2. Correct — composition G/Y/R + `write` na RED list + outbox num job real de Research.
3. Release — rotina Mac CLI só depois de 3 jobs inbox→outbox sem perder Evidence.

---

## 7. Exemplo mínimo (inbox)

```markdown
---
objective: "Extrair P0 do OUT-HARNESS-TEAMMATES-GAP pra Chief"
artifact: ""
evidence: ""
status: queued
blockers: ""
next_action: "Mac CLI — session.prompt read-only + outbox"
gates: GREEN
owner_needed: false
from: Chief
to: Mac CLI
session_id: ""
cwd: /Users/erck/xneog-harness
preset: green
---

Leia OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md e devolva 5 P0. Sem write no repo.
Escreva o resultado só no outbox via Mac CLI.
```
