# Spec draft — permission presets green / yellow / red

**Status:** proposed draft · **Código:** só com GO owner
**Package:** `@xneog/dsh-permission-presets` (`packages/interaction/permission-presets`)
**Hoje:** 2 presets — `workspace-write` (sandbox `workspace-write` + approval `ask`) e `danger-full-access` (`danger-full-access` + `never`).

---

## 1. Problema

Mission Contract usa **GREEN / YELLOW / RED** por *verbo de negócio*. O harness só tem `ask|never` + sandbox mode. Isso não expressa “allow-always em tools aprovadas” (YELLOW) nem “sempre humano nestes verbs” (RED).

## 2. Proposta de tabela (nomes estáveis)

| Preset name | sandbox/mode | approval/policy | Intento Mission Contract |
|-------------|--------------|-----------------|--------------------------|
| `green` | `read-only` (ou workspace read-only se existir) | `never` **só** para tools na allowlist GREEN | Search/read/summarize/draft sem card |
| `yellow` | `workspace-write` | `ask` default; allowlist YELLOW pode `never` após pin de sessão | Edits internos / drafts / board |
| `red` | `workspace-write` (não `danger-full-access`) | `ask` **obrigatório** para qualquer tool na lista RED | send/publish/purchase/delete/contact/prod |

Compat: manter aliases `workspace-write` → `yellow`, `danger-full-access` **deprecated** nesta lane (Mac CLI nunca default).

## 3. Lista tools / verbs RED (ask obrigatório)

Configurável (settings), seed inicial:

| Verb / tool class | Exemplos |
|-------------------|----------|
| send / contact | e-mail send, Slack/WA post, Telegram outbound |
| publish | Ads publish, social publish, ASC Submit |
| purchase / pay | Stripe, compras |
| delete | rm -rf fora workspace, delete bot/agent, drop DB |
| mutate prod | Ads Marketing API mutate, DNS, prod deploy |
| secrets exfil | ler keychain / copiar tokens pra fora |

Implementação sugerida (não codar ainda):
- `Config.redTools: string[]` (tool name matchers) → forçam `PreToolDecision.ask` mesmo se preset approval=`never`.
- Fail-closed: se answerer `unavailable`, RED → deny (não silent allow).

## 4. Lista GREEN (allow sem ask no preset green)

read, glob, grep, web search (se connector allowlisted), summarize, draft file **dentro** cwd, calculate. Bash só se matcher allowlist (ex. `Bash(ls *)`, `Bash(git status *)`) — fora disso cai YELLOW/ask.

## 5. Decision packet (RED)

Estender `ApprovalRequest` (ver gap OUT P1) com opcionais: `rationale`, `evidence`, `afterEffect`. Card/answerer mostra os 3 antes do allow. **Docs-only até GO.**

## 6. DoD desta feature (quando houver GO código)

- [ ] Três presets carregam sem quebrar `workspace-write` legacy
- [ ] Mac CLI profile default = `yellow` (`workspace-write`+`ask`)
- [ ] Tool na lista RED → sempre ask; deny se unavailable
- [ ] Testes unitários em `permission-presets` + 1 e2e ACP permission round-trip
- [ ] Note moved `proposed` → `implemented` com data

## 7. Fora de escopo (agora)

- Implementar Telegram
- Mudar Ralph / HANDOFF schema (P1 separado)
- commit/push

## Implementation (local 24/08 ~15:50 ART)

- Branch: `feat/mac-cli-gyr-answerer-b` (no push)
- Code: `packages/interaction/permission-presets/src/red-tools.ts` + Config `redTools` + presets `green`/`yellow`/`red`
- Tests: 33 passed (`permission-presets` folder)
- Commit: waiting owner git card (tree also has unrelated dirty files)


## Composition (local 24/08 ~18:37 ART) — ação #1 owner

Classifier na **composition base**, não no overlay `/tmp`:

- `packages/bundle/base/cordis.patch.yml` row `id: permission` agora declara `green`/`yellow`/`red` + `redTools` (`Write` **e** `write`).
- `packages/interaction/permission-presets/src/red-tools.ts` seed inclui `write` (fs-tool).
- Default continua `workspace-write` (alias yellow). `danger-full-access+never` não é default.
- **Não é** 1:1 `permissions.json` do Cursor.
- PID 74693 ainda roda com `--patch /tmp/dsh-permission-gyr.patch.yml`. Composition nova **precisa restart** — não feito sem GO.
- Sem commit / push / launchd / kill.


## Local default 24/08 ~19:22 ART — GO owner Full access

1. Mudou só DSH_HOME user layer: `~/.xneog-harness/settings.yaml` → `permission.defaultPreset: danger-full-access` (RPC `settings.mutate`, applies **live**).
2. NÃO mudou: env `DSH_PERMISSION_MODE` (continua unset no PID 79836), composition `defaultPreset` (base ainda `workspace-write`), launchd, git.
3. Restart 3081: **não**. Tailscale 826 vivo.
4. Voltar pra yellow (live): `settings.mutate` ns=permission ops=`[{op:set,path:[defaultPreset],value:yellow}]` — ou `unset` o campo pra cair no base `workspace-write`.
5. NÃO commitar `settings.yaml`. NÃO push. NÃO plist.


## JSDoc gate fix 30/08 ~17:00 ART — sessão xneog

- Gate `verify-export-jsdoc` falhou em `isRedTool` (faltava `@param`/`@returns`) → JSDoc adicionado em `packages/interaction/permission-presets/src/index.ts`.
- Catalog regenerado (`pnpm run gen-cordis-catalog`): `docs/subsystems/permission-presets.md` (+ `.i18n.yaml`/`.zh.md`) e `packages/extensions/tool-cordis/src/api-catalog.ts` reescritos.
- Resultado: spec de catalog `typert/generator` verde; suite full = 805/816 files green. Restam 3 files (10 tests) **não causados pela branch**: `scripts/ci-workflow.spec.ts` (8, ENOENT de 4 workflow YAMLs que nunca foram commitados — só `pages.yml` é tracked), `process-exit.spec.ts` e `hmr-config.spec.ts` (timing flakes sob carga da suite full; passam em run isolado; diff da branch em `app-boot/src/index.ts` é só comentário JSDoc).
