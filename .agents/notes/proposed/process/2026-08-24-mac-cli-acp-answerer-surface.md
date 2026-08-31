# Mac CLI surface — ACP + answerer (owner decision 24/08/2026)

**Status:** proposed / YELLOW docs · **Owner GO:** superfície = **ACP + answerer** (não headless puro)
**Lane:** Mac CLI · **Board:** Chief
**Related:** `MISSION-CONTRACT-HANDOFF.md` §3–§4 · OUT gap `OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md` P0#2 · `@xneog/dsh-acp` · `@xneog/dsh-hooks-claude-code`

---

## 1. Decisão

| Opção | Owner |
|-------|--------|
| Headless puro (`xneog --profile headless`) | ❌ rejeitado — RED falha fechado sem answerer útil |
| **ACP + answerer real** | ✅ escolhido |
| Preset default Mac CLI | **`workspace-write` + `ask`** (já é default em `permission-presets`) |

## 2. Papel do Mac CLI (Mission Contract §4)

- **Outcome:** executar terminal/local no Mac do owner com boundary claro; devolver Artifact+Evidence.
- **Input:** HANDOFF do Chief / peer (ExternalShell / apps / Claude Code / harness local).
- **Output:** resultado de comando + paths; nunca mute/prod sem ok.
- **Aceite:** approval card real (answerer) em YELLOW/RED do harness; OS approval do Grok Bot ExternalShell continua separado.
- **Superfície programática:** spawn/attach via **ACP** (`packages/acp/acp`) — JSON-RPC stdio; `session/request_permission` resolve one-shot allow/reject.

## 3. Answerer — o que falta escolher (bloqueia implementação)

ACP sozinho resolve permission **só se o client** responde `session/request_permission`. Sem answerer humano, policy automática ou fail-closed.

| Candidato | Prós | Contras | Gap hoje |
|-----------|------|---------|----------|
| **A. Telegram notify + reply** | Owner no celular; fit com ops xNeog | Precisa bot/token + mapping session→chat; superfície nova | **Não há package Telegram** no harness (busca 24/08 vazia). Exige GO + desenho |
| **B. Hook `hooks-claude-code`** (`PreToolUse` → `ask`) | Já existe `@xneog/dsh-hooks-claude-code`; reusa dialecto CC | Hook roda no processo; “ask” ainda precisa de um canal que chegue no humano (UI / notify). Não substitui sozinho um answerer remoto | Package **existe**; falta `hooks.json` Mac CLI + canal de escalate pro owner |

**Decidido:** B (`hooks-claude-code` + escalate Grok/Terminal). Telegram deferred. Draft em `mac-cli-hooks-draft/`.

**DECISÃO OWNER (24/08 ~11:15 ART):** answerer = **B** — `hooks-claude-code` + escalate via **Grok Bot Mac CLI / Terminal**.
**Telegram:** deferred (não agora).

Draft hooks (não instalado): `.agents/notes/proposed/process/mac-cli-hooks-draft/`

## 4. Composição alvo (draft — código só com GO)

```yaml
# cordis.yml — profile mac-cli (ilustrativo)
plugins:
  - dsh-permission-presets:
      defaultPreset: workspace-write   # sandbox workspace-write + approval ask
  - dsh-acp:
      provider: …                      # rota modelo
      model: …
  - dsh-hooks-claude-code:             # opcional se owner escolher B
      configPath: ./.claude/hooks-mac-cli.json
```

- Default session: preset **`workspace-write`** (`workspace-write` + `ask`).
- Nunca default `danger-full-access` + `never` nesta lane.
- RED verbs: ver note `2026-08-24-permission-presets-green-yellow-red.md`.

## 5. Gates

| Ação | Nível |
|------|--------|
| Escrever/atualizar estas notes + Mission Contract §4 | YELLOW |
| Implementar package Telegram / mudar permission-presets código | RED → GO owner |
| commit/push/prod | RED |

## 6. Next

1. ~~Owner escolher A/B~~ → **B done**.
2. Owner GO pra load de teste do `mac-cli-hooks-draft/hooks.json` (ainda não permanente).
3. Spec mínima do client ACP que espera `request_permission` (1 página) — YELLOW.
4. Código presets G/Y/R + install permanente só com GO explícito.
