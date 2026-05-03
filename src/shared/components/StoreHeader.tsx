import { StatusBar } from './StatusBar'
import {
  ArrowLeftIcon,
  FavoriteLineIcon,
  ShareLineIcon,
  MoreHorizontalIcon,
  InfoFillIcon16,
  StarFillIcon16,
  FavoritesFillIcon,
} from '@shared/icons/icons'
import { useDragToScroll } from '@shared/hooks/useDragToScroll'
import dashPassLogo from '@assets/logos/dashpass-mono.svg'

export interface StoreHeaderProps {
  name: string
  description?: string
  img: string
  logo?: string
  rating: string
  numRatings?: number | string
  dist: string
  dashPassFee?: string
  cuisineRank?: number
  cuisineLabel?: string
  customerPhotos?: string[]
  onBack?: () => void
  showStatusBar?: boolean
}

export function StoreHeader({
  name,
  description,
  img,
  logo,
  rating,
  numRatings,
  dist,
  dashPassFee,
  cuisineRank,
  cuisineLabel,
  customerPhotos,
  onBack,
  showStatusBar = true,
}: StoreHeaderProps) {
  const chipsRef = useDragToScroll()

  return (
    <div className="store-header-v2">
      {showStatusBar && <StatusBar dark />}

      <div className="store-hero-v2">
        <img src={img} alt={name} className="store-hero-v2-img" draggable={false} />
        <div className="store-hero-v2-gradient-top" />
        <div className="store-hero-v2-gradient-bottom" />

        <div className="store-hero-v2-nav">
          <button className="store-hero-btn" aria-label="Back" onClick={onBack}>
            <ArrowLeftIcon />
          </button>
          <div className="store-hero-actions-right">
            <button className="store-hero-btn" aria-label="Favorite">
              <FavoriteLineIcon />
            </button>
            <button className="store-hero-btn" aria-label="Share">
              <ShareLineIcon />
            </button>
            <button className="store-hero-btn" aria-label="More">
              <MoreHorizontalIcon />
            </button>
          </div>
        </div>

        <div className="store-hero-v2-info">
          <div className="store-hero-v2-identity">
            {logo && (
              <img src={logo} alt="" className="store-hero-v2-logo" draggable={false} />
            )}
            <h1 className="store-hero-v2-name">{name}</h1>
          </div>

          {description && (
            <p className="store-hero-v2-desc">{description}</p>
          )}

          <div className="store-hero-v2-meta">
            {dashPassFee && (
              <>
                <img src={dashPassLogo} alt="DashPass" className="store-hero-v2-dashpass" />
                <span>{dashPassFee}</span>
                <span className="store-hero-v2-dot">&middot;</span>
              </>
            )}
            <span>Pricing &amp; fees</span>
            <InfoFillIcon16 />
            <span className="store-hero-v2-dot">&middot;</span>
            <span>{dist}</span>
          </div>

          <div className="store-hero-v2-chips" ref={chipsRef}>
            <div className="store-hero-v2-chip">
              <div className="store-hero-v2-chip-top">
                <span className="store-hero-v2-chip-bold">{rating}</span>
                <StarFillIcon16 />
                <span className="store-hero-v2-chip-bold">
                  ({typeof numRatings === 'number' ? formatCount(numRatings) : numRatings})
                </span>
              </div>
              <span className="store-hero-v2-chip-sub">See reviews</span>
            </div>

            {cuisineRank != null && cuisineLabel && (
              <div className="store-hero-v2-chip store-hero-v2-chip--horizontal">
                <div className="store-hero-v2-chip-icon">
                  <FavoritesFillIcon />
                </div>
                <div className="store-hero-v2-chip-text">
                  <span className="store-hero-v2-chip-bold">#{cuisineRank}</span>
                  <span className="store-hero-v2-chip-sub">{cuisineLabel}</span>
                </div>
              </div>
            )}

            {customerPhotos && customerPhotos.length >= 2 && (
              <div className="store-hero-v2-chip store-hero-v2-chip--horizontal store-hero-v2-chip--photos">
                <div className="store-hero-v2-chip-photos">
                  <img src={customerPhotos[0]} alt="" className="store-hero-v2-chip-photo store-hero-v2-chip-photo--back" draggable={false} />
                  <img src={customerPhotos[1]} alt="" className="store-hero-v2-chip-photo store-hero-v2-chip-photo--front" draggable={false} />
                </div>
                <div className="store-hero-v2-chip-text">
                  <span className="store-hero-v2-chip-bold">Customer photos</span>
                  <span className="store-hero-v2-chip-sub">See all</span>
                </div>
              </div>
            )}

            <div className="store-hero-v2-chip store-hero-v2-chip--horizontal">
              <div className="store-hero-v2-chip-icon">
                <InfoFillIcon16 />
              </div>
              <div className="store-hero-v2-chip-text">
                <span className="store-hero-v2-chip-bold">Store info</span>
                <span className="store-hero-v2-chip-sub">See details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

