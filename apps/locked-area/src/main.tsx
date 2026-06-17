import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as UrqlProvider } from 'urql'
import { client } from './lib/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <UrqlProvider value={client}>
        <App />
      </UrqlProvider>
    </HelmetProvider>
  </React.StrictMode>,
)