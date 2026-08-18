import { describe, expect, it } from 'vitest'
import { Context } from '@xneog/cordis'
import * as TestRuntimeInvariant from '@xneog/dsh-client-test-runtime/invariant'
import InvariantRegistry from '@xneog/dsh-invariants'

describe('invariant companion', () => {
  it('registers under the package name with an empty installer', async () => {
    const ctx = new Context()
    await ctx.plugin(InvariantRegistry, { enabled: true })
    await expect(ctx.plugin(TestRuntimeInvariant).await()).resolves.toBeDefined()
  })
})
