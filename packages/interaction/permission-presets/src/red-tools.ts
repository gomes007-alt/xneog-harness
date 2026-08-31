/**
 * RED tool matchers: verbs that must always `ask` (fail-closed if no answerer).
 * Independent of the named preset knobs so `yellow` and `red` can share
 * workspace-write+ask while still forcing a card on these names.
 *
 * @module @xneog/dsh-permission-presets/red-tools
 */

/** Seed list — Mission Contract RED verbs (Mac CLI / ads / ship). */
export const DEFAULT_RED_TOOLS: readonly string[] = [
  'Bash',
  'bash',
  'Write',
  'write',
  'Edit',
  'MultiEdit',
  'NotebookEdit',
  'WebFetch',
]

/**
 * True when `toolName` matches a RED matcher (exact or regex).
 * Unknown/empty names are not RED.
 */
export function isRedTool(toolName: string, matchers: readonly string[] = DEFAULT_RED_TOOLS): boolean {
  if (!toolName) return false
  for (const matcher of matchers) {
    if (matcher === toolName) return true
    try {
      if (new RegExp(`^(?:${matcher})$`).test(toolName)) return true
    } catch {
      // invalid regex matcher: exact-only
    }
  }
  return false
}

/**
 * RED tools always ask. `never` is not allowed to silent-allow a RED tool.
 * If the approval service is unavailable, callers must deny (fail-closed).
 */
export function redToolRequiresAsk(toolName: string, matchers: readonly string[] = DEFAULT_RED_TOOLS): boolean {
  return isRedTool(toolName, matchers)
}
