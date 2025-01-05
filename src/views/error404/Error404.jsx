import illustration from '../../assets/images/undraw_page-not-found_6wni.svg'
import './Error404.css'

function Error404() {
  return (
    <main className="main">
      <img
        className="error404-image"
        src={illustration}
        alt="error 404: page not found"
      />
    </main>
  )
}

export default Error404
