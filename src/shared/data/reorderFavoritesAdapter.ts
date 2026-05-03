import type { CardMerchant } from '@shared/components/ReorderFavorites'
import { resolveProfileOrders, pseudoRandomMinutes } from './orderAgainProfiles'
import type { FlattenedOrder } from './orderAgainProfiles'

const MAX_CARDS = 8

function formatClockTime(minutesFromNoon: number): string {
  const totalMinutes = 12 * 60 + minutesFromNoon // noon = 720
  const hours24 = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  const hours12 = hours24 > 12 ? hours24 - 12 : hours24
  const suffix = hours24 >= 12 ? 'pm' : 'am'
  return `${hours12}:${String(mins).padStart(2, '0')}${suffix}`
}

function collectImages(order: FlattenedOrder): string[] {
  const imgs: string[] = []
  for (const item of order.items) {
    if (item.image_url && item.image_url.length > 0 && !imgs.includes(item.image_url)) {
      imgs.push(item.image_url)
      if (imgs.length >= 3) break
    }
  }
  // Pad to 3 by cycling existing item images
  const base = imgs.length
  while (imgs.length < 3 && base > 0) imgs.push(imgs[imgs.length % base])
  return imgs
}

function collectItems(order: FlattenedOrder): [string, string, string] | undefined {
  const names: string[] = []
  for (const item of order.items) {
    if (item.item_name && !names.includes(item.item_name)) {
      names.push(item.item_name)
      if (names.length >= 3) break
    }
  }
  if (names.length >= 3) return [names[0], names[1], names[2]]
  return undefined
}

function adaptOrder(order: FlattenedOrder): CardMerchant | null {
  const images = collectImages(order)
  if (images.length < 3) return null

  const minutes = pseudoRandomMinutes(order.businessName)
  const deliverBy = formatClockTime(minutes)
  const deliveryEta = `${minutes} min`

  return {
    name: order.businessName,
    logo: order.logoUrl,
    images: [images[0], images[1], images[2]],
    items: collectItems(order),
    rating: order.averageRating,
    deliveryEta,
    deliverBy,
  }
}

export function loadReorderFavorites(search: string): CardMerchant[] {
  const { orders } = resolveProfileOrders(search)

  // Deduplicate by businessId, keep most recent
  const seen = new Set<number>()
  const unique: FlattenedOrder[] = []
  for (const order of orders) {
    if (!seen.has(order.businessId)) {
      seen.add(order.businessId)
      unique.push(order)
    }
    if (unique.length >= MAX_CARDS) break
  }

  const merchants: CardMerchant[] = []
  for (const order of unique) {
    const card = adaptOrder(order)
    if (card) merchants.push(card)
  }
  return merchants
}

export function loadReorderFavoritesFromCurrentUrl(): CardMerchant[] {
  if (typeof window === 'undefined') return loadReorderFavorites('')
  return loadReorderFavorites(window.location.search)
}
