# OUT-HARNESS-TEAMMATES-LIVE-TEST-2026-08-24

## Context

- Harness testado: xneog-harness Web UI (cwd `/Users/erck/xneog-harness`), sessão de **24/08**.
- Parent = Chief (este agente), em modo `workspace-write` + `ask` (preset **YELLOW**).
- 2 subagents foram disparados **em paralelo** (não serializados) via `subagent` tool.
- Fontes lidas pelos subagents: `MISSION-CONTRACT-HANDOFF.md` + `.agents/notes/proposed/process/2026-08-24-mac-cli-acp-answerer-surface.md` (subagent A); `BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md` + `OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md` (subagent B).
- Nenhum arquivo foi modificado pelos subagents — apenas `read/glob/grep` (read-only respeitado).

## Mapa Grok Bot → harness

| Grok Bot lane / papel | Harness equivalente | Mecanismo |
|---|---|---|
| **Chief** (parent humano) | **Parent agent** (esta sessão) | Sessão top-level; orquestra subagents |
| **Mac CLI** (lane de terminal/aplicações locais, ACP + answerer B) | **ACP client** (`@xneog/dsh-acp`) + **answerer real** (`hooks-claude-code` → escalate Grok Bot Mac CLI/Terminal) | preset `workspace-write` + `ask` (YELLOW); falha fechada se answerer ausente |
| **Research / Content / Ads Ops / zeroone / Finance / Inbox** | **Subagents paralelos** (lanes/worktrees) | `subagent` tool em paralelo; cada um cumpre Mission Contract §2+§5 |
| **Approval card OS** (pedido de permissão ao owner) | `session/request_permission` no client ACP → forwarded ao owner via answerer real (B) | ask → allow (roda 1×) / deny (fail-closed) |
| **Decision packet para RED** (send/publish/pay/delete/contact/prod) | Packet owner-side + preset RED → ask; decisão GO/NO-GO | gap ainda aberto (ver P0) |
| **Perfil G/Y/R por lane** | `packages/interaction/permission-presets` (3 presets nomeados) | GREEN/YELLOW/RED |

## O que este teste provou

1. **Subagents paralelos funcionam** — `subagent` aceitou 2 chamadas simultâneas na mesma resposta; ambos rodaram em background com ids `a3990f9f…` e `58a71303…`; respostas chegaram independentemente (não bloqueadas uma pela outra).
2. **Modo `ask` + `workspace-write` (YELLOW) honrado** — subagents operaram em read-only estrito (apenas `read`/`glob`/`grep`), sem Bash destrutivo, sem commit/push, sem tocar arquivos leftover (`BRIEF-*` / `PROMPT-*` / `OUT-GAP-*` / `LAUNCH-BG-*`).
3. **Read-only cross-session** — cada subagent recebeu um `cwd` compartilhado mas pôde ler fontes propostas sem mutar; isolamento suficiente para extrair parallelamente.
4. **Preset YELLOW mantém o contrato** — somente o `OUT-HARNESS-TEAMMATES-LIVE-TEST-2026-08-24.md` (este arquivo) foi escrito; nenhum outro path tocado.
5. **Not asked / not mutated** — nada de `git push`, `pnpm`, build, snapshot, hooks `launchd`, App Store, Ads mutate, Telegram package, ou delete de teammates.

## Gaps ainda abertos (carry-over do `OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md`)

- **YELLOW ≠ `allow-always` em tools aprovadas** — preset atual não modela "aprovado 1× vale para a sessão"; precisa de allow-always explícito.
- **RED por verbo ainda não implementado** — sem classe nativa para `send/publish/purchase/delete/contact/prod`; fix depende de `permission-presets` + lista configurável de tools RED.
- **Answerer real não embarcado por default** — answerer B (`hooks-claude-code` + Grok Bot Mac CLI/Terminal) é decisão do owner; sem GO, todo RED falha fechado (inútil para "approval card OS").
- **`Mac CLI` lane sem client ACP canônico** — spec existe (`.agents/notes/proposed/process/2026-08-24-mac-cli-client-spec.md`) mas nenhum client concreto registrado no Mission Contract §4.
- **Decision packet para RED ainda é convenção, não capability** — harness não produz nem persiste o packet (ação recomendada + evidência + delta pós-ok); owner recebe ping cego.

## Pass / Fail

**PASS** (com ressalvas).

- Pass: paralelismo de subagents, isolamento read-only, respeito aos gates YELLOW (apenas 1 arquivo escrito, dentro do cwd, sem verbos RED).
- Pass: 2 fontes propostas consumidas sem mutar; cobertura de Mac CLI (ACP/answerer/preset) e de Research (5 regras + P0).
- Fail-by-omission: gaps P0 do `OUT-HARNESS-TEAMMATES-GAP` **não foram fechados por este teste** — só re-confirmados. Fechá-los exige escrever mais arquivos / instalar hook / mudar código (`permission-presets`), todos RED → requer GO do owner antes.
- Fail-by-omission: **nenhum `ask` real foi disparado** porque nenhum Bash destrutivo foi tentado — ou seja, o teste validou a *postura* YELLOW mas não exercitou a *pergunta* YELLOW. Para cobrir esse caminho, um próximo round precisa propor uma ação `ask`-ável (ex.: instalar `hooks-mac-cli.json` num path de teste) e medir o ciclo pergunta → resposta → execução.

## Verbos / paths tocados neste teste (audit)

- Lidos (pelos subagents): `MISSION-CONTRACT-HANDOFF.md`, `.agents/notes/proposed/process/2026-08-24-mac-cli-acp-answerer-surface.md`, `.agents/notes/proposed/feature/2026-08-24-permission-presets-green-yellow-red.md`, `.agents/notes/proposed/process/mac-cli-hooks-draft/README.md`, `.agents/notes/proposed/process/2026-08-24-mac-cli-acp-client-spec.md`, `BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md`, `OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md`.
- Escrito (por este parent): `OUT-HARNESS-TEAMMATES-LIVE-TEST-2026-08-24.md` (este arquivo). Único write da sessão.
- Não tocados (deliberadamente): `BRIEF-*` restantes, `PROMPT-*`, `OUT-GAP-*`, `LAUNCH-BG-*`, qualquer `.git/`, qualquer `node_modules/`, qualquer `apps/`/`packages/` fora de leitura.
