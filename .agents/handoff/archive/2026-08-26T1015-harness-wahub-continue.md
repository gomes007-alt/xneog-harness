---
objective: "Continuar WhatsAppHub no harness: contexto 26/08 carregado. Owner mexe na session."
artifact: ""
evidence: "OUT observe 0956 + teste 1006. Hub 0.2.8 Mac+iOS. Conta 1. Lead 1F9D964F. iPhone 13 Pro launched 10:13."
status: queued
blockers: "1 reply cliente: texto pronto, SENT=nao (WebView). Sem 2o lead."
next_action: "Owner continua nesta session. Harness nao dispara 2o lead sozinho."
gates: YELLOW
owner_needed: true
from: owner
to: Harness
session_id: "session-d4e25220-75eb-4f09-bede-d400a26d21cc"
cwd: /Users/erck/xneog-harness
preset: yellow
---

# Mission Contract — continuar WAHub 26/08

## Outcome
Owner trabalha no harness com o estado de hoje. Sem reconstruir o chat Grok.

## Inputs
- OUT observe: `/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-26T0956-harness-wahub-observe.md`
- OUT teste: `/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-26T1006-harness-wahub-test.md`
- Repo app: `/Users/erck/Projects/WhatsAppHub/`
- App Mac: `/Applications/WhatsAppHub.app` v0.2.8 build 38 `com.xneog.whatsapphub`
- Dados: `~/Library/Application Support/WhatsAppHub/` (accounts.json, leads.json)
- DSH live: `~/xneog-harness` · `127.0.0.1:3081` PID 821 · Tailscale 842 · DSH_HOME `~/.xneog-harness`

## Output
Session viva com este briefing. Owner manda o proximo prompt.

## Frequency
one-shot (contexto). Proximo job so com 7 campos.

## DoD
Inbox escrito + session.create + prompt colado. Owner abre http://127.0.0.1:3081

## Constraints
- Conta cliente = Conta 1 id `8815F98D-8131-4ECE-AA38-6493E63CCE78`. Nao Ivi. Nao +55 13.
- Sem 2o lead, broadcast, autoflow, token dump, instalar coisa, misturar pessoal.
- Sem commit/push/TestFlight.
- Swarm: MiniMax/DeepSeek. Sem Anthropic em 3-wide. Nunca opus.
- RED: 2o confirm, publish, sign, spend, path fora do repo sem GO.

## Approval Gates
1a msg no lead 1F9D964F: owner confirma na UI do Hub. Harness nao confirma sozinho.

# Estado 26/08 (ART)

## Infra
- 3081 HTTP 200, cwd `~/xneog-harness`, launchd wrapper live.
- defaultPreset local = danger-full-access; job declara YELLOW.
- Session paralela ja existia: `session-9386f753` titulo "Dispare analise WhatsApp Hub iOS" cwd `/Users/erck` (nao e esta).

## Hub Mac
- Wrapper nativo + WKWebView (store UUID = id da conta). JS `web.whatsapp.com/send`. Sem CLI de confirm.
- URL: `whb://lead/<uuid>` abre thread; `whb://fila` filtro awaiting.
- Conta 1 selected, unread ~41. leads Conta 1 = 1103. awaitingReply 175. unread+lastFromLead 43.
- stage: nuevo 637 / calificacion 308 / instalacion 155 / activo 3.
- autoflow: shadowMode false, dailyCount 0, enabledAt em conta DELETADA. Nao ligar.

## Teste 1 lead (GO 10:05, HOLD era so Ivi)
- Lead `1F9D964F-4174-4C38-B529-A7712DE29F79` listRank=1 Conta 1.
- Mask `5493…8638` stage nuevo unread 1 awaitingReply lastFromLead lastTs 09:51.
- lastPreview: greeting 5G satelital (provavel CTWA, nao inbound digitado).
- Texto Fogg ES (1 pergunta): `Hola, me decís tu ciudad? Ahi te armo el proximo paso del 5G satelital.`
- `whb://lead/1F9D964F-…` aberto. Confirmacao via WebView recusada daqui. SENT=nao.

## iPhone 13 Pro Gomes
- Na rede. coredevice `26C05D8C`. WhatsAppHub 0.2.8 (38) ja instalado.
- Lancado ~10:13 via devicectl (Claude no Mac). Matriz Mac tambem aberta (espelho).
- Sem build/ipa/TestFlight desta lane.

## O que NAO fazer
2o lead. Fila 43. Autoflow. Token. Ivi. Push. Sign. Publish.
