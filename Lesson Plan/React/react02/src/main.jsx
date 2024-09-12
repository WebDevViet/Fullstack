// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Provider from './store/Provider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider>
    <App />
  </Provider>
  // </StrictMode>,
)
