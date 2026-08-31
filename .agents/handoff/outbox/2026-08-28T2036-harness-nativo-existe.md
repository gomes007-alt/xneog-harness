---
objective: "Confirmar app nativo XNeogHarness macOS+iOS já existe; sync = mesmo 3081 ao vivo"
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2036-harness-nativo-existe.md"
evidence: "3081 HTTP 200. host.describe cwd ~/xneog-harness model qwen3.8-27b-uncensored-q4 attachedSessions=5. session.list N=36. Mac app PID 66976 /Applications/XNeogHarness.app 0.2.1 (3) com.xneog.harness. iPhone 13 Pro 26C05D8C: com.xneog.harness.ios 0.2.1 (3). Src ~/Projects/XNeogHarness dirty, HEAD 92e25bd 20/08."
status: done
blockers: "Tree suja de propósito (sem commit). Session f853fcca goal UI/UX complete, 294k ctx — não retomar. Qwen default dormindo no HF. Sem selectModel daqui."
next_action: "UX/loja partem de ~/Projects/XNeogHarness (existe). Sem scaffold ios/ novo. Sem wake GPU."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — nativo já existe, sync é o 3081

Corrige planos 2032/2034: não é greenfield.

## Apps (mesmo marketing 0.2.1 build 3)
| superfície | path / device | bundle | estado |
|---|---|---|---|
| macOS | `/Applications/XNeogHarness.app` (mtime 28/08 13:58) | `com.xneog.harness` | **rodando** PID 66976 |
| backup | `XNeogHarness.app.bak-2026-08-28` | same | 0.1.0 (1) 20/08 |
| iOS | iPhone 13 Pro `26C05D8C` | `com.xneog.harness.ios` | **instalado** 0.2.1 (3) |
| fonte | `~/Projects/XNeogHarness` | XcodeGen macOS+iOS+widget | dirty, HEAD 92e25bd 20/08 |

Não confundir: `xNeog.app` (Vorcaro 1.3) e WhatsAppHub 0.2.8 são outros produtos. XNeogLite 0.1.5 é outro app.

## Cérebro (RPC ao vivo, sem session nova)
- `host.describe`: version 0.0.1 · cwd `/Users/erck/xneog-harness` · provider `hf-qwen38-q4` · model `qwen3.8-27b-uncensored-q4` · 5 attached
- `session.list`: 36 sessions. Nenhuma `running` agora.
- Já se analisou sozinho: `session-f853fcca` título "inicie o app xneog", goal **complete** = UI/UX XNeogHarness no padrão Vorcaro-LiquidGlass. 27 turns / 256 steps / 294k tokens. **Não retomar.**

## Sync real-time (não é iCloud)
Uma fonte: gateway 3081. Os dois apps são clientes do mesmo host.
- Mac: `http://127.0.0.1:3081`
- iPhone: `https://macbook-air-de-cardoso.tail0360aa.ts.net:3080` (proxy TLS). 127.0.0.1 no phone = o phone.
- Push: WS `/api/events.mux` (session/event, approval, question, queue, projection)
- Pull: `session.list` + `session.history`
- `state.json` no device só guarda URL + lastSessionId. Chat mora no `DSH_HOME` do Mac.

## O que falta (do SYSTEM_PROMPT do projeto)
- Commit só se Gomes pedir
- settings/credentials/secrets = bloqueado
- Live Activity push = APNs, decisão
- selectModel no app muda default do host — não testar sem restaurar
- HF Qwen default está scaledToZero; volume = OR/DS

## Gates
Path `~/Projects/XNeogHarness` é fora do repo harness = RED pra mutate/sign/install. Leitura desta busca: GO do owner.
