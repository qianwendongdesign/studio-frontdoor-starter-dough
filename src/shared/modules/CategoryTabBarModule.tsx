/**
 * CategoryTabBarModule — Scrollable icon tab row (Grocery, Going Out, etc.).
 *
 * Usage:
 *   import { CategoryTabBarModule } from '@shared/modules/CategoryTabBarModule'
 *   <CategoryTabBarModule />
 *
 * To customize beyond props, eject: copy CategoryTabBar.tsx into your page folder
 * and modify the tab data and icons directly.
 */

import { CategoryTabBar } from '@shared/components/CategoryTabBar'

interface CategoryTabBarModuleProps {
  /** Custom tab definitions. Defaults to Grocery, Going Out, Deals, Reservations, Health. */
  tabs?: { label: string; Icon: React.ComponentType }[]
}

export function CategoryTabBarModule({ tabs }: CategoryTabBarModuleProps) {
  return <CategoryTabBar tabs={tabs} />
}
