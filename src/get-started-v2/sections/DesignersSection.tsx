const PROMPTS = [
  '"Add a StandardCarouselModule at position 4 on the homepage feed"',
  '"Change the greeting to Good morning, Sarah!"',
  '"I want to customize the spotlight module — eject it so I can edit the copy"',
  '"Add a new store page for a pizza restaurant with 6 menu items"',
  '"Wire up the store cards on the homepage to navigate to the store page"',
]

export function DesignersSection() {
  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Guide</p>
      <h1 className="gsv2-section__title">Designers start here</h1>
      <p className="gsv2-section__lead">
        Everything you need to go from idea to prototype — no prior coding experience required.
        Your AI agent handles the heavy lifting; you focus on the design.
      </p>

      <div className="gsv2-callout">
        <strong>One-time setup (if you haven't already):</strong>
        <ol className="gsv2-callout-steps">
          <li>Open the GitHub template repo at <a href="https://github.com/doordash/studio-frontdoor-starter-dough" target="_blank" rel="noopener noreferrer">github.com/doordash/studio-frontdoor-starter-dough</a></li>
          <li>Click <strong>"Use this template"</strong> — this creates your own copy to work on</li>
          <li><strong>Clone the repo</strong> to your laptop so you can open it in Cursor or Claude Code</li>
          <li>In your AI agent run <code>npm install &amp;&amp; npm run dev</code> to install deps and start the local server</li>
        </ol>
      </div>

      <hr className="gsv2-section__divider" />

      <div className="gsv2-steps">

        <div className="gsv2-step">
          <div className="gsv2-step__number">1</div>
          <div className="gsv2-step__content">
            <h2>Pick a template</h2>
            <p>Each template is a self-contained page you can use as-is or customize. Browse available templates and click to preview:</p>
            <a href="#templates" className="gsv2-link-card">
              Browse Templates
              <span className="gsv2-link-card__arrow">→</span>
            </a>
          </div>
        </div>

        <div className="gsv2-step">
          <div className="gsv2-step__number">2</div>
          <div className="gsv2-step__content">
            <h2>Start building</h2>
            <p>Tell your AI agent what you want. Here are some example prompts to get started:</p>
            <ul className="gsv2-prompt-list">
              {PROMPTS.map((p, i) => (
                <li key={i} className="gsv2-prompt">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gsv2-step">
          <div className="gsv2-step__number">3</div>
          <div className="gsv2-step__content">
            <h2>Load design documentation</h2>
            <p>Before any UI work in Cursor, run both Prism skills to load the latest design system docs into your agent:</p>
            <pre className="gsv2-code">/prism-design-documentation{'\n'}/prism-react-documentation</pre>
            <p className="gsv2-note">This gives your AI agent full knowledge of DoorDash's Prism components, guidelines, and tokens.</p>
          </div>
        </div>

        <div className="gsv2-step">
          <div className="gsv2-step__number">4</div>
          <div className="gsv2-step__content">
            <h2>Add reusable modules</h2>
            <p>Modules are pre-built layout blocks that slot into any page and can be customized. Preview what's available, then ask your AI to add them.</p>
            <a href="/styles/module-library-preview.html" className="gsv2-link-card">
              Module Library Preview
              <span className="gsv2-link-card__arrow">→</span>
            </a>
          </div>
        </div>

        <div className="gsv2-step">
          <div className="gsv2-step__number">5</div>
          <div className="gsv2-step__content">
            <h2>Follow the design system</h2>
            <p>This template has a simplified design subsystem built in. Preview it and tell your AI to follow it when adding new content to keep things consistent.</p>
            <a href="/styles/design-system-preview.html" className="gsv2-link-card">
              Design System Preview
              <span className="gsv2-link-card__arrow">→</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
