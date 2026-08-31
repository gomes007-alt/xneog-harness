---
objective: "Default LOCAL sessions novas = danger-full-access (DSH_HOME settings)"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-24T1924-harness-local-full-default.md"
evidence: "settings.describe user.defaultPreset=danger-full-access applies=live; note proposed 5 linhas; PID 79836 intacto; Tailscale 826 vivo; DSH_PERMISSION_MODE unset"
status: done
blockers: ""
next_action: "Owner: sessions novas já nascem Full access. Undo = mutate yellow ou unset."
gates: RED-GO-OWNER
owner_needed: false
from: Harness
to: Chief
session_id: ""
cwd: /Users/erck/xneog-harness
preset: danger-full-access
---

# OUT — default local Full access

## O que mudou
- **defaultPreset** (DSH_HOME user layer): `workspace-write` → `danger-full-access` via `settings.mutate` (revision 1, applies **live**).
- **env `DSH_PERMISSION_MODE`**: não setado (processo 79836 continua sem essa var). O default de session nova vem do settings, não do env.
- **composition** `packages/bundle/base/cordis.patch.yml` `defaultPreset`: intacto (`workspace-write`). Sem leftover no repo pra este job.

## Restart
- **Não**. `applies: live`. PID 3081 ainda **79836**. Tailscale proxy **826** vivo.

## Como o owner desfaz
1. UI Settings → Permission default → `yellow` (ou `workspace-write`).
2. Ou RPC: `settings.mutate` ns=`permission` ops=`[{"op":"set","path":["defaultPreset"],"value":"yellow"}]`.
3. Ou `unset` `defaultPreset` no user layer → volta ao base `workspace-write`.
4. Sem restart. Sem git. Sem launchd.

Note: `.agents/notes/proposed/feature/2026-08-24-permission-presets-green-yellow-red.md` § Local default.
