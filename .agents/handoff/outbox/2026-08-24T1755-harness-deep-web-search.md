---
objective: "Cruzar 2026-08-24 web research (Grok Bot teammates + harness/swarm cost + padrões xNeog pode copiar sem API Grok) e entregar 5 ações copy-now para a fase YELLOW do bridge Mac CLI ↔ harness."
artifact: ""
evidence: "3 subagentes web paralelos (A/B/C). Bridge spec `2026-08-24-grok-teammates-harness-bridge.md` §1–§7. Contexto Mac CLI 17:55 ART (PID 74693 harness live, launchd BOOTED OUT, plist wrapper ainda `cd ~/xneog`). Notas 24/08 já no disco: `acp-answerer-surface`, `acp-client-spec`, `permission-presets-G-Y-R`, `OUT-HARNESS-TEAMMATES-LIVE-TEST-2026-08-24`, `OUT-HARNESS-TEAMMATES-GAP-2026-08-24`, `OUT-ROUND2-ASK-2026-08-24`. 4 arquivos do briefing (MISSION-CONTRACT, BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES, OUT-LIVE-TEST, OUT-GAP) **não encontrados** em `.agents/handoff/` neste pull — só o bridge spec e o ROUND2-ASK inbox/outbox existem hoje."
status: done
blockers: "URLs do subagente A (xAI/Cursor forum) verificadas; URLs do subagente C retry vieram de search results reais; alguns repos OSS do primeiro C eram fabricated-looking e foram descartados — o retry C já saneou. `MISSION-CONTRACT-HANDOFF.md` §5 não está no disco desta session; o frontmatter abaixo replica os 7 campos a partir do bridge spec §2."
next_action: "Owner — ler este OUT, escolher entre ação #1 (composition G/Y/R) ou #2 (fswatch watcher). Actions #3–#5 são nome/docs/safety e podem rodar em qualquer ordem."
gates: YELLOW
owner_needed: true
from: parent
to: Chief
session_id: session-41a6e9da-2e62-4964-bc8f-3e7eecf91bc5
cwd: /Users/erck/xneog-harness
preset: yellow
---

# Harness deep web search — 2026-08-24T17:55 ART

## TL;DR

- Grok Bot teammates têm **always-on cloud + routines + Permissions doc**, mas **nenhuma API/webhook/CLI/drop-path público** → copiar padrão, não produto.
- Fan-out multi-subagent custa **~15× tokens vs single-agent** medidos (Anthropic + independente). Depth cap e sumarização antes do spawn são obrigatórios.
- xNeog **já tem tudo** para copiar 5 padrões sem API: drop-path (`packages/interaction/` + `~/.agents/handoff/`), fswatch/launchd nativo, classifier-permission gate, three-run draft→review→commit.

## Frentes

### A. Grok Bot teammates (subagent A — URLs xAI / Cursor forum)

- **Always-on cloud teammate** dedicado, sem API key do user. https://x.ai/news/introducing-grok-bot (2026-08-24, xAI news).
- **Hub oficial** Grok Bot. https://docs.x.ai/grok-bot/overview (2026-08-24, xAI docs).
- **Cursor integra Grok Bot beta** (Mac/iOS/PC/Linux). https://forum.cursor.com/t/introducing-grok-bot/168053 e https://forum.cursor.com/t/grok-bots-as-always-on-workers-vs-topic-threads/168183 (2026-08-24, third-party forum).
- **Routines** documentadas (schedule + email trigger). https://docs.x.ai/grok-bot/skills-routines-and-automations + https://x.ai/news/grok-automations (2026-08-24, xAI).
- **Permissions doc** existe, tool-level approval. https://docs.x.ai/build/features/permissions (2026-08-24, xAI).
- **Sandbox** existe, sem inbox/outbox API. https://docs.x.ai/build/features/sandbox (2026-08-24, xAI).
- **Sem webhook/CLI/drop-path público** para handoff externo. https://app.therundown.ai/guides/hand-off-real-work-across-your-apps-with-grok-bot (2026-08-24, third-party).
- **Coverage gaps A:** syntax canônico de addressing, cron expression spec, webhook surface, granular approval API contract — todos "not found publicly as of 2026-08-24".

### B. Harness + swarm cost (subagent B retry — URLs mspoweruser, arXiv, Cursor changelog)

