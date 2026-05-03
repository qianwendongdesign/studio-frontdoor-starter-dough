import { useState } from 'react'
import { ThumbsUpLineIcon16, AddIcon } from '@shared/icons/icons'
import { FilterChips } from './FilterChips'

export interface FoodItem {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  img: string
  approval?: number | null
  reviewCount?: number | null
  promoTag?: string | null
  rankTag?: string | null
  category: string
}

export interface FoodGridProps {
  title?: string
  subtitle?: string
  items: FoodItem[]
  showChips?: boolean
  onAddToCart?: (item: FoodItem) => void
}

export function FoodGrid({
  title = 'What are you looking for?',
  subtitle,
  items,
  showChips = true,
  onAddToCart,
}: FoodGridProps) {
  const categories = [...new Set(items.map((item) => item.category))]
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? '')

  const filtered = showChips
    ? items.filter((item) => item.category === activeCategory)
    : items

  return (
    <div className="food-grid-section">
      <div className="food-grid-header">
        <h2 className="food-grid-title">{title}</h2>
        {subtitle && <p className="food-grid-subtitle">{subtitle}</p>}
      </div>
      {showChips && (
        <FilterChips
          chips={categories}
          activeLabel={activeCategory}
          onSelect={setActiveCategory}
        />
      )}
      <div className="food-grid">
        {filtered.map((item) => (
          <div key={item.id} className="food-tile">
            <div className="food-tile-img-wrap">
              <img src={item.img} alt={item.name} className="food-tile-img" draggable={false} />
              <button
                className="food-tile-add"
                aria-label={`Add ${item.name}`}
                onClick={() => onAddToCart?.(item)}
              >
                <AddIcon />
              </button>
            </div>
            <div className="food-tile-meta">
              <span className="food-tile-name">{item.name}</span>
              <div className="food-tile-price-line">
                {item.originalPrice != null ? (
                  <>
                    <span className="food-tile-sale-price">
                      2 for ${item.price.toFixed(2)}
                    </span>
                    <span className="food-tile-original-price">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="food-tile-price">${item.price.toFixed(2)}</span>
                )}
                {item.approval != null && (
                  <>
                    <span className="food-tile-dot">·</span>
                    <span className="food-tile-approval">
                      <ThumbsUpLineIcon16 />
                      {item.approval}% ({item.reviewCount ?? Math.floor(item.approval * 1.8)})
                    </span>
                  </>
                )}
              </div>
              {item.promoTag && (
                <span className="tag tag--rounded tag--deal">{item.promoTag}</span>
              )}
              {item.rankTag && (
                <span className="tag tag--rounded tag--rank">{item.rankTag}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
