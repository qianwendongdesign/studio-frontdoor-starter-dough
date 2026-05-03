import { useState } from 'react'

interface ModuleSpec {
  name: string
  desc: string
  img: string | null
  category: string
  importPath: string
  props: string
  usage: string
  eject?: string
  worksWithNote?: string
}

const MODULES: ModuleSpec[] = [
  {
    name: 'CustomPillRow',
    desc: 'Horizontally scrollable filter pills with icons',
    img: '/styles/component-previews/custom-chip-row.png',
    category: 'Prism',
    importPath: "import { CustomPillRow } from '@shared/components/prism/CustomPillRow'",
    props: "pills: PillConfig[]  — array of { label, leadingIcon, trailingIcon, isDashPass }\nonToggle?: (index, toggled) => void",
    usage: '<CustomPillRow pills={pills} />',
  },
  {
    name: 'TabBar',
    desc: 'Horizontal category tab bar with selected state',
    img: '/styles/component-previews/tab-bar.png',
    category: 'Prism',
    importPath: "import { TabBar } from '@shared/components/prism/TabBar'",
    props: "tabs: string[],  selected?: string,  size?: 'small' | 'medium' | 'large',  onSelect?: (tab) => void",
    usage: '<TabBar tabs={tabs} selected={active} onSelect={setActive} />',
  },
  {
    name: 'FilterChips',
    desc: 'Scrollable pill row with active/inactive toggle states',
    img: null,
    category: 'Wes Design System',
    importPath: "import { FilterChips } from '@shared/components/FilterChips'",
    props: "chips: string[] | FilterChipItem[]\nactiveLabel: string\nonSelect: (label: string) => void\ncontainerClassName?: string",
    usage: "<FilterChips\n  chips={['Featured', 'Vegetarian', 'Healthier']}\n  activeLabel={active}\n  onSelect={setActive}\n/>",
  },
  {
    name: 'BottomSearchBar',
    desc: 'Sticky bottom search pill with cart count and home indicator',
    img: '/styles/component-previews/bottom-search-bar.png',
    category: 'Prism',
    importPath: "import { BottomSearchBar } from '@shared/components/BottomSearchBar'",
    props: 'label?: string  (default "Search grocery"),  cartCount?: number  (default 3)',
    usage: '<BottomSearchBar />\n<BottomSearchBar label="Search restaurants" cartCount={2} />',
  },
  {
    name: 'IOSStatusBar',
    desc: 'iPhone status bar with Dynamic Island, cellular, wifi, and battery',
    img: '/styles/component-previews/ios-status-bar.png',
    category: 'Other',
    importPath: "import { IOSStatusBar } from '@shared/components/IOSStatusBar'",
    props: 'time?: string  (default "9:41"),  dark?: boolean',
    usage: '<IOSStatusBar />\n<IOSStatusBar time="10:30" dark />',
    worksWithNote: 'Both design token templates and Prism templates (uses inline styles)',
  },
  {
    name: 'AddressBarModule',
    desc: 'Address text + notification/account icon buttons',
    img: '/styles/component-previews/addressbar.png',
    category: 'Wes Design System',
    importPath: "import { AddressBarModule } from '@shared/modules/AddressBarModule'",
    props: 'address?: string  — optional address text override (default: "283 Hayes St")',
    usage: '<AddressBarModule />\n<AddressBarModule address="1455 Market St" />',
    eject: 'Copy AddressBar.tsx into your page folder to customize icons and layout.',
  },
  {
    name: 'CategoryTabBarModule',
    desc: 'Scrollable icon tab row (Grocery, Going Out, etc.)',
    img: '/styles/component-previews/categorytabbar.png',
    category: 'Wes Design System',
    importPath: "import { CategoryTabBarModule } from '@shared/modules/CategoryTabBarModule'",
    props: 'tabs?: { label: string; Icon: ComponentType }[]  — optional custom tab definitions',
    usage: '<CategoryTabBarModule />',
    eject: 'Copy CategoryTabBar.tsx into your page folder to customize tab data and icons.',
  },
  {
    name: 'SmartChipsModule',
    desc: 'Greeting text + scrollable filter chip rows',
    img: '/styles/component-previews/smartchips.png',
    category: 'Wes Design System',
    importPath: "import { SmartChipsModule } from '@shared/modules/SmartChipsModule'",
    props: 'greeting?: string  — optional greeting text override',
    usage: '<SmartChipsModule />\n<SmartChipsModule greeting="Good morning, Sarah!" />',
    eject: 'Copy SmartChips.tsx into your page folder to customize chip data and layout.',
  },
  {
    name: 'CardListModule',
    desc: 'Recent orders list with thumbnails',
    img: '/styles/component-previews/card list module.png',
    category: 'Wes Design System',
    importPath: "import { CardListModule } from '@shared/modules/CardListModule'",
    props: 'None required',
    usage: '<CardListModule />',
    eject: 'Copy OrderAgain.tsx into your page folder to customize store data and layout.',
  },
  {
    name: 'SpotlightModule',
    desc: 'Hero video/image with promotional copy + CTA',
    img: '/styles/component-previews/spotlight.png',
    category: 'Wes Design System',
    importPath: "import { SpotlightModule } from '@shared/modules/SpotlightModule'",
    props: 'None required',
    usage: '<SpotlightModule />',
    eject: 'Copy Spotlight.tsx into your page folder to customize media, copy, and CTA.',
  },
  {
    name: 'FourPackModule',
    desc: 'Tab-filtered store grid (2×2) with crossfade images',
    img: '/styles/component-previews/fourpack.png',
    category: 'Wes Design System',
    importPath: "import { FourPackModule } from '@shared/modules/FourPackModule'",
    props: 'None required',
    usage: '<FourPackModule />',
    eject: 'Copy SimilarSection.tsx into your page folder to customize tabs, store data, and grid layout.',
  },
  {
    name: 'StandardCarouselModule',
    desc: 'Horizontal scrolling store cards with title',
    img: '/styles/component-previews/standardcarousel.png',
    category: 'Wes Design System',
    importPath: "import { StandardCarouselModule } from '@shared/modules/StandardCarouselModule'",
    props: "title: string  — section heading\nstores: Store[]  — array of store objects (name, rating, time, dist, fee, tag?, img)",
    usage: '<StandardCarouselModule title="Chicken and rice bowls" stores={stores.slice(0, 6)} />',
    eject: 'Copy CarouselSection.tsx into your page folder to customize card layout and styling.',
  },
  {
    name: 'FourPackAIChipsModule',
    desc: 'AI-generated tab suggestions with animated sub-tabs',
    img: '/styles/component-previews/foupackaichips.png',
    category: 'Wes Design System',
    importPath: "import { FourPackAIChipsModule } from '@shared/modules/FourPackAIChipsModule'",
    props: 'None required',
    usage: '<FourPackAIChipsModule />',
    eject: 'Copy DiscoverSection.tsx into your page folder to customize tabs, AI suggestion logic, and store data.',
  },
  {
    name: 'SearchFooterModule',
    desc: 'Search pill + cart pill floating footer',
    img: null,
    category: 'Wes Design System',
    importPath: "import { SearchFooterModule } from '@shared/modules/SearchFooterModule'",
    props: 'None required',
    usage: '<SearchFooterModule />',
    eject: 'Copy Footer.tsx into your page folder to customize search and cart layout.',
  },
  {
    name: 'MenuListModule',
    desc: 'Vertical menu item list with images and add-to-cart buttons',
    img: null,
    category: 'Wes Design System',
    importPath: "import { MenuSection } from '@shared/components/MenuSection'",
    props: 'title: string  (default "Breakfast"),  items: MenuItem[],  onAddToCart?: callback',
    usage: '<MenuSection title="Breakfast" items={store.menu} />',
    eject: 'Copy MenuSection.tsx into your page folder to customize item layout, tags, and add-to-cart behavior.',
  },
]

