import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App.jsx'
import { Loading } from './components'

import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <StrictMode>
        <App />
      </StrictMode>
    </PersistGate>
  </Provider>
)
