// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { ErrorBoundary } from './components'

createRoot(document.getElementById('root'), {
  identifierPrefix: 'prefix_'
}).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
