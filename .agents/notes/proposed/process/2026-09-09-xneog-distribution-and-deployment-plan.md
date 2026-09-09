# Agent Note: Complete distribution plan for the xneog open-source system

Status: proposed

English | [中文](2026-09-09-xneog-distribution-and-deployment-plan.zh.md)

## Problem

The fork now carries upstream dsh 0.1.5-alpha.2 with the xneog rebrand, and every release mechanism already exists somewhere: three npm sequences, a Python wheel train, a documentation site, a landing page, and a complete manual desktop packaging pipeline. What does not exist is one plan that says which artifact reaches which host, from which tag, with which credentials, in which order, and what remains fork-specific before the first public release. The gap is concrete in five places.

**The fork's public identity is only half wired.** The npm scope is `@xneog`, the repository is `gomes007-alt/xneog-harness`, the default branch is `main`, and the documentation site is expected at `https://xneog-harness.github.io/xneog-harness/`. The docs workflow still fixes `DOCS_REPOSITORY_REF: master` for projected source links, and the website base path defaults to `/` unless `DOCS_BASE` is set ([config.ts](../../../../website/.vitepress/config.ts)).

**Two workflows deploy the same GitHub Pages site.** [docs-pages.yml](../../../../.github/workflows/docs-pages.yml) deploys the documentation site from a `dsh-v*` tag under the `github-pages` concurrency group, while the fork's [pages.yml](../../../../.github/workflows/pages.yml) deploys `landing/` on every `main` push under a different group. GitHub serves one Pages site per repository, so the later deploy erases the other.

**Upstream endpoints are still shipped as defaults.** The base bundle points telemetry at `https://harness-telemetry.deepseeksvc.com/v1/logs` when `DSH_TELEMETRY_OTLP_URL` is unset ([cordis.patch.yml](../../../../packages/bundle/base/cordis.patch.yml)), and the desktop updater fixes its production origin at `https://download.deepseek.com` ([desktop-auto-update-environment.mjs](../../../../apps/desktop/scripts/desktop-auto-update-environment.mjs)). Both are distribution decisions for a fork, not implementation details.

**The desktop lane has no CI.** [apps/desktop/README.md](../../../../apps/desktop/README.md) documents and implements packaging, signing, notarization, channel metadata, and object-storage upload, but no workflow runs it; every target is a manual local command that needs platform-specific machines and secrets.

**The Python distribution names are upstream's.** [python/sdk/pyproject.toml](../../../../python/sdk/pyproject.toml) still publishes `deepseek-harness-sdk` and [python/sdk-runtime/pyproject.toml](../../../../python/sdk-runtime/pyproject.toml) publishes `deepseek-harness-runtime-bin`; public PyPI names are first-come and upstream owns both, so the fork cannot publish those names and must decide whether to rename, publish elsewhere, or not publish at all.

## Proposal

### 1. One table of record: artifact, tag, workflow, destination

| Surface | Artifact | Version baseline and tag | Workflow | Destination | Consumer path |
|---|---|---|---|---|---|
| dsh npm | `@xneog/dsh` plus the publishable `packages/*/*` and `apps/*` members | one family version, `dsh-v<version>` | [release.yml](../../../../.github/workflows/release.yml) packs, [release-publish.yml](../../../../.github/workflows/release-publish.yml) publishes | npmjs.com `@xneog` scope | `npm install -g @xneog/dsh`, `npx @xneog/dsh web` |
| vendor npm | the nine `vendor/*` Cordis packages | per package, `vendor-<package>-v<version>` | [release-vendor.yml](../../../../.github/workflows/release-vendor.yml) packs, [release-vendor-publish.yml](../../../../.github/workflows/release-vendor-publish.yml) publishes | npmjs.com | dependency of the dsh packages |
| native npm | `native/system/packages/*` | family version, `node-addon-system-v<version>` | [node-addon-system-release.yml](../../../../.github/workflows/node-addon-system-release.yml) | npmjs.com | optional platform dependency |
| Python SDK | `deepseek-harness-sdk` plus five runtime wheels | `python-v<version>` | [python-release.yml](../../../../.github/workflows/python-release.yml) | public PyPI, gated by the decision below | `pip install deepseek-harness-sdk` |
| documentation site | VitePress projection of `docs/` | released snapshot from `dsh-v*` | [docs-pages.yml](../../../../.github/workflows/docs-pages.yml) | GitHub Pages | browser |
| landing page | `landing/` | `main` | folded into the single Pages deploy below | the same GitHub Pages site | browser |
| desktop | signed installers plus update metadata | the dsh family version | manual `package:*` and `upload:*` targets, with the CI lane below | the fork's download origin and object-storage bucket | download from the site |
| source | the git repository | `main` | none | GitHub | `git clone` then `pnpm dsh web` |

The family dimension stays where it is today: [scripts/release/families.ts](../../../../scripts/release/families.ts) owns member discovery, version baseline, tag prefix, and publish order, and this plan adds no second place that branches on it.

### 2. Release order and the local/CI boundary

Each family keeps its own bump, pack, and publish. The plan fixes the cross-family order a complete release follows.

