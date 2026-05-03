import type { ReactNode } from 'react'
import {
  PrismWebGlobalStyles,
  PrismConfig,
  Theming,
  LayerManager,
} from '@doordash/prism-react'
import { createGlobalStyle } from 'styled-components'

const PrismPrototypeStyles = createGlobalStyle`
  html {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    background: #f0f0f0 !important;
  }
  body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    background: #f0f0f0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  #root {
    width: min(393px, 100vw);
    height: min(852px, 90vh);
    overflow: hidden;
  }
`

export function PrismShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PrismWebGlobalStyles />
      <PrismPrototypeStyles />
      <PrismConfig>
        <Theming>
          <LayerManager>{children}</LayerManager>
        </Theming>
      </PrismConfig>
    </>
  )
}
