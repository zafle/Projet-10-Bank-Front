import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState, getUserState } from '../../../../redux/selectors'
import { updateUserName, userSlice } from '../../../../redux/features/userSlice'
import Loader from '../../../../components/loader/Loader'
import './EditUserName.css'

/**
 * Renders a form to edit user name
 * Displays as Outlet on Profile page (/profile/edit)
 *
 * @returns {React.ReactElement} Returns a form to edit user name
 */
function EditUserName() {
  //  Retrieve user data from Redux store
  const { userToken } = useSelector(getAuthState)
  const { firstName, lastName, update } = useSelector(getUserState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // If the update is a success, return to profile page
  useEffect(() => {
    if (update.success) {
      // reset success state
      dispatch(userSlice.actions.setUpdateSuccess(false))
      navigate('/profile', { replace: true })
    }
  }, [update, dispatch, navigate])

  // Function to handle Cancel button
  const handleCancel = () => {
    // reset error message
    dispatch(userSlice.actions.setUpdateFormError(''))
    // return to profile page (displays UserName Outlet)
    navigate('/profile', { replace: true })
  }

  // Function to handle edit form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const firstName = e.currentTarget.firstName.value
    const lastName = e.currentTarget.lastName.value

    // If all fields are filled in
    if (firstName !== '' && lastName !== '') {
      dispatch(userSlice.actions.setUpdateLoading(true))
      //  use updateUserName Thunk to update data in database and in store
      dispatch(
        updateUserName({
          userToken: userToken,
          firstName: firstName,
          lastName: lastName,
        })
      )
    } else {
      dispatch(
        userSlice.actions.setUpdateFormError('Please fill in all fields.')
      )
    }
  }

  return (
    <>
      <h1>Welcome back</h1>
      {update.loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="update-wrapper">
            <input type="text" name="firstName" placeholder={firstName} />
            <input type="text" name="lastName" placeholder={lastName} />
          </div>
          {update.error !== '' && (
            <p className="update-error">{update.error}</p>
          )}
          <div className="update-wrapper">
            <button className="update-button" type="submit">
              Save
            </button>
            <button
              className="update-button"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  )
}
export default EditUserName
