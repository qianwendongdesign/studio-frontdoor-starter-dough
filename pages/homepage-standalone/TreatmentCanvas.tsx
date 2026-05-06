import { useState } from 'react'
import { PhoneFrame } from '@shared/components/PhoneFrame'
import { HomepageFeed } from './HomepageFeed'
import { TreatmentBFeed } from './TreatmentBFeed'

type Treatment = '1' | '2'
const TREATMENTS: Treatment[] = ['1', '2']

function getInitialTreatment(): Treatment {
  if (typeof window === 'undefined') return '1'
  const t = new URLSearchParams(window.location.search).get('treatment')
  return t === '2' ? '2' : '1'
}

export function TreatmentCanvas() {
  const [active, setActive] = useState<Treatment>(getInitialTreatment)

  function selectTreatment(t: Treatment) {
    setActive(t)
    const url = new URL(window.location.href)
    url.searchParams.set('treatment', t)
    window.history.replaceState({}, '', url.toString())
  }

  return (
    <>
      {/* Treatment tabs pinned to left side of canvas */}
      <div style={{
        position: 'fixed',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}>
        {TREATMENTS.map((t) => (
          <button
            key={t}
            onClick={() => selectTreatment(t)}
            style={{
              padding: '9px 15px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: active === t ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              cursor: 'pointer',
              background: active === t ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.08)',
              color: active === t ? '#111' : 'rgba(255,255,255,0.5)',
              fontSize: 12,
              fontWeight: active === t ? 600 : 400,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '0.01em',
              lineHeight: '1',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Treatment {t}
          </button>
        ))}
      </div>

      <PhoneFrame>
        {active === '1' ? <HomepageFeed /> : <TreatmentBFeed />}
      </PhoneFrame>
    </>
  )
}
