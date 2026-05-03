/**
 * SearchBar — floating search pill with optional Ask button.
 *
 * Preview: assets/component-previews/prism-search-bar.png
 *
 * Built on @doordash/prism-react Icon and Text.
 * Renders a 48px pill with search icon, placeholder text, and an optional
 * "Ask" chip with a PromoLine sparkle icon. Intended to be placed inside a
 * fixed/absolute footer with a blur gradient behind it.
 * For use in Prism-based templates only (requires PrismShell).
 *
 * Specs:
 *   Height: 48px
 *   Border-radius: 24px (full pill)
 *   Background: --usage-color-background-default (white)
 *   Shadow: 0 2px 8px rgba(0,0,0,0.12)
 *   Search icon: IconType.SearchLine, medium (24px)
 *   Placeholder text: TextStyle.body.medium.default, secondary color
 *   Ask chip: 12px border-radius, secondary background
 *     Icon: IconType.PromoLine, tiny (12px)
 *     Text: TextStyle.label.xSmall.strong
 *
 * Usage:
 *   import { SearchBar } from '@shared/components/prism/SearchBar'
 *   <SearchBar placeholder="Search DoorDash" />
 *   <SearchBar placeholder="Search grocery" showAsk={false} />
 */
import styled from 'styled-components'
import {
  Icon, IconType, IconSize,
  Text, TextStyle, TextColor,
} from '@doordash/prism-react'

export interface SearchBarProps {
  placeholder?: string
  showAsk?: boolean
  askLabel?: string
  onClick?: () => void
  onAskClick?: () => void
}

export function SearchBar({
  placeholder = 'Search DoorDash',
  showAsk = true,
  askLabel = 'Ask',
  onClick,
  onAskClick,
}: SearchBarProps) {
  return (
    <Pill onClick={onClick}>
      <Icon type={IconType.SearchLine} size={IconSize.medium} />
      <PlaceholderText>
        <Text textStyle={TextStyle.body.medium.default} color={TextColor.text.subdued.default as any}>
          {placeholder}
        </Text>
      </PlaceholderText>
      {showAsk && (
        <AskChip onClick={(e) => { e.stopPropagation(); onAskClick?.() }}>
          <Icon type={IconType.PromoLine} size={IconSize.tiny} />
          <Text textStyle={TextStyle.label.xSmall.strong}>{askLabel}</Text>
        </AskChip>
      )}
    </Pill>
  )
}

const Pill = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  background: var(--usage-color-background-default, white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 6px 0 13px;
  cursor: pointer;
  box-sizing: border-box;
`

const PlaceholderText = styled.div`
  flex: 1;
`

const AskChip = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--usage-color-background-secondary, #f0f0f0);
  margin-right: 4px;
`
