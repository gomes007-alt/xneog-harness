# Mac CLI hooks draft (answerer B)

**Status:** DRAFT · owner 24/08/2026 chose **hooks-claude-code + escalate (Grok/Terminal)** · Telegram deferred
**Do not** launchd / permanent cordis load / commit without GO.

## Paths
- `hooks.json` — this folder
- `scripts/pretool-red-ask.sh` — returns `permissionDecision: ask` + writes Desktop packet

## How the owner approves RED (3 lines)
1. Hook força **ask** no PreToolUse (RED matcher) e grava packet em `~/Desktop/mac-cli-red-packets/`.
2. Owner vê o card no **Grok Bot → Mac CLI** e/ou **Terminal** (`claude attach` / client ACP `session/request_permission`).
3. **Allow** = tool roda uma vez; **Deny** ou answerer offline = **fail-closed** (não executa).

## Load (só com GO)
```yaml
- dsh-hooks-claude-code:
    configPath: .agents/notes/proposed/process/mac-cli-hooks-draft/hooks.json
    projectDir: /Users/erck/xneog-harness
```
Plus ACP client that answers permissions + preset `workspace-write`+`ask`.
