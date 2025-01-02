import Footer from '../footer/Footer'
import Header from '../header/Header'
import PropTypes from 'prop-types'

/**
 * Renders main App layout React component with main Header and main Footer
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
      <main>{children}</main>
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default MainLayout
