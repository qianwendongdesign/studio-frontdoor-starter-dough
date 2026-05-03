import { useState, useCallback, useRef, useEffect, memo } from 'react'
import { StarIcon } from '@shared/icons/icons'
import { FilterChips } from './FilterChips'

// Real store header images from DoorDash CDN (DIMENSION_BUSINESS.HEADER_IMAGE)
const CDN_TENDER_GREENS    = 'https://cdn.doordash.com/media/store/header/568ddb97-9b71-4178-848e-c5e9391b1f43.jpg'
const CDN_GOOP_KITCHEN     = 'https://cdn.doordash.com/media/store/header/d4dfbad6-53ff-4f2e-90f0-b35b2d94c85c.png'
const CDN_WEST_COAST_BOWLS = 'https://cdn.doordash.com/media/store/header/656358.jpg'
const CDN_CAVA             = 'https://cdn.doordash.com/media/store/header/1d82c3fe-09ab-4663-b301-1fa04e21b901.jpg'
const CDN_QDOBA            = 'https://cdn.doordash.com/media/store/header/d7d51aed-7f5c-4a00-86a5-ce160096eabe.png'
const CDN_DOS_TOROS        = 'https://cdn.doordash.com/media/store/header/34129.jpg'
const CDN_RUBIOS           = 'https://cdn.doordash.com/media/store/header/8b4aac1a-ec48-4893-a299-577c42c9816e.png'
const CDN_MARUGAME_UDON    = 'https://cdn.doordash.com/media/store/header/54da62ef-ece1-4600-ba79-a34dfa3d69e6.jpg'
const CDN_SILVERLAKE_RAMEN = 'https://cdn.doordash.com/media/store/header/b447b431-bb97-44ed-ae1c-072ceb9b00c6.jpg'
const CDN_TATSU_RAMEN      = 'https://cdn.doordash.com/media/store/header/304ccedd-9211-4a92-a2d2-736bfad4c3ae.jpg'
const CDN_TSUJITA          = 'https://cdn.doordash.com/media/store/header/38a58202-5ee3-4bcd-912c-edd22e2b7ae3.jpg'

interface Store {
  name: string
  rating: string
  time: string
  dist: string
  fee: string
  tag?: string
  img: string
}

const FILTER_TABS = ['Sweetgreen', 'Chipotle', 'Nagi Ramen']

const STORES_BY_TAB: Record<string, Store[]> = {
  Sweetgreen: [
    { name: 'Tender Greens',  rating: '4.6', time: '30 min', dist: '0.4 mi', fee: '$3.99 delivery fee', tag: '20% off on $30+', img: CDN_TENDER_GREENS },
    { name: 'Goop Kitchen',   rating: '4.7', time: '35 min', dist: '0.7 mi', fee: '$3.99 delivery fee',                         img: CDN_GOOP_KITCHEN },
    { name: 'Mendocino Farms', rating: '4.8', time: '30 min', dist: '0.6 mi', fee: '$3.99 delivery fee', tag: '20% off on $30+', img: 'https://cdn.doordash.com/media/store/header/7559887b-ce55-42e4-ba56-12e5e1ccd1d4.jpg' },
    { name: 'West Coast Bowls', rating: '4.6', time: '32 min', dist: '2.4 mi', fee: '$3.99 delivery fee', tag: '$6 off on $35+', img: CDN_WEST_COAST_BOWLS },
  ],
  Chipotle: [
    { name: 'Cava',           rating: '4.7', time: '25 min', dist: '0.5 mi', fee: '$2.99 delivery fee', tag: '$5 off on $25+',  img: CDN_CAVA },
    { name: 'Qdoba',          rating: '4.5', time: '28 min', dist: '0.8 mi', fee: '$3.99 delivery fee',                         img: CDN_QDOBA },
    { name: 'Dos Toros',      rating: '4.8', time: '32 min', dist: '0.6 mi', fee: '$1.99 delivery fee', tag: 'Buy 1, get 1 free', img: CDN_DOS_TOROS },
    { name: "Rubio's Coastal", rating: '4.6', time: '30 min', dist: '1.1 mi', fee: '$3.99 delivery fee',                        img: CDN_RUBIOS },
  ],
  'Nagi Ramen': [
    { name: 'Marugame Udon',  rating: '4.9', time: '35 min', dist: '0.9 mi', fee: '$3.99 delivery fee', tag: '15% off on $30+', img: CDN_MARUGAME_UDON },
    { name: 'Silverlake Ramen', rating: '4.7', time: '28 min', dist: '0.7 mi', fee: '$2.99 delivery fee',                       img: CDN_SILVERLAKE_RAMEN },
    { name: 'Tatsu Ramen',    rating: '4.8', time: '40 min', dist: '1.2 mi', fee: '$4.99 delivery fee', tag: '$8 off on $40+',  img: CDN_TATSU_RAMEN },
    { name: 'Tsujita LA',     rating: '4.6', time: '22 min', dist: '0.3 mi', fee: '$1.99 delivery fee',                         img: CDN_TSUJITA },
  ],
}

const CROSSFADE_MS = 600

const CrossfadeImage = memo(function CrossfadeImage({ src }: { src: string }) {
  const [bottom, setBottom] = useState(src)
  const [top, setTop] = useState<string | null>(null)
  const [topVisible, setTopVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const rafRef = useRef<number>()

  useEffect(() => {
    if (src === bottom) {
      setTop(null)
      setTopVisible(false)
      return
    }

    const img = new Image()
    img.src = src

    const startTransition = () => {
      setTop(src)
      setTopVisible(false)
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setTopVisible(true)
          timerRef.current = setTimeout(() => {
            setBottom(src)
            setTop(null)
            setTopVisible(false)
          }, CROSSFADE_MS)
        })
      })
    }

    if (img.complete) {
      startTransition()
    } else {
      img.onload = startTransition
    }

    return () => {
      img.onload = null
      clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [src, bottom])

  return (
    <div className="store-card-img-wrapper">
      <img src={bottom} alt="" className="store-card-img" />
      {top && (
        <img
          src={top}
          alt=""
          className={`store-card-img store-card-img--top ${topVisible ? 'store-card-img--visible' : ''}`}
        />
      )}
    </div>
  )
})

interface SimilarSectionProps {
  onStoreClick?: (store: Store) => void
}

export function SimilarSection({ onStoreClick }: SimilarSectionProps) {
  const [activeTab, setActiveTab] = useState('Sweetgreen')

  const handleTabClick = useCallback((tab: string) => {
    if (tab === activeTab) return
    setActiveTab(tab)
  }, [activeTab])

  const stores = STORES_BY_TAB[activeTab] ?? STORES_BY_TAB.Sweetgreen

  return (
    <div className="similar-section">
      <div className="section-header">
        <h2 className="section-title">Similar to your favorites</h2>
      </div>
      <FilterChips
        chips={FILTER_TABS}
        activeLabel={activeTab}
        onSelect={handleTabClick}
        containerClassName="filter-chips--section"
      />
      <div className="store-grid">
        {stores.map((store, i) => (
          <article key={i} className="store-card" onClick={() => onStoreClick?.(store)} style={onStoreClick ? { cursor: 'pointer' } : undefined}>
            <CrossfadeImage src={store.img} />
            <div key={store.name} className="store-card-meta">
              <div className="store-card-name">{store.name}</div>
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
    </div>
  )
}
