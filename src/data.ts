export interface Feature {
  icon: 'plugin' | 'profile' | 'web' | 'headless' | 'tools' | 'plan'
  title: string
  text: string
}

export const features: Feature[] = [
  {
    icon: 'plugin',
    title: 'Everything is a plugin',
    text: 'Tools, hooks, models, memory and even the agent loop are swappable Cordis plugins. Compose the harness you need instead of forking one.',
  },
  {
    icon: 'profile',
    title: 'Profiles & patch layers',
    text: 'A profile is an ordered stack of plugin bundles under your own cordis.patch.yml overrides — reproducible by construction.',
  },
  {
    icon: 'web',
    title: 'Browser UI',
    text: 'xneog web boots a React 18 + Vite 6 surface with hot client-plugin reload, served by the same plugin tree that runs the agent.',
  },
  {
    icon: 'headless',
    title: 'Headless runs',
    text: 'xneog --profile headless runs one fresh persisted session, prints the final answer and exits — perfect for CI and scripts.',
  },
  {
    icon: 'tools',
    title: 'Built-in tool belt',
    text: 'Subagents, workflows, goals, skills, MCP, sandboxed shells, filesystem and web tools, jobs and todos — all as plugins.',
  },
  {
    icon: 'plan',
    title: 'Plan mode & self-revision',
    text: 'Plan-first edits, goal-driven rounds and session projection make runs observable, composable and reversible.',
  },
]

export interface Layer {
  order: string
  name: string
  desc: string
  brand?: boolean
}

export const layers: Layer[] = [
  { order: 'root', name: 'empty root', desc: 'the harness starts from nothing' },
  { order: 'bundle 1..n', name: 'profile bundles', desc: 'each bundle patch applies in dsh.profile.bundles order' },
  { order: 'patch', name: 'profile cordis.patch.yml', desc: 'your per-profile override layer', brand: true },
  { order: 'patch', name: '$DSH_HOME/cordis.patch.yml', desc: 'the home-level override layer' },
  { order: 'flag', name: '--patch overlays', desc: 'one-off overlays passed on the command line' },
]

export interface Mode {
  command: string
  desc: string
}

export const modes: Mode[] = [
  { command: 'xneog --profile <name>', desc: 'Boot the named profile under $DSH_HOME/profiles/<name>.' },
  { command: 'xneog web', desc: 'Alias of --profile web — boots the browser UI.' },
  { command: 'xneog --profile headless "job"', desc: 'Run one fresh persisted session, print the final answer, exit.' },
  { command: 'xneog plugin --profile <name> <pnpm args>', desc: 'Manage a profile\u2019s plugins by forwarding to pnpm.' },
]
