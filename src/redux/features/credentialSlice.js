import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: '',
}

export const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload
    },
  },
})