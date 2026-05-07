type ThumbStyle = '' | 'two' | 'single'

export interface OrderAgainStoreViewModel {
  name: string
  meta: string
  tag?: string
  logo: string
  thumbs: string[]
  thumbStyle: ThumbStyle
  timeText: string
  items: { name: string; image: string }[]
}

export interface OrderHistoryStore {
  store_id: number
  store_name: string
  business_name?: string
  business_id: number
  logo_url: string
  cover_img_url?: string
  header_image?: string
  average_rating?: string
  items: OrderHistoryItem[]
}

interface OrderHistoryItem {
  item_id: number
  item_name: string
  image_url: string
  order_id?: number
  order_date?: string
}

export interface FlattenedOrder {
  businessId: number
  businessName: string
  storeName: string
  logoUrl: string
  coverImgUrl?: string
  headerImage?: string
  averageRating?: string
  orderDate: string
  items: OrderHistoryItem[]
}

interface TagsFile {
  tags: string[]
}

const PROFILE_QUERY_KEY = 'profile'
const DEFAULT_PROFILE_ID = 'default'

// Load order history files from orders/ subdir
const orderModules = import.meta.glob<{ default: unknown }>(
  './order-again/orders/*.json',
  { eager: true },
)

// Load tags
const tagsModule = import.meta.glob<{ default: unknown }>(
  './order-again/tags.json',
  { eager: true },
)

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

// Seeded pseudo-random for stable ETA per store
export function pseudoRandomMinutes(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  }
  return 10 + (Math.abs(hash) % 46) // 10..55
}

function loadTags(): string[] {
  const entry = Object.values(tagsModule)[0]
  const data = entry?.default as TagsFile | undefined
  if (!data?.tags || !Array.isArray(data.tags)) {
    console.warn('[OrderAgain] tags.json missing or invalid. No tags will be shown.')
    return []
  }
  return data.tags
}

export const TAGS = loadTags()

// Parse order history files and flatten into individual orders
const profileDataById = new Map<string, FlattenedOrder[]>()

for (const [path, moduleValue] of Object.entries(orderModules)) {
  const profileId = extractProfileId(path)
  const stores = parseOrderHistoryFile(moduleValue?.default, profileId)
  if (stores) {
    profileDataById.set(profileId, flattenToOrders(stores))
  }
}

function extractProfileId(path: string): string {
  const match = path.match(/\/([^/]+)\.json$/)
  return match?.[1] ?? ''
}

function parseOrderHistoryFile(value: unknown, profileId: string): OrderHistoryStore[] | null {
  if (!isObject(value) || !Array.isArray(value.stores)) {
    console.warn(`[OrderAgain] Order file "${profileId}" missing "stores" array.`)
    return null
  }

  const stores: OrderHistoryStore[] = []
  for (const raw of value.stores) {
    if (!isObject(raw) || !isString(raw.store_name) || typeof raw.business_id !== 'number' || !Array.isArray(raw.items)) {
      console.warn(`[OrderAgain] Skipping invalid store in "${profileId}" (requires store_name, business_id, items).`)
      continue
    }
    stores.push(raw as unknown as OrderHistoryStore)
  }

  return stores
}

function flattenToOrders(stores: OrderHistoryStore[]): FlattenedOrder[] {
  const orders: FlattenedOrder[] = []

  for (const store of stores) {
    // Group items by order_id
    const itemsByOrder = new Map<number, OrderHistoryItem[]>()
    for (const item of store.items) {
      if (item.order_id == null) continue
      const existing = itemsByOrder.get(item.order_id)
      if (existing) {
        existing.push(item)
      } else {
        itemsByOrder.set(item.order_id, [item])
      }
    }

    for (const [, items] of itemsByOrder) {
      const orderDate = items[0]?.order_date ?? ''
      orders.push({
        businessId: store.business_id,
        businessName: store.business_name ?? store.store_name,
        storeName: store.store_name,
        logoUrl: store.logo_url ?? '',
        coverImgUrl: store.cover_img_url,
        headerImage: store.header_image,
        averageRating: store.average_rating,
        orderDate,
        items,
      })
    }
  }

  // Sort most recent first
  orders.sort((a, b) => b.orderDate.localeCompare(a.orderDate))

  return orders
}

