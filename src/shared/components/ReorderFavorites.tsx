import { Fragment, ReactNode } from 'react'
import { useDragToScroll } from '@shared/hooks/useDragToScroll'
import { AddIcon } from '@shared/icons/icons'

function ClockIcon() {
  return (
    <svg
      className="reorder-fav-clock"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function QuickAddButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="reorder-fav-card__quick-add"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="reorder-fav-card__quick-add-icon">
        <AddIcon />
      </span>
    </button>
  )
}

export type CardMerchant = {
  name: string
  deliverBy: string
  logo: string
  images: [string, string, string]
  items?: [string, string, string]
  rating?: string
  deliveryEta?: string
}

function ReorderCard({ merchant, onViewCart }: { merchant: CardMerchant; onViewCart?: (m: CardMerchant) => void }) {
  const [hero, a, b] = merchant.images
  const labels = merchant.items
  const isTwoItems = b === hero

  return (
    <article className="reorder-fav-card">
      <div className="reorder-fav-card__header">
        <img src={merchant.logo} alt="" className="reorder-fav-card__logo" width={40} height={40} />
        <div className="reorder-fav-card__headline">
          <div className="reorder-fav-card__name">{merchant.name}</div>
          <div className="reorder-fav-card__meta">
            <ClockIcon />
            <span>Deliver by {merchant.deliverBy}</span>
          </div>
        </div>
      </div>

      <div className={`reorder-fav-card__grid${isTwoItems ? ' reorder-fav-card__grid--two' : ''}`}>
        <div className="reorder-fav-card__cell reorder-fav-card__cell--hero">
          <img src={hero} alt="" className="reorder-fav-card__img" draggable={false} />
          <QuickAddButton
            label={labels?.[0] ? `Quick add ${labels[0]} from ${merchant.name}` : `Quick add item from ${merchant.name}`}
          />
        </div>
        <div className="reorder-fav-card__cell">
          <img src={a} alt="" className="reorder-fav-card__img" draggable={false} />
          <QuickAddButton
            label={labels?.[1] ? `Quick add ${labels[1]} from ${merchant.name}` : 'Quick add'}
          />
        </div>
        {!isTwoItems && (
          <div className="reorder-fav-card__cell">
            <img src={b} alt="" className="reorder-fav-card__img" draggable={false} />
            <QuickAddButton
              label={labels?.[2] ? `Quick add ${labels[2]} from ${merchant.name}` : 'Quick add'}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        className="reorder-fav-card__cta"
        onClick={(e) => {
          e.stopPropagation()
          onViewCart?.(merchant)
        }}
      >
        View cart
      </button>
    </article>
  )
}

export interface ExtraCard {
  card: ReactNode
  afterIndex: number
}

interface ReorderFavoritesProps {
  merchants: CardMerchant[]
  extraCards?: ExtraCard[]
  onViewCart?: (m: CardMerchant) => void
}

export function ReorderFavorites({ merchants, extraCards, onViewCart }: ReorderFavoritesProps) {
  const scrollRef = useDragToScroll()

  return (
    <section className="reorder-favorites" aria-label="Reorder your favorites">
      <h2 className="section-title reorder-favorites__title">Reorder your favorites</h2>
      <div className="reorder-favorites__scroll" ref={scrollRef}>
        {merchants.map((m, i) => (
          <Fragment key={`${m.name}-${i}`}>
            <ReorderCard merchant={m} onViewCart={onViewCart} />
            {extraCards
              ?.filter((e) => e.afterIndex === i)
              .map((e, idx) => (
                <Fragment key={`extra-${i}-${idx}`}>{e.card}</Fragment>
              ))}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
