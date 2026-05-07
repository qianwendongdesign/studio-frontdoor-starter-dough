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
import { CartSheet, type CartSheetItem } from '@shared/components/CartSheet'
import { useStores } from '@shared/hooks/useStores'

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

export function HomepageFeed() {
  const stores = useStores()
  const [cartStore, setCartStore] = useState<FeedStore | null>(null)

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
          <OrderAgain />
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
    </>
  )
}
