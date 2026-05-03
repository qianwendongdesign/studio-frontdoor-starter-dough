import { ChevronRightIcon } from '@shared/icons/icons'
import { loadOrderAgainStoresFromCurrentUrl } from '@shared/data/orderAgainProfiles'

export function OrderAgain() {
  const stores = loadOrderAgainStoresFromCurrentUrl()

  return (
    <div className="order-again">
      <div className="section-header">
        <h2 className="section-title">Order again</h2>
        <button className="icon-btn-sm" aria-label="See all"><ChevronRightIcon /></button>
      </div>
      {stores.map((store) => (
        <div key={store.name} className="store-row">
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
