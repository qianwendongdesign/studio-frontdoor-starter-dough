import { ThumbsUpLineIcon16, AddIcon } from '@shared/icons/icons'

export interface MenuItem {
  id: number
  name: string
  price: number
  description: string
  category: string
  img: string
  approval?: number
  tag?: string | null
  label?: string | null
}

export interface MenuSectionProps {
  title?: string
  items: MenuItem[]
  onAddToCart?: (item: MenuItem) => void
}

export function MenuSection({ title = 'Breakfast', items, onAddToCart }: MenuSectionProps) {
  return (
    <div className="menu-section">
      <div className="menu-section-header">
        <h2 className="menu-section-title">{title}</h2>
      </div>
      <div className="menu-items">
        {items.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-info">
              <div className="menu-item-name">{item.name}</div>
              <div className="menu-item-desc">{item.description}</div>
              <div className="menu-item-price-line">
                <span className="menu-item-price">${item.price.toFixed(2)}</span>
                {item.approval != null && (
                  <>
                    <span className="menu-item-dot">·</span>
                    <span className="menu-item-approval">
                      <ThumbsUpLineIcon16 />
                      {item.approval}% ({Math.floor(item.approval * 0.75)})
                    </span>
                  </>
                )}
              </div>
              {item.tag && (
                <span className={`tag tag--rounded ${item.tag.startsWith('#') ? 'tag--rank' : 'tag--deal'}`}>
                  {item.tag}
                </span>
              )}
              {item.label && <span className="menu-item-label">{item.label}</span>}
            </div>
            {item.img && (
              <div className="menu-item-img-wrap">
                <img src={item.img} alt="" className="menu-item-img" />
                <button
                  className="menu-item-add"
                  aria-label={`Add ${item.name}`}
                  onClick={() => onAddToCart?.(item)}
                >
                  <AddIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
