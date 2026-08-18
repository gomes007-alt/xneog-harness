import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base: './'` keeps asset URLs relative so the built dist/ can be served from
// any path — including GitHub Pages project sites such as
// gomes007-alt.github.io/<repo>/.
export default defineConfig({
  plugins: [react()],
  base: './',
})
