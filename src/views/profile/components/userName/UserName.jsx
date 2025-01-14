import { useSelector } from 'react-redux'
import { getUserState } from '../../../../redux/selectors'
import { useNavigate } from 'react-router'
import './UserName.css'

/**
 * Renders the header content for profile page
 * Displays as Outlet on Profile page
 *
 * @returns {React.ReactElement} Returns the header content for profile page
 */
function UserName() {
  // Retrieve user names from store
  const { firstName, lastName } = useSelector(getUserState)

  const navigate = useNavigate()

  // Handle Edit Name button
  const handleClick = () => {
    // navigate to edit page (displays EditUserName Outlet)
    navigate('/profile/edit', { replace: true })
  }

  return (
    <>
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button" onClick={handleClick}>
        Edit Name
      </button>
    </>
  )
}

export default UserName
