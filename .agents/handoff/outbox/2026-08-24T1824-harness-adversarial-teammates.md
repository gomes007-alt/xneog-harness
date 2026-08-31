---
objective: "Adversarial review do protocolo atual (HANDOFF 7 / G/Y/R / inbox-outbox / custo / anti-fan-out). Sintetizar falhas reais (defesa vs ataque) e entregar 5 patches YELLOW concretos para o bridge Mac CLI ↔ harness entrar em rotina sem gastar Anthropic nem vazar lanes."
artifact: ""
evidence: "Subagent A (defesa) + Subagent B (ataque), ambos em openrouter/minimax/minimax-m3 — completed. Inputs locais: MISSION-CONTRACT-HANDOFF.md §1–§8; BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md §2A–§G; .agents/notes/proposed/process/2026-08-24-grok-teammates-harness-bridge.md §1–§7 (drop dirs, schema HANDOFF 7, quem escreve/lê, dispatch, gates, Three-Run Proof); .agents/handoff/outbox/2026-08-24T1755-harness-deep-web-search.md §B (Anthropic ~15× tokens, Claude Code 2.1.217 cap, Cursor #2829 fail-open, Claude Code #70143 background subagent auto-deny) + §C (cursor.com permissions.md tri-state, deepagents interrupt_on, UAIX Agent File Handoff, transactional outbox + Redis Streams, Nexus Filesystem-as-IPC)."
status: done
blockers: "Nenhum para este OUT. Pré-condição dos 5 patches: composition base precisa de PreToolUse hook registry em packages/hooks/ (ainda copy per bridge §5)."
next_action: "Chief/owner — escolher 1 dos 5 patches YELLOW como próximo job Mac CLI (sugestão: #1 gates-hooks + #2 model-cap, na mesma job, porque um sem o outro vira teatro)."
gates: YELLOW
owner_needed: true
from: parent
to: Chief
session_id: session-5d35710e-8428-4d04-bcd4-6510c4f297dc
cwd: /Users/erck/xneog-harness
preset: yellow
haiku_reviewer: skip
---

# Adversarial teammates — 2026-08-24T18:24 ART

## TL;DR

