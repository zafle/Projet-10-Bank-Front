import './Feature.css'
import PropTypes from 'prop-types'

function Feature({ icon, iconAlt, title, text }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={iconAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  )
}
Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  iconAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Feature
