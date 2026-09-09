import type { IconProps } from './icons/props.ts'

/** Display options for the official brand wordmark. */
export interface BrandWordmarkProps extends IconProps {
  /** Whether to include the leading xneog x mark; defaults to true. */
  includeMark?: boolean | undefined
}

/**
 * Render the full brand wordmark.
 * @param props.size - height in px (default 24; width follows the selected artwork).
 * @param props.className - extra class for layout placement.
 * @param props.includeMark - whether to include the leading xneog x mark.
 * @returns the wordmark svg (aria-hidden decorative brand art).
 */
export function BrandWordmark({ size = 24, className, includeMark = true }: BrandWordmarkProps) {
  const width = includeMark ? 182 : 156
  return (
    <svg
      width={(size * width) / 24}
      height={size}
      className={className}
      viewBox={includeMark ? '0 0 182 24' : '26 0 156 24'}
      fill="none"
      aria-hidden="true"
    >
      {/* xneog wordmark: the fork's name replaces the upstream "deepseek" letterforms. */}
      <text
        x="26"
        y="18.3"
        fontSize="18"
        fontWeight="700"
        letterSpacing="3.5"
        fill="currentColor"
        fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
      >
        xneog
      </text>
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M5.5 5.5 L18.5 18.5 M18.5 5.5 L5.5 18.5" />
      </g>
      <g transform="translate(114 5.5)">
        <rect width="52" height="14" rx="2" fill="currentColor" />
        <text
          x="26"
          y="10.7"
          fontSize="8.5"
          fontWeight="700"
          textAnchor="middle"
          letterSpacing="0.5"
          fill="var(--dsw-alias-label-primary-inverted, #fff)"
          fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
        >
          HARNESS
        </text>
      </g>
    </svg>
  )
}
