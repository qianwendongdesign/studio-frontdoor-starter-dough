import { PROTOTYPES } from '../../../prototypes/_registry'
import prototypeDates from '../../../prototypes/_dates.json'

const dates = prototypeDates as Record<string, string>

export function PrototypesSection() {
  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Browse</p>
      <h1 className="gsv2-section__title">Prototypes</h1>
      <p className="gsv2-section__lead">
        Prototypes built by teammates using these templates. Browse for inspiration or see
        what's already been explored.
      </p>

      {PROTOTYPES.length === 0 ? (
        <p className="gsv2-section__placeholder">
          No prototypes registered yet. Build something from a template, then run{' '}
          <code>npm run register</code> to add it here.
        </p>
      ) : (
        <div className="gsv2-proto-list">
          {PROTOTYPES.map((p) => (
            <a key={p.href} href={p.href} className="gsv2-proto-card">
              <div className={`gsv2-proto-card__image${!p.img ? ' gsv2-proto-card__image--empty' : ''}`}>
                {p.img ? (
                  <img src={p.img} alt={`${p.title} preview`} />
                ) : (
                  <span className="gsv2-coming-soon">No Preview</span>
                )}
              </div>
              <div className="gsv2-proto-card__info">
                <div className="gsv2-proto-card__header">
                  <div className="gsv2-proto-card__title">{p.title}</div>
                  <span className="gsv2-proto-card__template-badge">{p.template}</span>
                </div>
                <div className="gsv2-proto-card__meta">
                  by {p.author}{dates[p.href] ? ` · ${dates[p.href]}` : ''}
                </div>
                <p className="gsv2-proto-card__desc">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
