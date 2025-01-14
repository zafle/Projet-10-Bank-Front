import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'
import { authSlice } from './features/authSlice'
import { userSlice } from './features/userSlice'
import { credentialSlice } from './features/credentialSlice'

// Auth state Persist Config
// - persists in session storage
const authPersistConfig = {
  key: 'auth',
  storage: storageSession,
}

// Credential state Persist Config
// - persists in local storage
const credentialPersistConfig = {
  key: 'credential',
  storage: storage,
}

// create Redux Store by combining all reducers
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
      // Ignore persist actions to prevent errors related to non-serializable values
      // These actions (e.g., persist/PERSIST, persist/REHYDRATE) are used internally by redux-persist
      // and may include non-serializable values, which the middleware would otherwise flag as errors.
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

// Create a persistant store
export const persistor = persistStore(store)
