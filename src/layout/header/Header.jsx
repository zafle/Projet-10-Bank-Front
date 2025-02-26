import { Link, NavLink } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState, getUserState } from '../../redux/selectors'
import logo from '../../assets/images/argentBankLogo.png'
import { logout } from '../../services/logout'
import './Header.css'

/**
 * Renders main site Header
 * - displays Site logo
 * - displays a link to profile page (username)
 * - displays ---- Sign in link ---- when user is not authentified
 * - dispalys ---- Sign out link --- when user is authentified
 *
 * @returns {React.ReactElement} Main site Header
 */
function Header() {
  const { success } = useSelector(getAuthState)
  const { firstName } = useSelector(getUserState)

  const dispatch = useDispatch()

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {success ? (
        // If user is authentified
        // - displays link to profile page
        // - displays link to logout
        <div>
          <NavLink className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            &nbsp;{firstName}
          </NavLink>
          <Link className="main-nav-item" onClick={() => logout(dispatch)}>
            <i className="fa fa-sign-out"></i>
            &nbsp;Sign Out
          </Link>
        </div>
      ) : (
        // If user is not authentified
        // - displays link to Sign up
        <div>
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            &nbsp;Sign In
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Header
