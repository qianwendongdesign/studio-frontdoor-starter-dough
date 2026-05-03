import { GroceryIcon, GoingOutIcon, DealsIcon, ReservationsIcon, HealthIcon, SocialIcon } from '@shared/icons/icons'

export interface TabConfig {
  label: string
  Icon: React.ComponentType
  href?: string
}

const DEFAULT_TABS: TabConfig[] = [
  { label: 'Social', Icon: SocialIcon, href: '/pages/reviews-feed/' },
  { label: 'Grocery', Icon: GroceryIcon },
  { label: 'Going Out', Icon: GoingOutIcon },
  { label: 'Deals', Icon: DealsIcon },
  { label: 'Reservations', Icon: ReservationsIcon },
  { label: 'Health', Icon: HealthIcon },
]

interface CategoryTabBarProps {
  tabs?: TabConfig[]
}

export function CategoryTabBar({ tabs = DEFAULT_TABS }: CategoryTabBarProps) {
  return (
    <nav className="tab-bar">
      {tabs.map(({ label, Icon, href }) => {
        const content = (
          <>
            <Icon />
            {label}
          </>
        )
        if (href) {
          return (
            <a key={label} href={href} className="tab tab--link">
              {content}
            </a>
          )
        }
        return (
          <button key={label} type="button" className="tab">
            {content}
          </button>
        )
      })}
    </nav>
  )
}
