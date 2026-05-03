import { useState } from 'react'
import homepagePreview from '@assets/homepage-preview.png'
import storePreview from '@assets/store-page-preview.png'
import reviewsPreview from '@assets/reviews-feed-preview.png'
import searchResultsPreview from '@assets/search-results-preview.png'
import cartSheetPreview from '@assets/cart-sheet-preview.png'
import storePagePrismPreview from '@assets/store-page-prism-preview.png'
import ratingsAndReviewsPreview from '@assets/ratings-and-reviews-preview.png'
import reviewHalfsheetPreview from '@assets/review-halfsheet-preview.png'
import mediaGalleryPreview from '@assets/media-gallery-preview.png'
import itemPagePreview from '@assets/item-page-preview.png'
import homepagePrismPreview from '@assets/homepage-prism-preview.png'

const FILTERS = ['All', 'Prism', 'Front Door'] as const
type Filter = (typeof FILTERS)[number]

const TEMPLATES = [
  {
    title: 'Homepage Feed',
    desc: 'Standalone homepage with address bar, category tabs, smart chips, carousels, and 2×2 grids.',
    href: '/pages/homepage-standalone/',
    tag: 'Front Door design system',
    filter: 'Front Door' as Filter,
    img: homepagePreview,
  },
  {
    title: 'Store Page Wes Style',
    desc: 'Store detail with hero image, info bar, menu category tabs, and item list.',
    href: '/pages/store-page-standalone/',
    tag: 'Front Door design system',
    filter: 'Front Door' as Filter,
    img: storePreview,
  },
  {
    title: 'Reviews Feed',
    desc: 'Chronological feed of customer reviews from restaurants in your area, most recent first.',
    href: '/pages/reviews-feed/',
    tag: 'Front Door design system',
    filter: 'Front Door' as Filter,
    img: reviewsPreview,
  },
  {
    title: 'Search Results',
    desc: 'Search results with filters, store cards, and item matches.',
    href: '/pages/search-results/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: searchResultsPreview,
  },
  {
    title: 'Store Page',
    desc: 'Production store page built with Prism components.',
    href: '/pages/store-page-prism/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: storePagePrismPreview,
  },
  {
    title: 'Cart Sheet',
    desc: 'Bottom sheet cart view with item list, pricing breakdown, and checkout button.',
    href: '/pages/cart-sheet/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: cartSheetPreview,
  },
  {
    title: 'Ratings and Reviews',
    desc: 'Ratings and reviews page built with Prism components.',
    href: '/pages/ratings-and-reviews/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: ratingsAndReviewsPreview,
  },
  {
    title: 'Review halfsheet',
    desc: 'Bottom sheet review prompt built with Prism components.',
    href: '/pages/review-halfsheet/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: reviewHalfsheetPreview,
  },
  {
    title: 'Media gallery',
    desc: 'Full-screen media gallery with photo and video grid.',
    href: '/pages/media-gallery/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: mediaGalleryPreview,
  },
  {
    title: 'Item page',
    desc: 'Menu item detail with hero photo, description, recommended options, and add-to-order button.',
    href: '/pages/item-page/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: itemPagePreview,
  },
  {
    title: 'Prism Homepage',
    desc: 'Homepage feed built with Prism components.',
    href: '/pages/homepage-prism/',
    tag: 'Prism',
    filter: 'Prism' as Filter,
    img: homepagePrismPreview,
  },
  {
    title: 'Post Checkout',
    desc: 'Order confirmation with delivery tracker, progress bar, and order summary.',
    href: '/pages/post-checkout-standalone/',
    tag: 'Front Door design system',
    filter: 'Front Door' as Filter,
    comingSoon: true,
  },
]

export function TemplatesSection() {
  const [active, setActive] = useState<Filter>('All')
  const filtered = active === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.filter === active)

  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Browse</p>
      <h1 className="gsv2-section__title">Templates</h1>
      <p className="gsv2-section__lead">
        Each template is a self-contained page you can fork and customize. Pick one as your
        starting point, then ask your AI agent to make it your own.
      </p>

      <div className="gsv2-filter-chips">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`gsv2-filter-chip${f === active ? ' gsv2-filter-chip--active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="gsv2-card-grid">
        {filtered.map((t) => (
          <a key={t.title} href={t.href} className="gsv2-card">
            <div className={`gsv2-card__preview${!t.img ? ' gsv2-card__preview--empty' : ''}`}>
              {t.img ? (
                <img src={t.img} alt={`${t.title} preview`} />
              ) : (
                <span className="gsv2-coming-soon">
                  {t.comingSoon ? 'Coming Soon' : 'No Preview'}
                </span>
              )}
            </div>
            <div className="gsv2-card__tag">{t.tag}</div>
            <div className="gsv2-card__title">{t.title}</div>
            <p className="gsv2-card__body">{t.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
