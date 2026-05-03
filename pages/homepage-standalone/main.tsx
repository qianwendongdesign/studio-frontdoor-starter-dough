import '@shared/styles/base.css'
import '@shared/styles/components.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomepageFeed } from './HomepageFeed'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomepageFeed />
  </StrictMode>,
)
