import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProfile } from '../services/services'

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  id: '',
  loading: false,
  error: false,
}

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getProfile(token)
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
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    resetUser(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.id = action.payload.id
      state.loading = false
    })
    builder.addCase(getUserProfile.rejected, (state, action) => {
      console.log('getUserProfile.rejected', action.payload)
      state.error = true
      state.loading = false
    })
  },
})