- Defesa (A) sustenta: cost guard em 3 barreiras, lane purity por exclusão, RED = humano fisicamente enforced, anti-fan-out por 1 inbox → 1 lane + Three-Run Proof, durability via file-drop + HANDOFF 7 + envelope tipado.
- Ataque (B) confirma **5 vetores reais** que A admite como falhas honestas: RED list `Write` vs `write`, `--patch` overlay sem hook, parent decide-instead-of-ask, answerer offline fail-open (Cursor #2829 shape), outbox non-atomic + sem idempotency.
- 5 patches YELLOW abaixo fecham os 5 vetores sem Anthropic. Mac CLI preset fica `workspace-write`+`ask`; nenhum vira RED.

## Falhas reais (síntese defesa × ataque)

### F1. Gates bypass — tool-name + overlay sem hook

- **Defesa A** sustenta RED = humano porque answerer duplo (Grok card + ACP `request_permission`).
- **Ataque B** quebra: bridge §5 cita "RED list `write` vs `Write`" e composition base bloqueia `Write` (SDK), mas a tool exposta ao agente é `write` (fs-tool). `--patch` overlay carrega config sem `PreToolUse` listener em `packages/hooks/`. RED vira comentário.
- **A honest failure** concorda: schema HANDOFF não tem `decision_packet:`; decisão RED hoje fica no log da session, não no envelope.

### F2. Burn Anthropic budget — sem model-cap nem depth-cap

- **Defesa A** sustenta cost guard via Three-Run Proof + G/Y/R classifier + summarize-before-spawn.
- **Ataque B** quebra: bridge §4 só fixa `default` em `session.selectModel`. Sem `PreToolUse` em `selectModel`, child troca pra `anthropic/opus-4-6` no turn 1. Sem `max_depth` em `packages/guard/`, child A → child B → child C. Sem summarize-before-spawn, contexto downstream estoura ~10×. Claude Code bug #70143 (background subagent auto-deny sem hook) é o outro lado: job morre silencioso.
- **A honest failure** admite: Three-Run Proof é disciplina do Chief, não hook.

### F3. Mix lanes — preset inheritance + MCP leak + ASC no mesmo path

- **Defesa A** sustenta pureza por exclusão (bridge §3: só Mac CLI move bytes).
- **Ataque B** quebra: Research child herda inadvertidamente preset `workspace-write` do parent; MCP connector do Ads instalado no Research vaza lane; Content usa Substack/Ghost tool com `requires_approval: false` e publica sem RED; Mac CLI `workspace-write` alcança o plist launchd — RED disfarçado de YELLOW.
- **A honest failure** corrobora: outbox→archive ainda é `mv` manual; janela de duplicação se Mac CLI crash entre write e mv.

### F4. Skip ask / lost RED — answerer offline fail-open

- **Defesa A** sustenta: Telegram deferred = explícito; card OS do Grok + ACP `request_permission` é o canal.
- **Ataque B** quebra: hooks B loaded mas copy-only (OUT 17:55 §5). Sem canal ativo, 3 failure modes — default-deny silencioso (job pendurado), default-allow silencioso (Cursor #2829 shape, child expira o ask), parent decide (intercepta no chat, responde allow). Bridge §4 manda "avisar owner 1 linha" — sem canal, o aviso não chega.
- **A honest failure** implícita: não há timeout documentado no `request_permission`.

### F5. Lost Evidence / non-durable handoff — atomic write + idempotency

- **Defesa A** sustenta: file-drop + archive + HANDOFF 7 + envelope tipado (UAIX shape) é industry-grade.
- **Ataque B** quebra: outbox é `write` direto sem `fsync` + rename atômico (crash mid-write → YAML malformado, parse fails silently). Frontmatter sem `id:` único (re-fire trunca). TOCTOU no inbox (sem `flock`, dois jobs processam mesmo arquivo). Harness não polled solo (bridge §3) → job mid-state órfão.
- **A honest failure** concorda: hoje é `mv` simples, não transactional outbox (dev.to/ovaiseq).

## 5 patches YELLOW

Cada patch = YELLOW (cria/editar arquivos internos + docs), **nunca** RED. Cada patch explicitamente **proíbe** Anthropic nos filhos (`openrouter/minimax/minimax-m3` ou `deepseek-v4-flash` only).

### Patch #1 — Gates-hooks: RED list real + PreToolUse registry (fecha F1)

- **Onde:** `packages/hooks/` registrar listener `PreToolUse`; composition base ganha `hooks: [permission-gate]` no `cordis.yml` overlay (`--patch /tmp/dsh-permission-gyr.patch.yml`); bridge spec §5 atualizado.
- **O quê:**
  1. Hook intercepta `tool === 'write'` (minúsculo, fs-tool) **e** `tool === 'Write'` (SDK). RED list match por path prefix + por tool name.
  2. `--patch` overlay vira **fonte** (não comentário): o patch carrega um plugin que registra o listener; `verify-cordis-config` valida que `dependencies: [hooks]` está presente.
  3. Timeout 60s no `request_permission`; fail-**closed** (não fail-open estilo Cursor #2829).
  4. HANDOFF frontmatter ganha campo `decision_packet: ""` (preenchido em RED; vazio em G/Y).
- **Custo:** zero Anthropic; só código. ~1 job Mac CLI YELLOW.
- **Não-cobre:** F4 (canal do answerer) — esse é patch #4.

### Patch #2 — Model-cap + depth-cap + summarize-before-spawn (fecha F2)

- **Onde:** `packages/guard/` registra policy; novo hook `PreToolUse` em `session.selectModel`; novo hook em `subagent_fork`/`subagent`.
- **O quê:**
  1. `selectModel` allowlist = `openrouter/minimax/minimax-m3`, `deepseek-v4-flash`. Reject explícito em qualquer outro (inclui `anthropic/*` e opus). Erro retorna no history com reason.
  2. `max_depth: 2` registrado em `packages/guard/` (mesmo número do Claude Code 2.1.217 cap).
  3. Antes de cada `subagent_fork`, parent chama `summarize(parent_history)` e passa o resumo (não o context inteiro) — corta downstream ~10× (dev.to/sebastian_chedal).
  4. Token-counter expõe `tokens_used` no outbox frontmatter (campo novo `cost_estimate:`).
- **Custo:** zero Anthropic; child continua em minimax/deepseek-flash.
- **Não-cobre:** F3 (mix lanes) — esse é patch #3.

### Patch #3 — Lane-isolation: preset derivation + MCP scope + ASC path dedicada (fecha F3)

- **Onde:** `packages/interaction/permission-presets/` ganha `deriveChildPreset(parentPreset, lane)`; `packages/context/` ganha MCP scope por lane; novo path `~/.agents/handoff/asc/` com `read-only` fora da allowlist Mac CLI.
- **O quê:**
  1. Child preset é **derivado**, nunca herdado. `Mac CLI → Research child` = `green` (lê); `Mac CLI → Content child` = `yellow` mas só em `*/drafts/*` (path glob no RED list). Função pura `deriveChildPreset` é testada em unit.
  2. MCP connector de Ads fica em scope `lane: Ads`; Research MCP list exclui Ads tools. Connector scope = config (não prompt).
  3. ASC submit JSON vive em `~/.agents/handoff/asc/` (não em `.agents/handoff/inbox/`). Mac CLI preset adiciona `~/.agents/handoff/asc/` à RED list (path glob). Content só escreve em `*/drafts/*`.
  4. Bridge spec §3 ganha tabela "preset filho por lane" — supersede da frase ambígua "Research não escreve inbox sozinha".
- **Custo:** zero Anthropic; preset/configuração.
- **Não-cobre:** F5 (atomic write) — esse é patch #5.

### Patch #4 — Answerer-channel + fail-closed timeout (fecha F4)

- **Onde:** `packages/interaction/ask-user/`; OS notification via `code.claude.com/docs/en/hooks`; Telegram deferred mantido, mas canal barato obrigatório (OS notification ou local webhook `127.0.0.1:<port>`).
- **O quê:**
  1. Answerer hook B é **wired** (não copy-only): registra fallback chain `Grok card → OS notification → local webhook → fail-closed`. Telegram fica deferred mas não é o único canal.
  2. `request_permission` timeout 60s com fail-**closed** + `outbox status: blocked / owner_needed: true`. **Nunca** fail-open estilo Cursor #2829.
  3. Parent (Chief) **não pode** responder `allow` no chat para pedido RED — hook `PreToolUse` em tool `session.respond` rejeita se `gate === RED && responder !== owner`.
  4. Bridge spec §4 ganha: "Se answerer offline e timeout expira → status: blocked, outbox gravado, Mac CLI enqueue retry após 5min, owner vê no card OS na próxima poll."
- **Custo:** zero Anthropic; canal local. ~1 job Mac CLI YELLOW.
- **Pré-req:** patch #1 (hooks registry) já wired.

### Patch #5 — Atomic outbox + idempotency key + inbox lock (fecha F5)

- **Onde:** `packages/interaction/` adiciona `writeAtomic(path, content)` helper; HANDOFF schema ganha `id: <uuid>`; inbox ganha `flock` advisory.
- **O quê:**
  1. Outbox write = `write .tmp` + `fsync` + `rename .tmp → outbox.md` (atomic no POSIX). Crash mid-write → arquivo `.tmp` órfão, próximo run limpa; `outbox.md` sempre válido.
  2. Frontmatter ganha `id: <uuid v4>` (gerado no inbox dispatch, propagado no outbox). Re-fire com mesmo `id` → outbox já existe, status: `already_done`. Sem truncamento.
  3. Inbox read ganha `flock(LOCK_EX)` em `<inbox>/.lock`; release no fim. Dois jobs simultâneos = segundo espera. `mv inbox → archive` também sob lock.
  4. Bridge spec §2 (schema) supersede: frontmatter mínimo vira 8 campos (7 + `id:`).
- **Custo:** zero Anthropic; só código.
- **Pré-req:** nenhum; standalone.

## Ordem sugerida (Chief decide)

| # | Patch | Depende de | Esforço | Cobre |
|---|-------|------------|---------|-------|
| 1 | Gates-hooks | — | 1 job YELLOW | F1 |
| 2 | Model-cap + depth-cap | #1 | 1 job YELLOW | F2 |
| 5 | Atomic outbox + idempotency | — | 1 job YELLOW | F5 |
| 3 | Lane-isolation | #1 | 1 job YELLOW | F3 |
| 4 | Answerer-channel | #1 + #2 | 1 job YELLOW | F4 |

Padrão: **#1 primeiro** (sem ele, #2/#3/#4 viram teatro — overlay sem hook). #5 pode rodar em paralelo (independente). Depois #2, #3, #4 em qualquer ordem. Estimativa total: **5 jobs YELLOW Mac CLI**; sem Anthropic; total fan-out permanece 1-wide com summarize.

## Constraints & do-not-touch (Mac CLI snapshot 18:24 ART)

- **YELLOW only:** web search + 2 subagents minimax/minimax-m3 (já completos) + este write. Sem push, sem launchd edit, sem PID kill, sem commit, sem publish.
- **Filhos:** openrouter/minimax/minimax-m3. **Nunca** Anthropic nos filhos. **Nunca** opus. **Nunca** 3-wide.
- **Reviewer haiku:** **skip** (sem chamada Anthropic no parent). OUT já pronto; saldo ~US$5 não verificado; spec diz SKIP se não houver garantia — pulou.
- **session_id `session-41a6e9da-…` NÃO reabrir** (per spec).
- **launchd `com.xneog.harness-web` BOOTED OUT** — não reescrever plist.
- **Fan-out proibido** para Ads/Content/zeroone — bridge §3.
- **Não `mv inbox → archive`** — owner arquiva.

## Próximo passo concreto

Owner abre este OUT, valida 1–2 mitigações (preferência: patch #1 + #5, são os de código mais isolado), despacha 1 (ou 2 em paralelo) jobs Mac CLI YELLOW. Depois dos 5 patches, **rodar Three-Run Proof** com 3 jobs Research reais inbox→outbox antes de liberar launchd watcher (`fswatch outbox/ → xneog --profile headless`, ação #2 do OUT 17:55).
