import type { CollectionSheetData } from './CollectionSheet'

// Boba faves card assets sourced from Figma node 43681:15457.
// Heads up: Figma MCP asset URLs have a 7-day TTL — refetch from that node if
// the images stop loading.
const imgBg = 'https://www.figma.com/api/mcp/asset/054884a3-1a42-4a02-a453-6a1036ecfacb'
const imgThumb1 = 'https://www.figma.com/api/mcp/asset/4e8e1a47-0a12-4429-806d-1f4dccc709c2' // WOW! cup w/ green
const imgThumb2 = 'https://www.figma.com/api/mcp/asset/63259761-32d1-4a50-976b-f44da029119c' // yellow / mango
const imgThumb3 = 'https://www.figma.com/api/mcp/asset/06cf2120-fa3d-4585-b71f-6661e6bcab40' // brown boba milk tea
const imgAvatar1 = 'https://www.figma.com/api/mcp/asset/ec9e89bc-f282-4b1b-8cab-eecf48187f75'
const imgAvatar2 = 'https://www.figma.com/api/mcp/asset/33f166ba-c29f-4c9a-9de9-b1a4071c7aee'
// Brand logos for the real boba shops referenced in the sheet
const LOGO_BOBA_GUYS = 'https://images.squarespace-cdn.com/content/v1/50ce46ece4b01020c34fd52b/3e54cccc-1ef8-4d78-aa69-7fe7983c4f45/bobaguys_logo_FINAL+%283%29.png?format=300w'
const LOGO_SHARETEA = 'https://images.squarespace-cdn.com/content/v1/68f206cca9dce96f2599130d/1760692086495-86LAD44UNHCZCYEARGQV/logo.png?format=300w'
const LOGO_GONG_CHA = 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Gong_Cha_logo.svg/250px-Gong_Cha_logo.svg.png'

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
      image: 'https://cdn.doordash.com/media/photosV2/b6bf46e5-ce37-44da-9aea-a9b9fe7a4b8e-retina-large.png',
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
      image: 'https://cdn.doordash.com/media/photosV2/d549f613-e013-49d9-9595-3604c92eab6d-retina-large.jpg',
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
