---
objective: "Inventário YELLOW read-only de ~/Projects/XNeogHarness. 1 gap. Sem mutate."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2042-xneogharness-inventory.md"
evidence: "project.yml 0.2.1 (3). git HEAD 92e25bd = origin/main 20/08. dirty +757/−192 em 19 files + 6 untracked. Telas lidas em RootView/Settings/Composer. Sem session nova neste job."
status: done
blockers: "Tree suja de propósito. Path fora do repo harness = mutate/sign/install = RED. Plist iOS sem Foto usage string."
next_action: "GO YELLOW: 2 chaves NSPhotoLibrary*UsageDescription no Config/XNeogHarness-iOS-Info.plist (composer já usa PhotosUI). Sem sign, sem commit."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — inventário XNeogHarness

Só este app. Sem Hub / Vorcaro / Lite. Session live `f144e35e` não foi tocada neste job.

## Targets (XcodeGen)
| target | platform | bundle |
|---|---|---|
| XNeogHarness-macOS | macOS 26 | `com.xneog.harness` |
| XNeogHarness-iOS | iOS 26, iPhone+iPad | `com.xneog.harness.ios` |
| XNeogHarnessWidget | iOS extension | `com.xneog.harness.ios.widget` |
| XNeogHarnessTests | macOS unit | host = app Mac |

Marketing 0.2.1 / build 3. Swift 6. Kit: `../xNeogKit`. Schemes: `XNeogHarness`, `XNeogHarness-iOS`.

## Telas shipped
- Conexão: `SettingsView` (Mac = Settings Cmd-,; iOS = sheet, não aba). Rotas Tailscale / loopback / BFF.
- Sessões: `SessionsListView`. iOS = 1 Tab "Sessões" + split que vira stack.
- Chat: `SessionChatView` + composer (texto, voz, PhotosUI) + fila, goal, model picker, pending, subagents.
- Offline / sessão sumida / vazia = ContentUnavailableView com ação.

Sync: os dois bins falam com o mesmo 3081 (Mac loopback, iPhone Tailscale :3080) via RPC + WS mux. `state.json` só URL + lastSession.

## Dirty vs HEAD `92e25bd` (20/08, = origin/main)
+757 / −192 em 19 tracked. Untracked: `VoiceInput.swift` + 5 DesignSystem (BorderedGlass, StatusChip, TeammateAvatar, TimeFormat, WindowBackdrop). Sem commit (regra do projeto). Binários 0.2.1 no Mac e no 13 Pro = provavelmente este dirty, não o HEAD.

## Loja / UX — o que falta
1. Gap agora: composer já puxa PhotosUI e o plist iOS só tem mic + speech + Local Network. Sem `NSPhotoLibraryUsageDescription` / Add.
2. Sem commit/tag. Sem screenshots ASC. settings/credentials write bloqueado. Live Activity push = APNs. iOS 26 only.

## next_action
Duas strings de uso de Fotos no `Config/XNeogHarness-iOS-Info.plist`. YELLOW, 1 arquivo, sem sign, sem commit. Só com GO.
