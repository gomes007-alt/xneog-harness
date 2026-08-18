import { Terminal, Line, Prompt, Cmd, Comment } from '../components/Terminal'
import { Reveal } from '../components/Reveal'

export function Showcase() {
  return (
    <section className="section" id="cli">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <p className="section__eyebrow">CLI</p>
            <h2 className="section__title">One launcher, every surface</h2>
            <p className="section__lead">
              The <code>dsh</code> command is the product launcher: it boots profiles and hands
              everything it doesn&apos;t parse to the booted app.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <Terminal title="dsh — launcher">
            <Line>
              <Prompt />
              <Cmd>dsh --profile web --port 8080</Cmd>
              <Comment>  # --port belongs to the web app</Comment>
            </Line>
            <Line>
              <Prompt />
              <Cmd>dsh --profile headless &quot;run the tests&quot;</Cmd>
            </Line>
            <Line>
              <Prompt />
              <Cmd>dsh plugin --profile web add @xneog/dsh-tool-web</Cmd>
            </Line>
            <Line>
              <Prompt />
              <Cmd>dsh --dump-config</Cmd>
              <Comment>  # inspect the composed tree</Comment>
            </Line>
            <Line>
              <Prompt />
              <Cmd>dsh --profile web --help</Cmd>
              <Comment>  # the web app&apos;s flags, not the launcher&apos;s</Comment>
            </Line>
          </Terminal>
        </Reveal>
      </div>
    </section>
  )
}
