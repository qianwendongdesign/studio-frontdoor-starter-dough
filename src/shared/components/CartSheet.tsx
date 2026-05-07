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
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 3V10c0 .55.45 1 1 1h4c.55 0 1-.45 1-1V3M5 5.25V8.5M7 5.25V8.5M1.5 3h9M4.5 3V2c0-.27.22-.5.5-.5h2c.28 0 .5.23.5.5v1"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlusLineIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 2.5v7M2.5 6h7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function formatMoney(n: number) {
  return `$${n.toFixed(2)}`
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
                {store.rating && (
                  <span className="cart-sheet-store-rating">
                    {store.rating} <StarIcon />
                  </span>
                )}
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
    document.body,
  )
}
