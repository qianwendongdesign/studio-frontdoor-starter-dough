import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface CollectionItem {
  id: string
  name: string
  price: number
  image: string
  storeName: string
  storeLogo?: string
  deliveryTime?: string
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.9279 1.60474C6.33195 0.661944 7.66805 0.661945 8.0721 1.60474L9.36922 4.63078L12.3953 5.9279C13.3381 6.33195 13.3381 7.66805 12.3953 8.0721L9.36922 9.36922L8.0721 12.3953C7.66805 13.3381 6.33195 13.3381 5.9279 12.3953L4.63078 9.36922L1.60474 8.0721C0.661946 7.66805 0.661943 6.33195 1.60474 5.9279L4.63078 4.63078L5.9279 1.60474ZM5.70288 5.09049C5.58488 5.36567 5.36567 5.58488 5.09049 5.70288L2.06445 7L5.09049 8.29712C5.36567 8.41512 5.58488 8.63433 5.70288 8.9095L7 11.9355L8.29712 8.9095C8.41512 8.63433 8.63433 8.41512 8.9095 8.29712L11.9355 7L8.9095 5.70288C8.63433 5.58488 8.41512 5.36567 8.29712 5.09049L7 2.06445L5.70288 5.09049ZM1.16667 2.91667V2.33333H0.583333C0.261167 2.33333 7.47513e-08 2.07217 0 1.75C1.92026e-08 1.42783 0.261167 1.16667 0.583333 1.16667H1.16667V0.583333C1.16667 0.261167 1.42783 1.92026e-08 1.75 0C2.07217 -4.11668e-10 2.33333 0.261167 2.33333 0.583333V1.16667H2.91667C3.23883 1.16667 3.5 1.42783 3.5 1.75C3.5 2.07217 3.23883 2.33333 2.91667 2.33333H2.33333V2.91667C2.33333 3.23883 2.07217 3.5 1.75 3.5C1.42783 3.5 1.16667 3.23883 1.16667 2.91667Z"
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
                  {it.deliveryTime && (
                    <>
                      <span className="collection-sheet-item-store-dot">·</span>
                      <span className="collection-sheet-item-store-time">{it.deliveryTime}</span>
                    </>
                  )}
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
