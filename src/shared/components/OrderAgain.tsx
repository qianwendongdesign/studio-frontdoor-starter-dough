import { ChevronRightIcon } from '@shared/icons/icons'
import {
  loadOrderAgainStoresFromCurrentUrl,
  type OrderAgainStoreViewModel,
} from '@shared/data/orderAgainProfiles'

interface OrderAgainProps {
  onRowClick?: (store: OrderAgainStoreViewModel) => void
}

export function OrderAgain({ onRowClick }: OrderAgainProps) {
  const stores = loadOrderAgainStoresFromCurrentUrl()

  return (
    <div className="order-again">
      <div className="section-header">
        <h2 className="section-title">Order again</h2>
        <button className="icon-btn-sm" aria-label="See all"><ChevronRightIcon /></button>
      </div>
      {stores.map((store) => (
        <div
          key={store.name}
          className="store-row"
          onClick={onRowClick ? () => onRowClick(store) : undefined}
          style={onRowClick ? { cursor: 'pointer' } : undefined}
          role={onRowClick ? 'button' : undefined}
          tabIndex={onRowClick ? 0 : undefined}
          onKeyDown={
            onRowClick
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onRowClick(store)
                  }
                }
              : undefined
          }
        >
          {store.logo ? (
            <img src={store.logo} alt="" className="store-logo" width={48} height={48} />
          ) : (
            <div className="store-logo" />
          )}
          <div className="store-text">
            <div className="store-name">{store.name}</div>
            <div className="store-meta">{store.meta}</div>
            {store.tag && <div className="tag tag--rounded tag--deal">{store.tag}</div>}
          </div>
          <div className={`store-thumbs ${store.thumbStyle === 'two' ? 'store-thumbs--two' : store.thumbStyle === 'single' ? 'store-thumbs--single' : ''}`}>
            {store.thumbs.map((src, i) => (
              <img key={i} src={src} alt="" className="store-thumb" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
