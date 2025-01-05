import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './features/authSlice'
import { userSlice } from './features/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
})
