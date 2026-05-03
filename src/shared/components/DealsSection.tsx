import { useDragToScroll } from '@shared/hooks/useDragToScroll'
import { ChevronRightAssetIcon, DealsLineIcon24 } from '@shared/icons/icons'

export interface Deal {
  title: string
  subtitle: string
}

export interface DealsSectionProps {
  deals?: Deal[]
}

const DEFAULT_DEALS: Deal[] = [
  { title: '20% off, up to $5', subtitle: 'Add 2 items to apply' },
  { title: '30% off on orders $20+', subtitle: 'Add $20 to apply' },
]

export function DealsSection({ deals = DEFAULT_DEALS }: DealsSectionProps) {
  const scrollRef = useDragToScroll()

  return (
    <div className="deals-section">
      <div className="deals-section-header">
        <h2 className="deals-section-title">Deals &amp; benefits</h2>
        <button className="deals-section-arrow" aria-label="See all deals">
          <ChevronRightAssetIcon />
        </button>
      </div>
      <div className="deals-section-scroll" ref={scrollRef}>
        {deals.map((deal, i) => (
          <div key={i} className="deals-card">
            <div className="deals-card-icon">
              <DealsLineIcon24 />
            </div>
            <div className="deals-card-body">
              <span className="deals-card-title">{deal.title}</span>
              <span className="deals-card-sub">{deal.subtitle}</span>
            </div>
            <div className="deals-card-chevron">
              <ChevronRightAssetIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
