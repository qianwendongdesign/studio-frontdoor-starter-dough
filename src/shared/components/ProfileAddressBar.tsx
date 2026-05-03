import { useState } from 'react'
import { BellIcon, PersonIcon, ChevronDownIcon } from '@shared/icons/icons'
import { getAvailableProfileIds } from '@shared/data/orderAgainProfiles'

function getCurrentProfileId(): string {
  if (typeof window === 'undefined') return 'default'
  const params = new URLSearchParams(window.location.search)
  return params.get('profile')?.trim() || 'default'
}

export function ProfileAddressBar() {
  const [open, setOpen] = useState(false)
  const currentProfile = getCurrentProfileId()
  const profiles = getAvailableProfileIds()

  function selectProfile(id: string) {
    const url = new URL(window.location.href)
    url.searchParams.set('profile', id)
    window.location.href = url.toString()
  }

  return (
    <div className="profile-address-bar">
      <div className="address-bar">
        <div className="address-left" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
          <span className="address-text">{currentProfile}</span>
          <span className={`address-chevron${open ? ' address-chevron--open' : ''}`}>
            <ChevronDownIcon />
          </span>
        </div>
        <div className="address-actions">
          <button className="icon-btn-ghost" aria-label="Notifications"><BellIcon /></button>
          <button className="icon-btn-ghost" aria-label="Account"><PersonIcon /></button>
        </div>
      </div>

      {open && (
        <>
          <div className="profile-dropdown-overlay" onClick={() => setOpen(false)} />
          <div className="profile-dropdown">
            {profiles.map((id) => (
              <div
                key={id}
                className={`profile-dropdown-item${id === currentProfile ? ' profile-dropdown-item--active' : ''}`}
                onClick={() => selectProfile(id)}
              >
                <span>{id}</span>
                {id === currentProfile && (
                  <svg className="profile-dropdown-check" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3704 0.279579C12.7432 -0.093193 13.3476 -0.093193 13.7204 0.279579C14.0932 0.652351 14.0932 1.2568 13.7204 1.62957L5.12948 10.2205C4.95048 10.3995 4.70762 10.5 4.45449 10.5C4.20134 10.4999 3.95849 10.3995 3.77949 10.2205L0.279553 6.72057C-0.0932017 6.34781 -0.0931671 5.74335 0.279553 5.37058C0.652325 4.99781 1.25677 4.99781 1.62954 5.37058L4.45449 8.19552L12.3704 0.279579Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
