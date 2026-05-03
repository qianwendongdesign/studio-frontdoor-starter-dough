import { ReactNode } from 'react'
import { useDragToScroll } from '@shared/hooks/useDragToScroll'

export interface FilterChipItem {
  label: string
  icon?: ReactNode
  className?: string
}

export interface FilterChipsProps {
  chips: FilterChipItem[] | string[]
  activeLabel: string
  onSelect: (label: string) => void
  containerClassName?: string
}

export function FilterChips({
  chips,
  activeLabel,
  onSelect,
  containerClassName = '',
}: FilterChipsProps) {
  const scrollRef = useDragToScroll()

  const normalized: FilterChipItem[] =
    typeof chips[0] === 'string'
      ? (chips as string[]).map((label) => ({ label }))
      : (chips as FilterChipItem[])

  return (
    <div
      className={`filter-chips ${containerClassName}`.trim()}
      ref={scrollRef}
    >
      {normalized.map((chip) => {
        const isActive = chip.label === activeLabel
        const extra = chip.className ?? ''
        const hasIcon = !!chip.icon
        return (
          <button
            key={chip.label}
            className={[
              'filter-chip',
              hasIcon ? 'filter-chip--icon' : '',
              isActive ? 'filter-chip--active' : 'filter-chip--inactive',
              extra,
            ].filter(Boolean).join(' ')}
            onClick={() => onSelect(chip.label)}
          >
            {chip.icon && <span className="filter-chip-icon">{chip.icon}</span>}
            <span className="filter-chip-label">{chip.label}</span>
          </button>
        )
      })}
    </div>
  )
}
