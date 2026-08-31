---
objective: "Plano: client iOS NATIVO do xneog-harness (não Hub). Modelo live barato → UI simples → loja só após GO."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T2034-plano-harness-ios-nativo.md"
evidence: "Repo ~/xneog-harness: apps/ = cli+web. native/ = landlock-run (Linux). Zero .swift/.xcodeproj. 3081 web live. HF Qwen scaledToZero. leftover paused. 13 Pro já é device de deploy."
status: done
blockers: "App nativo ainda não existe. Sign/TestFlight/ASC = RED. Sem GO não crio ios/ nem Xcode."
next_action: "Esperar GO escrito pra scaffold ios/ DENTRO do repo (YELLOW). Sem GPU. Sem loja."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# PLANO — xNeog harness iOS nativo

Corrige OUT 2032: o produto NÃO é WhatsAppHub. É um client Swift/SwiftUI do harness, falando com 3081.

## O que existe
- Cérebro: `~/xneog-harness` · 127.0.0.1:3081 · Tailscale 100.108.219.103:3081
- UI hoje: `apps/web` (Vite). CLI em `apps/cli`.
- `native/` = landlock Linux, não iOS.
- Zero Swift no repo. App nativo = greenfield.
- Device: iPhone 13 Pro (já usado no Hub). Sem isso a loja não fecha.

## Outcome
App nativo no 13 Pro: lista sessions, 1 chat ao vivo, 1 modelo barato, G/Y/R visível. Simples. Depois TestFlight. App Store só com UI aprovada + zeroone.

## Fase 0 — modelo ao vivo no Mac (prova do cano)
Não precisa do app nativo pra provar o modelo.
- 3081 + MiniMax M3 pago (teto US$1). Qwen L40S dorme. DS hoje peak (22h) = não.
- 1 session nova, pack 1843, 1 OUT. Prova: prompt → token → resposta no web.
- Sem isso, iOS só mostra tela vazia.

## Fase 1 — MVP nativo (YELLOW, pasta `ios/` DENTRO do repo)
3 telas, nada mais:
1. Conectar (host 3081, Tailscale ou LAN). Sem senha no chat.
2. Sessions (lista + criar).
3. Chat (1 thread, stream, stop). Preset yellow. Sem danger-full.

Fora do MVP: plugins, swarm UI, settings.yaml edit, Ads, Hub, Ivi.

Stack: SwiftUI, iOS 17+, fala HTTP/RPC que o web já usa. Sem WKWebView-wrapper como produto (pode ser fallback de 1 sprint, não a loja).

Quem mexe: Harness/Mac CLI só em `~/xneog-harness/ios`. Sign/run no 13 Pro = RED (owner no Xcode).

## Fase 2 — UI/UX até “fácil”
Checklist loja (owner aprova na mão):
- Abrir → conectar em <3 toques
- Ver sessions
- Mandar 1 msg e ver stream
- Parar
- Voltar sem perder o thread
- PT-BR, 1 ação primária por tela, Dynamic Type, Dark

ROI: cada sprint fecha 1 caminho. Token só se o caminho quebrar ou o copy mudar.

## Fase 3 — device → TestFlight → loja (RED)
- Xcode no 13 Pro (wireless já existe).
- TestFlight interno: zeroone + GO.
- ASC submit: zeroone + owner. Harness não submete, não assina, não publica.
- Bundle id / team / certificados: owner. Não inventar daqui.

## Custo
| cano | uso | teto |
|---|---|---|
| MiniMax OR pago | live + copy UX | US$1 / fase |
| DS oficial 0731 | off-peak cache-hit | não em peak 22h–1h / 3h–7h ART |
| Qwen HF L40S | só se owner acordar | US$1.80/h — default não |
| Anthropic | fora | — |

HF leftover `…-lrl` já paused. Principal scaledToZero.

## Gates
- GREEN: este plano, spec de 3 telas.
- YELLOW: `ios/` no repo, checklist, session 3081 MiniMax.
- RED: sign, run no device, TestFlight, ASC, push, path fora do repo, wake GPU, yaml dois canos.

## Definition of Done (próximo passo real)
GO escrito → spec 1 página das 3 telas no outbox → scaffold `ios/` no repo. Sem device. Sem loja.
