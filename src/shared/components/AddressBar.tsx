import { BellIcon, PersonIcon, ChevronDownIcon } from '@shared/icons/icons'

interface AddressBarProps {
  address?: string
}

export function AddressBar({ address = '283 Hayes St' }: AddressBarProps) {
  return (
    <div className="address-bar">
      <div className="address-left">
        <span className="address-text">{address}</span>
        <ChevronDownIcon />
      </div>
      <div className="address-actions">
        <button className="icon-btn-ghost" aria-label="Notifications"><BellIcon /></button>
        <button className="icon-btn-ghost" aria-label="Account"><PersonIcon /></button>
      </div>
    </div>
  )
}
