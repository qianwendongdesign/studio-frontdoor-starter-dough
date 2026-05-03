import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { CartIcon, SearchIcon, StarIcon } from '@shared/icons/icons'
import { useDragToScroll } from '@shared/hooks/useDragToScroll'
import { ReorderOrderHistorySheet } from './ReorderOrderHistorySheet'
import type { FilterFavoriteStore, FilterOrderLineItem } from '@shared/data/reorderFavoritesFilterAdapter'
import pillFilters from '@shared/data/pill_filters.json'

const SUB_CHIPS: Record<string, string[]> = pillFilters.subCategories as Record<string, string[]>
const BROAD_CHIPS = pillFilters.categories

interface ReorderFavoritesFilterProps {
  storesByCategory: Record<string, FilterFavoriteStore[]>
  orderItemsByStore: Record<string, FilterOrderLineItem[]>
}

type FilterState =
  | { level: 'broad'; selected: string }
  | { level: 'drilled'; parent: string; selected: Set<string> }

function useFilterRail() {
  const [state, setState] = useState<FilterState>({ level: 'broad', selected: 'For you' })

  const handleChipTap = useCallback((label: string) => {
    setState((prev) => {
      if (prev.level === 'broad') {
        if (label === 'For you') return { level: 'broad', selected: 'For you' }
        if (SUB_CHIPS[label]) return { level: 'drilled', parent: label, selected: new Set([label]) }
        return { level: 'broad', selected: label }
      }
      if (label === prev.parent) return { level: 'broad', selected: 'For you' }
      const next = new Set(prev.selected)
      if (next.has(label)) {
        if (next.size > 1) next.delete(label)
      } else {
        next.add(label)
      }
      return { level: 'drilled', parent: prev.parent, selected: next }
    })
  }, [])

  const isSelected = (label: string) => {
    if (state.level === 'broad') return state.selected === label
    return state.selected.has(label)
  }

  const activeDataKey = state.level === 'broad' ? state.selected : state.parent
  const level = state.level
  const parent = state.level === 'drilled' ? state.parent : null
  const selectedSubs = state.level === 'drilled' ? state.selected : null

  return { isSelected, handleChipTap, activeDataKey, level, parent, selectedSubs }
}

const LONG_PRESS_MS = 480
const LONG_PRESS_MOVE_PX = 12

function ThumbsUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11l2.26-4.53A2 2 0 0 1 12.26 2H14a2 2 0 0 1 2 2v2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ThumbsDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11l-2.26 4.53A2 2 0 0 1 11.74 22H10a2 2 0 0 1-2-2v-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FavoriteCardFace({ store }: { store: FilterFavoriteStore }) {
  return (
    <>
      <img src={store.image} alt="" className="reorder-filter-card-img" draggable={false} loading="lazy" />
      <div className="reorder-filter-card-info">
        <div className="reorder-filter-card-name">{store.name}</div>
        <div className="store-card-rating">
          {store.rating} <StarIcon />
          <span className="dot">·</span>
          <span className="store-card-detail">{store.time}</span>
          <span className="dot">·</span>
          <span className="store-card-detail">{store.distance}</span>
        </div>
        {store.tag && <div className="tag tag--rounded tag--deal">{store.tag}</div>}
      </div>
    </>
  )
}

function FavoriteCard({
  store,
  staggerIndex = 0,
  onOpen,
  onLongPress,
}: {
  store: FilterFavoriteStore
  staggerIndex?: number
  onOpen: (store: FilterFavoriteStore) => void
  onLongPress: (store: FilterFavoriteStore, rect: DOMRect) => void
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startRef = useRef<{ x: number; y: number } | null>(null)
  const ignoreNextClickRef = useRef(false)
  const wasDragRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    startRef.current = null
  }, [])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return
      clearTimer()
      wasDragRef.current = false
      startRef.current = { x: e.clientX, y: e.clientY }
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        const el = btnRef.current
        if (!el) return
        ignoreNextClickRef.current = true
        onLongPress(store, el.getBoundingClientRect())
      }, LONG_PRESS_MS)
    },
    [clearTimer, onLongPress, store],
  )

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      const s = startRef.current
      if (!s) return
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (dx * dx + dy * dy > LONG_PRESS_MOVE_PX * LONG_PRESS_MOVE_PX) {
        wasDragRef.current = true
        clearTimer()
      }
    },
    [clearTimer],
  )

  const onPointerEnd = useCallback(() => {
    clearTimer()
  }, [clearTimer])

  return (
    <button
      ref={btnRef}
      type="button"
      className="reorder-filter-card reorder-filter-card--stagger-in"
      style={
        {
          ['--reorder-carousel-stagger']: String(staggerIndex),
        } as CSSProperties
      }
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onPointerLeave={onPointerEnd}
      onClick={() => {
        if (ignoreNextClickRef.current) {
          ignoreNextClickRef.current = false
          return
        }
        if (wasDragRef.current) {
          wasDragRef.current = false
          return
        }
        onOpen(store)
      }}
    >
      <FavoriteCardFace store={store} />
    </button>
  )
}

