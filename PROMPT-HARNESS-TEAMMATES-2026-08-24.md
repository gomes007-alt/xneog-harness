# Mission — xNeog harness × Grok Bot teammates (parallel subagents)

You are Claude Code on the owner Mac, cwd = this repo (`~/xneog-harness`).

## Outcome
Produce a short analysis (PT-BR ok) of how this harness + Grok Bot teammates should work together, and gaps vs our Mission Contract.

## Required inputs (read first)
1. `BRIEF-GROK-BOT-TEAMMATES-BEST-PRACTICES.md`
2. `MISSION-CONTRACT-HANDOFF.md`
3. Local harness docs: `AGENTS.md` / `CLAUDE.md`, `README.md`, `docs/` (skim relevant), `.agents/` if present

## Parallelize with subagents
Spin **at least 2–3 subagents in parallel**:
- A) Harness inventory: what this repo is, agents/skills/workflows, how ops are meant to run
- B) Teammates best practices: extract actionable rules from the BRIEF + public docs if useful (docs.x.ai/grok-bot, Cursor forum Grok Bot)
- C) Gap analysis: BRIEF + Mission Contract vs current harness/AGENTS.md — list concrete gaps and P0/P1 fixes

## Output artifact
Write: `OUT-HARNESS-TEAMMATES-GAP-2026-08-24.md` in this cwd with:
1. Context (5 lines)
2. What harness already covers
3. Gaps vs Mission Contract / teammates checklist (bullets)
4. Recommended next actions for Chief / Mac CLI / Research (no fan-out)
5. Sources (paths + URLs)

## Gates
- YELLOW: local read/analyze/write docs in this repo only
- RED: no send/publish/mutate/prod/App Store/codesign; no contacting people; no deleting teammates
- Do not interrupt other Claude sessions; do not touch Vorcaro-LiquidGlass unless read-only cross-ref is essential

When done, print a 8–12 line TLDR to stdout.
