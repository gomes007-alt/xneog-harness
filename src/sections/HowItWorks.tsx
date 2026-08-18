import { layers, modes } from '../data'
import { Reveal } from '../components/Reveal'

export function HowItWorks() {
  return (
    <section className="section section--alt" id="how">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <p className="section__eyebrow">How it works</p>
            <h2 className="section__title">Profiles are ordered patch layers</h2>
            <p className="section__lead">
              A profile composes over an empty root. Each layer can add, remove or reconfigure any
              plugin, so the final tree is fully described by a few YAML files.
            </p>
          </div>
        </Reveal>
        <div className="how">
          <Reveal>
            <div className="layers">
              {layers.map((l) => (
                <div key={l.name} className={`layer${l.brand ? ' layer--brand' : ''}`}>
                  <span className="layer__order">{l.order}</span>
                  <span>
                    <span className="layer__name">{l.name}</span>{' '}
                    <span className="layer__desc">{l.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="modes">
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-tertiary)' }}>
                One launcher, several surfaces:
              </p>
              {modes.map((m) => (
                <div key={m.command} className="mode">
                  <code>{m.command}</code>
                  <span>{m.desc}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
