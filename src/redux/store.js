import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import { authSlice } from './features/authSlice'
import { userSlice } from './features/userSlice'
import { credentialSlice } from './features/credentialSlice'

const authPersistConfig = {
  key: 'auth',
  storage: storageSession,
}

const credentialPersistConfig = {
  key: 'credential',
  storage: storage,
}

export const store = configureStore({
  reducer: combineReducers({
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    credential: persistReducer(
      credentialPersistConfig,
      credentialSlice.reducer
    ),
    user: userSlice.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
