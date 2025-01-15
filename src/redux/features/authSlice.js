import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { logUser } from '../../services/callsApi'
import { credentialSlice } from './credentialSlice'

/**
 * User authentification Slice of Redux Store
 * - initial state,
 * - Authentification Async Thunk
 * - Reducer
 */

const initialState = {
  loading: false, // true while fetching data from API
  userToken: '', // JWT returned fromAPI when user has been authentified successfully
  error: '', // Error message to display on sign up form
  success: false, // true when user is logged
}

/**
 * Redux Async Thunk for user authentification
 */
export const authUser = createAsyncThunk(
  'auth/authUser',
  /**
   * Async function to post user credentials to API and get a JWT
   * - uses call API Axios function
   *
   * @param {Object} userInfo contains data from sign up form
   * @param {string} userInfo.email username
   * @param {string} userInfo.password password
   * @param {string} userInfo.remember username | '' (empty if "Remember me" is not checked)
   *
   * @returns {Promise}
   * @returns {Promise.resolve<Object.< token: string, remember: string>>} Returns JWT and userName or empty string to remember
   * @returns {Promise.reject<string>} Error message to display
   */
  async (userInfo, { rejectWithValue, dispatch }) => {
    try {
      // call API Axios function to authentificate user
      const response = await logUser(userInfo.email, userInfo.password)
      // save username in persist local storage (or empty string if "Remember me" is not checked)
      dispatch(credentialSlice.actions.setUserName(userInfo.remember))
      return response
    } catch (error) {
      // returns custom error message based on API response's status
      if (error.response && error.response.data.status === 400) {
        return rejectWithValue('Invalid username or password')
      } else {
        return rejectWithValue(
          'Sorry, an internal error occured, try again later.'
        )
      }
    }
  }
)

/**
 * User Authentification Slice
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set error message state
    setFormError(state, action) {
      state.error = action.payload
    },
    // Action to set authUser Thunk loading state
    setLoading(state, action) {
      state.loading = action.payload
    },
    // Action to reset userToken and success state when user log out
    logoutUser(state) {
      state.userToken = ''
      state.success = false
    },
  },
  extraReducers: (builder) => {
    // Action to set auth state when authUser Thunk promise resolves successfully
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.userToken = action.payload
      state.error = ''
      state.success = true
      state.loading = false
    })
    // Action to set auth state when authUser Thunk promise is rejected
    builder.addCase(authUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})