type CardRectSnapshot = { top: number; left: number; width: number; height: number }

function snapshotRect(r: DOMRect): CardRectSnapshot {
  return { top: r.top, left: r.left, width: r.width, height: r.height }
}

function readPrototypeFrame(): CardRectSnapshot {
  const root = document.getElementById('root')
  if (!root) {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
  }
  return snapshotRect(root.getBoundingClientRect())
}

function ReorderLongPressOverlay({
  store,
  cardRect,
  onClose,
  onReorder,
}: {
  store: FilterFavoriteStore
  cardRect: CardRectSnapshot
  onClose: () => void
  onReorder: () => void
}) {
  const [prototypeFrame, setPrototypeFrame] = useState<CardRectSnapshot>(readPrototypeFrame)

  useLayoutEffect(() => {
    const update = () => setPrototypeFrame(readPrototypeFrame())
    update()
    window.addEventListener('resize', update)
    const root = document.getElementById('root')
    const ro = root ? new ResizeObserver(update) : null
    if (root) ro!.observe(root)
    return () => {
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const menuW = 204
  const gap = 10
  const itemH = 44
  const stackGap = 8
  const stackH = 4 * itemH + 3 * stackGap

  const f = prototypeFrame

  let menuLeft = cardRect.left - menuW - gap
  if (menuLeft < f.left + 8) {
    menuLeft = Math.min(cardRect.left + cardRect.width + gap, f.left + f.width - menuW - 8)
  }
  let menuTop = cardRect.top + cardRect.height / 2 - stackH / 2
  menuTop = Math.max(f.top + 8, Math.min(menuTop, f.top + f.height - stackH - 8))
  menuLeft = Math.max(f.left + 8, Math.min(menuLeft, f.left + f.width - menuW - 8))

  const log = (action: string) => {
    console.info(`[Reorder long-press] ${action}`, store.name)
    onClose()
  }

  return createPortal(
    <div
      className="reorder-longpress-root"
      role="presentation"
      style={{
        top: f.top,
        left: f.left,
        width: f.width,
        height: f.height,
      }}
    >
      <button type="button" className="reorder-longpress-backdrop" aria-label="Dismiss menu" onClick={onClose} />
      <div
        className="reorder-longpress-card"
        style={{
          top: cardRect.top,
          left: cardRect.left,
          width: cardRect.width,
        }}
      >
        <div className="reorder-longpress-card-inner">
          <FavoriteCardFace store={store} />
        </div>
      </div>
      <div
        className="reorder-longpress-menu"
        style={{ top: menuTop, left: menuLeft, width: menuW }}
        role="menu"
        aria-label="Store actions"
      >
        {(
          [
            {
              label: 'Reorder',
              Icon: CartIcon,
              onSelect: () => {
                onReorder()
                onClose()
              },
            },
            { label: 'Search similar', Icon: SearchIcon, onSelect: () => log('Search similar') },
            { label: 'More like this', Icon: ThumbsUpIcon, onSelect: () => log('More like this') },
            { label: 'Less like this', Icon: ThumbsDownIcon, onSelect: () => log('Less like this') },
          ] as const
        ).map(({ label, Icon, onSelect }, index) => (
          <button
            key={label}
            type="button"
            className="reorder-longpress-menu-item reorder-longpress-menu-item--enter"
            role="menuitem"
            style={
              {
                animationDelay: `${48 + index * 58}ms`,
              } as CSSProperties
            }
            onClick={onSelect}
          >
            <span className="reorder-longpress-menu-icon" aria-hidden>
              <Icon />
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>,
    document.body,
  )
}

function BackButton({ onClick, railEnter }: { onClick: () => void; railEnter?: boolean }) {
  return (
    <button
      className={`reorder-filter-back-btn${railEnter ? ' reorder-filter-back-btn--rail-enter' : ''}`}
      onClick={onClick}
      aria-label="Back to all filters"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M7.21 2.29a1 1 0 0 1 0 1.42L4.42 6.5H13a1 1 0 1 1 0 2H4.42l2.79 2.79a1 1 0 1 1-1.42 1.42l-4.5-4.5a1 1 0 0 1 0-1.42l4.5-4.5a1 1 0 0 1 1.42 0Z"
          fill="var(--foreground-primary)"
        />
      </svg>
    </button>
  )
}

type ParentFlipState =
  | { phase: 'idle' }
  | { phase: 'invert'; dx: number }
  | { phase: 'play'; dx: number }

export function ReorderFavoritesFilter({
  storesByCategory,
  orderItemsByStore,
}: ReorderFavoritesFilterProps) {
  const { isSelected, handleChipTap, activeDataKey, level, parent, selectedSubs } = useFilterRail()
  const chipRailRef = useDragToScroll()
  const carouselRef = useDragToScroll()
  const isDrilled = level === 'drilled'

  const [drillSession, setDrillSession] = useState(0)
  const [chipRailAlignKey, setChipRailAlignKey] = useState(0)
  const [parentFlip, setParentFlip] = useState<ParentFlipState>({ phase: 'idle' })
  const flipMeasureRef = useRef<{ session: number; left: number } | null>(null)
  const broadChipRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const parentChipRef = useRef<HTMLButtonElement | null>(null)
  const [carouselRevealGen, setCarouselRevealGen] = useState(0)
  const prevStoresSignatureRef = useRef<string | null>(null)
  const [sheetStore, setSheetStore] = useState<FilterFavoriteStore | null>(null)
  const [longPress, setLongPress] = useState<{ store: FilterFavoriteStore; rect: CardRectSnapshot } | null>(null)

  const handleCarouselLongPress = useCallback((store: FilterFavoriteStore, rect: DOMRect) => {
    setLongPress({ store, rect: snapshotRect(rect) })
  }, [])

  const sheetOrderItems = useMemo(
    () => (sheetStore ? (orderItemsByStore[sheetStore.name] ?? []) : []),
    [sheetStore, orderItemsByStore],
  )

  const allStores = storesByCategory[activeDataKey] || []
  const stores =
    selectedSubs && selectedSubs.size > 0 && !(selectedSubs.size === 1 && parent && selectedSubs.has(parent))
      ? allStores.filter((s) => s.tags?.some((t) => selectedSubs.has(t)))
      : allStores

  const handleChipClick = useCallback(
    (label: string) => {
      if (level === 'broad' && SUB_CHIPS[label]) {
        const el = broadChipRefs.current.get(label)
        const nextSession = drillSession + 1
        flipMeasureRef.current = el
          ? { session: nextSession, left: el.getBoundingClientRect().left }
          : null
        setDrillSession(nextSession)
      } else if (level === 'broad') {
        flipMeasureRef.current = null
      }
      handleChipTap(label)
      setChipRailAlignKey((k) => k + 1)
    },
    [level, drillSession, handleChipTap],
  )

  useLayoutEffect(() => {
    const rail = chipRailRef.current
    if (rail) rail.scrollLeft = 0
    const carousel = carouselRef.current
    if (carousel) carousel.scrollLeft = 0
  }, [chipRailAlignKey, carouselRevealGen])

  useLayoutEffect(() => {
    const signature = stores.map((s) => s.name).join('\u0001')
    if (prevStoresSignatureRef.current === null) {
      prevStoresSignatureRef.current = signature
      return
    }
    if (prevStoresSignatureRef.current === signature) return
    prevStoresSignatureRef.current = signature
    setCarouselRevealGen((g) => g + 1)
  }, [stores])

  useLayoutEffect(() => {
    if (!isDrilled || !parent) {
      setParentFlip({ phase: 'idle' })
      flipMeasureRef.current = null
      return
    }

    const payload = flipMeasureRef.current
    if (!payload || payload.session !== drillSession) {
      return
    }

    const parentEl = parentChipRef.current
    if (!parentEl) {
      return
    }

    const dx = payload.left - parentEl.getBoundingClientRect().left
    flipMeasureRef.current = null

    if (Math.abs(dx) < 0.5) {
      setParentFlip({ phase: 'idle' })
      return
    }

    setParentFlip({ phase: 'invert', dx })
  }, [isDrilled, parent, drillSession])

  useEffect(() => {
    if (parentFlip.phase !== 'invert') return
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setParentFlip({ phase: 'play', dx: 0 })
      })
    })
    return () => cancelAnimationFrame(id)
  }, [parentFlip.phase])

  const handleBackClick = useCallback(() => {
    if (parent) handleChipTap(parent)
    setChipRailAlignKey((k) => k + 1)
  }, [handleChipTap, parent])

  const handleAddSheetToCart = useCallback(
    (payload: {
      storeName: string
      lines: { id: string; name: string; qty: number; unitPrice: number }[]
    }) => {
      console.info('[Reorder] Add to cart', payload)
    },
    [],
  )

  const chips: { key: string; label: string; isBack?: boolean }[] = []
  if (!isDrilled) {
    for (const label of BROAD_CHIPS) {
      chips.push({ key: `chip-${label}`, label })
    }
  } else if (parent) {
    chips.push({ key: 'back-button', label: 'Back', isBack: true })
    chips.push({ key: `chip-${parent}`, label: parent })
    const subs = SUB_CHIPS[parent] || []
    for (const label of subs) {
      if (label !== parent) {
        chips.push({ key: `sub-${parent}-${label}`, label })
      }
    }
  }

  return (
    <section className="reorder-filter">
      {longPress && (
        <ReorderLongPressOverlay
          store={longPress.store}
          cardRect={longPress.rect}
          onClose={() => setLongPress(null)}
          onReorder={() => setSheetStore(longPress.store)}
        />
      )}
      {sheetStore && (
        <ReorderOrderHistorySheet
          store={sheetStore}
          items={sheetOrderItems}
          onClose={() => setSheetStore(null)}
          onAddToCart={handleAddSheetToCart}
        />
      )}
      <div className="section-header">
        <div>
          <h2 className="section-title section-title--sm">Reorder your favorites</h2>
          <p className="reorder-filter-subtitle">Skip the search. Go straight to the good stuff.</p>
        </div>
      </div>

      <div className="reorder-filter-chip-rail" ref={chipRailRef}>
        {chips.map((chip, idx) => {
          const isParentChip = isDrilled && !chip.isBack && parent != null && chip.label === parent
          const isSubChip = isDrilled && !chip.isBack && parent != null && chip.label !== parent
          const staggerIndex = isSubChip ? Math.max(0, idx - 2) : -1

          const parentFlipStyle =
            isParentChip && (parentFlip.phase === 'invert' || parentFlip.phase === 'play')
              ? {
                  transform: `translateX(${parentFlip.dx}px)`,
                  transition: parentFlip.phase === 'play' ? undefined : 'none',
                }
              : undefined

          const parentFlipClass =
            isParentChip && (parentFlip.phase === 'invert' || parentFlip.phase === 'play')
              ? ` reorder-filter-chip--parent-flip${parentFlip.phase === 'play' ? ' reorder-filter-chip--parent-flip-play' : ''}`
              : ''

          if (chip.isBack) {
            return (
              <BackButton
                key={`${drillSession}-${chip.key}`}
                onClick={handleBackClick}
                railEnter={isDrilled}
              />
            )
          }

          return (
            <button
              key={isSubChip ? `${drillSession}-${chip.key}` : chip.key}
              ref={(el) => {
                if (!isDrilled && el) {
                  broadChipRefs.current.set(chip.label, el)
                } else if (!isDrilled && !el) {
                  broadChipRefs.current.delete(chip.label)
                }
                if (isParentChip) {
                  parentChipRef.current = el
                }
              }}
              type="button"
              className={`reorder-filter-chip ${isSelected(chip.label) ? 'reorder-filter-chip--active' : ''}${
                isSubChip ? ' reorder-filter-chip--reveal-stagger' : ''
              }${parentFlipClass}`}
              style={{
                ...(parentFlipStyle ?? {}),
                ...(isSubChip
                  ? ({ ['--reorder-stagger' as string]: String(staggerIndex) } as CSSProperties)
                  : {}),
              }}
              onClick={() => handleChipClick(chip.label)}
              onTransitionEnd={
                isParentChip
                  ? (e) => {
                      if (e.propertyName === 'transform' && parentFlip.phase === 'play') {
                        setParentFlip({ phase: 'idle' })
                      }
                    }
                  : undefined
              }
            >
              {chip.label}
            </button>
          )
        })}
      </div>

      <div className="reorder-filter-carousel" ref={carouselRef}>
        {stores.map((store, index) => (
          <FavoriteCard
            key={`${carouselRevealGen}\u0001${store.name}`}
            store={store}
            staggerIndex={index}
            onOpen={setSheetStore}
            onLongPress={handleCarouselLongPress}
          />
        ))}
      </div>
    </section>
  )
}
