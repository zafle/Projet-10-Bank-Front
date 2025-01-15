import { useDispatch, useSelector } from 'react-redux'
import { getAuthState, getCredentialState } from '../../redux/selectors'
import { authSlice } from '../../redux/features/authSlice'
import Loader from '../../components/loader/Loader'
import { login } from '../../services/login'
import './Login.css'

/**
 * Renders Login page content
 *
 * @returns {React.ReactElement} Returns Login page content
 */
function Login() {
  // Retrieve state values
  const { loading, error } = useSelector(getAuthState)
  const { userName } = useSelector(getCredentialState)

  const dispatch = useDispatch()

  // Handles sign up submission form
  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    const remember = e.currentTarget.remember.checked

    // If all fields are filled in
    if (username !== '' && password !== '') {
      const userInfo = {
        email: username,
        password: password,
        remember: remember ? username : '',
      }
      login(dispatch, userInfo)

    } else {
      dispatch(authSlice.actions.setFormError('Please fill in all fields.'))
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={userName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" name="remember" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error !== '' && <div className="sign-in-form-error">{error}</div>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
export default Login
