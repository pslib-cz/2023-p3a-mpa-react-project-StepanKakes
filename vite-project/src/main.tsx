import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DriverDataProvider } from './context/driverDataContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DriverDataProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </DriverDataProvider>,
)
