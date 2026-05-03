export function OverviewSection() {
  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Welcome</p>
      <h1 className="gsv2-section__title">Front Door Starter Dough</h1>
      <p className="gsv2-section__lead">
        Ready-to-use page templates for rapid prototyping of consumer experiences.
        Built for designers and PMs iterating with AI coding agents.
      </p>

      <div className="gsv2-card-grid">
        <a href="#templates" className="gsv2-card">
          <div className="gsv2-card__tag">Browse</div>
          <div className="gsv2-card__title">Templates</div>
          <p className="gsv2-card__body">Page templates you can fork and customize in minutes.</p>
        </a>
        <a href="#prototypes" className="gsv2-card">
          <div className="gsv2-card__tag">Browse</div>
          <div className="gsv2-card__title">Prototypes</div>
          <p className="gsv2-card__body">Prototypes your teammates have already shipped.</p>
        </a>
        <a href="#designers" className="gsv2-card">
          <div className="gsv2-card__tag">Guide</div>
          <div className="gsv2-card__title">For Designers</div>
          <p className="gsv2-card__body">Step-by-step workflow for adding and customizing templates.</p>
        </a>
        <a href="#engineers" className="gsv2-card">
          <div className="gsv2-card__tag">Guide</div>
          <div className="gsv2-card__title">For Engineers</div>
          <p className="gsv2-card__body">Data capabilities, Snowflake integration, and pixel specs.</p>
        </a>
      </div>
    </div>
  )
}