function ModuleCard({ m }: { m: ModuleSpec }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleCopy(e: React.MouseEvent) {
    e.stopPropagation()
    const text = `Import: ${m.importPath}\nProps: ${m.props}\nUsage: ${m.usage}${m.eject ? `\nEject: ${m.eject}` : ''}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="gsv2-mod-card">
      <div className="gsv2-mod-header">
        <div className="gsv2-mod-name">{m.name}</div>
        <div className="gsv2-mod-desc">{m.desc}</div>
      </div>
      <div className="gsv2-mod-preview">
        {m.img
          ? <img src={m.img} alt={`${m.name} preview`} />
          : <span className="gsv2-coming-soon">No Preview</span>
        }
      </div>
      <button className={`gsv2-mod-toggle${open ? ' gsv2-mod-toggle--open' : ''}`} onClick={() => setOpen(!open)}>
        <span className="gsv2-mod-toggle__label">Specs</span>
        <span className="gsv2-mod-toggle__chevron">▾</span>
      </button>
      {open && (
        <div className="gsv2-mod-info">
          <div className="gsv2-mod-info-copy">
            <button className={`gsv2-mod-copy-btn${copied ? ' gsv2-mod-copy-btn--copied' : ''}`} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="gsv2-mod-info-row">
            <div className="gsv2-mod-info-label">Import</div>
            <div className="gsv2-mod-info-value"><code>{m.importPath}</code></div>
          </div>
          <div className="gsv2-mod-info-row">
            <div className="gsv2-mod-info-label">Props</div>
            <div className="gsv2-mod-info-value"><pre>{m.props}</pre></div>
          </div>
          <div className="gsv2-mod-info-row">
            <div className="gsv2-mod-info-label">Usage</div>
            <div className="gsv2-mod-info-value"><pre>{m.usage}</pre></div>
          </div>
          {m.eject && (
            <div className="gsv2-mod-info-row">
              <div className="gsv2-mod-info-label">Eject</div>
              <div className="gsv2-mod-info-value gsv2-mod-info-value--eject">{m.eject}</div>
            </div>
          )}
          {m.worksWithNote && (
            <div className="gsv2-mod-info-row">
              <div className="gsv2-mod-info-label">Works with</div>
              <div className="gsv2-mod-info-value">{m.worksWithNote}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ModulesSection() {
  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Libraries</p>
      <h1 className="gsv2-section__title">Reusable Modules</h1>
      <p className="gsv2-section__lead">
        Pre-built layout blocks you can drop into any template. Each module is self-contained
        and customizable — ask your AI agent to add one by name.
      </p>

      <div className="gsv2-mod-grid">
        {MODULES.map((m) => <ModuleCard key={m.name} m={m} />)}
      </div>
    </div>
  )
}
