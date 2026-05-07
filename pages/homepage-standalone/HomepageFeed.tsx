import { useState } from 'react'
import { StatusBar } from '@shared/components/StatusBar'
import { ProfileAddressBar } from '@shared/components/ProfileAddressBar'
import { CategoryTabBar } from '@shared/components/CategoryTabBar'
import { SmartChips } from '@shared/components/SmartChips'
import { OrderAgain } from '@shared/components/OrderAgain'
import { Spotlight } from '@shared/components/Spotlight'
import { SimilarSection } from '@shared/components/SimilarSection'
import { CarouselSection } from '@shared/components/CarouselSection'
import { DiscoverSection } from '@shared/components/DiscoverSection'
import { Footer } from '@shared/components/Footer'
import { CartSheet, type CartSheetItem, type CartSheetStore } from '@shared/components/CartSheet'
import { useStores } from '@shared/hooks/useStores'
import { type OrderAgainStoreViewModel } from '@shared/data/orderAgainProfiles'

interface FeedStore {
  name: string
  rating: string
  time: string
  dist: string
  fee: string
  tag?: string
  img: string
}

const DRAFT_ITEM_PRICE = 15.99
const DRAFT_ITEM_NAMES = ['Item 1', 'Item 2', 'Item 3']

function buildDraftItems(store: FeedStore): CartSheetItem[] {
  return DRAFT_ITEM_NAMES.map((name, i) => ({
    id: `${store.name}-${i}`,
    name,
    price: DRAFT_ITEM_PRICE,
  }))
}

interface ActiveCart {
  store: CartSheetStore
  items: CartSheetItem[]
}

const DRAFT_PRICE = 15.99

function formatRating(raw: string | undefined): string | undefined {
  if (!raw) return undefined
  const n = Number(raw)
  return Number.isFinite(n) ? n.toFixed(1) : raw
}

function cartFromOrderAgainRow(row: OrderAgainStoreViewModel): ActiveCart {
  const items: CartSheetItem[] =
    row.items.length > 0
      ? row.items.map((it, i) => ({
          id: `${row.name}-${i}`,
          name: it.name,
          price: DRAFT_PRICE,
          image: it.image,
        }))
      : DRAFT_ITEM_NAMES.map((name, i) => ({
          id: `${row.name}-${i}`,
          name,
          price: DRAFT_PRICE,
        }))
  return {
    store: {
      name: row.name,
      logo: row.logo,
      time: row.timeText,
      rating: formatRating(row.rating),
    },
    items,
  }
}

export function HomepageFeed() {
  const stores = useStores()
  const [cartStore, setCartStore] = useState<FeedStore | null>(null)
  const [activeCart, setActiveCart] = useState<ActiveCart | null>(null)

  return (
    <>
      {/* Scrollable feed — fills full screen height, padded so content clears the footer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', overflowX: 'hidden',
        paddingBottom: 160,
        scrollbarWidth: 'none',
        background: '#fff',
      }}>
        <StatusBar />
        <ProfileAddressBar />
        <CategoryTabBar />

        <div className="feed">
          <SmartChips />
          <OrderAgain onRowClick={(row) => setActiveCart(cartFromOrderAgainRow(row))} />
          <Spotlight />
          <SimilarSection />
          <CarouselSection
            title="Chicken and rice bowls"
            stores={stores.slice(0, 6)}
            onStoreClick={(s) => setCartStore(s as FeedStore)}
          />
          <CarouselSection
            title="Shawarma wrap"
            stores={stores.slice(6, 12)}
            onStoreClick={(s) => setCartStore(s as FeedStore)}
          />
          <DiscoverSection />
        </div>
      </div>

      {/* Footer absolutely pinned to bottom — gradient overlaps scroll content */}
      <Footer />

      {cartStore && (
        <CartSheet
          store={{
            name: cartStore.name,
            rating: cartStore.rating,
            time: cartStore.time,
            distance: cartStore.dist,
          }}
          items={buildDraftItems(cartStore)}
          onClose={() => setCartStore(null)}
        />
      )}

      {activeCart && (
        <CartSheet
          store={activeCart.store}
          items={activeCart.items}
          onClose={() => setActiveCart(null)}
        />
      )}
    </>
  )
}
