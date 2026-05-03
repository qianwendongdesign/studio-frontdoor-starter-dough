import { SearchIcon, CartIcon } from '@shared/icons/icons'

export function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-blur" />
      <div className="footer-inner">
        <div className="search-pill">
          <SearchIcon />
          <span>Search</span>
        </div>
        <button className="cart-pill" aria-label="Cart">
          <CartIcon />
          <span>3</span>
        </button>
      </div>
      <div className="home-indicator" aria-hidden />
    </div>
  )
}
