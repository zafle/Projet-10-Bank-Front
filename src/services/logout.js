import { authSlice } from '../redux/features/authSlice'
import { userSlice } from '../redux/features/userSlice'

export function logout(dispatch) {
  dispatch(authSlice.actions.logoutUser())
  dispatch(userSlice.actions.resetUser())
}