function transformOrder(
  order: FlattenedOrder,
  orderIndex: number,
): OrderAgainStoreViewModel {
  const items = order.items
  const itemCount = items.length

  // Meta: "{eta} min · {first item name} +{N-1}"
  const minutes = pseudoRandomMinutes(order.businessName + order.orderDate)
  const firstItem = items[0]?.item_name ?? ''
  const suffix = itemCount > 1 ? ` +${itemCount - 1}` : ''
  const timeText = `${minutes} min`
  const meta = `${timeText} · ${firstItem}${suffix}`

  // Items with name + image, skipping ones with masked URLs (parallel to thumbs filter)
  const itemsWithImages = items
    .filter((item) => item.image_url && item.image_url.length > 0 && !item.image_url.includes('/MASKED'))
    .map((item) => ({ name: item.item_name, image: item.image_url }))

  const thumbs = itemsWithImages.map((it) => it.image)

  // ThumbStyle: single for 1, two for 2, default for 3+
  const thumbStyle: ThumbStyle =
    thumbs.length === 1 ? 'single' : thumbs.length === 2 ? 'two' : ''

  // Tag: cycle through tags, skip every 3rd order
  const tag =
    TAGS.length > 0 && orderIndex % 3 !== 2
      ? TAGS[orderIndex % TAGS.length]
      : undefined

  return {
    name: order.businessName,
    meta,
    tag,
    logo: order.logoUrl,
    thumbs,
    thumbStyle,
    timeText,
    items: itemsWithImages,
  }
}

function getRequestedProfileId(search: string): string {
  const params = new URLSearchParams(search)
  return params.get(PROFILE_QUERY_KEY)?.trim() || DEFAULT_PROFILE_ID
}

export function resolveProfileOrders(search: string): { profileId: string; orders: FlattenedOrder[] } {
  const requested = getRequestedProfileId(search)

  const requestedOrders = profileDataById.get(requested)
  if (requestedOrders) return { profileId: requested, orders: requestedOrders }

  if (requested !== DEFAULT_PROFILE_ID) {
    console.warn(`[OrderAgain] Unknown profile "${requested}". Falling back to "${DEFAULT_PROFILE_ID}".`)
  }

  const fallbackOrders = profileDataById.get(DEFAULT_PROFILE_ID)
  if (fallbackOrders) return { profileId: DEFAULT_PROFILE_ID, orders: fallbackOrders }

  console.warn(`[OrderAgain] Missing "${DEFAULT_PROFILE_ID}" profile. Rendering empty state.`)
  return { profileId: DEFAULT_PROFILE_ID, orders: [] }
}

export function getAvailableProfileIds(): string[] {
  return Array.from(profileDataById.keys())
}

const DEFAULT_MAX_STORES = 5

export function loadOrderAgainStores(search: string, maxStores = DEFAULT_MAX_STORES): OrderAgainStoreViewModel[] {
  const { orders } = resolveProfileOrders(search)

  // Deduplicate by business ID, keeping the most recent order per business
  // (orders are already sorted newest-first)
  const seen = new Set<number>()
  const unique: FlattenedOrder[] = []
  for (const order of orders) {
    if (!seen.has(order.businessId)) {
      seen.add(order.businessId)
      unique.push(order)
    }
    if (unique.length >= maxStores) break
  }

  return unique.map((order, index) => transformOrder(order, index))
}

export function loadOrderAgainStoresFromCurrentUrl(maxStores = DEFAULT_MAX_STORES): OrderAgainStoreViewModel[] {
  if (typeof window === 'undefined') return loadOrderAgainStores('', maxStores)
  return loadOrderAgainStores(window.location.search, maxStores)
}
