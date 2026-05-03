/**
 * CardListModule — Recent orders list with thumbnails.
 *
 * Usage:
 *   import { CardListModule } from '@shared/modules/CardListModule'
 *   <CardListModule />
 *
 * To customize beyond props, eject: copy OrderAgain.tsx into your page folder
 * and modify the store data and layout directly.
 */

import { OrderAgain } from '@shared/components/OrderAgain'

export function CardListModule() {
  return <OrderAgain />
}
