/**
 * TabBar — horizontal scrollable category tab bar with selected state.
 *
 * Preview: assets/component-previews/tab-bar.png
 *
 * Built on @doordash/prism-react ButtonTabs and ButtonTab.
 * Custom styling: hidden scrollbar.
 * For use in Prism-based templates only (requires PrismShell).
 *
 * Usage:
 *   import { TabBar } from '@shared/components/prism/TabBar'
 *   <TabBar
 *     tabs={['All', 'Restaurant', 'Grocery', 'Alcohol', 'Reservations']}
 *     selected="All"
 *     onSelect={(tab) => setActiveTab(tab)}
 *   />
 */
import styled from 'styled-components'
import {
  ButtonTabs,
  ButtonTab,
  ButtonTabsSize,
} from '@doordash/prism-react'

interface TabBarProps {
  tabs: string[]
  selected?: string
  size?: 'small' | 'medium' | 'large'
  onSelect?: (tab: string) => void
}

export function TabBar({
  tabs,
  selected = tabs[0],
  size = 'medium',
  onSelect,
}: TabBarProps) {
  const sizeMap = {
    small: ButtonTabsSize.small,
    medium: ButtonTabsSize.medium,
    large: ButtonTabsSize.large,
  }

  return (
    <Wrapper>
      <ButtonTabs
        size={sizeMap[size]}
        selectedTab={selected}
        onSelect={(i: number) => onSelect?.(tabs[i])}
      >
        {tabs.map(tab => (
          <ButtonTab key={tab} panelId={tab}>{tab}</ButtonTab>
        ))}
      </ButtonTabs>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  [role="tablist"] {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`
