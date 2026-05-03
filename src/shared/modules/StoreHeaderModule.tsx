/**
 * StoreHeaderModule — Full-bleed hero header with dark overlay, store identity,
 * metadata, and sentiment chips.
 *
 * Usage:
 *   import { StoreHeaderModule } from '@shared/modules/StoreHeaderModule'
 *   <StoreHeaderModule
 *     name="Sweetgreen"
 *     img={heroImg}
 *     logo={logoImg}
 *     rating="4.8"
 *     numRatings={2400}
 *     dist="0.4 mi"
 *     dashPassFee="$0 delivery on $12+"
 *   />
 *
 * To customize beyond props, eject: copy StoreHeader.tsx into your page folder
 * and modify the raw component directly.
 */

import { StoreHeader } from '@shared/components/StoreHeader'
import type { StoreHeaderProps } from '@shared/components/StoreHeader'

export function StoreHeaderModule(props: StoreHeaderProps) {
  return <StoreHeader {...props} />
}
