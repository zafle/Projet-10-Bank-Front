import Feature from '../../components/feature/Feature'
import { homeFeatures } from '../../data/mock/homeFeatures'
import './Home.css'

/**
 * Renders Home page content
 *
 * @returns {React.ReactElement} Returns Home page content
 */
function Home() {
  return (
    <main className="main">
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {homeFeatures.map((feature, index) => (
          <Feature
            key={`${index}-homeFeature`}
            icon={feature.icon}
            iconAlt={feature.iconAlt}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </section>
    </main>
  )
}
export default Home
