#!/usr/bin/env bash
# DRAFT — Mac CLI RED escalate. Not loaded until owner GO.
set -euo pipefail
PACKET_DIR="${MAC_CLI_RED_PACKET_DIR:-$HOME/Desktop/mac-cli-red-packets}"
mkdir -p "$PACKET_DIR"
STAMP=$(date +%Y%m%d-%H%M%S)
PACKET_FILE="${PACKET_PATH:-$PACKET_DIR/RED-$STAMP.json}"
INPUT=$(cat || true)
export PACKET_FILE INPUT
/usr/bin/python3 << 'PY'
import json, os, datetime, sys
raw = os.environ.get("INPUT") or ""
tool = "?"
try:
    o = json.loads(raw)
    tool = o.get("tool_name") or o.get("toolName") or "?"
except Exception:
    pass
path = os.environ["PACKET_FILE"]
packet = {
    "gate": "RED",
    "at": datetime.datetime.now().isoformat(timespec="seconds"),
    "tool": tool,
    "rationale": "Mac CLI hooks-claude-code PreToolUse matched RED matcher — needs owner allow/deny",
    "evidence": "hooks-claude-code stdin; escalate = Grok Bot Mac CLI / Terminal ACP",
    "afterEffect": "Allow = tool runs once; Deny or no answerer = fail-closed",
    "howToApprove": [
        "1. Grok Bot → Mac CLI (ou Terminal: claude attach / ACP client)",
        "2. Abrir packet em ~/Desktop/mac-cli-red-packets/",
        "3. allow/deny no approval card (ACP session/request_permission)",
        "4. Sem answerer = deny",
    ],
    "rawInputPreview": raw[:2000],
}
with open(path, "w") as f:
    json.dump(packet, f, ensure_ascii=False, indent=2)
print(path, file=sys.stderr)
PY
echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"RED verb — approve via Grok Bot Mac CLI or Terminal ACP (packet on Desktop)"}}'
