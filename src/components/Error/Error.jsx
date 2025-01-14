import { Link } from 'react-router'
import './Error.css'

/**
 * Renders :
 * - an error message
 * - and a link to Home Page
 * to use when an error occured with the API backend (error 500)
 *
 * @returns {React.ReactElement}
 */

function Error() {
  return (
    <main className="main main-error bg-dark">
      <div>
        <p className="error-text">
          Sorry, an error occured while fetching data.
        </p>
        <Link to="/" className="error-link">
          Back to homepage
        </Link>
      </div>
    </main>
  )
}

export default Error
