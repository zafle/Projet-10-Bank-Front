import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userFirstName: null,
  userLastName: null,
  userToken: null,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export default authSlice
