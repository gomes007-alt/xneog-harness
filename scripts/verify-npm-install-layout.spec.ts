import { describe, expect, it } from 'vitest'
import type { NpmPackageLock, RegistryIndex } from './benchmark-npm-resolution.ts'
import {
  assertDualDshInstallLayout,
  buildDualDshRegistry,
} from './verify-npm-install-layout.ts'

function validLayout(): NpmPackageLock {
  return {
    lockfileVersion: 3,
    packages: {
      '': { dependencies: { '@xneog/dsh': '0.2.0', 'dsh-previous': 'npm:@xneog/dsh@0.1.0' } },
      'node_modules/@xneog/cordis': { version: '4.0.1' },
      'node_modules/@xneog/dsh': {
        version: '0.2.0',
        dependencies: { '@xneog/dsh-child': '^0.2.0' },
        peerDependencies: { '@xneog/cordis': '^4.0.1' },
      },
      'node_modules/@xneog/dsh-child': {
        version: '0.2.0',
        dependencies: { '@xneog/dsh-leaf': '^0.2.0' },
      },
      'node_modules/@xneog/dsh-leaf': { version: '0.2.0' },
      'node_modules/dsh-previous': {
        name: '@xneog/dsh',
        version: '0.1.0',
        dependencies: { '@xneog/dsh-child': '^0.1.0' },
        peerDependencies: { '@xneog/cordis': '^4.0.1' },
      },
      'node_modules/dsh-previous/node_modules/@xneog/dsh-child': {
        version: '0.1.0',
        dependencies: { '@xneog/dsh-leaf': '^0.1.0' },
      },
      'node_modules/dsh-previous/node_modules/@xneog/dsh-leaf': { version: '0.1.0' },
    },
  }
}

describe('npm install layout verifier', () => {
  it('creates two incompatible versions of every DSH package', () => {
    const index: RegistryIndex = new Map([
      ['@xneog/dsh', new Map([['0.1.1-rc.2', {
        name: '@xneog/dsh',
        version: '0.1.1-rc.2',
        dependencies: { '@xneog/dsh-child': '^0.1.1-rc.2' },
        peerDependencies: { '@xneog/cordis': '^4.0.1' },
      }]])],
      ['@xneog/dsh-child', new Map([['0.1.1-rc.2', {
        name: '@xneog/dsh-child',
        version: '0.1.1-rc.2',
      }]])],
      ['@xneog/cordis', new Map([['4.0.1', {
        name: '@xneog/cordis',
        version: '4.0.1',
      }]])],
    ])

    const dual = buildDualDshRegistry(index, '0.1.1-rc.2')

    expect([...dual.get('@xneog/dsh')?.keys() ?? []]).toEqual(['0.1.0', '0.2.0'])
    expect(dual.get('@xneog/dsh')?.get('0.1.0')).toMatchObject({
      version: '0.1.0',
      dependencies: { '@xneog/dsh-child': '^0.1.0' },
      peerDependencies: { '@xneog/cordis': '^4.0.1' },
    })
    expect(dual.get('@xneog/dsh')?.get('0.2.0')).toMatchObject({
      version: '0.2.0',
      dependencies: { '@xneog/dsh-child': '^0.2.0' },
    })
    expect(dual.get('@xneog/cordis')).toBe(index.get('@xneog/cordis'))
  })

  it('accepts isolated DSH releases with one shared Cordis installation', () => {
    expect(assertDualDshInstallLayout(validLayout())).toEqual({
      dshPackagesPerVersion: 3,
      checkedDshEdges: 4,
    })
  })

  it.each([
    ['react', 'node_modules/react'],
    ['react-dom', 'node_modules/react-dom'],
    ['react', 'node_modules/dsh-previous/node_modules/react'],
    ['react-dom', 'node_modules/dsh-previous/node_modules/react-dom'],
  ])('rejects browser runtime %s installed at %s in the DSH-only consumer', (name, path) => {
    const layout = validLayout()
    const packages = { ...layout.packages, [path]: { version: '18.3.1' } }
    expect(() => assertDualDshInstallLayout({ ...layout, packages })).toThrow(
      `${path}: ${name} is a browser build input`,
    )
  })

  it('rejects an internal edge that crosses release versions', () => {
    const layout = validLayout()
    const packages = { ...layout.packages }
    Reflect.deleteProperty(packages, 'node_modules/dsh-previous/node_modules/@xneog/dsh-leaf')

    expect(() => assertDualDshInstallLayout({ ...layout, packages })).toThrow(
      'node_modules/dsh-previous/node_modules/@xneog/dsh-child: dependencies '
      + '@xneog/dsh-leaf resolves to node_modules/@xneog/dsh-leaf@0.2.0, expected 0.1.0',
    )
  })

  it('rejects a second Cordis installation', () => {
    const layout = validLayout()
    const packages = {
      ...layout.packages,
      'node_modules/dsh-previous/node_modules/@xneog/cordis': { version: '4.0.1' },
    }

    expect(() => assertDualDshInstallLayout({ ...layout, packages })).toThrow(
      'expected one shared @xneog/cordis',
    )
  })
})
