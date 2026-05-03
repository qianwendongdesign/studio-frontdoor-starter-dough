const COLOR_GROUPS = [
  {
    label: 'Background',
    colors: [
      { name: 'Secondary', value: '#f1f1f1', var: 'var(--background-secondary)' },
      { name: 'Tertiary', value: '#d6d6d6', var: 'var(--background-tertiary)' },
      { name: 'Disabled', value: '#c4c4c4', var: 'var(--background-disabled)' },
      { name: 'Inverse', value: '#191919', var: 'var(--background-inverse)' },
      { name: 'Accent', value: '#eb1700', var: 'var(--background-accent)' },
    ],
  },
  {
    label: 'Foreground',
    colors: [
      { name: 'Primary', value: '#191919', var: 'var(--foreground-primary)' },
      { name: 'Secondary', value: '#606060', var: 'var(--foreground-secondary)' },
      { name: 'Tertiary', value: '#8b8b8b', var: 'var(--foreground-tertiary)' },
      { name: 'On Inverse', value: '#ffffff', var: 'var(--foreground-on-inverse)' },
      { name: 'Accent', value: '#eb1700', var: 'var(--foreground-accent)' },
    ],
  },
  {
    label: 'Stroke',
    colors: [
      { name: 'Primary', value: '#191919', var: 'var(--stroke-primary)' },
      { name: 'Secondary', value: '#8b8b8b', var: 'var(--stroke-secondary)' },
      { name: 'Tertiary', value: '#d6d6d6', var: 'var(--stroke-tertiary)' },
      { name: 'Disabled', value: '#f1f1f1', var: 'var(--stroke-disabled)' },
    ],
  },
]

const EXPRESSIVE_COLORS = [
  { name: 'Delivery Red', value: '#ff3008', var: 'var(--color-delivery-red)' },
  { name: 'Detergent', value: '#80d8ff', var: 'var(--color-detergent)' },
  { name: 'Bouquet', value: '#ffc4fc', var: 'var(--color-bouquet)' },
  { name: 'Yolk', value: '#f2d531', var: 'var(--color-yolk)' },
  { name: 'Motor Oil', value: '#681109', var: 'var(--color-motor-oil)' },
  { name: 'Pinot Noir', value: '#4c0c3a', var: 'var(--color-pinot-noir)' },
]

const TYPE_SCALE = [
  { cls: 'display-1', specs: 'Bold 56px / 42px / -3%', label: 'Display 1' },
  { cls: 'display-2', specs: 'Bold 40px / 34px / -4%', label: 'Display 2' },
  { cls: 'display-3', specs: 'Bold 32px / 34px / -1%', label: 'Display 3' },
  { cls: 'title-1', specs: 'Bold 24px / 24px / -1%', label: 'Title 1' },
  { cls: 'title-2', specs: 'Bold 20px / 24px / -1%', label: 'Title 2' },
  { cls: 'subtitle-1', specs: 'Normal 20px / 24px / -1%', label: 'Subtitle 1' },
  { cls: 'title-3', specs: 'Bold 14px / 20px / -1%', label: 'Title 3' },
  { cls: 'subtitle-2', specs: 'Normal 14px / 20px / -1%', label: 'Subtitle 2' },
  { cls: 'body-bold', specs: 'Bold 16px / 20px / -1%', label: 'Body Bold' },
  { cls: 'body-regular', specs: 'Normal 16px / 20px / -1%', label: 'Body Regular' },
  { cls: 'caption-bold', specs: 'Bold 12px / 20px / -1%', label: 'Caption Bold' },
  { cls: 'caption-regular', specs: 'Medium 12px / 20px / -1%', label: 'Caption Regular' },
]

const SPACING = [
  { name: '--spacing-primary', desc: 'Between top-level modules', value: '24px', width: 240 },
  { name: '--spacing-secondary', desc: 'Between elements, device inset', value: '16px', width: 160 },
  { name: '--spacing-tertiary', desc: 'Within modules', value: '12px', width: 120 },
  { name: '--spacing-internal1', desc: 'Between large elements (cards)', value: '8px', width: 80 },
  { name: '--spacing-internal2', desc: 'Between small elements', value: '4px', width: 40 },
  { name: '--spacing-internal3', desc: 'Smallest padding', value: '2px', width: 20 },
]

