import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface CollectionItem {
  id: string
  name: string
  price: number
  image: string
  storeName: string
  storeLogo?: string
}

export interface CollectionSheetData {
  title: string
  subtitle: string
  items: CollectionItem[]
}

interface CollectionSheetProps {
  data: CollectionSheetData
  onClose: () => void
}

function PromoLineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 1L4.2 3.3L6.5 4L4.2 4.7L3.5 7L2.8 4.7L0.5 4L2.8 3.3L3.5 1Z"
        fill="currentColor"
      />
      <path
        d="M9.5 5L10.5 8L13.5 9L10.5 10L9.5 13L8.5 10L5.5 9L8.5 8L9.5 5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PlusLineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`
}

export function CollectionSheet({ data, onClose }: CollectionSheetProps) {
  const [isExiting, setIsExiting] = useState(false)
  const requestClose = useCallback(() => setIsExiting(true), [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [requestClose])

  const portalTarget =
    (typeof document !== 'undefined' && document.getElementById('phone-screen')) ||
    (typeof document !== 'undefined' ? document.body : null)
  if (!portalTarget) return null

  return createPortal(
    <div
      className={`collection-sheet-root${isExiting ? ' collection-sheet-root--exiting' : ''}`}
      role="presentation"
    >
      <button
        type="button"
        className="collection-sheet-backdrop"
        aria-label="Close"
        onClick={requestClose}
      />
      <div
        className="collection-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-sheet-title"
        onAnimationEnd={(e) => {
          if (isExiting && e.animationName === 'collectionSheetPanelOut') onClose()
        }}
      >
        <div className="collection-sheet-grabber-wrap">
          <div className="collection-sheet-grabber" aria-hidden />
        </div>

        <div className="collection-sheet-header">
          <h2 id="collection-sheet-title" className="collection-sheet-title">{data.title}</h2>
          <div className="collection-sheet-subtitle">
            <span className="collection-sheet-subtitle-icon" aria-hidden>
              <PromoLineIcon />
            </span>
            <span>{data.subtitle}</span>
          </div>
        </div>

        <ul className="collection-sheet-items">
          {data.items.map((it) => (
            <li key={it.id} className="collection-sheet-item">
              <div className="collection-sheet-item-image">
                <img src={it.image} alt="" draggable={false} />
              </div>
              <div className="collection-sheet-item-info">
                <div className="collection-sheet-item-name">{it.name}</div>
                <div className="collection-sheet-item-price">{formatMoney(it.price)}</div>
                <div className="collection-sheet-item-store">
                  <span className="collection-sheet-item-store-logo">
                    {it.storeLogo && <img src={it.storeLogo} alt="" draggable={false} />}
                  </span>
                  <span className="collection-sheet-item-store-name">{it.storeName}</span>
                </div>
              </div>
              <button
                type="button"
                className="collection-sheet-add-btn"
                aria-label={`Add ${it.name} from ${it.storeName}`}
              >
                <PlusLineIcon />
              </button>
            </li>
          ))}
        </ul>

        <div className="collection-sheet-home-indicator" aria-hidden />
      </div>
    </div>,
    portalTarget,
  )
}
