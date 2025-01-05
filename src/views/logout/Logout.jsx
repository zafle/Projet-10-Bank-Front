import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { userSlice } from '../../features/userSlice'
import { authSlice } from '../../features/authSlice'
import Loader from '../../components/loader/Loader'
import { useEffect } from 'react'
import { getAuthState } from '../../app/selectors'

function Logout() {
  const { success } = useSelector(getAuthState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (success) {
      dispatch(userSlice.actions.resetUser())
      console.log('user reset')
      dispatch(authSlice.actions.logoutUser())
      console.log('auth reset')
    }
    navigate('/', { replace: true })
  }, [success, navigate, dispatch])

  return <Loader />
}
export default Logout
