import Footer from '../footer/Footer'
import Header from '../header/Header'
import PropTypes from 'prop-types'

/**
 * Renders App's main layout with main Header and main Footer
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - React components that will display inside the layout.
 *
 * @returns {React.ReactElement} A React component to display mainlayout
 */

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default MainLayout
