---
objective: "1ª tela: lista/header = gente, sem UUID. Source only. Live intacto."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2105-sidebar-gente.md"
evidence: "Edits em SessionsListView.swift + SessionChatView.swift. Sem xcodebuild/sign/commit. session-f144e35e não tocada. Origin reportado, sem push."
status: done
blockers: "Binário 0.2.1 ainda é o antigo até o owner buildar. Sem model no session.list — pessoa cai no user do cwd (erck)."
next_action: "Owner builda no Xcode quando quiser ver. Sem install daqui."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/Projects/XNeogHarness
preset: yellow
---

# OUT — sidebar gente

## Files
- `Sources/Views/Features/SessionsListView.swift` — row = pessoa + título; sem glass; busca "conversas"; alerts sem UUID
- `Sources/Views/Features/SessionChatView.swift` — header + navSubtitle = pessoa / título, sem session id

## DoD
- Lista: avatar (`XnTeammateAvatar`) + nome da pessoa + preview do título. Sem id.
- Pessoa = `projections.model` se vier; senão user do cwd (`/Users/erck/...` → erck). Sem roster Grok.
- Header Mac e subtitle iOS: pessoa + título. UUID some.
- NavigationSplitView, SDK 26, sem UIKit/WKWebView, sem glass na row.

## Origin (report only)
https://github.com/gomes007-alt/XNeogHarness.git — sem push.

## Live
`session-f144e35e` não tocada. GPU/3081 não mexidos neste job.
