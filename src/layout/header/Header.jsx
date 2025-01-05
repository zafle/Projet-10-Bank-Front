import { Link, NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import { getAuthState, getUserState } from '../../redux/selectors'
import logo from '../../assets/images/argentBankLogo.png'
import './Header.css'

function Header() {
  const { success } = useSelector(getAuthState)
  const { firstName } = useSelector(getUserState)

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
        <div>
          <NavLink className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            &nbsp;{firstName}
          </NavLink>
          <NavLink className="main-nav-item" to="/logout">
            <i className="fa fa-sign-out"></i>
            &nbsp;Sign Out
          </NavLink>
        </div>
      ) : (
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
