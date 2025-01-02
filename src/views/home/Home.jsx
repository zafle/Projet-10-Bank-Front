import chatIcon from '../../assets/images//icon-chat.png'
import moneyIcon from '../../assets/images//icon-money.png'
import securityIcon from '../../assets/images/icon-security.png'
import Feature from '../../components/feature/Feature'
import './Home.css'

function Home() {
  const homeFeatures = [
    {
      icon: chatIcon,
      iconAlt: 'Chat Icon',
      title: 'You are our #1 priority',
      text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      icon: moneyIcon,
      iconAlt: 'Money Icon',
      title: 'More savings means higher rates',
      text: 'The more you save with us, the higher your interest rate will be!',
    },
    {
      icon: securityIcon,
      iconAlt: 'Security Icon',
      title: 'Security you can trust',
      text: ' We use top of the line encryption to make sure your data and money is always safe.',
    },
  ]
  return (
    <>
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
    </>
  )
}
export default Home
