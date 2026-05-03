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
import { useStores } from '@shared/hooks/useStores'

export function HomepageFeed() {
  const stores = useStores()

  return (
    <>
      {/* Scrollable feed — fills full screen height, padded so content clears the footer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        overflowY: 'auto', overflowX: 'hidden',
        paddingBottom: 160,
        scrollbarWidth: 'none',
      }}>
        <StatusBar />
        <ProfileAddressBar />
        <CategoryTabBar />

        <div className="feed">
          <SmartChips />
          <OrderAgain />
          <Spotlight />
          <SimilarSection />
          <CarouselSection title="Chicken and rice bowls" stores={stores.slice(0, 6)} />
          <CarouselSection title="Shawarma wrap" stores={stores.slice(6, 12)} />
          <DiscoverSection />
        </div>
      </div>

      {/* Footer absolutely pinned to bottom — gradient overlaps scroll content */}
      <Footer />
    </>
  )
}
