import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import './main.css'
import ErrorBoundary from '@/layouts/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)