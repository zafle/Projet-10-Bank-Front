import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { logUser } from '../../services/services'

const initialState = {
  loading: false,
  userToken: sessionStorage.getItem('userToken') || '',
  error: '',
  success: sessionStorage.getItem('success') || false,
  userName: localStorage.getItem('userName') || '',
}

export const authUser = createAsyncThunk(
  'auth/authUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await logUser(userInfo)
      return { token: response, remember: userInfo.remember }
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
      sessionStorage.removeItem('success')
      sessionStorage.removeItem('userToken')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.userToken = action.payload.token
      state.userName = action.payload.remember
      state.error = ''
      state.success = true
      state.loading = false
      sessionStorage.setItem('success', true)
      sessionStorage.setItem('userToken', action.payload.token)
      localStorage.setItem('userName', action.payload.remember)
    })
    builder.addCase(authUser.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})
