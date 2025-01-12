import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { logUser } from '../../services/callsApi'

const initialState = {
  loading: false,
  userToken: '',
  error: '',
  success: false,
  remember: '',
}

export const authUser = createAsyncThunk(
  'auth/authUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await logUser(userInfo)
      return { token: response, remember: userInfo.remember }
    } catch (error) {
      // return custom error message based on API response
      if (error.response && error.response.data.status === 400) {
        // return rejectWithValue('Invalid username or password')
        return rejectWithValue('Invalid username or password')
      } else {
        return rejectWithValue(
          'Sorry, an internal error occured, try again later.'
        )
      }
    }
  }
)
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFormError(state, action) {
      state.error = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    logoutUser(state) {
      state.userToken = ''
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.userToken = action.payload.token
      state.userName = action.payload.remember
      state.error = ''
      state.success = true
      state.loading = false
    })
    builder.addCase(authUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})
