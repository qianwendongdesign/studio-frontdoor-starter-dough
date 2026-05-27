import type { CollectionSheetData } from './CollectionSheet'
// Bg from the Figma "Healthy bowls" card (node 43696:11727). Saved locally
// so we don't depend on the Figma MCP asset URL (7-day TTL).
import imgHealthyBowlBg from '@assets/food photos/healthy-bowl-bg.png'

// Bowl thumbnail photos go through img.cdn4dd.com's Cloudflare image
// transformer (same wrapper used in itemImages.json) — keeps payloads small.
// Previous Figma MCP thumb URLs all 404'd.
const CDN = 'https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2'
const imgThumb1 = `${CDN}/a41062f1-ccf6-4b43-9b98-299d7d49a5a0-retina-large.jpg` // quinoa grain bowl
const imgThumb2 = `${CDN}/c101bc6a-3983-4df5-acec-f4b3ea4b192e-retina-large.png` // harvest bowl
const imgThumb3 = `${CDN}/cc630d4d-f7bb-45c8-8919-b68bd61e8d90-retina-large.jpg` // burrito bowl
const imgBg = imgHealthyBowlBg
// Brand logos via Google's favicon service — same square-mark approach used
// elsewhere in the card. Returns square brand marks that crop cleanly to circles.
const LOGO_MOON_BOWLS = 'https://www.google.com/s2/favicons?domain=moonbowls.com&sz=128'
const LOGO_MIXT = 'https://www.google.com/s2/favicons?domain=mixt.com&sz=128'
const LOGO_CHIPOTLE = 'https://www.google.com/s2/favicons?domain=chipotle.com&sz=128'
// The 18x18 subtitle avatars need square brand marks — Moon Bowls' only
// existing artwork is a wide wordmark that gets squashed into a blob at that
// size. Use the two square-mark brands instead so both circles read clearly.
const imgAvatar1 = LOGO_CHIPOTLE
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
      storeLogo: LOGO_MOON_BOWLS,
      deliveryTime: '24 min',
    },
    {
      id: 'healthy-1',
      name: 'Harvest Kale Bowl',
      price: 12.5,
      image: imgThumb2,
      storeName: 'MIXT',
      storeLogo: LOGO_MIXT,
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
