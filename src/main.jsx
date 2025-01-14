import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/Router'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from './components/loader/Loader'
import './main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </StrictMode>
)
