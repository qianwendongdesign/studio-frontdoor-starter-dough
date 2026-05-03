import type { SectionId, NavGroup } from './GetStartedV2'

interface SidebarProps {
  navGroups: NavGroup[]
  activeSection: SectionId
  onSelect: (id: SectionId) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export function Sidebar({
  navGroups,
  activeSection,
  onSelect,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <nav className="gsv2-sidebar" aria-label="Page sections">
      <div className="gsv2-sidebar__header">
        {!collapsed && (
          <button
            className="gsv2-sidebar__title-btn"
            onClick={() => onSelect('overview')}
            aria-label="Go to overview"
          >
            <span className="gsv2-sidebar__super">DoorDash</span>
            <span className="gsv2-sidebar__title">Starter Dough</span>
          </button>
        )}
        <button
          className="gsv2-sidebar__toggle"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '›' : '‹'}
        </button>
      </div>

      <div className="gsv2-sidebar__nav">
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="gsv2-sidebar__group">
            {groupIndex > 0 && <div className="gsv2-sidebar__group-divider" />}
            {group.label && !collapsed && (
              <span className="gsv2-sidebar__group-label">{group.label}</span>
            )}
            <ul role="list">
              {group.items.map(({ id, label }) => (
                <li key={id}>
                  <button
                    className={`gsv2-sidebar__link${activeSection === id ? ' gsv2-sidebar__link--active' : ''}`}
                    onClick={() => onSelect(id)}
                    aria-current={activeSection === id ? 'page' : undefined}
                    title={collapsed ? label : undefined}
                  >
                    {collapsed ? label.charAt(0).toUpperCase() : label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!collapsed && (
        <div className="gsv2-sidebar__footer">
          <span className="gsv2-sidebar__footer-label">v2 draft · in progress</span>
        </div>
      )}
    </nav>
  )
}
