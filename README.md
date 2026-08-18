# xneog harness — landing page

A standalone marketing/landing page for [xneog harness](https://github.com/gomes007-alt/xneog-harness), built with the **same frontend stack** as the product's web UI and **the same design tokens** (brand palette, neutrals, and typography) extracted from `@xneog/dsh-client-ui-theme`.

> **Everything is a plugin.**

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 18.2 + react-dom |
| Language | TypeScript 6.x |
| Build / dev server | Vite 6 + `@vitejs/plugin-react` |
| Styling | Plain CSS with CSS custom-property design tokens (light + dark) |
| Deployment | Static `dist/` — ready for GitHub Pages |

## Getting started

Requires Node 18+ and a package manager (npm/pnpm/yarn).

```sh
cd xneog-harness-landing
npm install
npm run dev        # local dev server
npm run build      # type-check + produce dist/
npm run preview    # preview the production build
```

## Deploy to GitHub Pages

`vite.config.ts` sets `base: './'`, so the built `dist/` works from any path (including
`<user>.github.io/<repo>/`). Two common options:

1. **Manual** — run `npm run build` and push the `dist/` folder (or its contents) to the
   `gh-pages` branch.
2. **GitHub Actions** — add the standard `actions/deploy-pages` workflow that runs
   `npm ci && npm run build` and uploads `dist/` as the Pages artifact.

## Project structure

```
xneog-harness-landing/
├── index.html                 # entry shell + pre-paint theme script
├── package.json
├── vite.config.ts             # base './' for Pages-friendly asset URLs
├── tsconfig.json
└── src/
    ├── main.tsx
    ├── App.tsx                # page assembly
    ├── data.ts                # features / layers / entry-modes content
    ├── components/
    │   ├── Logo.tsx           # whale mark + wordmark
    │   ├── Nav.tsx
    │   ├── ThemeToggle.tsx    # light/dark via data-ds-dark-theme
    │   ├── Reveal.tsx         # scroll-in animation
    │   └── Terminal.tsx       # CLI showcase chrome
    ├── sections/
    │   ├── Hero.tsx
    │   ├── Features.tsx
    │   ├── HowItWorks.tsx
    │   ├── Showcase.tsx
    │   └── Footer.tsx
    └── styles/
        ├── tokens.css         # design tokens (mirrors dsh-client-ui-theme)
        └── app.css            # component styles
```

## Design tokens

The palette is lifted 1:1 from the harness theme so this page matches the product:

- Brand blue — `#4176e6` (`deepseek-500`), accents `#679efe` / `#5686fe`
- Bluish neutrals — `#ffffff` → `#151517` range (`neutral-bluish-*`)
- Fonts — system UI stack + `SF Mono`/`JetBrains Mono` code stack
- Easing — `cubic-bezier(0.4, 0, 0.2, 1)`

Dark mode is driven by the `data-ds-dark-theme` attribute on `<html>`, matching the harness's
own theme convention.
