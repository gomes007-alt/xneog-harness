#!/usr/bin/env node

import { Context } from '@xneog/cordis'
import { pathToFileURL } from 'node:url'
import Loader from '@xneog/cordis-plugin-loader'

const ctx = new Context()
ctx.baseUrl = pathToFileURL(process.cwd()).href + '/'

await ctx.plugin(Loader)
await ctx.loader.create({
  name: '@xneog/cordis-plugin-include',
  config: {
    path: './cordis.yml',
  },
})
