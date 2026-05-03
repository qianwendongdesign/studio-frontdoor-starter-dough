import { StarIcon } from '@shared/icons/icons'
import { useDragToScroll } from '@shared/hooks/useDragToScroll'

interface Store {
  name: string
  rating: string
  time: string
  dist: string
  fee: string
  tag?: string
  img: string
}

interface CarouselSectionProps {
  title: string
  stores: Store[]
  onStoreClick?: (store: Store) => void
}

export function CarouselSection({ title, stores, onStoreClick }: CarouselSectionProps) {
  const scrollRef = useDragToScroll()

  return (
    <section className="carousel-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="carousel-scroll" ref={scrollRef}>
        {stores.map((store) => (
          <article key={store.name} className="carousel-card" onClick={() => onStoreClick?.(store)} style={onStoreClick ? { cursor: 'pointer' } : undefined}>
            <img src={store.img} alt="" className="carousel-card-img" draggable={false} />
            <div>
              <div className="carousel-card-name">{store.name}</div>
              <div className="store-card-rating">
                {store.rating} <StarIcon />
                <span className="dot">·</span>
                <span className="store-card-detail">{store.time}</span>
                <span className="dot">·</span>
                <span className="store-card-detail">{store.dist}</span>
              </div>
              <div className="store-card-detail">{store.fee}</div>
              {store.tag && <div className="tag tag--rounded tag--deal">{store.tag}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
