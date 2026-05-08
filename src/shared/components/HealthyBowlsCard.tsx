import { makeDraftItemNames } from '@shared/data/draftItems'
import type { CollectionSheetData } from './CollectionSheet'

const imgBg = 'https://www.figma.com/api/mcp/asset/ec75879e-c7e1-45d8-b0ee-b295ed44446d'
const imgThumb1 = 'https://www.figma.com/api/mcp/asset/21f52239-271c-40fd-b4c3-f8586b173504'
const imgThumb2 = 'https://www.figma.com/api/mcp/asset/91640292-5fa2-46bc-b955-0e552ed1e8a8'
const imgThumb3 = 'https://www.figma.com/api/mcp/asset/7f12cb4d-0c61-475b-b374-28fefd61ca76'
const imgAvatar1 = 'https://www.figma.com/api/mcp/asset/097ebe7a-9496-4a69-8500-48a6b247451e'
const imgAvatar2 = 'https://www.figma.com/api/mcp/asset/3e0690f7-ef62-4978-b312-fc50fb5621ee'

const STORES = ['Moon Bowls', 'MIXT', 'Chipotle Mexican Grill']
const THUMBS = [imgThumb1, imgThumb2, imgThumb3]
const LOGOS = [imgAvatar1, imgAvatar2, imgAvatar1]

export const HEALTHY_BOWLS_COLLECTION: CollectionSheetData = {
  title: 'Healthy bowls',
  subtitle: 'Inspired by your usuals',
  items: makeDraftItemNames('healthy-bowls', THUMBS.length).map((name, i) => ({
    id: `healthy-${i}`,
    name,
    price: 15.99,
    image: THUMBS[i],
    storeName: STORES[i],
    storeLogo: LOGOS[i],
  })),
}

interface HealthyBowlsCardProps {
  onViewList?: (data: CollectionSheetData) => void
}

export function HealthyBowlsCard({ onViewList }: HealthyBowlsCardProps) {
  return (
    <article className="boba-faves-card boba-faves-card--healthy-bowls">
      <img alt="" className="boba-faves-card__bg" src={imgBg} />

      <div className="boba-faves-card__gradient" />
      <div className="boba-faves-card__top-blur" />
      <div className="boba-faves-card__skrim" />

      <div className="boba-faves-card__info">
        <h3 className="boba-faves-card__title">Healthy bowls</h3>
        <div className="boba-faves-card__subtitle-row">
          <div className="boba-faves-card__avatars">
            <img alt="" className="boba-faves-card__avatar" src={imgAvatar1} />
            <img alt="" className="boba-faves-card__avatar boba-faves-card__avatar--second" src={imgAvatar2} />
          </div>
          <p className="boba-faves-card__subtitle-text">Moon Bowls, MIXT, Chipotle M...</p>
        </div>
      </div>

      <div className="boba-faves-card__spacer" />

      <div className="boba-faves-card__thumbs">
        <div className="boba-faves-card__thumb"><img alt="" src={imgThumb1} /></div>
        <div className="boba-faves-card__thumb"><img alt="" src={imgThumb2} /></div>
        <div className="boba-faves-card__thumb"><img alt="" src={imgThumb3} /></div>
      </div>

      <button
        className="boba-faves-card__cta"
        onClick={(e) => {
          e.stopPropagation()
          onViewList?.(HEALTHY_BOWLS_COLLECTION)
        }}
      >
        View list
      </button>
    </article>
  )
}
