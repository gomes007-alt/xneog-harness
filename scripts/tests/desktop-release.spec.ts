/** Scheduling policy for the manual Desktop release lane. */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { load } from 'js-yaml'
import { describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '../..')

interface Step {
  name?: string
  if?: string | boolean
  env?: Record<string, string>
  run?: string
  uses?: string
  with?: Record<string, unknown>
}

interface Job {
  'runs-on'?: string
  environment?: string | Record<string, unknown>
  permissions?: Record<string, string>
  strategy?: { 'fail-fast'?: boolean; matrix?: { include?: Record<string, string>[] } }
  steps?: Step[]
}

interface Workflow {
  on: Record<string, unknown>
  permissions?: Record<string, string>
  concurrency?: Record<string, unknown>
  jobs: Record<string, Job>
}

function workflow(): Workflow {
  return load(readFileSync(resolve(root, '.github/workflows/desktop-release.yml'), 'utf8')) as Workflow
}

function packageJob(): Job {
  const job = workflow().jobs['package']
  if (job === undefined) throw new Error('desktop-release.yml must define the package job')
  return job
}

function step(name: string): Step {
  const found = (packageJob().steps ?? []).find(candidate => candidate.name === name)
  if (found === undefined) throw new Error(`desktop-release.yml must define the ${JSON.stringify(name)} step`)
  return found
}

describe('desktop release lane', () => {
  it('is manual-only and never cancels a running publication', () => {
    const release = workflow()
    expect(Object.keys(release.on)).toEqual(['workflow_dispatch'])
    expect(release.on['workflow_dispatch']).toMatchObject({
      inputs: { upload: { type: 'boolean', default: false, required: true } },
    })
    expect(release.concurrency).toMatchObject({ 'cancel-in-progress': false })
    expect(release.permissions).toEqual({ contents: 'read' })
  })

  it('packages every supported target on its native runner without cancelling siblings', () => {
    const job = packageJob()
    expect(job['runs-on']).toBe('${{ matrix.runner }}')
    expect(job.environment).toBe('desktop-release')
    expect(job.strategy?.['fail-fast']).toBe(false)
    expect(job.strategy?.matrix?.include).toEqual([
      { target: 'mac-arm64', runner: 'macos-latest' },
      { target: 'mac-x64', runner: 'macos-15-intel' },
      { target: 'win-x64', runner: 'windows-2025' },
    ])
  })

  it('refuses to advertise a dsh version npm has not published', () => {
    expect(step('Require the dsh version on npm').run).toContain('npm view "@xneog/dsh@${version}"')
  })

  it('packages with the fixed target command and uploads only on the gated input', () => {
    expect(step('Package target').run).toBe('pnpm run package:desktop:${{ matrix.target }}')
    const upload = step('Upload target to the update origin')
    expect(upload.if).toBe('inputs.upload')
    expect(upload.run).toBe('pnpm run upload:${{ matrix.target }}')
  })

  it('passes signing material and the production destination from environment secrets and variables', () => {
    const packageEnv = step('Package target').env ?? {}
    expect(packageEnv).toMatchObject({
      DSH_DESKTOP_APP_ID: '${{ vars.DSH_DESKTOP_APP_ID }}',
      DOWNLOAD_PROD_ORIGIN: '${{ vars.DOWNLOAD_PROD_ORIGIN }}',
      DSH_DESKTOP_MACOS_SIGNING_IDENTITY: '${{ secrets.DSH_DESKTOP_MACOS_SIGNING_IDENTITY }}',
      DSH_DESKTOP_MACOS_TEAM_ID: '${{ secrets.DSH_DESKTOP_MACOS_TEAM_ID }}',
      DSH_DESKTOP_WINDOWS_CER_FILE: '${{ secrets.DSH_DESKTOP_WINDOWS_CER_FILE }}',
      DSH_DESKTOP_WINDOWS_TOKEN_PIN: '${{ secrets.DSH_DESKTOP_WINDOWS_TOKEN_PIN }}',
    })
    expect(step('Upload target to the update origin').env).toMatchObject({
      DOWNLOAD_PROD_ORIGIN: '${{ vars.DOWNLOAD_PROD_ORIGIN }}',
      DOWNLOAD_PROD_COS_BUCKET: '${{ secrets.DOWNLOAD_PROD_COS_BUCKET }}',
      DOWNLOAD_PROD_COS_SECRET_ID: '${{ secrets.DOWNLOAD_PROD_COS_SECRET_ID }}',
      DOWNLOAD_PROD_COS_SECRET_KEY: '${{ secrets.DOWNLOAD_PROD_COS_SECRET_KEY }}',
    })
  })

  it('writes the App Store Connect key to a runner path before macOS packaging', () => {
    const key = step('Write App Store Connect API key')
    expect(key.if).toBe("runner.os == 'macOS'")
    expect(key.run).toContain('APPLE_API_KEY=$key_path')
  })
})
