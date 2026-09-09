import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  assertDesktopHostPackageFiles,
  selectDesktopPackageClosure,
  type PackedDesktopPackage,
} from '../scripts/prepare-package-set.ts'

function packed(name: string, manifest: Record<string, unknown> = {}): PackedDesktopPackage {
  return { tarball: `${name}.tgz`, manifest: { name, version: '1.0.0', ...manifest } }
}

describe('desktop package-set selection', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('does not select a packaging target when imported as a library', async () => {
    vi.stubEnv('DSH_DESKTOP_TARGET_PLATFORM', 'linux')
    vi.stubEnv('DSH_DESKTOP_TARGET_ARCH', 'x64')
    vi.resetModules()
    await expect(import('../scripts/prepare-package-set.ts')).resolves.toHaveProperty('prepareDesktopPackageSet')
  })

  it('includes only the available internal production closure', () => {
    const available = new Map<string, PackedDesktopPackage>([
      ['@xneog/dsh', packed('@xneog/dsh', {
        dependencies: { '@xneog/dsh-base': '^1.0.0', external: '^2.0.0' },
        optionalDependencies: { '@xneog/platform-package': '1.0.0', '@xneog/missing-platform': '1.0.0' },
      })],
      ['@xneog/dsh-desktop-host', packed('@xneog/dsh-desktop-host', {
        dependencies: { '@xneog/dsh': '^1.0.0' },
      })],
      ['@xneog/dsh-base', packed('@xneog/dsh-base', {
        peerDependencies: { '@xneog/cordis': '^1.0.0' },
      })],
      ['@xneog/cordis', packed('@xneog/cordis')],
      ['@xneog/platform-package', packed('@xneog/platform-package')],
      ['@xneog/unused', packed('@xneog/unused')],
    ])
    expect(selectDesktopPackageClosure(available).map(entry => entry.manifest.name)).toEqual([
      '@xneog/cordis',
      '@xneog/dsh',
      '@xneog/dsh-base',
      '@xneog/dsh-desktop-host',
      '@xneog/platform-package',
    ])
  })

  it('rejects a required internal package absent from the packed release inputs', () => {
    const available = new Map<string, PackedDesktopPackage>([
      ['@xneog/dsh', packed('@xneog/dsh', {
        dependencies: { '@xneog/dsh-base': '^1.0.0' },
      })],
      ['@xneog/dsh-desktop-host', packed('@xneog/dsh-desktop-host', {
        dependencies: { '@xneog/dsh': '^1.0.0' },
      })],
    ])
    expect(() => selectDesktopPackageClosure(available)).toThrow(/unpacked internal package/u)
    expect(() => selectDesktopPackageClosure(new Map([
      ['@xneog/dsh', packed('@xneog/dsh')],
    ]))).toThrow(/omit @xneog\/dsh-desktop-host/u)
  })

  it('requires the Desktop Host entry and its packaged overlay', () => {
    const files = [
      'package/lib/index.js',
      'package/config/desktop.cordis.patch.yml',
    ]
    expect(() => {
      assertDesktopHostPackageFiles(files)
    }).not.toThrow()
    expect(() => {
      assertDesktopHostPackageFiles(files.slice(0, 1))
    }).toThrow(/desktop\.cordis\.patch\.yml/u)
    expect(() => {
      assertDesktopHostPackageFiles(files.slice(1))
    }).toThrow(/lib\/index\.js/u)
  })
})
