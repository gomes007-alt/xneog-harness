// xneog brand mark (placeholder): a bold rounded "x" rendered with
// currentColor so it adapts to the active theme. Replace this placeholder
// with the official xneog logomark when it is available.

import type { IconProps } from './icons/props.ts'

/**
 * Render the xneog mark.
 * @param props.size - width/height in px (default 24).
 * @param props.className - extra class for layout placement.
 * @returns the logo svg (aria-hidden; pair with the wordmark for accessibility).
 */
export function FishLogo({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
