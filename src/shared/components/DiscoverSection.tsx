import { useState, useCallback, useRef, useEffect, memo } from 'react'
import { StarIcon } from '@shared/icons/icons'
import { FilterChips, FilterChipItem } from './FilterChips'
import promoLineIcon from '@assets/icons/promo-line.svg'

import imgAnthony from '@assets/food photos/anthony-espinosa-InCMGusiAvA-unsplash.jpg'
import imgAsnim from '@assets/food photos/asnim-ansari-SqYmTDQYMjo-unsplash.jpg'
import imgBen from '@assets/food photos/ben-kolde-FFqNATH27EM-unsplash.jpg'
import imgBilalC from '@assets/food photos/bilal-rana-CxMND7LsS08-unsplash.jpg'
import imgBilalN from '@assets/food photos/bilal-rana-NO_vhDt6h4E-unsplash.jpg'
import imgBilalR from '@assets/food photos/bilal-rana-rCl6ZyI0jXg-unsplash.jpg'
import imgBon from '@assets/food photos/bon-vivant-qom5MPOER-I-unsplash.jpg'
import imgCalum from '@assets/food photos/calum-lewis-8Nc_oQsc2qQ-unsplash.jpg'
import imgChris from '@assets/food photos/chris-ralston-09HGdZzkP-Q-unsplash.jpg'
import imgChristopher from '@assets/food photos/christopher-alvarenga-5uYH4yTDp34-unsplash.jpg'
import imgCrunch from '@assets/food photos/crunch-xzT7w8paUr4-unsplash.jpg'
import imgDeborah from '@assets/food photos/deborah-rainford-zOlZgELBMRg-unsplash.jpg'
import imgDerek from '@assets/food photos/derek-duran-Jz4QMhLvGgw-unsplash.jpg'
import imgDiego from '@assets/food photos/diego-lozano-mE6kjov4rTg-unsplash.jpg'
import imgDovile from '@assets/food photos/dovile-ramoskaite-xX9SmqQCbFY-unsplash.jpg'
import imgFadya from '@assets/food photos/fadya-azhary-5KS7T3Gs3CA-unsplash.jpg'
import imgSachin from '@assets/food photos/food-hd-by-sachin-Y3Z1q7w5A0Y-unsplash.jpg'
import imgGonzalo from '@assets/food photos/gonzalo-mendiola-dzn37nOmki4-unsplash.jpg'
import imgEuisook from '@assets/food photos/im-euisook-pR89LfS3N4A-unsplash.jpg'
import imgImad from '@assets/food photos/imad-786-n5I4Ix008-0-unsplash.jpg'
import imgJarett from '@assets/food photos/jarett-lopez-6WHl6T-fxU0-unsplash.jpg'
import imgKrisztian from '@assets/food photos/krisztian-tabori-ZQf4jzkpz1k-unsplash.jpg'
import imgLoa from '@assets/food photos/loa-kon-2LXESZGslMQ-unsplash.jpg'
import imgLuisa from '@assets/food photos/luisa-brimble-vIm26fn_QKg-unsplash.jpg'
import imgMae from '@assets/food photos/mae-mu-H5Hj8QV2Tx4-unsplash.jpg'
import imgMariana from '@assets/food photos/mariana-medvedeva-fk6IiypMWss-unsplash.jpg'
import imgMonika from '@assets/food photos/monika-grabkowska-FVf1ESEBuMI-unsplash.jpg'
import imgMontatip from '@assets/food photos/montatip-lilitsanong-iU26ZSJh9yw-unsplash.jpg'
import imgPaulo from '@assets/food photos/paulo-doi-6uTQmtqcAzs-unsplash.jpg'
import imgRachel from '@assets/food photos/rachel-park-hrlvr2ZlUNk-unsplash.jpg'
import imgRoosa from '@assets/food photos/roosa-kulju-O594WRcWphI-unsplash.jpg'
import imgShashi from '@assets/food photos/shashi-chaturvedula-jEjCqbVt_bI-unsplash.jpg'
import imgTaylor from '@assets/food photos/taylor-kiser-EvoIiaIVRzU-unsplash.jpg'
import imgCreators from '@assets/food photos/we-the-creators-5mpht0M5H0E-unsplash.jpg'
import imgYoav from '@assets/food photos/yoav-aziz-AiHJiRCwB3w-unsplash.jpg'

