/**
 * StandardCarouselModule — Horizontal scrolling store cards with title.
 *
 * Usage:
 *   import { StandardCarouselModule } from '@shared/modules/StandardCarouselModule'
 *   <StandardCarouselModule title="Chicken and rice bowls" stores={stores} />
 *
 * To customize beyond props, eject: copy CarouselSection.tsx into your page folder
 * and modify the raw component directly.
 */

import { CarouselSection } from '@shared/components/CarouselSection'

interface Store {
  name: string
  rating: string
  time: string
  dist: string
  fee: string
  tag?: string
  img: string
}

interface StandardCarouselModuleProps {
  /** Section heading displayed above the carousel */
  title: string
  /** Array of store objects to display as cards */
  stores: Store[]
}

export function StandardCarouselModule({ title, stores }: StandardCarouselModuleProps) {
  return <CarouselSection title={title} stores={stores} />
}
