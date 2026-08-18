import type { ReactNode } from 'react'

export function Terminal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__title">{title}</span>
      </div>
      <div className="terminal__body">{children}</div>
    </div>
  )
}

export function Line({ children }: { children: ReactNode }) {
  return <span className="terminal__line">{children}</span>
}

export function Prompt() {
  return <span className="terminal__prompt">$ </span>
}

export function Cmd({ children }: { children: ReactNode }) {
  return <span className="terminal__arg">{children}</span>
}

export function Comment({ children }: { children: ReactNode }) {
  return <span className="terminal__comment">{children}</span>
}
