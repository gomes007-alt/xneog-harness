# Agent Note: GUI tests pin the rebranded mark, wordmark, and owner copy

Status: implemented

English | [中文](2026-08-19-gui-tests-pin-rebranded-mark-and-copy.zh.md)

## Problem

Five `test:gui` failures on `main` pinned branding the fork inherited from upstream rather than what it ships: the `icons` spec asserted the removed whale glyph's 23.16×17.04 native ratio, the `welcome-notice` spec asserted the pre-rebrand English owner copy ("Harness developers" twice), and the three `ui-sidebar` snapshots pinned the inherited 182×24 wordmark and the whale in the collapsed rail. The shipped sources are the fork's own mark — a bold x in a 24×24 box whose comment says to replace it with the official xneog logomark when available — the 96×24 "xneog" wordmark, and English copy that matches the zh body ("developers", no "Harness"); `apps/web/public/favicon.svg` already carries the same x mark. The rebrand moved the sources ([documentation-site-navigation-and-chrome](../process/2026-08-12-documentation-site-navigation-and-chrome.md) documents the inherited DeepSeek mark) and left the tests behind.

## Decision

The three test surfaces now pin what the fork ships, each decided on its own evidence rather than by a bulk snapshot refresh:

- `icons.client.spec.tsx` asserts the mark's `d` attribute with whole-string equality — `M6 6 L18 18 M18 6 L6 18`, both diagonals of the x. A substring assertion matching only the first diagonal was proven weak: deleting the second diagonal from the source left the spec green. The negative guard `not.toContain('M0 0L23.16')` stays, so the whale path returning fails the spec.
- `welcome-notice.client.spec.tsx` pins the current English body verbatim, equal to `src/onboarding-copy.ts` and consistent with the zh body's "面向开发者" / "欢迎全球开发者".
- The `ui-sidebar` snapshots were re-recorded for that file only; the reviewed diff is limited to viewBox/width/height plus the serializer's svg content fingerprints.

## Alternatives considered

**Restore the whale glyph and the 182×24 wordmark to satisfy the tests.** Rejected: the placeholder comments, the favicon, and the zh owner copy all record the rebrand as deliberate; restoring the inherited mark would undo it.

**Bulk `vitest -u` over the repository.** Rejected: an unscoped re-record could hide unrelated churn. One owning snapshot file was re-recorded and its diff reviewed.

**Drop the negative guard against the whale path.** Rejected: it is the only tripwire that fails when the inherited mark returns, and it costs one assertion.

## Consequences

`npm run test:gui` is green (273 files, 3786 tests). When the official xneog logomark lands, its swap must update the `FishLogo` path pin and the sidebar snapshots together — the same three surfaces this change brought into agreement. Rebrand residue stays tracked separately: the `FishLogo` export name, the `railFish` CSS local, and the README's upstream attribution.

[AGENTS.md](../../../../AGENTS.md) requires tests to describe shipped behavior; this change brings the three lagging surfaces back under that rule.
