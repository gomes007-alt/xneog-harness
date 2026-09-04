# Agent Note: Rebase the xneog fork on upstream dsh 0.1.3-alpha.1

Status: implemented

English | [中文](2026-09-04-rebase-fork-on-upstream-0.1.3.md.zh.md)

## Problem

Upstream advanced 229 commits past the fork's 0.1.2-rc.1 sync and tagged `dsh-v0.1.3-alpha.1`: session format v2 with adjacent v0→v1→v2 migrations, a background file-upload service, Windows child-window and drive-root hardening, a cross-process write-ownership lease for the JSONL backend, skill/slash-token web polish, and macOS x64 Python wheels. The fork's session logs (winserver, format v0) must keep reading through the new migration chain.

## Decision

Reapply the sync pipeline: whole-tree rebrand transform over upstream `d347e7039` (npm scope `@deepseek-ai/*` → `@xneog/dsh-*`, visible branding → xneog, repository URLs → `gomes007-alt/xneog-harness`, Harness home `~/.xneog-harness`), re-seal the frozen archive and translation records, then re-apply the fork's own deltas directly instead of cherry-picking the old commits, which had become empty against the moved upstream: the xneog placeholder mark (BrandMark renders the x, official-brand keeps the whale geometry itself, the hero swim morph and `FISH_LOGO_*` are replaced by the static mark with the CSS bob), the fork README statement, `SessionPersistence.delete` with the JSONL implementation and the workspace `deleteSession` (re-inserted beside the new lease code, with the operation-named unknown-session refusal), the `xneog web:` print and publish probe, and the CLI script aliases. Upstream's 0.1.3 CI workflows are kept (parity).

## Consequences

`main` is the rebranded upstream 0.1.3-alpha.1 plus the fork's deltas; released v0 session logs keep loading through the upstream adjacent-migration chain, so the winserver sessions survive the deployment upgrade unchanged. Each future upstream release repeats the same transform plus the same delta set.
