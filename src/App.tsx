import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Features } from './sections/Features'
import { HowItWorks } from './sections/HowItWorks'
import { Showcase } from './sections/Showcase'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Showcase />
      </main>
      <Footer />
    </div>
  )
}
