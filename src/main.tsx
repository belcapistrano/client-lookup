import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ClientSearchApp from './components/ClientSearchApp'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ClientSearchApp />
  </StrictMode>,
)
