import { Terminal, Line, Prompt, Cmd, Comment } from '../components/Terminal'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" />
      <div className="container hero__inner">
        <span className="hero__badge">
          <span className="hero__dot" />
          Open source &middot; MIT license
        </span>
        <h1 className="hero__title">
          An agent harness where
          <br />
          <span className="accent">everything is a plugin</span>
        </h1>
        <p className="hero__subtitle">
          xneog harness (the <code>dsh</code> launcher) is a plugin-composed runtime for coding
          agents. Tools, hooks, models, memory — even the agent loop itself — are swappable Cordis
          plugins stacked into profiles you own.
        </p>
        <div className="hero__cta">
          <a
            className="btn btn--primary"
            href="https://github.com/gomes007-alt/xneog-harness"
            target="_blank"
            rel="noreferrer"
          >
            Get started
          </a>
          <a className="btn btn--ghost" href="#cli">
            See the CLI
          </a>
        </div>
        <div className="hero__install">
          <Terminal title="zsh — install & boot">
            <Line>
              <Prompt />
              <Cmd>npm install -g @xneog/dsh</Cmd>
            </Line>
            <Line>
              <Prompt />
              <Cmd>dsh web</Cmd>
              <Comment>  # boot the browser UI</Comment>
            </Line>
            <Line>
              <span className="terminal__ok">✓</span>
              <Comment>  web surface listening on http://127.0.0.1:3080</Comment>
            </Line>
          </Terminal>
        </div>
      </div>
    </section>
  )
}
