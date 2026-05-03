/**
 * SmartChipsModule — Greeting text + scrollable filter chip rows.
 *
 * Usage:
 *   import { SmartChipsModule } from '@shared/modules/SmartChipsModule'
 *   <SmartChipsModule />
 *   <SmartChipsModule greeting="Good morning, Sarah!" />
 *
 * To customize beyond props, eject: copy SmartChips.tsx into your page folder
 * and modify the chip data and layout directly.
 */

import { SmartChips } from '@shared/components/SmartChips'

interface SmartChipsModuleProps {
  /** Greeting text above the chip rows. Defaults to the component's built-in greeting. */
  greeting?: string
}

export function SmartChipsModule({ greeting }: SmartChipsModuleProps) {
  return <SmartChips greeting={greeting} />
}
