import { makeDraftItemNames } from '@shared/data/draftItems'
import type { CollectionSheetData } from './CollectionSheet'

const imgBg = 'https://www.figma.com/api/mcp/asset/7c7963e7-81ea-4db9-82e3-5b85f114c3cd'
const imgThumb1 = 'https://www.figma.com/api/mcp/asset/6f9cf554-1682-4f3c-800f-8427f9100b81'
const imgThumb2 = 'https://www.figma.com/api/mcp/asset/c3a562af-0c38-41f1-a3d2-43b16c4364e4'
const imgThumb3 = 'https://www.figma.com/api/mcp/asset/18d469ad-d05b-4870-8a36-1c233b428ad2'
const imgAvatar1 = 'https://www.figma.com/api/mcp/asset/b98f2f89-93d1-4358-99d4-66a71dc8a800'
const imgAvatar2 = 'https://www.figma.com/api/mcp/asset/350ffa2a-107b-4eba-bbf1-55ff243a404e'

const STORES = ['Wow Tea Drink', 'Tong Sui', 'MT Boba']
const THUMBS = [imgThumb1, imgThumb2, imgThumb3]
const LOGOS = [imgAvatar1, imgAvatar2, imgAvatar1]

export const BOBA_FAVES_COLLECTION: CollectionSheetData = {
  title: 'Boba faves',
  subtitle: 'Inspired by your usuals',
  items: makeDraftItemNames('boba-faves', THUMBS.length).map((name, i) => ({
    id: `boba-${i}`,
    name,
    price: 15.99,
    image: THUMBS[i],
    storeName: STORES[i],
    storeLogo: LOGOS[i],
  })),
}

interface BobaFavesCardProps {
  onViewList?: (data: CollectionSheetData) => void
}

export function BobaFavesCard({ onViewList }: BobaFavesCardProps) {
  return (
    <article className="boba-faves-card">
      <img alt="" className="boba-faves-card__bg" src={imgBg} />

      <div className="boba-faves-card__gradient" />
      <div className="boba-faves-card__top-blur" />
      <div className="boba-faves-card__skrim" />

      <div className="boba-faves-card__info">
        <h3 className="boba-faves-card__title">Boba faves</h3>
        <div className="boba-faves-card__subtitle-row">
          <div className="boba-faves-card__avatars">
            <img alt="" className="boba-faves-card__avatar" src={imgAvatar1} />
            <img alt="" className="boba-faves-card__avatar boba-faves-card__avatar--second" src={imgAvatar2} />
          </div>
          <p className="boba-faves-card__subtitle-text">Wow Tea Drink, Tong Sui, MT Boba...</p>
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
          onViewList?.(BOBA_FAVES_COLLECTION)
        }}
      >
        View list
      </button>
    </article>
  )
}
