import { useSelector } from 'react-redux'
import { getUserState } from '../../../../redux/selectors'
import { useNavigate } from 'react-router'
import './UserName.css'

function UserName() {
  const { firstName, lastName } = useSelector(getUserState)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/profile/edit', { replace: true })
  }

  return (
    <>
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}
      </h1>
      <button className="edit-button" onClick={handleClick}>
        Edit Name
      </button>
    </>
  )
}

export default UserName