const SHADOWS = [
  { name: 'elevation-1', specs: '0 1 2 0', cssVar: 'var(--shadow-elevation-1)' },
  { name: 'elevation-2', specs: '0 2 4 0', cssVar: 'var(--shadow-elevation-2)' },
  { name: 'elevation-3', specs: '0 4 8 0', cssVar: 'var(--shadow-elevation-3)' },
  { name: 'elevation-4', specs: '0 8 16 0', cssVar: 'var(--shadow-elevation-4)' },
  { name: 'elevation-5', specs: '0 12 24 0', cssVar: 'var(--shadow-elevation-5)' },
  { name: 'elevation-6', specs: '0 16 32 0', cssVar: 'var(--shadow-elevation-6)' },
  { name: 'elevation-7', specs: '0 24 48 0', cssVar: 'var(--shadow-elevation-7)' },
]

export function DesignSystemSection() {
  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Libraries</p>
      <h1 className="gsv2-section__title">Mini Design System</h1>
      <p className="gsv2-section__lead">
        Token &amp; style reference for Project Front Door. Tell your AI agent to use these
        tokens and styles for all new prototype elements.
      </p>

      <div className="gsv2-callout" style={{ marginBottom: '40px' }}>
        <strong>Keep your designs clean</strong>
        Tell the AI <em>"use styles and tokens in the Front Door Design System"</em> for all new prototype elements.
      </div>

      {/* ── Colors ── */}
      <section className="gsv2-ds-section">
        <div className="gsv2-ds-section-title">Colors</div>
        {COLOR_GROUPS.map((group) => (
          <div key={group.label} className="gsv2-ds-color-group">
            <div className="gsv2-ds-color-group-label">{group.label}</div>
            <div className="gsv2-ds-color-row">
              {group.colors.map((c) => (
                <div key={c.name} className="gsv2-ds-color-chip">
                  <div className="gsv2-ds-color-swatch" style={{ background: c.var }} />
                  <div className="gsv2-ds-color-label">{c.name}</div>
                  <div className="gsv2-ds-color-value">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Expressive Colors ── */}
      <section className="gsv2-ds-section">
        <div className="gsv2-ds-section-title">Expressive Colors</div>
        <div className="gsv2-ds-color-row">
          {EXPRESSIVE_COLORS.map((c) => (
            <div key={c.name} className="gsv2-ds-color-chip">
              <div className="gsv2-ds-color-swatch" style={{ background: c.var }} />
              <div className="gsv2-ds-color-label">{c.name}</div>
              <div className="gsv2-ds-color-value">{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ── */}
      <section className="gsv2-ds-section">
        <div className="gsv2-ds-section-title">Typography</div>
        {TYPE_SCALE.map((t) => (
          <div key={t.cls} className="gsv2-ds-type-row">
            <div className="gsv2-ds-type-meta">
              <div className="gsv2-ds-type-name">.{t.cls}</div>
              <div className="gsv2-ds-type-specs">{t.specs}</div>
            </div>
            <div className={`gsv2-ds-type-preview ${t.cls}`}>{t.label}</div>
          </div>
        ))}
      </section>

      {/* ── Spacing ── */}
      <section className="gsv2-ds-section">
        <div className="gsv2-ds-section-title">Spacing</div>
        {SPACING.map((s) => (
          <div key={s.name} className="gsv2-ds-spacing-row">
            <div className="gsv2-ds-spacing-label">
              <div className="gsv2-ds-spacing-name">{s.name}</div>
              <div className="gsv2-ds-spacing-desc">{s.desc}</div>
            </div>
            <div className="gsv2-ds-spacing-value">{s.value}</div>
            <div className="gsv2-ds-spacing-bar" style={{ width: s.width }} />
          </div>
        ))}
      </section>

      {/* ── Border Radius ── */}
      <section className="gsv2-ds-section">
        <div className="gsv2-ds-section-title">Border Radius</div>
        <div className="gsv2-ds-radius-demo">
          <div className="gsv2-ds-radius-box" />
          <div>
            <div className="gsv2-ds-radius-label">--radius-card</div>
            <div className="gsv2-ds-radius-value">16px</div>
          </div>
        </div>
      </section>

      {/* ── Shadows ── */}
      <section className="gsv2-ds-section">
        <div className="gsv2-ds-section-title">Elevation / Shadows</div>
        <div className="gsv2-ds-shadow-row">
          {SHADOWS.map((s) => (
            <div key={s.name} className="gsv2-ds-shadow-chip">
              <div className="gsv2-ds-shadow-box" style={{ boxShadow: s.cssVar }} />
              <div className="gsv2-ds-shadow-label">{s.name}</div>
              <div className="gsv2-ds-shadow-specs">{s.specs}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
