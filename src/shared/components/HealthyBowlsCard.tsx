import type { CollectionSheetData } from './CollectionSheet'

const imgThumb1 = 'https://www.figma.com/api/mcp/asset/21f52239-271c-40fd-b4c3-f8586b173504'
const imgThumb2 = 'https://www.figma.com/api/mcp/asset/91640292-5fa2-46bc-b955-0e552ed1e8a8'
const imgThumb3 = 'https://www.figma.com/api/mcp/asset/7f12cb4d-0c61-475b-b374-28fefd61ca76'
const imgBg = imgThumb1
// Real brand logos. The Figma avatar exports for this card had expired
// (404), and the bowl chains' real marks are stable and on-brand.
const LOGO_MOON_BOWLS = 'https://images.squarespace-cdn.com/content/v1/5b2c3af0f2e6b1a14434a6e7/1590266628483-UUCFOVYN7GFWYG2CHOZD/moon+bowls+logo-purple2.png'
const LOGO_MIXT = 'https://www.mixt.com/wp-content/themes/mixt/images/mixt_logo_high_res.png'
const LOGO_CHIPOTLE = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/250px-Chipotle_Mexican_Grill_logo.svg.png'
const imgAvatar1 = LOGO_MOON_BOWLS
const imgAvatar2 = LOGO_MIXT

export const HEALTHY_BOWLS_COLLECTION: CollectionSheetData = {
  title: 'Healthy bowls',
  subtitle: 'Inspired by your usuals',
  items: [
    {
      id: 'healthy-0',
      name: 'Mediterranean Quinoa Bowl',
      price: 13.95,
      image: imgThumb1,
      storeName: 'Moon Bowls',
      storeLogo: imgAvatar1,
      deliveryTime: '24 min',
    },
    {
      id: 'healthy-1',
      name: 'Harvest Kale Bowl',
      price: 12.5,
      image: imgThumb2,
      storeName: 'MIXT',
      storeLogo: imgAvatar2,
      deliveryTime: '31 min',
    },
    {
      id: 'healthy-2',
      name: 'Chicken Burrito Bowl',
      price: 11.25,
      image: imgThumb3,
      storeName: 'Chipotle Mexican Grill',
      storeLogo: LOGO_CHIPOTLE,
      deliveryTime: '18 min',
    },
  ],
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
