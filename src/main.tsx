import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ClientSearchApp from './components/ClientSearchApp'; 
import VirtualChat from './components/VirtualChat.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ClientSearchApp />
    <VirtualChat/>

 
  </StrictMode>,
)
