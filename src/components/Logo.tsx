interface LogoProps {
  id?: string
  size?: number
}

/** The xneog mark (a stylized whale) plus the "xneog harness" wordmark. */
export function Logo({ id = 'xng-mark', size = 26 }: LogoProps) {
  const gradId = `xng-grad-${id}`
  return (
    <span className="nav__brand">
      <svg
        width={size}
        height={(size * 32) / 40}
        viewBox="0 0 40 32"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="4"
            y1="6"
            x2="31"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#679efe" />
            <stop offset="1" stopColor="#4176e6" />
          </linearGradient>
        </defs>
        <path
          d="M24.5 15.5 L31 10 C29 14.5 29 18.5 31 23 Z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M5 18 C5 12 9.5 7.5 15.5 7.5 C21.5 7.5 26 11 26 16 C26 21 22 25.5 16 25.5 C10 25.5 5 22 5 18 Z"
          fill={`url(#${gradId})`}
        />
        <circle cx="11" cy="15.5" r="1.7" fill="#fff" />
      </svg>
      <span>
        xneog&nbsp;<span style={{ color: 'var(--brand)' }}>harness</span>
      </span>
    </span>
  )
}
