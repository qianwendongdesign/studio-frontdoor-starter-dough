export function EngineersSection() {
  return (
    <div className="gsv2-section">
      <p className="gsv2-section__eyebrow">Guide</p>
      <h1 className="gsv2-section__title">Engineers start here</h1>
      <p className="gsv2-section__lead">
        Connect real Snowflake data, extend templates, and integrate with the DoorDash design system.
      </p>

      <div className="gsv2-steps">

        <div className="gsv2-step">
          <div className="gsv2-step__number">1</div>
          <div className="gsv2-step__content">
            <h2>Connect to Snowflake for real data</h2>
            <p>Replace static placeholder data with real store images and metadata from Snowflake. Templates fall back to static data if the server isn't running.</p>
            <p><strong>Prerequisites:</strong> Python 3.9+, DoorDash Snowflake access, Okta configured on your machine.</p>
            <p><strong>One-time setup:</strong></p>
            <pre className="gsv2-code">{'python3 -m venv backend/venv\nsource backend/venv/bin/activate\npip install -r backend/requirements.txt'}</pre>
            <p><strong>Every session</strong> (run in a second terminal):</p>
            <pre className="gsv2-code">{'source backend/venv/bin/activate\npython3 scripts/serve_stores.py'}</pre>
            <p className="gsv2-note">A browser window opens for Okta SSO. Sign in once and every page reload fetches fresh data.</p>
          </div>
        </div>

        <div className="gsv2-step">
          <div className="gsv2-step__number">2</div>
          <div className="gsv2-step__content">
            <h2>Load Prism React docs</h2>
            <p>Before implementing any UI, load the latest Prism component documentation into your agent:</p>
            <pre className="gsv2-code">/prism-react-documentation</pre>
            <p className="gsv2-note">This gives your agent accurate props, usage patterns, and code examples for every Prism component.</p>
          </div>
        </div>

        <div className="gsv2-step">
          <div className="gsv2-step__number">3</div>
          <div className="gsv2-step__content">
            <h2>Register a prototype</h2>
            <p>Built something worth sharing? Add it to the Prototypes gallery so the team can find it:</p>
            <pre className="gsv2-code">{'// prototypes/_registry.ts\nexport const PROTOTYPES: Prototype[] = [\n  {\n    title: \'My Prototype\',\n    author: \'Your Name\',\n    desc: \'What it explores.\',\n    href: \'/prototypes/my-prototype/\',\n    template: \'Homepage Feed\',\n    img: myPreviewImg,  // optional\n  },\n  // ...\n]'}</pre>
          </div>
        </div>

      </div>
    </div>
  )
}
