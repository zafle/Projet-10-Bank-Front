import { createSlice } from '@reduxjs/toolkit'

/**
 * User credentials Slice of Redux Store
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
