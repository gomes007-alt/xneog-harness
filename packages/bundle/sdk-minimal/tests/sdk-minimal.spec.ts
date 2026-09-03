/** The standalone SDK-minimal bundle's complete declared Cordis tree. */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as yaml from 'js-yaml'
import { describe, expect, it } from 'vitest'
import { entryListSchema } from '@xneog/cordis-plugin-include'

function packageName(specifier: string): string {
  return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]!
}

describe('dsh-sdk-minimal bundle', () => {
  it('declares one standalone allowlisted tree with every row dependency', () => {
    const root = fileURLToPath(new URL('..', import.meta.url))
    const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
      dsh?: { bundle?: { patch?: string } }
    }
    expect(manifest.dsh?.bundle?.patch).toBe('./cordis.patch.yml')
    const patches = yaml.load(
      readFileSync(resolve(root, manifest.dsh!.bundle!.patch!), 'utf8'),
      { schema: entryListSchema },
    ) as Array<{ insert?: Array<{ id?: string; inject?: string[]; name?: string; config?: Record<string, unknown>; disabled?: unknown }> }>
    expect(patches).toHaveLength(1)
    const rows = patches[0]?.insert ?? []
    expect(rows.map(row => [row.id, row.name])).toEqual([
      ['sdk-app-startup', '@xneog/dsh-sdk-app'],
      ['sdk-jsonrpc-server', '@xneog/dsh-sdk-jsonrpc-server'],
      ['deepseek-llm-api-extensions', '@xneog/dsh-deepseek-llm-api-extensions'],
      ['session-log-deepseek', '@xneog/dsh-session-log-deepseek'],
      ['plugin-package-inventory-deepseek', '@xneog/dsh-plugin-package-inventory-deepseek'],
      ['llm-deepseek', '@xneog/dsh-llm-deepseek'],
      ['sandbox', '@xneog/dsh-sandbox-local'],
      ['session-projection', '@xneog/dsh-session-projection'],
      ['sandbox-policy', '@xneog/dsh-sandbox-policy'],
      ['subprocess', '@xneog/dsh-subprocess-local'],
      ['pty', '@xneog/dsh-terminal'],
      ['terminal-bash', '@xneog/dsh-terminal-bash'],
      ['terminal-pwsh', '@xneog/dsh-terminal-bash'],
      ['fs-local', '@xneog/dsh-fs-local'],
      ['timer', '@xneog/cordis-plugin-timer'],
      ['llm', '@xneog/dsh-llm'],
      ['session', '@xneog/dsh-session'],
      ['session-title', '@xneog/dsh-session-title'],
      ['system-prompt', '@xneog/dsh-system-prompt'],
      ['tools', '@xneog/dsh-tools'],
      ['agent', '@xneog/dsh-agent'],
      ['llm-retry', '@xneog/dsh-llm-retry'],
      ['jobs', '@xneog/dsh-jobs-local'],
      ['invariants', '@xneog/dsh-invariants'],
      ['session-invariant', '@xneog/dsh-session/invariant'],
      ['agent-invariant', '@xneog/dsh-agent/invariant'],
      ['scope-invariant', '@xneog/dsh-scope/invariant'],
      ['agent-loop-invariant', '@xneog/dsh-agent-loop/invariant'],
      ['agent-loop', '@xneog/dsh-agent-loop'],
      ['persistent-bash', '@xneog/dsh-tool-bash-persistent'],
      ['persistent-pwsh', '@xneog/dsh-tool-pwsh-persistent'],
      ['str-replace-editor', '@xneog/dsh-tool-str-replace-editor'],
      ['sessions', '@xneog/dsh-session-persistence-jsonl'],
    ])
    expect(rows.find(row => row.id === 'sdk-app-startup')?.config).toEqual({ profile: 'sdk-minimal' })
    expect(rows.find(row => row.id === 'sdk-jsonrpc-server')).toMatchObject({
      inject: ['sdkAppStartup', 'loader'],
      config: { maxTokensAsSuccess: false },
    })
    expect(rows.find(row => row.id === 'llm-deepseek')?.config).toEqual({
      apiKeyEnv: 'DEEPSEEK_API_KEY',
      defaultContextWindow: { __jsExpr: 'Number(process.env.DSH_CONTEXT_WINDOW ?? 1000000)' },
      streamIdleTimeoutMs: 172800000,
    })
    expect(rows.find(row => row.id === 'system-prompt')?.config).toEqual({
      includeHarnessIdentity: false,
      includeRuntimeContext: false,
      persona: { __jsExpr: "process.env.DSH_SYSTEM_PROMPT ?? 'You are a helpful software engineer assistant.'" },
    })
    expect(rows.find(row => row.id === 'agent-loop')?.config).toEqual({ agents: [] })
    expect(rows.find(row => row.id === 'terminal-bash')).toMatchObject({
      disabled: { __jsExpr: "process.platform === 'win32'" },
    })
    expect(rows.find(row => row.id === 'terminal-pwsh')).toMatchObject({
      disabled: { __jsExpr: "process.platform !== 'win32'" },
      config: { shellDialect: 'pwsh', timeoutMs: 300000 },
    })
    expect(Object.keys(manifest.dependencies ?? {}).sort()).toEqual(
      [...new Set(rows.map(row => row.name).filter((name): name is string => name !== undefined).map(packageName))].sort(),
    )
  })
})