const ALL_FOOD_PHOTOS = [
  imgAnthony, imgAsnim, imgBen, imgBilalC, imgBilalN, imgBilalR,
  imgBon, imgCalum, imgChris, imgChristopher, imgCrunch, imgDeborah,
  imgDerek, imgDiego, imgDovile, imgFadya, imgSachin, imgGonzalo,
  imgEuisook, imgImad, imgJarett, imgKrisztian, imgLoa, imgLuisa,
  imgMae, imgMariana, imgMonika, imgMontatip, imgPaulo, imgRachel,
  imgRoosa, imgShashi, imgTaylor, imgCreators, imgYoav,
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

let shuffledPhotos = shuffleArray(ALL_FOOD_PHOTOS)
let photoIndex = 0

function nextPhoto(): string {
  if (photoIndex >= shuffledPhotos.length) {
    shuffledPhotos = shuffleArray(ALL_FOOD_PHOTOS)
    photoIndex = 0
  }
  return shuffledPhotos[photoIndex++]
}

interface Store {
  name: string
  rating: string
  time: string
  dist: string
  fee: string
  tag?: string
  img: string
}

interface GeneratedTab {
  label: string
  isAi: true
  shimmer: boolean
  slideIn: boolean
}

type Tab =
  | { label: string; isAi?: false; shimmer?: false; slideIn?: false }
  | GeneratedTab

const STATIC_TABS: Tab[] = [
  { label: 'Italian' },
  { label: 'Burgers' },
  { label: 'Sushi' },
]

const AI_SUGGESTIONS: Record<string, string[]> = {
  Italian: ['Pasta', 'Risotto', 'Focaccia', 'Osso Buco', 'Tiramisu', 'Pesto Bowls', 'Bruschetta', 'Carbonara'],
  Burgers: ['Sliders', 'Smash Burgers', 'Wagyu Patties', 'Turkey Burgers', 'Loaded Fries', 'Onion Rings', 'Cheese Steaks', 'BBQ Melts'],
  Sushi: ['Poke Bowls', 'Sashimi', 'Omakase', 'Temaki', 'Chirashi', 'Udon', 'Tempura', 'Miso Ramen'],
}

const STORE_NAME_POOL = [
  'Golden Wok', 'The Hungry Fox', 'Basil & Thyme', 'Harbor Kitchen',
  'Nosh & Nibble', 'Ember Grill', 'Spice Route', 'Urban Bites',
  'Crispy Corner', 'Savor Spot', 'The Green Fork', 'Flame & Stone',
  'Blue Door Bistro', 'Sunset Eatery', 'Copper Pot', 'Salt & Pepper',
  'The Daily Grind', 'Wildflower Cafe', 'Maple & Main', 'Oak Table',
  'Fig & Olive', 'Red Lantern', 'The Corner Table', 'Craft & Cure',
  'Seaside Grill', 'Rustic Roots', 'Harvest Bowl', 'Cloud Kitchen',
  'The Iron Skillet', 'Blossom Bites', 'Zen Garden', 'Lucky Dragon',
  'Primo Plates', 'The Patio', 'Hearth & Home', 'Bright Bites',
  'Vine & Dine', 'Luna Kitchen', 'Cove Eatery', 'Sprout & Spoon',
]

let shuffledNames = shuffleArray(STORE_NAME_POOL)
let nameIndex = 0

function nextStoreName(): string {
  if (nameIndex >= shuffledNames.length) {
    shuffledNames = shuffleArray(STORE_NAME_POOL)
    nameIndex = 0
  }
  return shuffledNames[nameIndex++]
}

// Real store header images from DoorDash CDN (DIMENSION_BUSINESS.HEADER_IMAGE)
const CDN_PICCOLO_FORNO  = 'https://cdn.doordash.com/media/store/header/04113742-d776-4f23-b5c7-6d016067098f.jpg'
const CDN_NAPOLI_PIZZA   = 'https://cdn.doordash.com/media/store/header/4c33ee05-0b9c-44ea-876f-2a2016a0c509.jpg'
const CDN_TRATTORIA      = 'https://cdn.doordash.com/media/store/header/633430f8-f9f8-43a2-9974-caa8b727f710.jpg'
const CDN_OLIVE_VINE     = 'https://cdn.doordash.com/media/store/header/ac7dfe49-8562-4bfa-a90c-f2ec09972882.jpg'
const CDN_SHAKE_SHACK    = 'https://cdn.doordash.com/media/store/header/60c7711c-6f10-4103-abbe-7e348faa250f.jpg'
const CDN_FIVE_GUYS      = 'https://cdn.doordash.com/media/store/header/a2bee97a-36e0-440c-835f-5d698d89ff11.jpg'
const CDN_SMASHBURGER    = 'https://cdn.doordash.com/media/store/header/07689010-9708-4412-99c8-f359d5281744.png'
const CDN_PATTY_MELT     = 'https://cdn.doordash.com/media/store/header/546fb733-be83-4d5f-a2dd-227c46a2be15.jpg'
const CDN_SUSHI_ROKU     = 'https://cdn.doordash.com/media/store/header/e861b62b-fba2-4cdb-8087-87c3d42bb70c.jpg'
const CDN_KURA           = 'https://cdn.doordash.com/media/store/header/aa4317d4-b6a1-4651-9252-3d185245da09.jpg'
const CDN_OMAKASE        = 'https://cdn.doordash.com/media/store/header/c2c99bf7-6b27-403e-9713-120d03e52b4c.jpg'
const CDN_ROLL_BOWL      = 'https://cdn.doordash.com/media/store/header/303a80bd-0f66-4856-aabb-d182247d35df.jpeg'

const STORES_BY_TAB: Record<string, Store[]> = {
  Italian: [
    { name: 'Piccolo Forno',  rating: '4.7', time: '35 min', dist: '0.9 mi', fee: '$3.99 delivery fee', tag: '15% off on $25+', img: CDN_PICCOLO_FORNO },
    { name: 'Napoli Pizza',   rating: '4.5', time: '28 min', dist: '1.2 mi', fee: '$2.99 delivery fee',                         img: CDN_NAPOLI_PIZZA },
    { name: 'Trattoria Roma', rating: '4.9', time: '40 min', dist: '0.5 mi', fee: '$3.99 delivery fee', tag: '$5 off on $30+',  img: CDN_TRATTORIA },
    { name: 'Olive & Vine',   rating: '4.6', time: '30 min', dist: '0.8 mi', fee: '$1.99 delivery fee',                         img: CDN_OLIVE_VINE },
  ],
  Burgers: [
    { name: 'Shake Shack',     rating: '4.8', time: '25 min', dist: '0.6 mi', fee: '$2.99 delivery fee', tag: '$4 off on $20+',    img: CDN_SHAKE_SHACK },
    { name: 'Five Guys',       rating: '4.6', time: '30 min', dist: '1.0 mi', fee: '$3.99 delivery fee',                           img: CDN_FIVE_GUYS },
    { name: 'Smashburger',     rating: '4.7', time: '22 min', dist: '0.4 mi', fee: '$1.99 delivery fee', tag: 'Buy 1, get 1 free', img: CDN_SMASHBURGER },
    { name: 'Patty Meltery',   rating: '4.4', time: '35 min', dist: '1.5 mi', fee: '$3.99 delivery fee',                           img: CDN_PATTY_MELT },
  ],
  Sushi: [
    { name: 'Sushi Roku',     rating: '4.9', time: '35 min', dist: '0.7 mi', fee: '$3.99 delivery fee', tag: '20% off on $40+', img: CDN_SUSHI_ROKU },
    { name: 'Kura Sushi',     rating: '4.7', time: '28 min', dist: '1.1 mi', fee: '$2.99 delivery fee',                         img: CDN_KURA },
    { name: 'Omakase Sushi',  rating: '4.8', time: '40 min', dist: '0.9 mi', fee: '$4.99 delivery fee', tag: '$8 off on $50+',  img: CDN_OMAKASE },
    { name: 'Roll and Bowl',  rating: '4.5', time: '20 min', dist: '0.3 mi', fee: '$1.99 delivery fee',                         img: CDN_ROLL_BOWL },
  ],
}

const RATINGS = ['4.5', '4.6', '4.7', '4.8', '4.9']
const TIMES = ['20 min', '25 min', '28 min', '30 min', '35 min', '40 min']
const DISTS = ['0.3 mi', '0.5 mi', '0.7 mi', '0.9 mi', '1.1 mi', '1.4 mi']
const FEES = ['$1.99 delivery fee', '$2.99 delivery fee', '$3.99 delivery fee']
const TAGS = ['15% off on $25+', '$5 off on $30+', '20% off select items', 'Buy 1, get 1 free', '$4 off on $20+', undefined]

function generateStores(_label: string): Store[] {
  const pick = <T,>(arr: T[], i: number): T => arr[i % arr.length]
  const hash = _label.length
  return Array.from({ length: 4 }, (_, i) => ({
    name: nextStoreName(),
    rating: pick(RATINGS, hash + i),
    time: pick(TIMES, hash + i + 1),
    dist: pick(DISTS, hash + i + 2),
    fee: pick(FEES, hash + i),
    tag: pick(TAGS, hash + i + 3),
    img: nextPhoto(),
  }))
}

const CROSSFADE_MS = 600

const CrossfadeImage = memo(function CrossfadeImage({ src }: { src: string }) {
  const [bottom, setBottom] = useState(src)
  const [top, setTop] = useState<string | null>(null)
  const [topVisible, setTopVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const rafRef = useRef<number>()

  useEffect(() => {
    if (src === bottom) {
      setTop(null)
      setTopVisible(false)
      return
    }

    const img = new Image()
    img.src = src

    const startTransition = () => {
      setTop(src)
      setTopVisible(false)
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          setTopVisible(true)
          timerRef.current = setTimeout(() => {
            setBottom(src)
            setTop(null)
            setTopVisible(false)
          }, CROSSFADE_MS)
        })
      })
    }

    if (img.complete) {
      startTransition()
    } else {
      img.onload = startTransition
    }

    return () => {
      img.onload = null
      clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [src, bottom])

  return (
    <div className="store-card-img-wrapper">
      <img src={bottom} alt="" className="store-card-img" />
      {top && (
        <img
          src={top}
          alt=""
          className={`store-card-img store-card-img--top ${topVisible ? 'store-card-img--visible' : ''}`}
        />
      )}
    </div>
  )
})

