# Harness xNeog × Grok Bot teammates — gap analysis

**Data:** 24/08/2026 · **Lane:** Claude Code (Mac owner) · **Gate:** YELLOW (só docs locais)
**Inputs:** `BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md`, `MISSION-CONTRACT-HANDOFF.md`, `AGENTS.md`, `~/.claude/CLAUDE.md`, `docs/`, `.agents/`, docs.x.ai + forum Cursor
**Método:** 3 subagentes paralelos (inventário haiku · práticas sonnet+web · gap analysis Fable) + consolidação

---

## 1. Contexto

- xneog (`dsh`) é um harness de agente plugin-based (fork deepseek-harness sobre Cordis): subagentes, workflows, approval seam, session log append-only, ACP/SDK/headless.
- Grok Bot (Cursor × xAI, beta ago/2026) é um roster de bots always-on com VM Linux compartilhada por membro; sem API/webhook/CLI pública documentada para acioná-los programaticamente.
- O Mission Contract (7 campos + GREEN/YELLOW/RED + HANDOFF + Three-Run Proof) já está alinhado ao estado da arte de handoff entre agentes.
- O harness cobre a mecânica (approval, log, handoff Ralph, presets) mas não codifica o vocabulário do contrato (gates por verbo, decision packet, bloco HANDOFF, roster).
- Integração real Grok Bot ↔ Mac é hoje via humano/arquivos compartilhados, não via chamada programática — o "Mac CLI" bot precisa de superfície definida.

## 2. O que o harness já cobre

| Conceito do contrato | Onde vive |
|---|---|
| RED = humano / approval gate | `packages/interaction/user-approval` (`ctx.approval`, `ask\|never`, fail-closed → `unavailable`), `permission-presets` (`workspace-write+ask`, `danger-full-access+never`), sandbox `read-only`/`workspace-write` em `packages/bundle/base` — `docs/subsystems/approval.md` |
| Handoff tipado (status/evidência/next) | `packages/workflow/tool-ralph` — report `continue\|complete\|blocked` + summary/evidence/next/blockers; report inválido falha, não trunca (`docs/glossary.md#Ralph-handoff`) |
| Reviewer rejeita, não reescreve | Ralph rejeita report inválido; `tool-subagent-report` = canal filho→pai |
| Evidence travels with the work | session log append-only, regra "model-visible ⟺ logged" (`docs/architecture.md`, `packages/session/*`), OTel (`session-telemetry-otel`), `packages/hooks/*` para audit externo |
| Loop guard | `guard/repeat-tool-reminder` (advisory), `guard/timeout-policy`, Ralph `maxRounds`, workflow `maxTotalAgents` |
| Herança de política em subagentes | `2026-07-25-subagent-policy-inheritance.md`, `2026-08-10-subagent-approval-pinned-never.md` |
| Superfície de automação ("Mac CLI") | `packages/acp/acp` (automation-only), `packages/bundle/headless` (`xneog --profile headless "task"`), `packages/sdk` (JSON-RPC + Python) |
| Composição por papel | `packages/preset` (cordis.yml por agente), `~/.dsh/profiles/<name>/` |
| Anti-fan-out / model+effort | só em `~/.claude/CLAUDE.md` (tabela haiku/sonnet/herdado; "cabe em 1-3 chamadas? não é workflow") |
| Doutrina Grok Bot (passa / nunca passa, VM única, sem privacy mode) | `~/.claude/CLAUDE.md` §Grok Bot |
| Rotina recorrente | skill `new-loop` (claude headless + launchd + notify) |

## 3. Gaps vs Mission Contract / checklist teammates

**P0**
- **GREEN/YELLOW/RED ≠ `ask|never`.** Harness não tem "allow-always em tools aprovadas" (YELLOW) nem classe RED por verbo (send/publish/purchase/delete/contact). Fix: 3 presets nomeados em `permission-presets` (green/yellow/red → sandbox+approval) + lista configurável de tools RED com `ask` obrigatório.
- **"Mac CLI" bot sem superfície definida.** ACP é automation-only sem answerer humano; headless sem answerer = todo RED falha fechado (ok, mas inútil para o contrato "approval card OS"). Fix: decidir ACP/SDK + answerer real (Telegram notify ou hook `hooks-claude-code`), preset `workspace-write+ask`, e registrar a superfície no Mission Contract §4.

**P1**
- **Bloco HANDOFF não é schema de saída.** Ralph tem schema próprio; `tool-subagent-report` aceita string livre; nada em `.agents/` define os 8 campos. Fix: Agent Note `proposed/process` + seção de prompt em `tool-subagent-report` exigindo Artifact/Evidence/Status/Blockers/Next/Gates.
- **Decision packet para RED ausente.** `ApprovalRequest` carrega só a ação (`user-approval/README.md` §Known limitations). Fix: campos opcionais `rationale/evidence/afterEffect` renderizados no card. Reforço: docs.x.ai dizem que audit view de ações do Bot é "forthcoming" — o packet manual é a mitigação hoje.
- **Sem loop guard em handoffs não-idempotentes.** `tool-subagent-report` sem idempotency key/receipt/retry. Fix: `idempotencyKey` branded + `maxRetries` em config do consumer.
- **Three-Run Proof não existe no ciclo de rotina.** `new-loop` scaffolda direto para launchd; sem estado observe→correct→release nem métricas. Fix: rotina nasce `disabled`, 3 runs manuais logados antes de `launchctl load`.
- **model/effort não validado.** Regra só no CLAUDE.md; `tool-subagent.agentOptions.model` opcional, workflow não expõe effort. Fix: `requireModel: true` no consumer ou gate `verify-*`.
- **Anti-fan-out só por run de workflow.** `maxTotalAgents` não limita `subagent` chamado N vezes no main loop. Fix: guard `max-subagents-per-turn` bloqueante, configurável.

