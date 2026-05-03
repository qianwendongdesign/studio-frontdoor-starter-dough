/**
 * AddressBarModule — Address text + notification/account icon buttons.
 *
 * Usage:
 *   import { AddressBarModule } from '@shared/modules/AddressBarModule'
 *   <AddressBarModule />
 *   <AddressBarModule address="1455 Market St" />
 *
 * To customize beyond props, eject: copy AddressBar.tsx into your page folder
 * and modify the icons and layout directly.
 */

import { AddressBar } from '@shared/components/AddressBar'

interface AddressBarModuleProps {
  /** Address text displayed in the bar. Defaults to "283 Hayes St". */
  address?: string
}

export function AddressBarModule({ address }: AddressBarModuleProps) {
  return <AddressBar address={address} />
}
