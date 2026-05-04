import { StatusBar } from '@shared/components/StatusBar'
import { ProfileAddressBar } from '@shared/components/ProfileAddressBar'
import { CategoryTabBar } from '@shared/components/CategoryTabBar'
import { SmartChips } from '@shared/components/SmartChips'
import { BobaFavesCard } from '@shared/components/BobaFavesCard'
import { HealthyBowlsCard } from '@shared/components/HealthyBowlsCard'
import { ReorderFavorites } from '@shared/components/ReorderFavorites'
import { Spotlight } from '@shared/components/Spotlight'
import { SimilarSection } from '@shared/components/SimilarSection'
import { CarouselSection } from '@shared/components/CarouselSection'
import { DiscoverSection } from '@shared/components/DiscoverSection'
import { Footer } from '@shared/components/Footer'
import { useStores } from '@shared/hooks/useStores'
import { loadReorderFavoritesFromCurrentUrl } from '@shared/data/reorderFavoritesAdapter'

const merchants = loadReorderFavoritesFromCurrentUrl()

export function TreatmentBFeed() {
  const stores = useStores()

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
            extraCards={[
              { card: <BobaFavesCard />, afterIndex: 0 },
              { card: <HealthyBowlsCard />, afterIndex: 2 },
            ]}
          />
          <Spotlight />
          <SimilarSection />
          <CarouselSection title="Chicken and rice bowls" stores={stores.slice(0, 6)} />
          <CarouselSection title="Shawarma wrap" stores={stores.slice(6, 12)} />
          <DiscoverSection />
        </div>
      </div>

      <Footer />
    </>
  )
}
