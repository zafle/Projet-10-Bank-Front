import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState, getUserState } from '../../../../redux/selectors'
import { updateUserName, userSlice } from '../../../../redux/features/userSlice'
import Loader from '../../../../components/loader/Loader'
import './EditUserName.css'

function EditUserName() {
  const { userToken } = useSelector(getAuthState)
  const { firstName, lastName, update } = useSelector(getUserState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (update.success) {
      dispatch(userSlice.actions.setUpdateSuccess(false))
      navigate('/profile', { replace: true })
    }
  }, [update, dispatch, navigate])

  const handleCancel = () => {
    dispatch(userSlice.actions.setUpdateFormError(''))
    navigate('/profile', { replace: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const firstName = e.currentTarget.firstName.value
    const lastName = e.currentTarget.lastName.value

    if (firstName !== '' && lastName !== '') {
      dispatch(userSlice.actions.setUpdateLoading(true))
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
