import { useState } from 'react'
import './get-started.css'
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
    desc: 'Standalone homepage with address bar, category tabs, smart chips, carousels, and 2x2 grids.',
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
    title: 'Search Result Page',
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

const PROMPTS = [
  '"Add a StandardCarouselModule at position 4 on the homepage feed"',
  '"Change the greeting to Good morning, Sarah!"',
  '"I want to customize the spotlight module — eject it so I can edit the copy"',
  '"Add a new store page for a pizza restaurant with 6 menu items"',
  '"Wire up the store cards on the homepage to navigate to the store page"',
]

export function GetStarted() {
  const [active, setActive] = useState<Filter>('All')
  const filtered = active === 'All' ? TEMPLATES : TEMPLATES.filter((t) => t.filter === active)

  return (
    <div className="gs">
      <header className="gs-header">
        <h1 className="gs-title">Front Door Starter Dough</h1>
        <p className="gs-subtitle">
          Ready-to-use page templates for rapid prototyping of consumer experiences.
          Built for designers and PMs iterating with AI coding agents.
        </p>
        <p className="gs-subtitle">
          <strong>Tip:</strong> Copy this page into your AI coding agent (Cursor, Claude Code) and ask it to walk you through the setup steps.
        </p>
      </header>

      <div className="gs-callout">
        <strong>Follow these steps if you haven't already:</strong>
        <ol className="gs-callout-steps">
          <li>Open this GitHub template repo at <a href="https://github.com/doordash/studio-frontdoor-starter-dough" target="_blank" rel="noopener noreferrer">github.com/doordash/studio-frontdoor-starter-dough</a></li>
          <li>Click on <strong>"Use this template"</strong> — this will create your own copy of the template to work on</li>
          <li><strong>Clone the repo</strong> — this downloads the files to your laptop so you can open it in Cursor or Claude Code</li>
          <li>In Cursor or Claude Code run <code>npm install && npm run dev</code> — this installs dependencies and starts the local server</li>
        </ol>
      </div>

      <a href="/prototypes/" className="gs-link-card gs-link-card--yellow">
        See prototypes by teammates
        <span className="gs-link-arrow">&rarr;</span>
      </a>

      {/* Step 1 */}
      <section className="gs-step">
        <div className="gs-step-number">1</div>
        <div className="gs-step-content">
          <h2>Pick a template</h2>
          <p>Each template is a self-contained page you can use as-is or customize. Click to preview:</p>
          <div className="gs-filter-chips">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`gs-filter-chip${f === active ? ' gs-filter-chip--active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="gs-templates">
            {filtered.map((t) => (
              <a key={t.title} href={t.href} className="gs-template-card">
                {t.img ? (
                  <div className="gs-template-preview">
                    <img src={t.img} alt={`${t.title} preview`} />
                  </div>
                ) : t.comingSoon ? (
                  <div className="gs-template-preview gs-template-preview--placeholder">
                    <span className="gs-coming-soon">Coming Soon</span>
                  </div>
                ) : null}
                <div className="gs-template-tag">{t.tag}</div>
                <h3 className="gs-template-title">{t.title}</h3>
                <p className="gs-template-desc">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="gs-step">
        <div className="gs-step-number">2</div>
        <div className="gs-step-content">
          <h2>Start building</h2>
          <p>Tell your AI agent what you want. Here are some example prompts:</p>
          <ul className="gs-prompts">
            {PROMPTS.map((p, i) => (
              <li key={i} className="gs-prompt">{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prototypes gallery link */}
      <section className="gs-step">
        <div className="gs-step-number">&#9733;</div>
        <div className="gs-step-content">
          <h2>Browse prototypes</h2>
          <p>See prototypes the team has built using these templates:</p>
          <a href="/prototypes/" className="gs-link-card gs-link-card--blue">
            Prototypes Gallery
            <span className="gs-link-arrow">&rarr;</span>
          </a>
        </div>
      </section>

      <hr className="gs-divider" />
      <h2 className="gs-section-title">Features for great designs, out of the box</h2>

      {/* Step 3 */}
      <section className="gs-step">
        <div className="gs-step-number">3</div>
        <div className="gs-step-content">
          <h2>Load design documentation</h2>
          <p>Before any UI work in Cursor, run both Prism skills to load the latest design system docs:</p>
          <pre className="gs-code">/prism-design-documentation{'\n'}/prism-react-documentation</pre>
          <p className="gs-note">This gives your AI agent full knowledge of DoorDash's Prism components, guidelines, and tokens.</p>
        </div>
      </section>

      {/* Step 4 */}
      <section className="gs-step">
        <div className="gs-step-number">4</div>
        <div className="gs-step-content">
          <h2>Add new modules</h2>
          <p>Modules are pre-built layout blocks that can be added to any page and customized. Start by previewing available modules via the link below. Ask the AI to add them to your prototype.</p>
          <a href="/styles/module-library-preview.html" className="gs-link-card gs-link-card--blue">
            Module Library Preview
            <span className="gs-link-arrow">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Step 5 */}
      <section className="gs-step">
        <div className="gs-step-number">5</div>
        <div className="gs-step-content">
          <h2>Use the styleguide</h2>
          <p>This template system has its own simplified design subsystem. Start by clicking the link below to see the system. Tell the AI to follow this system when adding new content to keep things looking clean.</p>
          <a href="/styles/design-system-preview.html" className="gs-link-card gs-link-card--blue">
            Design System Preview
            <span className="gs-link-arrow">&rarr;</span>
          </a>
        </div>
      </section>

      {/* Step 6 */}
      <section className="gs-step">
        <div className="gs-step-number">6</div>
        <div className="gs-step-content">
          <h2>Connect to Snowflake for real data</h2>
          <p>Replace static placeholder data with real store images and metadata from Snowflake. Templates fall back to static data if the server isn't running.</p>
          <p><strong>Prerequisites:</strong> Python 3.9+, DoorDash Snowflake access, Okta configured on your machine.</p>
          <p><strong>One-time setup:</strong></p>
          <pre className="gs-code">python3 -m venv backend/venv{'\n'}source backend/venv/bin/activate{'\n'}pip install -r backend/requirements.txt</pre>
          <p><strong>Every session</strong> (run in a second terminal):</p>
          <pre className="gs-code">source backend/venv/bin/activate{'\n'}python3 scripts/serve_stores.py</pre>
          <p className="gs-note">A browser window opens for Okta SSO. Sign in once and every page reload fetches fresh data.</p>
        </div>
      </section>

      <a href="/pages/get-started-v2/" className="gs-link-card gs-link-card--preview">
        New design in progress — preview it here
        <span className="gs-link-arrow">&rarr;</span>
      </a>

    </div>
  )
}
