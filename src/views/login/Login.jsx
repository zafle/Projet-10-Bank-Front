import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { getAuthState } from '../../redux/selectors'
import { authUser, authSlice } from '../../redux/features/authSlice'
import { credentialSlice } from '../../redux/features/credentialSlice'
import Loader from '../../components/loader/Loader'
import './Login.css'

function Login() {
  const { loading, error, success, userName } = useSelector(getAuthState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const password = e.currentTarget.password.value
    const remember = e.currentTarget.remember.checked

    if (username !== '' && password !== '') {
      dispatch(authSlice.actions.setFormError(''))
      dispatch(authSlice.actions.setLoading(true))
      dispatch(
        authUser({
          email: username,
          password: password,
          remember: remember ? username : '',
        })
      )
    } else {
      dispatch(authSlice.actions.setFormError('Please fill in all fields.'))
    }
  }

  useEffect(() => {
    if (success) {
      userName !== '' && dispatch(credentialSlice.actions.setUserName(userName))
      navigate('/profile', { replace: true })
    }
  }, [success, userName, navigate, dispatch])

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
