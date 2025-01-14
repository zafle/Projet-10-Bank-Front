import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProfile, updateName } from '../../services/callsApi'

/**
 * User details info Slice of Redux Store
 * - initial state,
 * - Get user profile Async Thunk
 * - Update user profile Async Thunk
 * - Reducer
 */

const initialState = {
  email: '', // user email
  firstName: '', // user first name
  lastName: '', // user last name
  id: '', // user ID
  loading: false, // true while fetching data from API
  error: false, // true if getUserProfile Async Thunk returns a rejected promise
  update: {
    loading: false, // true while posting data from API
    success: false, // true if updateUserName returns a resolved promise
    error: false, // true if updateUserName returns a rejected promise
  },
}

/**
 * Redux Async Thunk to get user info details from API
 */
export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  /**
   * Async function to retrieve user infos from API
   * - uses call API Axios function
   *
   * @param {string} token JWT
   *
   * @returns {Promise}
   * @returns {Promise.resolve<Object.<
   *   email: string,
   *   firstName: string,
   *   lastName: string,
   *   createdAt: string,
   *   updatedAt: string,
   *   id: string,
   * >>} Returns user info from API
   * @returns {Promise.reject<string>} Error message
   */
  async (token, { rejectWithValue }) => {
    try {
      // call API Axios function
      const response = await getProfile(token)
      return response
    } catch (error) {
      // returns error message
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

/**
 * Redux Async Thunk to update user info profile in Database and Redux Store
 */
export const updateUserName = createAsyncThunk(
  'user/updateUserProfile',
  /**
   * Async function to update user infos profile
   * - uses call API Axios function
   *
   * @param {Object} data contains user token and new user data from edit user name form
   * @param {string} data.userToken JWT
   * @param {string} data.firstName new user firstName from edit user name form
   * @param {string} data.lastName new user lastName from edit user name form
   *
   * @returns {Promise}
   * @returns {Promise.resolve<Object.<
   *   email: string,
   *   firstName: string,
   *   lastName: string,
   *   createdAt: string,
   *   updatedAt: string,
   *   id: string,
   * >>} Returns updated user info from API
   * @returns {Promise.reject<string>} Error message
   */
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateName(data)
      return response
    } catch (error) {
      // return custom error message from API if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

/**
 * User infos Slice
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set getUserProfile Thunk loading state
    setLoading(state, action) {
      state.loading = action.payload
    },
    // Action to reset user data to initial state when user log out
    resetUser(state) {
      Object.assign(state, initialState)
    },
    // Action to set updateUserName Thunk loading state
    setUpdateLoading(state, action) {
      state.update.loading = action.payload
    },
    // Action to set updateUserName Thunk success state
    setUpdateSuccess(state, action) {
      state.update.success = action.payload
    },
    // Action to set updateUserName Thunk error state
    setUpdateFormError(state, action) {
      state.update.error = action.payload
    },
  },
  extraReducers: (builder) => {
    // Action to set user state when getUserProfile Thunk promise resolves successfully
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.id = action.payload.id
      state.loading = false
    })
    // Action to set user state when getUserProfile Thunk promise is rejected
    builder.addCase(getUserProfile.rejected, (state, action) => {
      console.log('getUserProfile.rejected', action.payload)
      state.error = true
      state.loading = false
    })
    // Action to set user state when updateUserName Thunk promise resolves successfully
    builder.addCase(updateUserName.fulfilled, (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.update.loading = false
      state.update.error = ''
      state.update.success = true
    })
    // Action to set user state when updateUserName Thunk promise is rejected
    builder.addCase(updateUserName.rejected, (state, action) => {
      console.log('update name rejected', action.payload)
      state.update.loading = false
      state.update.error = 'Sorry, an error occured. Try again later.'
    })
  },
})
