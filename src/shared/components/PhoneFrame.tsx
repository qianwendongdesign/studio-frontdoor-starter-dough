import { useEffect, useState, ReactNode } from 'react'

const SCREEN_W = 393
const SCREEN_H = 852
const BEZEL = 12
const DEVICE_W = SCREEN_W + BEZEL * 2   // 417
const DEVICE_H = SCREEN_H + BEZEL * 2   // 876

export function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
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

  const r = (n: number) => n * scale

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      overflow: 'hidden',
    }}>
      {/* Device shell */}
      <div style={{
        width: r(DEVICE_W),
        height: r(DEVICE_H),
        background: 'linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 60%, #111 100%)',
        borderRadius: r(50),
        position: 'relative',
        flexShrink: 0,
        boxShadow: [
          `0 0 0 ${r(1)}px rgba(255,255,255,0.12)`,
          `inset 0 0 0 ${r(1.5)}px rgba(255,255,255,0.06)`,
          `0 ${r(30)}px ${r(80)}px rgba(0,0,0,0.7)`,
          `0 ${r(8)}px ${r(24)}px rgba(0,0,0,0.4)`,
        ].join(', '),
      }}>

        {/* Volume / Action buttons — left side */}
        {[
          { top: r(120), h: r(32), label: 'action' },
          { top: r(172), h: r(68), label: 'vol-up' },
          { top: r(252), h: r(68), label: 'vol-down' },
        ].map(btn => (
          <div key={btn.label} style={{
            position: 'absolute',
            left: r(-3),
            top: btn.top,
            width: r(4),
            height: btn.h,
            background: 'linear-gradient(90deg, #2a2a2c, #3a3a3c)',
            borderRadius: `${r(2)}px 0 0 ${r(2)}px`,
            boxShadow: `inset 0 ${r(1)}px ${r(2)}px rgba(255,255,255,0.08)`,
          }} />
        ))}

        {/* Power button — right side */}
        <div style={{
          position: 'absolute',
          right: r(-3),
          top: r(180),
          width: r(4),
          height: r(90),
          background: 'linear-gradient(270deg, #2a2a2c, #3a3a3c)',
          borderRadius: `0 ${r(2)}px ${r(2)}px 0`,
          boxShadow: `inset 0 ${r(1)}px ${r(2)}px rgba(255,255,255,0.08)`,
        }} />

        {/* Screen */}
        <div style={{
          position: 'absolute',
          top: r(BEZEL),
          left: r(BEZEL),
          width: r(SCREEN_W),
          height: r(SCREEN_H),
          borderRadius: r(38),
          overflow: 'hidden',
          background: '#000',
        }}>
          {/* Scaled content */}
          <div style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
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
          top: r(BEZEL + 10),
          left: '50%',
          transform: 'translateX(-50%)',
          width: r(120),
          height: r(34),
          background: '#000',
          borderRadius: r(20),
          zIndex: 10,
          boxShadow: `0 0 0 ${r(1)}px rgba(255,255,255,0.04)`,
        }} />
      </div>
    </div>
  )
}
