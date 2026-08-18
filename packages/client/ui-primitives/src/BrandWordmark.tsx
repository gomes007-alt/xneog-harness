// xneog brand wordmark (placeholder): a bold rounded "x" mark followed by the
// "xneog" letterforms, rendered with currentColor so it adapts to the theme.
// Replace with the official xneog wordmark when it is available.

import type { IconProps } from './icons/props.ts'

/**
 * Render the full brand wordmark.
 * @param props.size - height in px (default 24; width keeps the 96:24 ratio).
 * @param props.className - extra class for layout placement.
 * @returns the wordmark svg (aria-hidden decorative brand art).
 */
export function BrandWordmark({ size = 24, className }: IconProps) {
  return (
    <svg
      width={(size * 96) / 24}
      height={size}
      className={className}
      viewBox="0 0 96 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 6 L15 18 M15 6 L9 18" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <text
        x="26"
        y="17.6"
        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="currentColor"
      >
        xneog
      </text>
    </svg>
  )
}
