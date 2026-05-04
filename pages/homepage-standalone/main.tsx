import '@shared/styles/base.css'
import '@shared/styles/components.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TreatmentCanvas } from './TreatmentCanvas'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TreatmentCanvas />
  </StrictMode>,
)