1. Bump locally with `pnpm release:dsh <version>`, commit the manifests and lockfile, and merge to `main`; the published version must be readable from the repository, so CI never writes it.
2. Tag `dsh-v<version>` and dispatch `release-publish.yml`; it packs that tag's tree, publishes in dependency order, and skips every version whose registry integrity already matches.
3. Only after the dsh family is published, tag and run the vendor sequence for changed packages, the native sequence when binaries changed, and the Python sequence when the SDK changed.
4. Run `docs-pages.yml` from the same `dsh-v*` tag so the site presents exactly the released snapshot.
5. Package and upload the desktop target for that same version last; the updater must never advertise a version the npm family has not published.
6. Create one GitHub Release per `dsh-v*` tag as the human-facing ledger: release notes, npm tarball digests, desktop artifact digests, and the documentation deploy link. No workflow creates a Release today, and this is the only new automation the plan adds.

### 3. Fork-specific work that must land before the first public release

**npm.** Create the `@xneog` scope and configure Trusted Publishing (OIDC) for the three publish workflows, or document the local [publish-npm-baseline.ts](../../../../scripts/publish-npm-baseline.ts) path as the supported fallback. No long-lived registry token belongs in the repository.

**Pages.** Fold `landing/` into the documentation build so exactly one workflow deploys one site whose root is the landing page and whose documentation subtree is the VitePress output, or host the landing in a separate repository or domain. Set `DOCS_BASE=/xneog-harness/` for the project page and delete the second Pages workflow.

**Endpoints.** Point the telemetry row at the fork's own collector or disable it by default, and replace the desktop production origin and `DSH_DESKTOP_APP_ID` with the fork's values. An open-source distribution must not phone an upstream host the user never configured.

**Python.** Either keep the upstream distribution names and do not publish them, or rename to `xneog-harness-sdk` and `xneog-harness-runtime-bin` and update the import module, the wire identity `serverInfo.name`, the lockstep runtime pin, and every documented command in the same change. The rename is the right end state only if the fork maintains the Python SDK as a first-class surface.

**Desktop.** Decide the channel policy (stable plus alpha), the download host, and the CI runner story: macOS arm64, macOS x64, and Windows x64 each need their own machine and signing material, and the packaging code already fails loud when they are absent.

### 4. Verification, provenance, and rollback

Every surface already verifies before upload. `release:verify` rejects a dispatch that is not from the family's tag, `release:verify-packed-install` drives the installed executable, the Python workflow verifies filenames, metadata, size limits, and SHA-256 sums, and the desktop upload requires a completion record matching environment, target, public URL, and version. The plan keeps those and adds three things.

- **Provenance:** npm provenance attestation on the three publish jobs, using the same OIDC identity that Trusted Publishing already provides.
- **A ledger:** every Release body lists the published version and digest of every surface, so a yank decision is auditable after the fact.
- **A rollback rule per registry:** npm deprecates (versions are immutable), PyPI yanks (files are immutable), Pages redeploys the previous tag, and desktop re-uploads the previous channel metadata; historical desktop objects are never deleted.

## Alternatives considered

**One pipeline for all four artifact families.** Rejected: the families differ in version baseline, build machine, and change rate, so a shared pipeline would republish unchanged vendor and native packages on every product release. [Private npm publication as three independent sequences](../../implemented/process/2026-08-10-npm-release-sequences.md) records why they were split and remains authoritative for their internals.

**Publish every surface from one release tag.** Rejected: the vendor and native sequences publish per-package versions that move independently, and the Python tag spelling already differs, so one tag cannot name them.

**GitHub Releases as the primary channel.** Rejected: the paths users actually run are npm, pip, and a browser; a Release archive would add a fourth artifact to verify without replacing any of them. It stays the human-facing ledger.

**Rename the Python distributions now.** Deferred rather than rejected: the rename is correct for a first-class fork SDK, but it touches the import module, the wire identity, the lockstep runtime pin, and every document. The plan gates the Python surface on that decision instead of shipping upstream's names.

## Acceptance criteria

- A single `main` tree passes `pnpm run check:ci:static`, `pnpm run build`, and the desktop packaging tests for the host platform.
- Exactly one workflow deploys the GitHub Pages site, and a fresh clone builds the site with `DOCS_BASE` set for the project page.
- No shipped default points at a `deepseek.com` or `deepseeksvc.com` host, except the LLM API endpoints a user configures with their own key.
- Each of the four registries publishes from a tag by a dispatch workflow using OIDC credentials, with no long-lived token in the repository, and every publish run is idempotent on re-run.
- One GitHub Release per `dsh-v*` tag names every published version and digest.
- A rollback exercise completes for each registry without deleting immutable history: npm deprecate, PyPI yank, Pages redeploy, desktop metadata revert.
- `npm install -g @xneog/dsh`, `npx @xneog/dsh web`, the documented Python path, and the desktop download each succeed from a clean machine using only published artifacts.

## Risks

**Publishing the wrong tree.** A tag can point at a commit whose version does not match; `release:verify` and the version-coherence gate catch that, and the plan makes the bump-then-merge-then-tag order mandatory rather than conventional.

**Fork identity drift.** The rebrand is a transform, so a future upstream sync can reintroduce an upstream host or name; the transform rule set and the endpoint checks must change together, which is why the endpoint defaults are acceptance criteria rather than cleanup.

**Desktop cost and cadence.** Three signing and notarization targets per release need paid accounts and dedicated machines. Until the CI lane exists, desktop releases stay manual and can lag the npm family, so the updater channel metadata must never point at an unpublished version.

**Python ambiguity.** Leaving upstream names on public PyPI is not an option, so the surface stays unpublished until the rename decision lands; TypeScript consumers are unaffected, and Python users keep the source install documented in [INSTALL.md](../../../../INSTALL.md).