const MAX_TOTAL_TABS = 8
const CHIP_APPEAR_DELAY = 900

interface DiscoverSectionProps {
  onStoreClick?: (store: Store) => void
}

export function DiscoverSection({ onStoreClick }: DiscoverSectionProps) {
  const [activeTab, setActiveTab] = useState('Italian')
  const [tabs, setTabs] = useState<Tab[]>(STATIC_TABS)
  const [dynamicStores, setDynamicStores] = useState<Record<string, Store[]>>({})
  const usedSuggestionsRef = useRef<Record<string, number>>({ Italian: 0, Burgers: 0, Sushi: 0 })
  const pendingInsertRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleStaticTabClick = useCallback((tab: string) => {
    setActiveTab(tab)

    if (pendingInsertRef.current) {
      clearTimeout(pendingInsertRef.current)
    }

    if (tabs.length >= MAX_TOTAL_TABS) return

    const suggestions = AI_SUGGESTIONS[tab]
    if (!suggestions) return

    const idx = usedSuggestionsRef.current[tab] ?? 0
    if (idx >= suggestions.length) return

    const newLabel = suggestions[idx]
    usedSuggestionsRef.current[tab] = idx + 1

    const newStores = generateStores(newLabel)
    setDynamicStores((prev) => ({ ...prev, [newLabel]: newStores }))

    pendingInsertRef.current = setTimeout(() => {
      const newTab: GeneratedTab = { label: newLabel, isAi: true, shimmer: true, slideIn: true }
      setTabs((prev) => {
        const staticTabs = prev.slice(0, 3)
        const dynamicTabs = prev.slice(3)
        return [...staticTabs, newTab, ...dynamicTabs].slice(0, MAX_TOTAL_TABS)
      })
      pendingInsertRef.current = null
    }, CHIP_APPEAR_DELAY)
  }, [tabs])

  const handleAiTabClick = useCallback((tab: string) => {
    if (tab === activeTab) return
    setActiveTab(tab)
  }, [activeTab])

  useEffect(() => {
    const hasTransient = tabs.some((t) => t.shimmer || t.slideIn)
    if (!hasTransient) return

    const timer = setTimeout(() => {
      setTabs((prev) =>
        prev.map((t) => {
          if (!t.isAi) return t
          if (t.shimmer || t.slideIn) {
            return { ...t, shimmer: false, slideIn: false }
          }
          return t
        })
      )
    }, 1200)
    return () => clearTimeout(timer)
  }, [tabs])

  useEffect(() => {
    return () => {
      if (pendingInsertRef.current) clearTimeout(pendingInsertRef.current)
    }
  }, [])

  const allStores: Record<string, Store[]> = { ...STORES_BY_TAB, ...dynamicStores }
  const stores = allStores[activeTab] ?? STORES_BY_TAB.Italian

  const chipItems: FilterChipItem[] = tabs.map((tab) => ({
    label: tab.label,
    icon: tab.isAi ? <img src={promoLineIcon} alt="" draggable={false} /> : undefined,
    className: [
      tab.shimmer ? 'filter-chip--shimmer' : '',
      tab.slideIn ? 'filter-chip--slide-in' : '',
    ].filter(Boolean).join(' ') || undefined,
  }))

  const handleChipSelect = useCallback((label: string) => {
    const tab = tabs.find((t) => t.label === label)
    if (tab?.isAi) {
      handleAiTabClick(label)
    } else {
      handleStaticTabClick(label)
    }
  }, [tabs, handleAiTabClick, handleStaticTabClick])

  return (
    <div className="similar-section">
      <div className="section-header">
        <h2 className="section-title">Discover something new</h2>
      </div>
      <FilterChips
        chips={chipItems}
        activeLabel={activeTab}
        onSelect={handleChipSelect}
        containerClassName="filter-chips--section"
      />
      <div className="store-grid">
        {stores.map((store, i) => (
          <article key={i} className="store-card" onClick={() => onStoreClick?.(store)} style={onStoreClick ? { cursor: 'pointer' } : undefined}>
            <CrossfadeImage src={store.img} />
            <div key={store.name} className="store-card-meta">
              <div className="store-card-name">{store.name}</div>
              <div className="store-card-rating">
                {store.rating} <StarIcon />
                <span className="dot">·</span>
                <span className="store-card-detail">{store.time}</span>
                <span className="dot">·</span>
                <span className="store-card-detail">{store.dist}</span>
              </div>
              <div className="store-card-detail">{store.fee}</div>
              {store.tag && <div className="tag tag--rounded tag--deal">{store.tag}</div>}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
