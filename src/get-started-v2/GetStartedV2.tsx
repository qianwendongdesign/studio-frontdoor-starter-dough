import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { OverviewSection } from './sections/OverviewSection'
import { TemplatesSection } from './sections/TemplatesSection'
import { PrototypesSection } from './sections/PrototypesSection'
import { DesignersSection } from './sections/DesignersSection'
import { EngineersSection } from './sections/EngineersSection'
import { ModulesSection } from './sections/ModulesSection'
import { DesignSystemSection } from './sections/DesignSystemSection'
import { CapabilitiesSection } from './sections/CapabilitiesSection'
import './get-started-v2.css'

export type SectionId =
  | 'overview'
  | 'templates'
  | 'prototypes'
  | 'designers'
  | 'engineers'
  | 'modules'
  | 'design-system'
  | 'capabilities'

const ALL_SECTION_IDS: SectionId[] = [
  'overview', 'templates', 'prototypes', 'designers',
  'engineers', 'modules', 'design-system', 'capabilities',
]

export interface NavGroup {
  label?: string
  items: { id: SectionId; label: string }[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      { id: 'templates',    label: 'Templates' },
      { id: 'prototypes',   label: 'Prototypes' },
    ],
  },
  {
    items: [
      { id: 'designers',   label: 'Designers start here' },
      { id: 'engineers',   label: 'Engineers start here' },
    ],
  },
  {
    label: 'Libraries',
    items: [
      { id: 'modules',       label: 'Reusable Modules' },
      { id: 'design-system', label: 'Mini Design System' },
      { id: 'capabilities',  label: 'Capabilities' },
    ],
  },
]

function getInitialSection(): SectionId {
  const hash = window.location.hash.replace('#', '') as SectionId
  return ALL_SECTION_IDS.includes(hash) ? hash : 'overview'
}

export function GetStartedV2() {
  const [activeSection, setActiveSection] = useState<SectionId>(getInitialSection)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Listen for hash changes (back/forward, anchor clicks in sections)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as SectionId
      if (ALL_SECTION_IDS.includes(hash)) {
        setActiveSection(hash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Sync section → hash
  useEffect(() => {
    if (window.location.hash !== `#${activeSection}`) {
      window.location.hash = activeSection
    }
  }, [activeSection])

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':      return <OverviewSection />
      case 'templates':     return <TemplatesSection />
      case 'prototypes':    return <PrototypesSection />
      case 'designers':     return <DesignersSection />
      case 'engineers':     return <EngineersSection />
      case 'modules':       return <ModulesSection />
      case 'design-system': return <DesignSystemSection />
      case 'capabilities':  return <CapabilitiesSection />
    }
  }

  return (
    <div className={`gsv2${sidebarCollapsed ? ' gsv2--collapsed' : ''}`}>
      <Sidebar
        navGroups={NAV_GROUPS}
        activeSection={activeSection}
        onSelect={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />
      <main className="gsv2-content">
        {renderSection()}
      </main>
    </div>
  )
}
