---
objective: "ANÁLISE ONLY WhatsApp Hub aberto no Mac (conta cliente). Sem send/auto."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-26T0956-harness-wahub-observe.md"
evidence: "3081 HTTP 200 PID 821 cwd ~/xneog-harness launchd loaded. WhatsAppHub.app 0.2.8 PID 3839 com.xneog.whatsapphub. accounts.json 1 conta. leads.json counts. WebKit store UUID=conta. Binary contém web.whatsapp.com/send. Screenshot display falhou (sem imagem). Sem token no OUT."
status: done
blockers: "screencapture: could not create image from display. Autoflow enabledAt numa conta JÁ deletada — não toquei."
next_action: "Owner GO: teste humano 1 lead (Conta 1, unread+lastFromLead). Harness só observa. Sem auto."
gates: YELLOW
from: Harness
to: Chief
cwd: /Users/erck/xneog-harness
preset: yellow
---

# OUT — WhatsApp Hub (observe only)

## O que o app é na tela (sem screenshot)
- App real: `/Applications/WhatsAppHub.app` v0.2.8 (build 38), bundle `com.xneog.whatsapphub`, PID **3839**, launchd `application.com.xneog.whatsapphub…`.
- **Não** é o WhatsApp oficial. É wrapper nativo + **WKWebView** (WebsiteDataStore UUID = id da conta) + JS que faz `location.href = 'https://web.whatsapp.com/send?phone='`.
- Bundle também liga **TDLib** (Telegram) e existe `whb_telegram.json` (chaves **não** copiadas). Hub ≠ Meta Cloud API.
- Screencapture da display falhou. Evidência = processo + plist + support files.

## Conta cliente (label, sem token)
- Selecionada: **Conta 1** · kind `whatsapp` · id `8815F98D-8131-4ECE-AA38-6493E63CCE78` · `unreadCount` **41**.
- `orderedIds` = só essa. `deletedIds` = 5 (leads órfãos de contas velhas ainda no `leads.json`).
- Lane pessoal Ivi/+55 13: **0 hits** nesse arquivo.

## Leads pendentes (visível no store, Conta 1)
- 1103 leads nessa conta. stage: nuevo 637 / calificacion 308 / instalacion 155 / activo 3.
- `awaitingReply` = **175**.
- `unread>0` = **43** (bate com unreadCount 41±).
- `unread>0` **e** `lastFromLead` = **43** (melhor proxy de “precisa reply agora”).
- `leads.json` total 1882 (inclui contas deletadas — não misturar).

## 3 alavancas reais vs RED
1. **GREEN/YELLOW:** Hub como dashboard de leitura (`awaitingReply` / unread). Harness lê counts, não envia.
2. **TESTE humano (next):** 1 lead da Conta 1 com unread+lastFromLead. Owner responde na UI. Harness observa o before/after no `leads.json`. Sem script de send.
3. **Legal/prod:** Cloud API + coexistência (não este wrapper).
   **RED agora:** `web.whatsapp.com/send`, autoflow (`shadowMode: false`, `enabledAt` numa conta já deletada; `dailyCount` 0), a11y-send, Baileys, auto 100%. Não liguei nada.

## Next — TESTE (não implementar)
GO owner: escolhe **1** dos 43 unread da Conta 1, responde **você**. Harness tira snapshot awaitingReply/unread antes e depois. Sem auto, sem 2º lead, sem Cloud mutate.
