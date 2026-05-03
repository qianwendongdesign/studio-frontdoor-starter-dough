import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GetStarted } from './get-started/GetStarted'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GetStarted />
  </StrictMode>,
)
