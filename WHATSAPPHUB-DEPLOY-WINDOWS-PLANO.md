# WhatsAppHub — Plano de Deploy no Windows Cloud (matriz sem Mac)

Data: 2026-08-27 · Status: **PLANO (nada executado)** · Gate aberto: teste de IP da conta no cloud

## Objetivo
App iOS funciona sem o app macOS aberto: a "matriz" (sessão WA Web + executor) roda num servidor Windows cloud.

## Arquitetura atual (verificada no código, 27/ago)
- **CF Worker `whatsapphub-bridge`** — `~/Projects/WhatsAppHub/telegram/worker.js` (509 linhas).
  - WS `/ws/mac` — matriz autentica por header `x-whb-key` = `MAC_KEY` (constant-time).
  - WS `/ws/app` — app iOS com token de pareamento (emitido pelo Mac, entregue via iCloud KVS cifrado).
  - REST fallback: `POST /mac/sync` (leads), `GET /mac/req`, `GET /mac/cmd`, `POST /mac/ack`, `POST /mac/notify` (APNs).
  - KV = storage · E2E AES-GCM combined + HMAC por oid · secrets wrangler: `BOT_TOKEN`, `MAC_KEY` · vars: `OWNER_IDS`, `APP_TOKEN`.
  - 3º espelho: Telegram Mini App (`telegram/miniapp`, servido por `WorkerSync.swift` no Mac).
- **Mac = matriz** — WKWebView (`WhatsAppHub/Views/Web/WebViewContainer.swift`) roda `web.whatsapp.com` com bridge JS injetado (embutido como strings em `WhatsAppHub/Services/AccountBridgeScript.swift`).
  - "O Mac continua o ÚNICO escritor/executor" (comentário em `WorkerLive.swift`).
  - Loop de execução/sync no Swift: `WhatsAppHub/Services/WorkerSync.swift` + `WorkerLive.swift` (liveness: online só no 1º frame, ping 20s, reconecta no foreground).
- **iOS** — já fala direto com o Worker (não com o Mac). Fallback iCloud KVS quando WS cai.

Consequência: **o Worker não muda**. A matriz é só um cliente WS com MAC_KEY — quem a hospeda (Mac ou servidor) é indiferente ao resto.

## Alvo
```
iOS ──WS /ws/app──┐
TG MiniApp ───────┤── CF Worker (bridge, KV, E2E) ──WS /ws/mac── Servidor Windows (matriz)
Mac ──────────────┘   (sem mudança)                          └─ Chrome user-data-dir persistente + WA Web + bridge JS
                                                              └─ Executor Node/TS (protocolo Worker)
```

## Passos de execução

### Passo 0 — GATE: teste de IP (owner decide)
Conectar a conta WhatsApp **dentro do cloud** e observar:
- [ ] QR pareia e sessão mantém estável (dias) sem re-login.
- [ ] Nenhum sinal de BAN/suspensão com IP de datacenter.
- [ ] Latência aceitável do servidor → WhatsApp.
Se falhar: mitigar (residential proxy no Chrome, uso gradual, ou matriz num VPS com IP limpo).

### Passo 1 — Servidor: Chrome + WA Web + bridge JS
- [ ] Chrome com `user-data-dir` persistente (sessão sobrevive a reboot).
- [ ] Carregar `web.whatsapp.com`, parear por QR **exibido no app iOS** (fluxo de pareamento já existe).
- [ ] Extrair o bridge JS de `AccountBridgeScript.swift` (strings embutidas) para arquivo `.js` standalone injetável via puppeteer-core/playwright.
- [ ] Fingerprint: UA real, viewport normal, evitar `headless=true` puro (usar `--headless=new` ou headed com display virtual).

### Passo 2 — Executor Node/TS (único código novo)
Portar do Swift (`WorkerSync.swift` + loop de execução) um service Node que fale o MESMO protocolo:
- [ ] WS `/ws/mac` com `x-whb-key: MAC_KEY` (barramento primário; REST `/mac/req`+`/mac/cmd` só como fallback).
- [ ] `POST /mac/sync` com leads (E2E AES-GCM — mesma cripto do WorkerSync, `{t:...}` protocol).
- [ ] `GET /mac/req` → servir conversa ativa; `GET /mac/cmd` → executar openChat/sendCmd/crmCmd via bridge JS; `POST /mac/ack`.
- [ ] `POST /mac/notify` → APNs (mesmo caminho de hoje).
- [ ] Rodar como service no Windows (systemd-like: NSSM ou Task Scheduler + log).

### Passo 3 — Pareamento emitido pelo servidor
- [ ] Token de pareamento gerado/persistido pela matriz no servidor (hoje: Mac → iCloud KVS).
- [ ] iOS já consome o token do KVS — trocar a origem para o servidor escrever no mesmo KVS (mínimo) ou endpoint próprio (mais limpo).

### Passo 4 — Transição: Mac como fallback
- [ ] Single-writer: durante migração, só UMA matriz executa por conta (regra explícita, não os dois).
- [ ] Flag `macOffline` no iOS → renomear para "matriz offline" (semântica: a matriz, onde quer que esteja).
- [ ] Estável por N dias → Mac vira dev apenas.

## Riscos
| Risco | Mitigação |
|---|---|
| BAN por IP de datacenter (sessão não-oficial, DOM bridge) | Passo 0 é gate; perfil persistente; uso gradual; proxy residencial se preciso |
| Dois escritores no mesmo chat durante migração | Regra single-writer por conta (Passo 4) |
| Sessão WA Web morre no servidor | user-data-dir persistente + backup do perfil em disco/objeto |
| Bridge JS divergir do DOM 2026 (já é frágil) | Extrair para `.js` versionado; testar contra DOM atual antes do deploy |
| Executor Node divergir do comportamento Swift | Portar com testes contra o mesmo Worker (mesmo protocolo); Mac em paralelo compara |

## Abertos (precisa do owner)
1. Qual servidor Windows (o em teste hoje)? IP é datacenter ou residencial?
2. QR inicial: exibir no app iOS (recomendado) ou num endpoint web do servidor?
3. Backup do `user-data-dir`: onde (objeto storage, sync p/ Mac)?
4. Tempo de stable-required antes de aposentar o Mac como matriz.

## Evidência (arquivos-chave)
- `~/Projects/WhatsAppHub/telegram/worker.js` — Worker (protocolo completo).
- `~/Projects/WhatsAppHub/WhatsAppHub/Services/AccountBridgeScript.swift` — bridge JS embutido (extrair).
- `~/Projects/WhatsAppHub/WhatsAppHub/Services/WorkerSync.swift` — lógica Mac-side a portar.
- `~/Projects/WhatsAppHub/WhatsAppHub/Services/WorkerLive.swift` — cliente iOS WS (referência de protocolo/liveness).
- `~/Projects/WhatsAppHub/WhatsAppHub/Views/Web/WebViewContainer.swift` — WKWebView atual.
- `~/Projects/WhatsAppHub/telegram/wrangler.toml` — config do Worker.
