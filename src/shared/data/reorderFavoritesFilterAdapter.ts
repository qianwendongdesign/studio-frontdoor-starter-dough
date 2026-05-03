/**
 * reorderFavoritesFilterAdapter — transforms order-again profile data into
 * shapes needed by the ReorderFavoritesFilter component. Assigns stores to
 * filter categories deterministically via a simple string hash.
 */

import { resolveProfileOrders, pseudoRandomMinutes, TAGS } from './orderAgainProfiles'
import type { FlattenedOrder } from './orderAgainProfiles'
import pillFilters from './pill_filters.json'

export interface FilterFavoriteStore {
  name: string
  businessName: string
  image: string
  rating: string
  reviews: string
  time: string
  distance: string
  priceRange?: number
  tag?: string
  tags?: string[]
}

export interface FilterOrderLineItem {
  id: string
  name: string
  price: number
  image: string
}

/** Simple deterministic hash of a string → unsigned 32-bit integer. */
function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h >>> 0
}

function deriveStore(order: FlattenedOrder, storeIndex: number, filterCategories: string[], subCategories: Record<string, string[]>): FilterFavoriteStore {
  const h = hashStr(order.businessName)

  // Image: first non-empty item image, fall back to coverImgUrl
  let image = ''
  for (const item of order.items) {
    if (item.image_url && item.image_url.length > 0) {
      image = item.image_url
      break
    }
  }
  if (!image) image = order.coverImgUrl || order.logoUrl || ''

  const rating = order.averageRating || String((4.0 + (h % 10) * 0.1).toFixed(1))
  const reviews = String(200 + (h % 800))
  const minutes = pseudoRandomMinutes(order.businessName)
  const distance = (0.3 + ((h >> 8) % 20) * 0.1).toFixed(1)
  const priceRange = 1 + ((h >> 4) % 3)

  // Deal tag: cycle through TAGS (from tags.json), skip every 3rd store
  const tag =
    TAGS.length > 0 && storeIndex % 3 !== 2
      ? TAGS[storeIndex % TAGS.length]
      : undefined

  // Assign 4–6 filter categories via hash so every pill filter has good coverage
  const numCats = 4 + (h % 3)
  const assigned: string[] = []
  const tags: string[] = []
  for (let j = 0; j < numCats && assigned.length < filterCategories.length; j++) {
    const catIdx = ((h >> (j * 3)) + j * 11) % filterCategories.length
    const cat = filterCategories[catIdx]
    if (!assigned.includes(cat)) {
      assigned.push(cat)
      const subs = subCategories[cat]
      if (subs) {
        const subIdx = (h + j * 13) % subs.length
        tags.push(subs[subIdx])
        if (subs.length > 1) {
          tags.push(subs[(subIdx + 1) % subs.length])
        }
      }
    }
  }

  return {
    name: order.storeName,
    businessName: order.businessName,
    image,
    rating,
    reviews,
    time: `${minutes} min`,
    distance: `${distance} mi`,
    priceRange,
    tag,
    tags: [...new Set(tags)],
  }
}

function deriveOrderItems(order: FlattenedOrder, storeIndex: number): FilterOrderLineItem[] {
  const h = hashStr(order.businessName)
  const items: FilterOrderLineItem[] = []

  for (let k = 0; k < order.items.length; k++) {
    const item = order.items[k]
    if (!item.image_url || item.image_url.length === 0) continue
    const price = 11.99 + ((h + k * 3) % 12) * 0.50
    items.push({
      id: `${storeIndex}-${k}`,
      name: item.item_name,
      price: Math.round(price * 100) / 100,
      image: item.image_url,
    })
  }

  return items
}

export function loadFilterFavorites(search: string): {
  storesByCategory: Record<string, FilterFavoriteStore[]>
  orderItemsByStore: Record<string, FilterOrderLineItem[]>
} {
  const { orders } = resolveProfileOrders(search)
  const filterCategories = pillFilters.categories.filter((c) => c !== 'For you')
  const subCategories = pillFilters.subCategories as Record<string, string[]>

  // Deduplicate by businessId (keep most recent — orders are already sorted)
  const seen = new Set<number>()
  const unique: FlattenedOrder[] = []
  for (const order of orders) {
    if (!seen.has(order.businessId)) {
      seen.add(order.businessId)
      unique.push(order)
    }
  }

  const allStores: FilterFavoriteStore[] = []
  const orderItemsByStore: Record<string, FilterOrderLineItem[]> = {}

  for (let i = 0; i < unique.length; i++) {
    const order = unique[i]
    const store = deriveStore(order, i, filterCategories, subCategories)
    allStores.push(store)
    orderItemsByStore[store.name] = deriveOrderItems(order, i)
  }

  // Build storesByCategory — "For you" gets all stores
  const storesByCategory: Record<string, FilterFavoriteStore[]> = {
    'For you': [...allStores],
  }

  for (const cat of filterCategories) {
    storesByCategory[cat] = allStores.filter((store) => {
      const h = hashStr(store.businessName)
      const numCats = 4 + (h % 3)
      const seen: string[] = []
      for (let j = 0; j < numCats && seen.length < filterCategories.length; j++) {
        const catIdx = ((h >> (j * 3)) + j * 11) % filterCategories.length
        const c = filterCategories[catIdx]
        if (!seen.includes(c)) {
          seen.push(c)
          if (c === cat) return true
        }
      }
      return false
    })
  }

  return { storesByCategory, orderItemsByStore }
}

export function loadFilterFavoritesFromCurrentUrl(): {
  storesByCategory: Record<string, FilterFavoriteStore[]>
  orderItemsByStore: Record<string, FilterOrderLineItem[]>
} {
  if (typeof window === 'undefined') return loadFilterFavorites('')
  return loadFilterFavorites(window.location.search)
}
