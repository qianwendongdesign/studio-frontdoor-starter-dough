import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRightIcon, StarIcon } from '@shared/icons/icons'

export interface CartSheetItem {
  id: string
  name: string
  price: number
  image?: string
}

export interface CartSheetStore {
  name: string
  logo?: string
  rating?: string
  time?: string
  distance?: string
}

interface CartSheetProps {
  store: CartSheetStore
  items: CartSheetItem[]
  onClose: () => void
}

function TrashLineIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99976 0C7.69011 0 8.25 0.559888 8.25 1.25024V2.25H10.5C10.9142 2.25 11.25 2.58579 11.25 3C11.25 3.41421 10.9142 3.75 10.5 3.75V9.75C10.5 10.9926 9.49264 12 8.25 12H3.75C2.50736 12 1.5 10.9926 1.5 9.75V3.75C1.08579 3.75 0.75 3.41421 0.75 3C0.75 2.58579 1.08579 2.25 1.5 2.25H3.75V1.25024C3.75 0.559888 4.30989 0 5.00024 0H6.99976ZM3 9.75C3 10.1642 3.33579 10.5 3.75 10.5H8.25C8.66421 10.5 9 10.1642 9 9.75V3.75H3V9.75ZM5.25 2.25H6.75V1.5H5.25V2.25Z"
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

function formatRating(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  const n = Number(raw)
  if (!Number.isFinite(n)) return raw
  // Truncate to one decimal (e.g., "4.77" → "4.7", not rounded to "4.8")
  return (Math.trunc(n * 10) / 10).toFixed(1)
}

function getInitials(name: string) {
  const cleaned = name.replace(/[^A-Za-z\s]/g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function CartSheet({ store, items, onClose }: CartSheetProps) {
  const initialQty = useMemo(() => {
    const m: Record<string, number> = {}
    for (const it of items) m[it.id] = 1
    return m
  }, [items])

  const [quantities, setQuantities] = useState<Record<string, number>>(initialQty)

  useEffect(() => {
    setQuantities(initialQty)
  }, [initialQty])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const bump = useCallback((id: string, delta: number) => {
    setQuantities((q) => {
      const next = { ...q }
      const cur = next[id] ?? 0
      const v = Math.max(0, cur + delta)
      next[id] = v
      return next
    })
  }, [])

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0
    let sum = 0
    for (const it of items) {
      const q = quantities[it.id] ?? 0
      count += q
      sum += it.price * q
    }
    return { itemCount: count, subtotal: Math.round(sum * 100) / 100 }
  }, [items, quantities])

  const portalTarget =
    (typeof document !== 'undefined' && document.getElementById('phone-screen')) ||
    (typeof document !== 'undefined' ? document.body : null)
  if (!portalTarget) return null

  return createPortal(
    <div className="cart-sheet-root" role="presentation">
      <button
        type="button"
        className="cart-sheet-backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="cart-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sheet-title"
      >
        <div className="cart-sheet-grabber-wrap">
          <div className="cart-sheet-grabber" aria-hidden />
        </div>

        <div className="cart-sheet-header">
          <h2 id="cart-sheet-title" className="cart-sheet-title">Review order</h2>
        </div>

        <div className="cart-sheet-body">
          <div className="cart-sheet-store">
            <div className="cart-sheet-store-logo">
              {store.logo ? (
                <img src={store.logo} alt="" draggable={false} />
              ) : (
                <span className="cart-sheet-store-initials">{getInitials(store.name)}</span>
              )}
            </div>
            <div className="cart-sheet-store-info">
              <div className="cart-sheet-store-name">{store.name}</div>
              <div className="cart-sheet-store-meta">
                {(() => {
                  const rating = formatRating(store.rating)
                  return rating ? (
                    <span className="cart-sheet-store-rating">
                      {rating} <StarIcon />
                    </span>
                  ) : null
                })()}
                {store.time && (
                  <>
                    <span className="cart-sheet-store-dot">·</span>
                    <span>{store.time}</span>
                  </>
                )}
                {store.distance && (
                  <>
                    <span className="cart-sheet-store-dot">·</span>
                    <span>{store.distance}</span>
                  </>
                )}
              </div>
            </div>
            <span className="cart-sheet-store-chevron" aria-hidden>
              <ChevronRightIcon />
            </span>
          </div>

          <ul className="cart-sheet-items">
            {items.map((it) => {
              const q = quantities[it.id] ?? 0
              return (
                <li key={it.id} className="cart-sheet-item">
                  <div className="cart-sheet-item-image">
                    {it.image && (
                      <img src={it.image} alt="" draggable={false} />
                    )}
                  </div>
                  <div className="cart-sheet-item-info">
                    <div className="cart-sheet-item-name">{it.name}</div>
                    <div className="cart-sheet-item-price">{formatMoney(it.price)}</div>
                  </div>
                  <div className="cart-sheet-stepper">
                    <button
                      type="button"
                      className="cart-sheet-stepper-btn"
                      aria-label={q <= 1 ? `Remove ${it.name}` : `Decrease ${it.name}`}
                      onClick={() => bump(it.id, -1)}
                    >
                      <TrashLineIcon />
                    </button>
                    <span className="cart-sheet-stepper-value">{q}</span>
                    <button
                      type="button"
                      className="cart-sheet-stepper-btn"
                      aria-label={`Increase ${it.name}`}
                      onClick={() => bump(it.id, 1)}
                    >
                      <PlusLineIcon />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="cart-sheet-subtotal">
            <span className="cart-sheet-subtotal-label">Subtotal</span>
            <span className="cart-sheet-subtotal-count">
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span className="cart-sheet-subtotal-spacer" />
            <span className="cart-sheet-subtotal-value">{formatMoney(subtotal)}</span>
          </div>
        </div>

        <div className="cart-sheet-cta-wrap">
          <button type="button" className="cart-sheet-cta">
            Checkout now
          </button>
        </div>

        <div className="cart-sheet-home-indicator" aria-hidden />
      </div>
    </div>,
    portalTarget,
  )
}
