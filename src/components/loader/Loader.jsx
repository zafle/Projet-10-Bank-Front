import { MoonLoader } from 'react-spinners'
import './Loader.css'

/**
 *
 * @returns {React.ReactElement} Returns a loader
 */

function Loader() {
  return (
    <main className="main main-loader bg-dark">
      <MoonLoader color="#00bc77" />
    </main>
  )
}

export default Loader
