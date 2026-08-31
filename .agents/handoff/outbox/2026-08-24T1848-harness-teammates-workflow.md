---
objective: "Integrar lógica Grok Bot teammates no harness local (Mac Air M4) de forma clara/fácil e otimizar workflows/loops diários, sem Anthropic nos filhos e sem launchd permanente."
artifact: ""
evidence: "OUT 1755-harness-deep-web-search; OUT 1824-harness-adversarial-teammates (5 patches YELLOW F1-F5); bridge spec `.agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md` §1-§7; composition `packages/bundle/base/cordis.patch.yml` linhas 193-232 (G/Y/R + redTools JÁ na base); `packages/interaction/permission-presets/src/red-tools.ts` matcher exato/regex; `packages/hooks/hooks-claude-code/src/index.ts` linhas 238-244 (`tools/pre-execute` wired, requer `hooks.json`); `packages/interaction/user-approval/src/index.ts` linhas 89+246 (fail-closed answerer chain); `packages/core/agent/src/index.ts` linhas 86-99 (`delegationDepth` field, sem enforcer); `packages/core/tools/src/index.ts` linha 1476 (`PreToolDecision` extension point); 3 subagents A/B/C em `openrouter/minimax/minimax-m3` (parent session-ff8e0093); Mac CLI green 18:49 ART — PID 79836 loopback 127.0.0.1 cwd `~/xneog-harness` args `--profile web --port 3081` SEM `--patch`; PID 826 Tailscale 100.108.219.103 = `xneog-web-proxy.mjs`; DSH_HOME=`/Users/erck/.xneog-harness`; hw Mac16,12 Air M4 10c/16GB user erck; 74693 morto; `~/.dsh` stale 18/08; plist `com.xneog.harness-web` BOOTED OUT."
status: done
blockers: "Bridge spec §5 está desatualizado — diz que G/Y/R fica só via `--patch` overlay, mas JÁ ESTÁ em `packages/bundle/base/cordis.patch.yml` linhas 193-232. Falta listener NATIVO que materialize `isRedTool` no waterfall `tools/pre-execute` (sem `hooks.json` externo, gate não roda). Pré-condição dos 5 patches: function plugin `packages/hooks/permission-gate/` ainda não criado."
next_action: "Owner/Chief escolhe 1 dos 5 patches YELLOW do OUT 1824 como próximo job Mac CLI. Sugestão parent: **Patch #1 (gates-hooks) standalone** — destrava F1 e abre caminho para #2/#3/#4 sem virar teatro. Alternativa low-risk: **#1 + #5 em paralelo** (#5 é independente, só atomic write + id + flock)."
gates: YELLOW
owner_needed: false
from: Harness
to: Chief
session_id: session-ff8e0093-b746-44ca-81a4-9ed245a22a50
cwd: /Users/erck/xneog-harness
preset: yellow
parent_session: session-ff8e0093-b746-44ca-81a4-9ed245a22a50
filhos_modelos: openrouter/minimax/minimax-m3 + deepseek-v4-flash
filhos_proibidos: anthropic/* + opus + 3-wide fan-out
haiku_reviewer: skip
---

# JOB OUT — Harness teammates + workflows diários — 2026-08-24T18:48 ART

## TL;DR

- 5 patches YELLOW do OUT 1824 cobrem F1-F5 (gates, cost, lanes, answerer, atomic) — **independentes de Grok API**.
- Bridge spec §5 **desatualizado** (G/Y/R JÁ está na composição base linhas 193-232; falta listener nativo).
- 4 teammates Grok migram para harness AGORA (Research, zeroone, Content draft, Ads read); 6 ficam no Grok Bot (cron + Gmail + ASC + Ads mutate + publish + Finance).
- Fluxo diário = **2 slots** (manhã 7-9h + tarde 17-19h) com Three-Run Proof antes de rotina permanente.
- **5 mudanças YELLOW workflow** (abaixo) destravam o dia-a-dia sem código novo além dos patches do OUT 1824.

---

## 1. Mapa mental 1 página — quem escreve/lê/dispara

**Evidence runtime local (Mac CLI green 18:49 ART):** harness live PID 79836 loopback 127.0.0.1 cwd `~/xneog-harness` `--profile web --port 3081` SEM `--patch`; DSH_HOME `/Users/erck/.xneog-harness`; proxy Tailscale PID 826 (`xneog-web-proxy.mjs` 100.108.219.103); hw Mac16,12 Air M4 10c/16GB user erck; 74693 morto; `~/.dsh` stale 18/08; plist `com.xneog.harness-web` BOOTED OUT.

**Convenções:** `inbox = .agents/handoff/inbox/`; `outbox = .agents/handoff/outbox/`; `archive = .agents/handoff/archive/`; ASC = `~/.agents/handoff/asc/`. Sem fan-out 3-wide. Filhos: `openrouter/minimax/minimax-m3` ou `deepseek-v4-flash` only.

| Teammate | Papel | Schedule atual (ART) | Harness primitive | Escreve | Lê | Dispara | Gate | Modelo |
|---|---|---|---|---|---|---|---|---|
| **Chief** | Orquestra + Mission Contract | manual (SendToAgent) | `session.create` parent (yellow) + HANDOFF 7+id | inbox (to=lane) · outbox (`status: done`) | inbox (humano) · outbox (todas) | owner/Chief manual | YELLOW | minimax-m3 |
| **Research** | Briefs intelligence | radar `38 */2 * * *` (2h, OK) · weekly `45 9 * * 1` (OK) · daily OFF | `subagent_fork` preset derivado `green` + `summarize()` antes | **nunca sozinho** | outbox (se `to=Research`) | Mac CLI consome inbox | GREEN | minimax-m3 |
| **zeroone** | ASC board ops | blocker `15 9,13,17 * * 1-5` · digest `15 9 * * 1` · higiene `15 10 * * 1-5` | path dedicado `~/.agents/handoff/asc/` (RED list); MCP scope `lane: zeroone` | inbox (se owner) · outbox (`status: partial`/blocked) | n/a | Mac CLI (se owner despachar) — **fan-out proibido** | YELLOW→RED (ASC submit) | minimax-m3 |
| **Content** | Audiência (drafts) | carta `15 10 * * 1` · pack `15 10 * * 2-5` (never) | preset derivado `yellow` path glob `*/drafts/*`; MCP scope `lane: Content` | `*/drafts/*` (publish continua RED) | inbox (se owner) | Mac CLI (se owner) — **fan-out proibido** | YELLOW (draft) / RED (publish) | minimax-m3 |
| **Ads Ops** | Funil Ads→WA→APK | digest `0 9 * * 1-5` (never) · CPL `0 9 * * 2` (never) | MCP connector `lane: Ads` (scope config) | n/a (read) · outbox | outbox | Mac CLI (se owner) | GREEN (read) / RED (mutate) | minimax-m3 |
| **Finance** | Close diário/mensal | fechamento `0 18 * * 1-5` (never) · P&L `0 10 1 * *` (never) | preset `green`/`yellow`; **nunca** Spend real | inbox (se owner) · outbox | outbox | Mac CLI (se owner) | YELLOW | minimax-m3 |
| **Inbox Pessoal** | Triagem Gmail | digest `15 8 * * 1-5` ART (CRON_TZ) | preset `green`; harness **não toca Gmail** | n/a | outbox | Mac CLI (se owner) | GREEN | minimax-m3 |
| **Mac CLI** | Shell + harness local | **0 routines** (bridge manual) | `acp` + `session.create/prompt` em 127.0.0.1:3081 | inbox↔RPC↔outbox (único que move bytes) | inbox | owner/Chief | YELLOW (workspace-write) | minimax-m3 |

**Copiar AGORA sem API Grok (harness primitives já dão conta):**

- ✅ Composition G/Y/R no `cordis.patch.yml` linhas 193-232 (row `permission` + 5 presets nomeados) — **JÁ ESTÁ**, não precisa `--patch` overlay só pra isso.
- ✅ Inbox/Outbox pattern — drop dirs existem (`inbox/`/`outbox/`/`archive/`); bridge spec §1 formalizado.
- ✅ Atomic outbox write (`write .tmp` + `fsync` + `rename`) + `id: <uuid>` + `flock(LOCK_EX)` em `<inbox>/.lock` — patch #5 OUT 1824.
- ✅ `summarize(parent_history)` antes de `subagent_fork` — patch #2.
- ✅ `deriveChildPreset(parentPreset, lane)` com MCP scope por lane — patch #3.
- ✅ Card OS nativo Web 3081 + `session/request_permission` timeout 60s fail-closed — patch #4 (fail-closed JÁ documentado em `user-approval/src/index.ts:89,246`).
- ✅ `session.selectModel` allowlist = `[minimax/minimax-m3, deepseek-v4-flash]`; reject `anthropic/*`/opus — patch #2.
- ✅ `delegationDepth` campo existe em `core/agent/src/index.ts:99`; precisa enforcer plugin em `packages/guard/` — patch #2.

**Fica no Grok Bot (não migrar):**

- ❌ Cron zeroone blocker/digest (`15 9,13,17 * * 1-5`, `15 9 * * 1`, `15 10 * * 1-5`) — depende de board ASC live + login compartilhado; harness sem ASC connector live.
- ❌ Radar Master/Vorcaro (`38 */2 * * *`) — alert-only OK no Grok; migrar = duplicar custo.
- ❌ Glasswing+AppSec weekly (`45 9 * * 1`) — fontes pesadas, lastRun OK.
- ❌ Inbox Pessoal digest (`15 8 * * 1-5` ART) — Gmail OAuth no desktop Grok Bot; harness não toca Gmail.
- ❌ Content carta/pack (`15 10 * * 1`, `15 10 * * 2-5`) — drafts Grok Bot; harness só espelha se owner despachar.
- ❌ Finance fechamento/P&L — planilha/banco no desktop Grok Bot (shared computer); harness só lê snapshot.
- ❌ Ads digest/CPL — Ads account integrations no Cursor, fora do harness.
- ❌ Publish externo (Substack/Ghost) — publish continua RED, owner envia. Harness sem connector.
- ❌ Cursor/GitHub event triggers — sem API Grok Bot; ficam no Grok Bot até release.

---

## 2. Fluxo diário recomendado (manhã 7-9h + tarde 17-19h)

**Princípios:** 1-wide fan-out · `summarize()` antes de cada spawn · depth-cap 2 · model allowlist enforced · Three-Run Proof antes de rotina permanente.

### Manhã (07:30–09:00 ART) — intake + decisão

1. **07:30 — owner abre Web 127.0.0.1:3081.** Vê inbox acumulado da noite (radar 02:38 ART, weekly 09:45 seg, ASC digest segunda).
2. **07:35 — owner/Chief despacha inbox → Mac CLI.** SendToAgent ou cola path em `.agents/handoff/inbox/*.md` (HANDOFF 7+id uuid, `to: Research`/`to: zeroone`/`to: Content`).
3. **07:36 — Mac CLI toma a fila:**
   - `flock(LOCK_EX) .agents/handoff/inbox/.lock` → read HANDOFF → `deriveChildPreset(parent, lane)` → `session.create` em 3081 (preset derivado) → `session.selectModel` (allowlist: minimax-m3 | deepseek-v4-flash) → `summarize(parent_history)` → `subagent_fork` (max_depth 2).
4. **07:36–08:30 — filhos rodam YELLOW.** PreToolUse hook gates (`write|Write|selectModel|respond`); GREEN ok; YELLOW ok se path ∈ allowlist; RED → `request_permission` (60s, fail-closed + OS notification).
5. **08:30 — Mac CLI grava outbox.** `writeAtomic(.tmp → outbox.md)` sob flock; frontmatter com `status: done|partial|blocked`, `session_id`, `cost_estimate`, `id` (uuid, mesmo do inbox → idempotency).
6. **08:35 — `mv inbox → archive`** sob flock. Owner vê resumo no card Web (3081) + 1 linha por dia no `.agents/handoff/daily/` (próximo patch).

### Tarde (17:30–19:00 ART) — close + retro

7. **17:30 — owner reabre Web 3081.** Vê outbox tarde (Finance fechamento sex, ASC higiene seg-sex, pack diário seg-qui).
8. **17:35 — owner/Chief despacha inbox tarde.** Mesmo fluxo (passos 2–5), lanes mais pesadas vão com `deepseek-v4-flash` (custo).
9. **18:30 — retro leve.** owner filtra `status: blocked` no outbox; se RED timeout → OS notification já chegou; se parcial → re-enqueue após 5min (Mac CLI retry).
10. **19:00 — `fswatch outbox/` → `xneog --profile headless`** fica **DESLIGADO** até Three-Run Proof (passo 11).
11. **Three-Run Proof gate (pré-rotina permanente):** 3 jobs reais inbox→outbox OK em lanes diferentes (ex.: Research segunda, zeroone terça, Content quarta). Só então owner libera `fswatch outbox/` como ação #2 do OUT 1755.

### Sinais de "rotina travou" para owner

- `outbox status: blocked` + `owner_needed: true` → OS notification chegou; owner responde RED no card Web.
- `inbox/*.md` sem outbox correspondente após 30min → owner vê no card; Mac CLI re-enqueue 5min.
- `cost_estimate > US$0.10/job` → owner investiga model-cap (child pode ter escapado allowlist).

---

## 3. 5 mudanças concretas YELLOW (workflow, distintas dos 5 patches código do OUT 1824)

> Cada mudança = YELLOW (cria/editar arquivos internos + docs). **Nenhum** vira RED. **Nenhum** launchd permanente. **Nenhum** push. **Nenhum** mv inbox→archive por harness (owner arquiva, exceto após atomic write OK).

### Mudança #1 — Bridge spec §5 supersede (atualizar desatualização)

- **O quê:** editar `.agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md` §5. Substituir "G/Y/R ainda só via `--patch` overlay" por "G/Y/R JÁ está em `packages/bundle/base/cordis.patch.yml` linhas 193-232 (row `permission`); falta listener NATIVO `tools/pre-execute` que materialize `isRedTool` no waterfall — esse é o Patch #1 do OUT 1824".
- **Onde:** `.agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md` §5 + cross-link OUT 1824.
- **Pré-req:** nenhum.
- **Custo:** zero; ~5 min.

### Mudança #2 — Tabela "preset filho por lane" no bridge spec (F3)

- **O quê:** adicionar §3.5 "preset derivation table" no bridge spec. Colunas: lane × parent preset × child preset derivado × path glob allowlist × MCP scope.
- **Linhas (proposta):**
  - Research: parent `yellow` → child `green` (read-only) → MCP scope `lane: Research` (exclui Ads/Content/zeroone tools).
  - zeroone: parent `yellow` → child `yellow` com path glob `~/.agents/handoff/asc/` na RED list → MCP scope `lane: zeroone`.
  - Content: parent `yellow` → child `yellow` com path glob `*/drafts/*` (publish RED) → MCP scope `lane: Content`.
  - Ads: parent `yellow` → child `green` (digest) ou `yellow` com mutate RED → MCP scope `lane: Ads`.
  - Finance: parent `yellow` → child `yellow` (snapshot CPR) → MCP scope `lane: Finance`.
  - Inbox Pessoal: parent `yellow` → child `green` → MCP scope `lane: Inbox` (Gmail read-only).
- **Onde:** `.agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md` §3.5.
- **Pré-req:** função pura `deriveChildPreset()` implementada (patch #3 OUT 1824).
- **Custo:** zero; ~10 min; vira guia de policy.

### Mudança #3 — Handler `~/.agents/handoff/asc/` no mac-cli overlay (path dedicado RED)

- **O quê:** criar/editar `packages/bundle/mac-cli/cordis.patch.yml` (over `--patch`) com `permission → redTools` adicionando glob `~/.agents/handoff/asc/` (Bash com path prefix ASC). Garante que zeroone child NUNCA escreve ASC submit sem RED + `request_permission`.
- **Onde:** `packages/bundle/mac-cli/` novo overlay; cross-link bridge spec §3.5 linha zeroone.
- **Pré-req:** patch #1 (listener) wired; path `~/.agents/handoff/asc/` criado (owner ou job YELLOW).
- **Custo:** zero; ~15 min; é config, não código.

### Mudança #4 — Three-Run Proof gate antes de rotina permanente (workflow gate, não código)

- **O quê:** criar `.agents/handoff/three-run-proof.md` (protocolo versionado). Conteúdo mínimo:
  1. Definir 3 jobs reais inbox→outbox em **lanes diferentes** (ex.: Research seg, zeroone ter, Content qua).
  2. Cada job: `summarize()` antes do spawn; depth-cap 2; model allowlist enforced.
  3. Validação: outbox `status: done` + `cost_estimate` ≤ US$0.10/job + `session_id` válido + Evidence cobre 3 lanes.
  4. Só após 3/3 OK → owner libera `fswatch outbox/` (ação #2 OUT 1755).
- **Onde:** `.agents/handoff/three-run-proof.md`.
- **Pré-req:** patches #1+#5 (gates + atomic) wired; senão Three-Run roda em cima de arquivo corrompido.
- **Custo:** zero; ~30 min; gate operacional.

### Mudança #5 — Diário do Chief: slots manhã/tarde + re-enqueue blocked 5min + OS card on timeout

- **O quê:** editar bridge spec §4 (rotina diária) com 3 bullets operacionais:
  1. **Slots fixos:** manhã 07:30–09:00 ART, tarde 17:30–19:00 ART. Fora dos slots = manual only.
  2. **Re-enqueue blocked 5min:** se `outbox status: blocked` por timeout answerer (60s) → Mac CLI re-enqueue após 5min; segunda tentativa também bloqueada → OS notification `com.apple.notificationcenter` + `status: owner_needed`.
  3. **OS card on timeout:** answerer chain adiciona provider OS notification (`packages/interaction/user-approval/providers/os-notification/`) que dispara `osascript -e 'display notification ...'` antes do fail-closed final. Cross-link patch #4 OUT 1824.
- **Onde:** `.agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md` §4 (rotina).
- **Pré-req:** patch #4 (answerer) wired; senão OS notification não dispara.
- **Custo:** zero; ~15 min; workflow gate.

### Ordem sugerida (Chief decide)

| # | Mudança | Depende de | Esforço | Cobre |
|---|---------|------------|---------|-------|
| 1 | Bridge spec §5 supersede | — | 5 min | desatualização |
| 2 | Tabela preset derivation | patch #3 OUT 1824 | 10 min | F3 workflow |
| 3 | ASC path no mac-cli overlay | patch #1 OUT 1824 | 15 min | F3 path |
| 4 | Three-Run Proof gate | patches #1+#5 OUT 1824 | 30 min | rotina gate |
| 5 | Diário do Chief | patch #4 OUT 1824 | 15 min | rotina UX |

**Padrão:** #1 standalone AGORA (corrige desatualização, 5 min). #2/#3 depois de patch #3+#1 do OUT 1824. #4 depois de patches #1+#5 (gate de rotina). #5 depois de patch #4 (UX answerer). Total ~75 min de docs/workflow + 5 jobs YELLOW código do OUT 1824.

---

## 4. Constraints & do-not-touch (consolidado)

- **YELLOW only:** web search + 3 subagents minimax/minimax-m3 + este write. Sem push, sem launchd edit, sem PID kill, sem commit, sem publish, sem `mv inbox → archive` por harness.
- **Filhos:** `openrouter/minimax/minimax-m3` ou `deepseek-v4-flash`. **Nunca** Anthropic. **Nunca** opus. **Nunca** 3-wide.
- **Reviewer haiku:** **skip** (sem chamada Anthropic no parent).
- **session_id `session-5d35710e-…`** NÃO reabrir (full access manual; não é esta sessão).
- **session_id `session-41a6e9da-…`** NÃO reabrir (per spec anterior).
- **launchd `com.xneog.harness-web`** BOOTED OUT — não reescrever plist; PID 79836 ativo sem `--patch`.
- **Fan-out proibido** para Ads/Content/zeroone (parent barato, 1-wide).
- **`~/.dsh` stale 18/08** — não restaurar; DSH_HOME `/Users/erck/.xneog-harness`.
- **PID 79836** (127.0.0.1:3081) e **PID 826** (Tailscale proxy) **NÃO matar**.
- **74693 morto** — não ressuscitar.
- **~/xneog** (repo velho) — **não subir de lá**; harness live em `~/xneog-harness`.

---

## 5. Próximo passo concreto

1. **Owner/Chief valida este OUT** (~3 min) — confirma 1–2 mitigações preferidas.
2. **Sugestão parent:** Patch #1 (gates-hooks) standalone como próximo job Mac CLI YELLOW — destrava F1 e abre caminho para #2/#3/#4 do OUT 1824 sem virar teatro. Alternativa low-risk: #1 + #5 em paralelo (#5 é independente).
3. **Após 5 patches do OUT 1824:** rodar Three-Run Proof (mudança #4 deste OUT) com 3 jobs Research/zeroone/Content reais inbox→outbox antes de liberar `fswatch outbox/` (ação #2 do OUT 1755).
4. **Rotina permanente só após Three-Run OK** — slots manhã 07:30 + tarde 17:30 ART com `summarize()` + depth-cap 2 + model allowlist enforced + OS notification on timeout.
