import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProfile, updateName } from '../../services/services'

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  id: '',
  loading: false,
  error: false,
  update: {
    loading: false,
    success: false,
    error: false,
  },
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

export const updateUserName = createAsyncThunk(
  'user/updateUserProfile',
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
    setUpdateLoading(state, action) {
      state.update.loading = action.payload
    },
    setUpdateSuccess(state, action) {
      state.update.success = action.payload
    },
    setUpdateFormError(state, action) {
      state.update.error = action.payload
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
    builder.addCase(updateUserName.fulfilled, (state, action) => {
      console.log('update name fulfilled', action.payload)
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.update.loading = false
      state.update.error = ''
      state.update.success = true
    })
    builder.addCase(updateUserName.rejected, (state, action) => {
      console.log('update name rejected', action.payload)
      state.update.loading = false
      state.update.error = 'Sorry, an error occured. Try again later.'
    })
  },
})