**P2**
- **Roster freeze não versionado.** Presets por lane existem, mas sem os 8 papéis (Chief, Research, zeroone, Content, Ads, Finance, Inbox, Mac CLI). Fix: um `cordis.yml` por lane em `examples/`; "novo bot = novo preset PR".
- **Evidence cross-bot.** Log é por sessão; não há projeção canônica do HANDOFF com `sessionId`/links para colar no Grok Bot. Fix: `session-projection` unit "handoff".
- **Drafts na raiz** (BRIEF/MISSION/PROMPT/LAUNCH-BG*.log/este OUT) fora de `.agents/notes` — `doc-sync` tende a falhar. Fix: mover para `.agents/notes/proposed/process/` ou `.gitignore`.
- **Rastro dos scripts de workflow** (os "264 scripts" do CLAUDE.md) vive em `~/.claude`, não neste repo — anotar onde a regra é auditada.

**Correções ao BRIEF (fontes públicas, 24/08):**
- Computer é **1 VM Linux por membro**, compartilhada pelos bots desse membro (não "computer de conta" genérico); org admin pode inspecionar/remover.
- MCP allowlist/denylist é controle **de time**, não por bot.
- Routines/event triggers, formato de skills, approval boundary por ação e qualquer API/webhook/CLI: **não documentados** nas páginas oficiais — são convenção operacional ou feature de UI. Assumir que o único canal programável hoje é arquivo compartilhado/MCP.

**Riscos do shared computer que o harness deve assumir:**
- Credenciais em `.env`/`credentials-local` do workspace são legíveis por todos os bots do membro — `DEEPSEEK_API_KEY`, `sk_live` ficam fora do box; lanes GREEN em sandbox `read-only`.
- Sem privacy mode tudo é retido: não apontar OTel/session logs para o box; nunca logar caso Master/Gmail pessoal.
- `danger-full-access+never` num bot = RED silencioso; default `workspace-write+ask` com answerer real.
- Worker threads e sub-bots não são boundary de segurança: bot comprometido = conta comprometida; Mac local só via ACP com allowlist de tools.

## 4. Próximas ações (sem fan-out)

**Chief**
1. Colar Mission Contract §2+§5 no charter de cada lane (já previsto) e adicionar a tabela GREEN/YELLOW/RED por verbo como texto — não depender de feature nativa.
2. Congelar roster nos 8 papéis; qualquer bot novo exige job estável + boundary + preset correspondente no harness.
3. Exigir decision packet (ação + evidência + o que muda após ok) em todo pedido RED, já que audit view nativo não existe.

**Mac CLI (Claude Code / harness)**
1. Decidir superfície: ACP com answerer Telegram (recomendado) vs headless puro; documentar preset `workspace-write+ask`. (P0)
2. Implementar presets green/yellow/red + lista de tools RED em `permission-presets`. (P0)
3. HANDOFF como schema de `tool-subagent-report` + Agent Note; `requireModel`/effort no consumer de subagent; guard `max-subagents-per-turn`. (P1)
4. `new-loop`: estado Three-Run Proof antes de `launchctl load`. (P1)
5. Mover os drafts da raiz para `.agents/notes/proposed/process/` antes de qualquer commit. (P2)

**Research**
1. Confirmar via UI (não docs) se routines/event triggers e skills format existem e como se exportam — `HANDOFF_GROK` objetivo: inventariar triggers e API do Grok Bot; critério: screenshot/URL oficial; trazer de volta: fatos + links, sem implementar.
2. Manter briefs sob demanda; entregar sempre no bloco HANDOFF.

## 5. Fontes

Locais: `BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md` · `MISSION-CONTRACT-HANDOFF.md` · `AGENTS.md` · `~/.claude/CLAUDE.md` · `docs/architecture.md` · `docs/subsystems/approval.md` · `docs/glossary.md` · `packages/interaction/README.md` · `packages/interaction/user-approval/README.md` · `packages/subagent/README.md` · `packages/workflow/tool-ralph` · `packages/guard` · `packages/acp/acp/README.md` · `packages/bundle/headless/README.md` · `.agents/notes/implemented/{feature/2026-06-21-subagent-capability-seam,2026-07-06-approval-seam,2026-07-25-subagent-policy-inheritance,2026-08-10-subagent-approval-pinned-never}.md`
Web: https://docs.x.ai/grok-bot/bots · https://docs.x.ai/grok-bot/teams-and-enterprises · https://forum.cursor.com/t/grok-bots-as-always-on-workers-vs-topic-threads/168183 · https://forum.cursor.com/t/introducing-grok-bot/168053
