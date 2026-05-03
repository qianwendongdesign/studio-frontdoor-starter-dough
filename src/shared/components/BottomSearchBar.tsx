import styled from 'styled-components'
import { Icon, IconType, IconSize } from '@doordash/prism-react'

interface BottomSearchBarProps {
  label?: string
  cartCount?: number
  cartIcon?: string
}

export function BottomSearchBar({
  label = 'Search grocery',
  cartCount = 3,
}: BottomSearchBarProps) {
  return (
    <Wrapper>
      <Gradient />
      <PillRow>
        <SearchPill>
          <Icon type={IconType.SearchLine} size={IconSize.medium} />
          <SearchLabel>{label}</SearchLabel>
        </SearchPill>
        <CartPill>
          <Icon type={IconType.DealsLine} size={IconSize.medium} />
          <CartCount>{cartCount}</CartCount>
        </CartPill>
      </PillRow>
      <HomeIndicatorBar>
        <HomeIndicator />
      </HomeIndicatorBar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 20;
  pointer-events: none;
  margin-top: -110px;
`

const Gradient = styled.div`
  height: 90px;
  background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.4));
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black);
  mask-image: linear-gradient(to bottom, transparent, black);
`

const PillRow = styled.div`
  position: absolute;
  top: 14px;
  left: 19px;
  right: 19px;
  display: flex;
  gap: 8px;
  pointer-events: auto;
`

const SearchPill = styled.div`
  flex: 1;
  height: 48px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(25,25,25,0.2);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 32px 0 12px;
  overflow: hidden;
`

const SearchLabel = styled.span`
  flex: 1;
  font-family: 'TT Norms', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #191919;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CartPill = styled.div`
  height: 48px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(25,25,25,0.2);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px 0 12px;
  flex-shrink: 0;
`

const CartCount = styled.span`
  font-family: 'TT Norms', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #191919;
`

const HomeIndicatorBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HomeIndicator = styled.div`
  width: 134px;
  height: 5px;
  border-radius: 100px;
  background: #191919;
`
