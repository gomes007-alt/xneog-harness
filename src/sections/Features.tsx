import type { ReactNode } from 'react'
import { features } from '../data'
import { Reveal } from '../components/Reveal'

const icons: Record<string, ReactNode> = {
  plugin: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M9 2v3a1 1 0 0 0 1 1h3M6 2v4a1 1 0 0 1-1 1H2m8 3v4a1 1 0 0 0 1 1h2M8.5 3.5 12.5 7.5M6 6.5l2 2M9.5 9.5l1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  profile: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6h12M5.5 6v7.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  web: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 8h12M8 2c-2 2-2.5 4-2.5 6S6 14 8 14s2.5-4 2.5-6S10 2 8 2Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  headless: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 4.5h6M3 8h4M3 11.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12.5 4.5v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  tools: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5a3.5 3.5 0 0 1 4.7 4.2L14 10.5 11.5 13l-2.8-2.8a3.5 3.5 0 0 1-4.2-4.7l2 2 1.8-1.8-2-2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
  plan: (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 2.5h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
}

export function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <p className="section__eyebrow">Features</p>
            <h2 className="section__title">Compose the harness, don&apos;t fork it</h2>
            <p className="section__lead">
              Every capability is a plugin with the same shape, so the surface and the runtime stay
              small and everything else is a decision you make per profile.
            </p>
          </div>
        </Reveal>
        <div className="features">
          {features.map((f, i) => (
            <Reveal key={f.title}>
              <article className="feature" style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <span className="feature__icon">{icons[f.icon]}</span>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__text">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
