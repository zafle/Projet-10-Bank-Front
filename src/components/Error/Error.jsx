import { Link } from 'react-router'
import './Error.css'

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
