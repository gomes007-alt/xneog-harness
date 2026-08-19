# Agent Note: Mobile-responsive web GUI — iPhone safe areas, dynamic viewport, and touch-target floor

Status: implemented

English | [中文](2026-08-18-mobile-responsive-web-gui.zh.md)

## Problem

The web GUI already had a working narrow-viewport skeleton (ui-layout auto-collapses the sidebar into the 56px rail below 1024px, and the column solver closes the details panel when the center would drop under 640px), but its presentation on iOS devices had four defects. First, iPhone edge-to-edge hardware was ignored: the shell viewport meta had no `viewport-fit=cover` and no component used `env(safe-area-inset-*)`, so the notch overlapped the sidebar rail top and the home indicator overlapped the composer bottom (landscape notch sides likewise). Second, every viewport-capped surface sized with `100vh` (menus, dialogs, lightbox) over-read the Safari URL-bar collapse, leaving tails cut or dead space. Third, several text fields rendered under 16px, so iOS Safari zoomed the page on focus. Fourth, several controls undershot the 44px HIG tap minimum: the composer attach (+) at 28px, back-to-bottom at 34px, sidebar rail controls at 36px.

## Decision

Responsive device geometry is owned where each style lives; there is no new global sheet.

- The shell (`apps/web/index.html`) opts into edge-to-edge layout: `viewport-fit=cover` on the viewport meta plus light/dark `theme-color` metas.
- The shell global base (`packages/client/web/src/base.css`) owns the platform floor: the `html, body, #root` height chain upgrades to `100dvh` behind `@supports (height: 100dvh)`; `html` gets `-webkit-text-size-adjust: 100%`, `text-size-adjust: 100%`, and `-webkit-tap-highlight-color: transparent`; `html, body` get `overscroll-behavior: none`; and under `(pointer: coarse)` every clickable gets `touch-action: manipulation` while all text entries (`input` text/search/email/url/number/password/tel, `textarea`, `select`) are pinned to `font-size: 16px !important` — the `!important` is required because plugin sheets are runtime-injected after the shell sheets.
- Each feature module carries its own `@media (max-width: …)` safe-area insets and `(pointer: coarse)` touch sizes over its local classes: sidebar root and rail (`ui-sidebar` SidebarRoot), composer root and attach control (`ui-conversation` InputBar), transcript scroll padding and back-to-bottom (`ui-conversation` ChatView), question and plan-review frames (`ui-user-questions`), toast position (`ui-primitives` Toast), image lightbox frame and close (`ui-attachment` ImageLightbox).
- Viewport-capped menus and dialogs upgrade `100vh` → `100dvh` behind `@supports (height: 100dvh)` at each site (Menu scrollable, model-select menu, subagent catalog menu, onboarding modal content, lightbox image); this follows the existing RiskConfirmation `@supports` pattern.
- Handset dialogs soften `border-radius` 24px → 20px (`ui-primitives` Modal).

## Alternatives considered

- **A single global responsive sheet targeting hashed module classes** — rejected: CSS Modules hash per bundler (shell Vite `_name_hash_n`, plugin tsdown `<bundle-hash>_<name>`), so a cross-package global sheet cannot address component classes portably; each rule must live where its class is declared. (A hashed override layer was used once as a live-dist validation vehicle before this port; it is not a maintainable source artifact.)
- **A layout-wide mobile transformation (bottom navigation, drawer sidebar)** — rejected as an unrequested product change: the existing rail + auto-collapse already yields a working narrow layout; this note fixes device geometry, not information architecture.
- **`user-scalable=no` to stop the focus zoom** — rejected on accessibility grounds: the 16px font floor stops the zoom without removing pinch zoom.
- **Global `!important` everywhere** — rejected: source-side rules sit in the declaring module where they win by cascade order; the only `!important` is the coarse-pointer font floor in the shell base, which must outrank later-injected plugin sheets.

## Consequences

- No new global stylesheet is introduced: the plugin CSS isolation invariant (bundle-inlined `<style data-plugin=…>`) is preserved, and safe-area rules remain per-component.
- The safe-area rules depend on the shell's `viewport-fit=cover`; a shell without it reports zero insets and degrades to the prior behavior.
- The 16px coarse-pointer floor enlarges small field text (e.g. 13px search and goal-objective inputs) on touch devices; accepted as the cost of the zoom guarantee.
- The 44px rail controls consume the full 56px rail width; hover-reveal affordances remain untouched.
- Verification: the rules were first validated live as a dist-level override layer against the running GUI, then ported rule-by-rule into the owning modules; the change is CSS/meta only, so `test:gui` behavior coverage is unaffected and the assembled-browser pass belongs to the web test tier.
