# Spec draft — ACP client Mac CLI (answerer B)

**Status:** proposed / YELLOW docs · 24/08/2026
**Lane:** Mac CLI · **Not:** load hooks default · launchd · commit leftover dirty
**Depends:** d846acf · @xneog/dsh-acp session/request_permission · answerer B hooks-claude-code + escalate Grok/Terminal

---

## 1. Outcome

Um client ACP (nao o server) no loop do owner: harness pede permissao, o card chega no Grok Bot Mac CLI e/ou Terminal, owner da allow/deny, client responde o one-shot. Sem answerer = fail-closed (deny).

## 2. Cadeia do card

1. Tool RED (Bash/Write/...) dispara hooks-claude-code PreToolUse (hooks-mac-cli.json, NAO default).
2. Hook devolve permissionDecision=ask e grava packet em Desktop/mac-cli-red-packets/.
3. ctx.approval (policy ask) sobe para dsh-acp session/request_permission { toolCallId, allow|reject }.
4. O CLIENT (esta spec) pinta o card; dsh-subagent-acp auto-policy NAO serve como answerer B.
5. Owner responde; client devolve allow ou reject.

## 3. Dois canais, um veredito

- Grok Bot Mac CLI: mensagem neste chat + packet no Desktop; owner escolhe allow/deny.
- Terminal: claude attach / TTY prompt; mesmo voto.
- Primeiro allow/deny valido ganha. Timeout ~10 min ou disconnect = reject.

## 4. Contrato minimo do client

1. Spawn/attach ACP server (demo:acp ou composition Mac CLI). Stdout = JSON-RPC.
2. initialize + session/new com cwd absoluto.
3. Em request_permission: nunca auto-allow. Encaminhar toolCallId, tool, rationale, evidence (path do packet), afterEffect.
4. Mapear allow to ACP allow; deny/timeout/offline to reject.
5. Logar veredito no session log, nao no model prompt.
6. Default preset workspace-write+ask. isRedTool forca ask. Nunca default danger-full-access+never.

## 5. Fora de escopo agora

- Ligar hooks-mac-cli.json na composition default
- launchd / Telegram
- Commit leftover dirty / push

## 6. DoD com GO de codigo

- Client recusa auto-allow em RED
- Card visivel Grok ou Terminal em <5s
- Deny/timeout = tool nao roda
- Sem double-allow nos dois canais
