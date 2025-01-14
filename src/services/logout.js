import { authSlice } from '../redux/features/authSlice'
import { userSlice } from '../redux/features/userSlice'

/**
 * Logs out user by reseting auth and user state
 *
 * @param {Function} dispatch useDispatch() function from 'react-redux'
 */
export function logout(dispatch) {
  dispatch(authSlice.actions.logoutUser())
  dispatch(userSlice.actions.resetUser())
}
