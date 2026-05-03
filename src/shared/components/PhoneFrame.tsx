import { useEffect, useState, ReactNode } from 'react'

const SCREEN_W = 393
const SCREEN_H = 852
const BEZEL = 12
const DEVICE_W = SCREEN_W + BEZEL * 2
const DEVICE_H = SCREEN_H + BEZEL * 2

export function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Reset body so it doesn't interfere with full-viewport layout
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden'

    const update = () => {
      const padding = 32
      const s = Math.min(
        (window.innerWidth - padding) / DEVICE_W,
        (window.innerHeight - padding) / DEVICE_H,
      )
      setScale(Math.min(s, 1))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Outer placeholder — reserves the exact scaled footprint */}
      <div style={{
        position: 'relative',
        width: DEVICE_W * scale,
        height: DEVICE_H * scale,
        flexShrink: 0,
      }}>
        {/* Device shell — scaled from top-left so dimensions match placeholder */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: DEVICE_W,
          height: DEVICE_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          background: 'linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 60%, #111 100%)',
          borderRadius: 50,
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.12)',
            'inset 0 0 0 1.5px rgba(255,255,255,0.06)',
            '0 30px 80px rgba(0,0,0,0.7)',
          ].join(', '),
        }}>

          {/* Action + Volume buttons — left */}
          {[{ top: 120, h: 32 }, { top: 172, h: 68 }, { top: 252, h: 68 }].map((btn, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: -3, top: btn.top,
              width: 4, height: btn.h,
              background: 'linear-gradient(90deg, #2a2a2c, #3a3a3c)',
              borderRadius: '2px 0 0 2px',
            }} />
          ))}

          {/* Power button — right */}
          <div style={{
            position: 'absolute',
            right: -3, top: 180,
            width: 4, height: 90,
            background: 'linear-gradient(270deg, #2a2a2c, #3a3a3c)',
            borderRadius: '0 2px 2px 0',
          }} />

          {/* Screen bezel + clip */}
          <div style={{
            position: 'absolute',
            top: BEZEL, left: BEZEL,
            width: SCREEN_W, height: SCREEN_H,
            borderRadius: 38,
            overflow: 'hidden',
            background: '#000',
          }}>
            {/* Scrollable content area */}
            <div style={{
              width: SCREEN_W,
              height: SCREEN_H,
              overflowY: 'auto',
              overflowX: 'hidden',
              background: '#fff',
            }}>
              {children}
            </div>
          </div>

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: BEZEL + 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120, height: 34,
            background: '#000',
            borderRadius: 20,
            zIndex: 10,
          }} />
        </div>
      </div>
    </div>
  )
}
