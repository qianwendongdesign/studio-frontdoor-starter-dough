import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRightIcon, StarIcon } from '@shared/icons/icons'

export interface OrderLineItem {
  id: string
  name: string
  price: number
  image: string
}

export interface ReorderSheetStore {
  name: string
  image: string
  rating: string
  time: string
  distance: string
}

interface ReorderOrderHistorySheetProps {
  store: ReorderSheetStore
  items: OrderLineItem[]
  onClose: () => void
  onAddToCart: (payload: {
    storeName: string
    lines: { id: string; name: string; qty: number; unitPrice: number }[]
  }) => void
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4.5 4.5V15c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5V4.5M7.5 8.25V12M10.5 8.25V12M2.25 4.5h13.5M6.75 4.5V3c0-.41.34-.75.75-.75h3c.41 0 .75.34.75.75v1.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 3.75v10.5M3.75 9h10.5"
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

export function ReorderOrderHistorySheet({
  store,
  items,
  onClose,
  onAddToCart,
}: ReorderOrderHistorySheetProps) {
  const initialQty = useMemo(() => {
    const m: Record<string, number> = {}
    for (const it of items) m[it.id] = 1
    return m
  }, [items])

  const [quantities, setQuantities] = useState<Record<string, number>>(initialQty)

  useEffect(() => {
    setQuantities(initialQty)
  }, [initialQty, store.name])

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
      if (v === 0) delete next[id]
      else next[id] = v
      return next
    })
  }, [])

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0
    let sum = 0
    for (const it of items) {
      const q = quantities[it.id] ?? 0
      if (q > 0) {
        count += q
        sum += it.price * q
      }
    }
    return { itemCount: count, subtotal: Math.round(sum * 100) / 100 }
  }, [items, quantities])

  const handleCheckout = () => {
    const lines = items
      .map((it) => {
        const qty = quantities[it.id] ?? 0
        if (qty <= 0) return null
        return { id: it.id, name: it.name, qty, unitPrice: it.price }
      })
      .filter(Boolean) as { id: string; name: string; qty: number; unitPrice: number }[]

    if (lines.length === 0) return
    onAddToCart({ storeName: store.name, lines })
    onClose()
  }

  const shortName = store.name.split('(')[0].trim()

  return createPortal(
    <div className="reorder-sheet-root" role="presentation">
      <button
        type="button"
        className="reorder-sheet-backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="reorder-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reorder-sheet-title"
      >
        <div className="reorder-sheet-handle" aria-hidden />

        <div className="reorder-sheet-header">
          <img src={store.image} alt="" className="reorder-sheet-logo" draggable={false} />
          <div className="reorder-sheet-header-text">
            <h2 id="reorder-sheet-title" className="reorder-sheet-store-name">
              {shortName}
            </h2>
            <p className="reorder-sheet-store-meta">
              {store.rating} <StarIcon /> <span className="dot">·</span> {store.time}{' '}
              <span className="dot">·</span> {store.distance}
            </p>
          </div>
          <button type="button" className="reorder-sheet-chevron" aria-label="View store">
            <ChevronRightIcon />
          </button>
        </div>

        <p className="reorder-sheet-section-label reorder-sheet-section-label--enter">Your last order</p>

        <div className="reorder-sheet-scroll">
          <ul className="reorder-sheet-list">
            {items.map((it, rowIndex) => {
              const q = quantities[it.id] ?? 0
              return (
                <li
                  key={it.id}
                  className={`reorder-sheet-row reorder-sheet-row--enter${
                    q === 0 ? ' reorder-sheet-row--removed' : ''
                  }`}
                  style={
                    { ['--reorder-sheet-row-i' as string]: String(rowIndex) } as CSSProperties
                  }
                >
                  <img src={it.image} alt="" className="reorder-sheet-thumb" draggable={false} />
                  <div className="reorder-sheet-row-text">
                    <div className="reorder-sheet-item-name">{it.name}</div>
                    <div className="reorder-sheet-item-price">{formatMoney(it.price)}</div>
                  </div>
                  {q === 0 ? (
                    <button
                      type="button"
                      className="reorder-sheet-add-again"
                      onClick={() => bump(it.id, 1)}
                    >
                      Add
                    </button>
                  ) : (
                    <div className="reorder-sheet-qty">
                      <button
                        type="button"
                        className="reorder-sheet-qty-btn"
                        aria-label={q <= 1 ? `Remove ${it.name}` : `Decrease ${it.name}`}
                        onClick={() => bump(it.id, -1)}
                      >
                        <TrashIcon />
                      </button>
                      <span className="reorder-sheet-qty-value">{q}</span>
                      <button
                        type="button"
                        className="reorder-sheet-qty-btn"
                        aria-label={`Increase ${it.name}`}
                        onClick={() => bump(it.id, 1)}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className="reorder-sheet-footer reorder-sheet-footer--enter"
          style={
            {
              ['--reorder-sheet-footer-stagger-i' as string]: String(items.length),
            } as CSSProperties
          }
        >
          <div className="reorder-sheet-subtotal-row">
            <span className="reorder-sheet-subtotal-label">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
            <span className="reorder-sheet-subtotal-value">{formatMoney(subtotal)}</span>
          </div>
          <button
            type="button"
            className="reorder-sheet-checkout"
            disabled={itemCount === 0}
            onClick={handleCheckout}
          >
            Checkout now
          </button>
        </div>

        <div className="reorder-sheet-home-indicator" aria-hidden />
      </div>
    </div>,
    document.body,
  )
}
