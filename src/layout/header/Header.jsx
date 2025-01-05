import { Link, NavLink } from 'react-router'
import logo from '../../assets/images/argentBankLogo.png'
import './Header.css'
import { getAuthState, getUserState } from '../../app/selectors'
import { useSelector } from 'react-redux'

function Header() {
  const { success } = useSelector(getAuthState)
  const { firstName } = useSelector(getUserState)

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo main-nav-link" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {success ? (
        <div>
          <NavLink className="main-nav-item main-nav-link" to="/profile">
            <i className="fa fa-user-circle"></i>
            &nbsp;{firstName}
          </NavLink>
          <NavLink className="main-nav-item main-nav-link" to="/logout">
            <i className="fa fa-sign-out"></i>
            &nbsp;Sign Out
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink className="main-nav-item main-nav-link" to="/login">
            <i className="fa fa-user-circle"></i>
            &nbsp;Sign In
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Header
