import type { CollectionSheetData } from './CollectionSheet'

// Drink photos go through the img.cdn4dd.com Cloudflare image transformer
// (same wrapper used in itemImages.json). The raw retina-large PNGs were
// 2–5 MB each and were timing out / showing as broken in the card.
const CDN = 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2'
const imgThumb1 = `${CDN}/2b8b1894-1277-4605-9ed4-7be988ff5924-retina-large.png` // iced matcha latte
const imgBg = imgThumb1
const imgThumb2 = `${CDN}/f4fed00c-c40e-4aaf-973c-3a8dfcfb66da-retina-large.png` // mango shake with boba
const imgThumb3 = `${CDN}/dc3d553e-a42c-473f-bc24-ecb01f00e84d-retina-large.jpg` // thai iced tea with boba pearls
// Brand logos via Google's favicon service — same square-mark approach
// HealthyBowlsCard uses for MIXT. Squarespace-hosted lockups were broken.
const LOGO_BOBA_GUYS = 'https://www.google.com/s2/favicons?domain=bobaguys.com&sz=128'
const LOGO_SHARETEA = 'https://www.google.com/s2/favicons?domain=sharetea.com&sz=128'
const LOGO_GONG_CHA = 'https://www.google.com/s2/favicons?domain=gongchausa.com&sz=128'
const imgAvatar1 = LOGO_BOBA_GUYS
const imgAvatar2 = LOGO_SHARETEA

export const BOBA_FAVES_COLLECTION: CollectionSheetData = {
  title: 'Boba faves',
  subtitle: 'Inspired by your usuals',
  items: [
    {
      id: 'boba-0',
      name: 'Matcha Milk Tea',
      price: 6.5,
      image: imgThumb1,
      storeName: 'Wow Tea Drink',
      storeLogo: imgAvatar1,
      deliveryTime: '22 min',
    },
    // Pulled from DoorDash (Boba Guys NY)
    {
      id: 'boba-3',
      name: 'Strawberry Matcha Latte',
      price: 8.2,
      image: `${CDN}/517c9d16-2324-420b-abef-e0dd5a21a47b-retina-large.png`,
      storeName: 'Boba Guys',
      storeLogo: LOGO_BOBA_GUYS,
      deliveryTime: '34 min',
    },
    {
      id: 'boba-1',
      name: 'Mango Passion Fruit Tea',
      price: 6.25,
      image: imgThumb2,
      storeName: 'Tong Sui',
      storeLogo: imgAvatar2,
      deliveryTime: '28 min',
    },
    {
      id: 'boba-2',
      name: 'Brown Sugar Boba Milk Tea',
      price: 6.95,
      image: imgThumb3,
      storeName: 'MT Boba',
      storeLogo: LOGO_GONG_CHA,
      deliveryTime: '19 min',
    },
    // Pulled from DoorDash (Sharetea)
    {
      id: 'boba-4',
      name: 'Taro Milk Tea',
      price: 6.75,
      image: `${CDN}/06c7da3f-f0bd-4806-9e40-40341212ebcf-retina-large.jpg`,
      storeName: 'Sharetea',
      storeLogo: LOGO_SHARETEA,
      deliveryTime: '25 min',
    },
  ],
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
        {/* First thumb shows the Strawberry Matcha Latte (now 2nd item in the sheet) */}
        <div className="boba-faves-card__thumb">
          <img alt="" src={BOBA_FAVES_COLLECTION.items[1].image} />
        </div>
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
