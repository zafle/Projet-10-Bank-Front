import { authSlice, authUser } from '../redux/features/authSlice'

/**
 * Logs in user
 *
 * @param {Function} dispatch useDispatch() function from 'react-redux'
 * @param {Object} userInfo contains data from sign up form
 * @param {string} userInfo.email username
 * @param {string} userInfo.password password
 * @param {string} userInfo.remember username | '' (empty if "Remember me" is not checked)
 */
export function login(dispatch, userInfo) {
  dispatch(authSlice.actions.setFormError(''))
  dispatch(authSlice.actions.setLoading(true))
  // uses authUser Async Thunk
  dispatch(authUser(userInfo))
}
