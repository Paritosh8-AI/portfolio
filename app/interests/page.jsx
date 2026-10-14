'use client';

import SonicLabSynth from '@/components/SonicLabSynth';

export default function InterestsPage() {
  return (
    <div className="container" style={{ paddingTop: 110, paddingBottom: 80 }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-subtitle">Innovations &amp; Creative Horizons</div>
        <h1 className="section-title">Interests &amp; Explorations Lab</h1>
        <p className="section-desc">
          What fuels my curiosity when I&apos;m not tuning loss functions: clean mobility networks, grounded agentic cognition, and late-night audio synthesizers.
        </p>
      </div>

      <div className="interests-grid">
        {/* Interest 1: EV Mobility */}
        <article className="glass-card interest-card" style={{ height: '100%' }}>
          <div className="minimal-schematic">
            <div className="schematic-header">
              <div className="schematic-title">
                <span className="status-pulse-dot"></span>
                <span>OCPP 1.6-J &bull; Central System Handshake</span>
              </div>
              <span className="schematic-badge emerald">WSS / JSON</span>
            </div>

            <div className="schematic-flow-row">
              <div className="schematic-node">
                <span className="node-tag">EVSE #8042</span>
                <span className="node-detail">CCS2 Dual Gun</span>
                <span className="node-metric">400V &bull; 120kW DC</span>
              </div>
              <div className="schematic-arrow-col">
                <span className="arrow-label">Authorize.req</span>
                <div className="arrow-line">&rarr;</div>
                <div className="arrow-line reverse">&larr;</div>
                <span className="arrow-label">Status: Accepted</span>
              </div>
              <div className="schematic-node highlight">
                <span className="node-tag">Central System (CMS)</span>
                <span className="node-detail">ElectreeFi / VinFast</span>
                <span className="node-metric">OCPI 2.2 Roaming</span>
              </div>
            </div>

            <div className="schematic-telemetry-strip">
              <div className="telem-item">
                <span className="k">PILOT PWM:</span> <span className="v">16.0% (10A)</span>
              </div>
              <div className="telem-item">
                <span className="k">BMS VOLT:</span> <span className="v">387.4 V</span>
              </div>
              <div className="telem-item">
                <span className="k">ISOLATION:</span> <span className="v">&gt; 500 k&Omega;</span>
              </div>
              <div className="telem-item">
                <span className="k">GRID BALANCING:</span> <span className="v">Active</span>
              </div>
            </div>
          </div>

          <div className="interest-card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span className="project-tag-pill emerald">Clean Mobility &amp; IoT</span>
              <span className="witty-pill">⚡ Plug &amp; Pray No More</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginTop: 12, marginBottom: 8 }}>
              Electric Mobility &amp; Smart Grid Infrastructure
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
              Deep passion for electric mobility, CCS2/Type-2 protocol handshakes, and grid balancing. My research spans real-world deployment telemetry with enterprise networks (including work on OCPP 1.6-J, OCPI 2.2 roaming, VinFast and ElectreeFi ecosystems) to eliminate charging failure and ensure smooth clean transport.
            </p>
            <div className="project-tech-stack" style={{ marginTop: 14 }}>
              <span className="tech-tag">OCPP 1.6-J</span>
              <span className="tech-tag">OCPI 2.2</span>
              <span className="tech-tag">BMS Interlocks</span>
              <span className="tech-tag">Smart Grid</span>
            </div>
          </div>
        </article>

        {/* Interest 2: Agentic AI & Causal DAGs */}
        <article className="glass-card interest-card" style={{ height: '100%' }}>
          <div className="minimal-schematic">
            <div className="schematic-header">
              <div className="schematic-title">
                <span className="status-pulse-dot purple"></span>
                <span>FastMCP Autonomous Causal DAG</span>
              </div>
              <span className="schematic-badge purple">do(X) CALCULUS</span>
            </div>

            <div className="schematic-flow-row">
              <div className="schematic-node">
                <span className="node-tag">Telemetry Event</span>
                <span className="node-detail">EVSE Contactor Drop</span>
                <span className="node-metric">StopTx at 42m</span>
              </div>
              <div className="schematic-arrow-col">
                <span className="arrow-label">@mcp.tool triage</span>
                <div className="arrow-line">&rarr;</div>
                <div className="arrow-line reverse">&larr;</div>
                <span className="arrow-label">P(Fail | do(BMS))</span>
              </div>
              <div className="schematic-node highlight-purple">
                <span className="node-tag">Causal DAG Node</span>
                <span className="node-detail">Vehicle Interlock Trip</span>
                <span className="node-metric">97.2% Confidence</span>
              </div>
            </div>

            <div className="schematic-telemetry-strip">
              <div className="telem-item">
                <span className="k">PROTOCOL:</span> <span className="v">Model Context Protocol</span>
              </div>
              <div className="telem-item">
                <span className="k">TOOL CALL:</span> <span className="v">diagnose_evse()</span>
              </div>
              <div className="telem-item">
                <span className="k">DETERMINISM:</span> <span className="v">100% Causal</span>
              </div>
              <div className="telem-item">
                <span className="k">TRIAGE:</span> <span className="v">Zero Human Wait</span>
              </div>
            </div>
          </div>

          <div className="interest-card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span className="project-tag-pill purple">Autonomous Cognition</span>
              <span className="witty-pill">🤖 Zero Toddler Tantrums</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginTop: 12, marginBottom: 8 }}>
              Agentic AI &amp; Model Context Protocol (FastMCP)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
              I believe the future of AI in production lies in <strong>grounded, deterministic tools</strong> rather than unbounded generation. Exploring how the Model Context Protocol connects LLMs directly to live telemetry streams, diagnostic tools, and causal directed acyclic graphs (DAGs) to attribute complex system failures with zero human intervention.
            </p>
            <div className="project-tech-stack" style={{ marginTop: 14 }}>
              <span className="tech-tag">FastMCP</span>
              <span className="tech-tag">Causal DAGs</span>
              <span className="tech-tag">Autonomous Triage</span>
              <span className="tech-tag">Playwright</span>
            </div>
          </div>
        </article>

        {/* Interest 3: Music Production & Sonic Lab */}
        <article className="glass-card interest-card" style={{ gridColumn: '1 / -1' }}>
          <div className="sonic-lab-split-grid">
            <div className="minimal-schematic dsp-schematic" style={{ height: '100%', minHeight: 280, justifyContent: 'space-between' }}>
              <div className="schematic-header">
                <div className="schematic-title">
                  <span className="status-pulse-dot cyan"></span>
                  <span>Audio DSP &bull; Acoustics Spectrum Rack</span>
                </div>
                <span className="schematic-badge cyan">FL STUDIO PRODUCER</span>
              </div>

              <div className="dsp-spectrum-visual">
                <div className="spectrum-bars">
                  <span className="s-bar" style={{ height: '38%' }}></span>
                  <span className="s-bar" style={{ height: '65%' }}></span>
                  <span className="s-bar" style={{ height: '92%' }}></span>
                  <span className="s-bar" style={{ height: '84%' }}></span>
                  <span className="s-bar" style={{ height: '70%' }}></span>
                  <span className="s-bar" style={{ height: '55%' }}></span>
                  <span className="s-bar" style={{ height: '40%' }}></span>
                  <span className="s-bar" style={{ height: '25%' }}></span>
                </div>
                <div className="spectrum-axis">
                  <span>20 Hz</span>
                  <span>100 Hz</span>
                  <span>500 Hz</span>
                  <span>2 kHz</span>
                  <span>10 kHz</span>
                  <span>20 kHz</span>
                </div>
              </div>

              <div className="schematic-telemetry-strip">
                <div className="telem-item">
                  <span className="k">DSP FILTER:</span> <span className="v">24dB/oct Biquad</span>
                </div>
                <div className="telem-item">
                  <span className="k">FFT SIZE:</span> <span className="v">2048 Hanning</span>
                </div>
                <div className="telem-item">
                  <span className="k">SAMPLE RATE:</span> <span className="v">48.0 kHz 32-bit</span>
                </div>
                <div className="telem-item">
                  <span className="k">SYNTH ENGINE:</span> <span className="v">Interactive WebAudio</span>
                </div>
              </div>
            </div>

            <div className="interest-card-body" style={{ padding: '24px 24px 24px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <span className="project-tag-pill">Audio DSP &amp; Acoustics</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <a
                    href="https://www.instagram.com/mewzicallyyours/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="witty-pill"
                    style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
                  >
                    📸 @mewzicallyyours
                  </a>
                  <span className="witty-pill">🎵 Math &rarr; Music</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.35rem', marginTop: 12, marginBottom: 8 }}>
                Sonic Lab: Audio Synthesis &amp; Electronic Music Production
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
                A profound passion for sound engineering, acoustic modeling, and electronic music production using{' '}
                <strong>FL Studio Producer Edition</strong>. The intersection of Digital Signal Processing (DSP), Fourier transforms, spectrogram feature extraction, and frequency synthesis directly informs my intuition for sequence modeling and temporal patterns.
              </p>

              {/* Interactive In-Browser Synth Pad */}
              <SonicLabSynth />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
