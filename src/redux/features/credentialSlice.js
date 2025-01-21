import { createSlice } from '@reduxjs/toolkit'

/**
 * User credentials Slice of Redux Store
 * Username to remember if "Remember Me" is checked when user logs in.
 * - initial state,
 * - Reducer
 */

const initialState = {
  userName: '', // credential username to remember
}

/**
 * User credentials Slice
 */
export const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    // Action to set userName state
    setUserName(state, action) {
      state.userName = action.payload
    },
  },
})
