---
objective: "Wrapper launchd permanente: reboot sobe ~/xneog-harness"
artifact: "/Users/erck/.local/bin/xneog-harness-web"
evidence: "which=/Users/erck/.local/bin/xneog-harness-web; cd \"$HOME/xneog-harness\"; plist ProgramArguments=esse binary KeepAlive+RunAtLoad; launchctl print vazia (job booted out); HTTP 200; PID 3261 cwd ~/xneog-harness"
status: done
blockers: "launchctl print gui/501/com.xneog.harness-web = service not found (booted out de propósito). Plist sem WorkingDirectory — cwd vem do wrapper."
next_action: "Não kickstart agora (3261 segura 3081). Próximo reboot RunAtLoad usa o wrapper novo. Sem push."
gates: GREEN-done
from: Harness
to: Chief
---

# OUT — launchd wrapper → xneog-harness

- Artifact: `/Users/erck/.local/bin/xneog-harness-web` (522 B, 23:52 ART). Backup `.bak-20260824`.
- Evidence: `which` = mesmo path. `head` linha 8 `cd "$HOME/xneog-harness"`. Plist `ProgramArguments[0]` = esse binary; KeepAlive true; **não editado**. HTTP 200. PID **3261** cwd `/Users/erck/xneog-harness`. Proxy 1514 vivo.
- Next: reboot futuro sobe o live. Kickstart agora = EADDRINUSE vs 3261.
- Gates: sem push, sem plist, sem kickstart, sem mexer `~/xneog`.
