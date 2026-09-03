# Agent Note: Rebase the xneog fork on upstream dsh master

Status: implemented

English | [中文](2026-09-03-rebase-fork-on-upstream-master.zh.md)

## Problem

The xneog fork sat on the upstream `deepseek-harness` snapshot of 2026-08-17 while upstream advanced to `dsh-v0.1.2-rc.1` (new webhook and experimental packages, SDK-serving profiles, snapshots/, locale-owned client UI copy, and the single-dsh-application-launcher rule). The fork had no shared history with upstream, so no merge or rebase could track it.

## Decision

Replay the fork on top of upstream. The upstream evolution patch (2026-08-17 → master) is applied to the fork snapshot with the whole-tree rebrand reapplied mechanically: npm scope `@deepseek-ai/*` → `@xneog/dsh-*` (CLI package `@xneog/dsh`), visible branding → xneog, repository URLs → `gomes007-alt/xneog-harness`, default Harness home `~/.xneog-harness`. The Python SDK keeps its upstream distribution names and console command; vendor origins and archived Agent Notes keep their factual upstream names; the frozen archive and every translation-pairing record are re-sealed for the rebranded snapshot. The fork's own 19 commits are replayed on top with `git rebase --rebase-merges`, adopting upstream content where the fork's change was already absorbed (repository URLs, deleteSession) and keeping the fork's intent where it still applies (README fork statement, xneog mark, web-app `xneog web:` print, CI trimmed to the Pages deploy, handset viewport fixes).

The fork's `deleteSession` feature is kept where upstream has no equivalent (workspace registry, apiproxy, client fakes) and adapted to the new persistence API: `SessionPersistence.delete(id)` is a service-level method the JSONL backend implements by removing the session's artifact directory, covered by the shared persistence contract.

The mark cleanup completes the fork's rebrand on files upstream added after the snapshot: `BrandMark` renders the fork's placeholder x instead of the inherited whale, the hero swim morph and its `FISH_LOGO_*` geometry are replaced by the static mark with the CSS bob, and `FishLogo` exports are gone. The official-brand package keeps the whale because its whole purpose is the DeepSeek identity.

## Consequences

`main` is a linear rebrand of upstream master plus the fork's own commits; each future upstream advance applies the same mechanical transform and conflicts only where upstream touches the brand lines the transform produced. The frozen archive manifest and translation sidecars were re-recorded in the sync commit, so the gates compare against the new snapshot instead of the pre-sync one.