- **Anthropic multi-agent ≈ 15× tokens** vs single-agent chat; supervisor + 3-5 paralelos, ~4× por resposta real. https://mspoweruser.com/anthropic-finally-reveals-how-it-built-its-multi-agent-claude-research-system-know-all-about-it-here/ (2026-08-24).
- **Confirm independente ~15×.** https://getnadir.com/blog/multi-agent-orchestration-15x-token-cost/ (2026-08-24).
- **Claude Code 2.1.217** cap de sub-agent + concurrency budget explícito (2026-07). https://dev.classmethod.jp/en/articles/20260722-cc-updates-v2-1-217/ (2026-08-24).
- **`Task` tool indisponível dentro de sub-agent** (issue #59523) — orquestrador tem que ser top-level. https://github.com/anthropics/claude-code/issues/59523 (2026-08-24).
- **arXiv 2606.20629 — heterogeneous planner/worker**, melhor fronteira cost-accuracy. https://arxiv.org/abs/2606.20629 (2026-08-24, paper).
- **arXiv 2608.14927 — Cost-Aware Protocol Routing** bate debate/vote fixo. https://scirate.com/arxiv/2608.14927 (2026-08-24, paper).
- **arXiv 2608.15817 — routing + cascade** (cheap-escalate) > single-strong em $/quality. https://arxiv.org/abs/2608.15817 (2026-08-24, paper).
- **Cursor 3.6 Auto-Review + `permissions.json`** — every tool call allow-listed antes de exec. https://cursor.com/cn/changelog/auto-review e https://cursor.com/docs/reference/permissions.md (2026-08-24).
- **Cursor apply-patch hook fail-open signal-killed** (`permission:allow`) — fail-open vs fail-closed é decisão de design, não default. https://github.com/deftai/directive/issues/2829 (2026-08-24).
- **OpenAI Codex → always-on screen-watcher; Workspace Agents como team.** https://the-decoder.com/openai-turns-codex-into-an-always-on-coding-agent-that-watches-your-screen/ (2026-08-24).
- **Claude "Tag" always-on teammate em Slack** (2026). https://www.creativeainews.com/blog/claude-tag-anthropic-slack-ai-teammate-2026/ (2026-08-24).
- **Transactional outbox + Redis Streams** como IPC confiável (não RAG). https://dev.to/ovaiseq/building-reliable-agents-with-the-transactional-outbox-pattern-and-redis-streams-5c80 (2026-08-24).
- **Local-first file-based multi-agent factory** (Python). https://hackernoon.com/beyond-black-box-orchestration-building-a-local-first-file-based-multi-agent-factory-in-python (2026-08-24).
- **Summarize-before-spawn (Anthropic blueprint)** corta contexto downstream ~10×. https://dev.to/sebastian_chedal/anthropic8217s-multi-agent-blueprint-what-production-constraints-add-2fm7 (2026-08-24).
- **arXiv 2606.22840 — RLM-Cascade** cache + cascade, cada alavanca 2-5×. https://arxiv.org/abs/2606.22840 (2026-08-24, paper).
- **Coverage gaps B:** delta success-rate SWE-bench multi vs single, status OpenAI Swarm 2026, depth-limit guidance LangChain/LlamaIndex, p50/p99 latency overhead, URL Anthropic primário do 15×.

### C. Patterns xneog pode copiar sem API (subagent C retry — URLs Nexus RFC, UAIX, Claude Code, Cursor, LangChain)

- **Nexus RFC "Filesystem-as-IPC"** — drop folders como transport first-class entre agents. https://github.com/nexi-lab/nexus/issues/2037 (2026-08-24).
- **Dev|Journal "Inbox/Outbox Pattern"** (Mar 2026) — envelope durável + archive dir = handoff bus mínimo. https://blog.earezki.com/ai-news/2026-03-09-the-inbox-outbox-pattern-how-ai-agents-coordinate-without-stepping-on-each-other/ (2026-08-24).
- **fleetpost** — OSS offline file-drop entre máquinas (Claude Code + rclone), sem server. https://github.com/StanimirTenev/fleetpost (2026-08-24).
- **UAIX Agent File Handoff spec** — envelope JSON padronizado, pluga direto no `packages/interaction/`. https://uaix.org/en-us/specification/agent-file-handoff/ (2026-08-24).
- **fswatch** canônico multi-backend (FSEvents/inotify/ReadDirectoryChangesW) + watchdog Python. https://github.com/emcrisostomo/fswatch (2026-08-24).
- **Claude Code permission modes + bug #70143** (background subagent auto-deny sem hook). https://code.claude.com/docs/en/permission-modes e https://github.com/anthropics/claude-code/issues/70143 (2026-08-24).
- **Cursor `permissions.md` tri-state allow/ask/deny** → mapeia direto em G/Y/R local. https://cursor.com/docs/reference/permissions.md (2026-08-24).
- **Cursor 3.6 Auto-review = classifier subagent** mesmo shape do Three-Run Proof. https://www.creativeainews.com/blog/cursor-3-6-auto-review-run-mode-2026/ (2026-08-24).
- **Deep Agents `interrupt_on={"tool": {"requires_approval": True}}`** — approval-first contract OSS canônico. https://github.com/langchain-ai/deepagents (2026-08-24, linha test_subagents.py#L20).
- **AgentPatterns "Defense-in-Depth Agent Safety"** — draft→review→commit, sem API se reviewer é local. https://agentpatterns.ai/security/defense-in-depth-agent-safety/ (2026-08-24).
- **Inference Gateway `ApproveSubagent` CLI** — relay-decision-to-waiting-subagent via local CLI, não cloud. https://pkg.go.dev/github.com/inference-gateway/cli@v0.146.0 (2026-08-24).
- **Approval surfaces zero-cost** (OS notification, local webhook 127.0.0.1, CLI confirm) — todas no Claude Code hooks reference. https://code.claude.com/docs/en/hooks (2026-08-24).
- **Coverage gaps C:** nome exato "Three-Run Proof" não é público; writeup 2026 de launchd/Task Scheduler específico para AI-agent wake-on-file; Codex CLI background/permission API 2026; benchmark inbox/outbox vs message-queue.

## Tabela de fontes (URL + 1 linha)

| Frente | URL | 1 linha |
|---|---|---|
| A | https://x.ai/news/introducing-grok-bot | xAI news, oficial — launch Grok Bot. |
| A | https://docs.x.ai/grok-bot/overview | xAI docs — overview oficial. |
| A | https://forum.cursor.com/t/introducing-grok-bot/168053 | Cursor forum — beta Grok Bot Mac/iOS/PC/Linux. |
| A | https://forum.cursor.com/t/grok-bots-as-always-on-workers-vs-topic-threads/168183 | Cursor forum — framing worker vs topic. |
| A | https://docs.x.ai/grok-bot/skills-routines-and-automations | xAI docs — page Skills + Routines. |
| A | https://x.ai/news/grok-automations | xAI news — schedule + email trigger. |
| A | https://docs.x.ai/build/features/permissions | xAI docs — Permissions tool-level. |
| A | https://docs.x.ai/build/features/sandbox | xAI docs — sandbox sem inbox/outbox API. |
| A | https://app.therundown.ai/guides/hand-off-real-work-across-your-apps-with-grok-bot | Third-party — handoff tutorial só Grok-side, sem webhook. |
| B | https://mspoweruser.com/anthropic-finally-reveals-how-it-built-its-multi-agent-claude-research-system-know-all-about-it-here/ | Anthropic multi-agent ≈ 15× tokens, supervisor + paralelos. |
| B | https://getnadir.com/blog/multi-agent-orchestration-15x-token-cost/ | Independente confirma ~15×. |
| B | https://dev.classmethod.jp/en/articles/20260722-cc-updates-v2-1-217/ | Claude Code 2.1.217 — depth cap + concurrency. |
| B | https://github.com/anthropics/claude-code/issues/59523 | `Task` tool indisponível dentro de sub-agent. |
| B | https://arxiv.org/abs/2606.20629 | Heterogeneous planner/worker frontier. |
| B | https://scirate.com/arxiv/2608.14927 | Cost-Aware Protocol Routing. |
| B | https://arxiv.org/abs/2608.15817 | Routing + cascade cheap-escalate. |
| B | https://cursor.com/cn/changelog/auto-review | Cursor 3.6 Auto-review + permissions.json. |
| B | https://cursor.com/docs/reference/permissions.md | Cursor tri-state allow/ask/deny. |
| B | https://github.com/deftai/directive/issues/2829 | Fail-open signal-killed → `permission:allow`. |
| B | https://the-decoder.com/openai-turns-codex-into-an-always-on-coding-agent-that-watches-your-screen/ | OpenAI Codex always-on screen-watcher. |
| B | https://www.creativeainews.com/blog/claude-tag-anthropic-slack-ai-teammate-2026/ | Claude "Tag" always-on Slack teammate. |
| B | https://dev.to/ovaiseq/building-reliable-agents-with-the-transactional-outbox-pattern-and-redis-streams-5c80 | Outbox + Redis Streams como IPC. |
| B | https://hackernoon.com/beyond-black-box-orchestration-building-a-local-first-file-based-multi-agent-factory-in-python | Local-first file-based multi-agent factory. |
| B | https://dev.to/sebastian_chedal/anthropic8217s-multi-agent-blueprint-what-production-constraints-add-2fm7 | Summarize-before-spawn corta contexto ~10×. |
| B | https://arxiv.org/abs/2606.22840 | RLM-Cascade cache+cascade 2-5×. |
| C | https://github.com/nexi-lab/nexus/issues/2037 | Nexus RFC — Filesystem-as-IPC. |
| C | https://blog.earezki.com/ai-news/2026-03-09-the-inbox-outbox-pattern-how-ai-agents-coordinate-without-stepping-on-each-other/ | Dev\|Journal — Inbox/Outbox pattern Mar 2026. |
| C | https://github.com/StanimirTenev/fleetpost | fleetpost — OSS offline file-drop cross-machine. |
| C | https://uaix.org/en-us/specification/agent-file-handoff/ | UAIX Agent File Handoff spec. |
| C | https://github.com/emcrisostomo/fswatch | fswatch canônico multi-backend. |
| C | https://code.claude.com/docs/en/permission-modes | Claude Code permission modes (classifier). |
| C | https://github.com/anthropics/claude-code/issues/70143 | Claude Code background subagent auto-deny sem hook. |
| C | https://cursor.com/docs/reference/permissions.md | Cursor tri-state → G/Y/R. |
| C | https://www.creativeainews.com/blog/cursor-3-6-auto-review-run-mode-2026/ | Cursor 3.6 Auto-review = classifier subagent. |
| C | https://github.com/langchain-ai/deepagents | Deep Agents `interrupt_on` approval-first contract. |
| C | https://agentpatterns.ai/security/defense-in-depth-agent-safety/ | Defense-in-Depth: draft→review→commit gate. |
| C | https://pkg.go.dev/github.com/inference-gateway/cli@v0.146.0 | `ApproveSubagent` CLI — local relay. |
| C | https://code.claude.com/docs/en/hooks | Approval surfaces zero-cost (notification, local webhook, CLI confirm). |

## 5 ações copy-now (YELLOW)

1. **Composition G/Y/R como classifier file** — portar `cursor.com/docs/reference/permissions.md` (tri-state allow/ask/deny) para o patch `--patch /tmp/dsh-permission-gyr.patch.yml`. O `--patch` overlay já está carregado (PID 74693). Sem API. Copia o padrão de Claude Code `permission-modes` (deepagents `interrupt_on` shape).
2. **`fswatch outbox/ → xneog --profile headless` como launchd unit** — usar `WatchPaths` no plist template (klab.tw 2026 launchd guide). Boot só depois de Three-Run Proof (bridge spec §6). Wrapper do plist atual aponta `cd ~/xneog` (stale); corrigir para `cd ~/xneog-harness` **só** quando entrar em rotina, não agora. Mantém YELLOW, não vira RED.
3. **Rename "approval-first"** nos docs xneog (`packages/interaction/`) — pattern nomeado em 2026 (alphaparkinc, deepagents). Free, só doc. Cabe em `pnpm run doc-sync` quando entrar na fila.
4. **Three-Run Proof gate = draft→review→commit local** — mapear o bridge spec §6 no classifier-subagent shape do Cursor 3.6. Implementação: segundo `subagent` invocation revisando o diff do primeiro (sem API se reviewer for local; com API só se owner pedir Opus). Antes da rotina, observar 3 jobs Research inbox→outbox (já temos r1 + r2 + ROUND2-ASK; falta 1).
5. **Summarize-before-spawn + cap depth 2** — adotar Anthropic blueprint (`dev.to/sebastian_chedal`) e Claude Code 2.1.217 cap (`dev.classmethod.jp`) como guardas no `packages/guard/`. Custa zero; derruba custo de fan-out ~10× no boundary e limita explosão combinatorial.

## Constraints & do-not-touch (Mac CLI snapshot 17:55 ART)

- **YELLOW only:** web search + 1 write neste OUT. Sem push, sem launchd edit, sem PID kill, sem commit, sem publish.
- **PID 74693 (harness live) e PID 826 (Tailscale proxy)** — não tocar.
- **launchd `com.xneog.harness-web` BOOTED OUT 24/08** — wrapper ainda `cd ~/xneog`; não reescrever plist, não re-bootstrap.
- **`~/.xneog-harness` live, `~/.dsh` stale** — não migrar sem owner.
- **Dashboard xneog (`leandro1416`)** — não está neste Mac; sem referência local.
- **Sem path `*gomes*`** no HOME raso — não inventar.
- **Fan-out proibido** para Ads/Content/zeroone — bridge spec §3.
- **Não `mv inbox → archive`** — owner arquiva.

## Próximo passo concreto

Owner abre este OUT, valida 2-3 URLs da tabela (preferência: xAI docs + arXiv abstracts), escolhe **uma** das 5 ações para entrar em YELLOW como próximo job Mac CLI → harness. Sugestão default: **ação #1** (composition G/Y/R como classifier file) — é o que destrava #2, #3, #4 em sequência sem nova rodada de pesquisa.
