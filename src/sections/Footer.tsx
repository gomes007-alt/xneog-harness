import { Logo } from '../components/Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <Logo id="footer" />
            <p className="footer__meta" style={{ margin: '10px 0 0' }}>
              A plugin-composed agent harness.
              <br />
              Everything is a plugin.
            </p>
          </div>
          <div className="footer__links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#cli">CLI</a>
            <a href="https://github.com/gomes007-alt/xneog-harness" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>&copy; {new Date().getFullYear()} xneog harness</span>
          <span>Released under the MIT license &middot; @xneog/dsh</span>
        </div>
      </div>
    </footer>
  )
}
