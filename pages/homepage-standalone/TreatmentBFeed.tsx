import { useState } from 'react'
import { StatusBar } from '@shared/components/StatusBar'
import { ProfileAddressBar } from '@shared/components/ProfileAddressBar'
import { CategoryTabBar } from '@shared/components/CategoryTabBar'
import { SmartChips } from '@shared/components/SmartChips'
import { BobaFavesCard } from '@shared/components/BobaFavesCard'
import { HealthyBowlsCard } from '@shared/components/HealthyBowlsCard'
import { ReorderFavorites, type CardMerchant } from '@shared/components/ReorderFavorites'
import { Spotlight } from '@shared/components/Spotlight'
import { SimilarSection } from '@shared/components/SimilarSection'
import { CarouselSection } from '@shared/components/CarouselSection'
import { DiscoverSection } from '@shared/components/DiscoverSection'
import { Footer } from '@shared/components/Footer'
import { CartSheet, type CartSheetItem } from '@shared/components/CartSheet'
import { CollectionSheet, type CollectionSheetData } from '@shared/components/CollectionSheet'
import { useStores } from '@shared/hooks/useStores'
import { loadReorderFavoritesFromCurrentUrl } from '@shared/data/reorderFavoritesAdapter'
import { makeDraftItemNames } from '@shared/data/draftItems'

const merchants = loadReorderFavoritesFromCurrentUrl()

const isNvProfile =
  typeof window !== 'undefined' &&
  (new URLSearchParams(window.location.search).get('profile') ?? '').startsWith('nv-')

const DRAFT_ITEM_PRICE = 15.99

function buildItemsForMerchant(m: CardMerchant): CartSheetItem[] {
  const [hero, a, b] = m.images
  const isTwoItems = b === hero
  const slots = isTwoItems ? [hero, a] : [hero, a, b]
  const labels = m.items
  const fallback = makeDraftItemNames(m.name, slots.length)
  return slots.map((image, i) => ({
    id: `${m.name}-${i}`,
    name: labels?.[i]?.trim() || fallback[i],
    price: DRAFT_ITEM_PRICE,
    image,
  }))
}

export function TreatmentBFeed() {
  const stores = useStores()
  const [cartMerchant, setCartMerchant] = useState<CardMerchant | null>(null)
  const [collection, setCollection] = useState<CollectionSheetData | null>(null)

  const extraCards = isNvProfile
    ? []
    : [
        { card: <BobaFavesCard onViewList={setCollection} />, afterIndex: 0 },
        { card: <HealthyBowlsCard onViewList={setCollection} />, afterIndex: 2 },
      ]

  return (
    <>
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
          <ReorderFavorites
            merchants={merchants}
            extraCards={extraCards}
            onViewCart={setCartMerchant}
          />
          <Spotlight />
          <SimilarSection />
          <CarouselSection title="Chicken and rice bowls" stores={stores.slice(0, 6)} />
          <CarouselSection title="Shawarma wrap" stores={stores.slice(6, 12)} />
          <DiscoverSection />
        </div>
      </div>

      <Footer />

      {cartMerchant && (
        <CartSheet
          store={{
            name: cartMerchant.name,
            logo: cartMerchant.logo,
            rating: cartMerchant.rating,
            time: cartMerchant.deliveryEta || `Deliver by ${cartMerchant.deliverBy}`,
          }}
          items={buildItemsForMerchant(cartMerchant)}
          onClose={() => setCartMerchant(null)}
        />
      )}

      {collection && (
        <CollectionSheet
          data={collection}
          onClose={() => setCollection(null)}
        />
      )}
    </>
  )
}
