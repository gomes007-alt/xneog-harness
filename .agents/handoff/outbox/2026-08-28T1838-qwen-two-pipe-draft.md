---
objective: "Draft YELLOW roteamento dois canos (oficial 0731 + OR MiniMax pago). Sem aplicar."
artifact: "/Users/erck/xneog-harness/.agents/handoff/outbox/2026-08-28T1838-qwen-two-pipe-draft.md"
evidence: "session-ac8d86a3 turn 2 completed. slug qwen3.8-27b-uncensored-q4. 3081 HTTP 200 PID 64316. settings.yaml NÃO mutado. Sem :free/Anthropic/top-up."
status: done
blockers: "Provider DeepSeek oficial ainda não existe no yaml — snippet é draft. ctx 0731 1.3M veio do OR live; confirmar na api-docs antes de colar."
next_action: "Chief/owner review. Sem GO = não colar no settings. Não restart."
gates: YELLOW
from: Harness
to: Chief
session_id: "session-ac8d86a3-4172-40a8-b27f-215beb102bcb"
cwd: /Users/erck/xneog-harness
preset: yellow
model: "hf-qwen38-q4 / qwen3.8-27b-uncensored-q4"
---

# OUT — draft dois canos (NÃO aplicado)

Session `session-ac8d86a3` · `qwen3.8-27b-uncensored-q4` · 3081 HTTP 200. Default Qwen intacto.

## Snippet (draft)

```yaml
# DRAFT YELLOW — não colar sem review; não mutate; não restart
# agent-default-model FICA: hf-qwen38-q4 / qwen3.8-27b-uncensored-q4
llm-pi-ai:
  providers:
    # CANO A: DeepSeek OFICIAL flash 0731 — volume off-peak ART
    deepseek-official-flash:
      displayName: DeepSeek V4 Flash 0731 (oficial)
      apiKeyEnv: DEEPSEEK_API_KEY
      api: openai-completions
      baseURL: https://api.deepseek.com
      timeoutMs: 900000
      streamIdleTimeoutMs: 900000
      retryPolicy:
        mode: normal
        maxRetries: 4
        backoff:
          initialDelayMs: 15000
          maxDelayMs: 120000
      models:
        - id: deepseek-v4-flash-0731
          name: DeepSeek V4 Flash 0731
          contextWindow: 1300000
          maxTokens: 8192
    # CANO B: já existe — openrouter / minimax/minimax-m3 (PAGO, ~US$16.13)
    # minimax-m3:free FORA. Nada a colar no bloco openrouter.
```

## Quando usar qual cano

1. Peak ART 22h–1h e 3h–7h (seg–sex): evitar oficial (2x) — cano B (OR MiniMax M3 pago, flat).
2. Cache-hit alto + contexto longo + off-peak: cano A oficial (in 0.007/1M).
3. Cache-miss / sessão nova / contexto sem reuso: cano B (miss oficial 0.22/0.44; out 3.8x).
4. Failover: oficial fora → B; OR 402 → A só em off-peak.
5. Qwen 32k segue no default pra single-shot curto — `agent-default-model` não muda.

Sem :free. Sem Anthropic. Sem top-up OR. Sem restart.
