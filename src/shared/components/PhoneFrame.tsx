import { useEffect, useState, ReactNode } from 'react'

const PHONE_W = 393
const PHONE_H = 852

export function PhoneFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / PHONE_W, window.innerHeight / PHONE_H)
      setScale(s)
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
      background: '#111',
      overflow: 'hidden',
    }}>
      <div style={{
        width: PHONE_W * scale,
        height: PHONE_H * scale,
        position: 'relative',
        flexShrink: 0,
        borderRadius: 47 * scale,
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.6)',
      }}>
        <div style={{
          width: PHONE_W,
          height: PHONE_H,
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#fff',
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}
