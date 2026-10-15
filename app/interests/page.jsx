'use client';

import { useState } from 'react';
import SonicLabSynth from '@/components/SonicLabSynth';

export default function InterestsPage() {
  const [activeFrequency, setActiveFrequency] = useState(null);
  const [activeNoteName, setActiveNoteName] = useState(null);

  const handleFrequencyChange = (freq, note) => {
    setActiveFrequency(freq);
    setActiveNoteName(note);
  };

  return (
    <div className="container" style={{ paddingTop: 160, paddingBottom: 120 }}>
      {/* Section Header with Generous Clearance */}
      <div className="section-header" style={{ marginBottom: 54 }}>
        <div className="section-subtitle">EXPLORATION &amp; CREATIVE LABS</div>
        <h1 className="section-title">Interests &amp; Explorations Lab</h1>
        <p className="section-desc">
          What fuels my curiosity when I&apos;m not tuning loss functions: deterministic agentic systems, clean electric mobility networks, and electronic audio synthesis.
        </p>
      </div>

      <div className="interests-stack">
        {/* ===================================================================
            SHOWCASE 1 (FIRST): Autonomous Cognition & Model Context Protocol (FastMCP)
            =================================================================== */}
        <article className="interest-showcase-card">
          <div className="interest-showcase-grid reverse">
            {/* Left: Technical Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                <span className="project-tag-pill purple">Autonomous Cognition</span>
                <span className="witty-pill">🤖 Zero Toddler Tantrums</span>
              </div>

              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: 12, color: '#FFFFFF' }}>
                Agentic AI &amp; Model Context Protocol (FastMCP)
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.8, marginBottom: 20 }}>
                I firmly believe production AI belongs in <strong>grounded, deterministic tool execution</strong> rather than unconstrained text generation. By leveraging the Model Context Protocol, autonomous agents connect directly to live telemetry streams, diagnostic tools, and causal Directed Acyclic Graphs (DAGs) to attribute distributed system failures with zero human intervention.
              </p>

              <div className="project-tech-stack">
                <span className="tech-tag">FastMCP</span>
                <span className="tech-tag">Causal DAGs</span>
                <span className="tech-tag">do(X) Calculus</span>
                <span className="tech-tag">Autonomous Triage</span>
                <span className="tech-tag">Playwright</span>
                <span className="tech-tag">Next.js 16</span>
              </div>
            </div>

            {/* Right: Wide FastMCP Causal DAG Architecture */}
            <div className="minimal-schematic" style={{ padding: '26px 28px' }}>
              <div className="schematic-header">
                <div className="schematic-title">
                  <span className="status-pulse-dot" />
                  <span>FastMCP Autonomous Causal DAG</span>
                </div>
                <span className="schematic-badge purple">do(X) CALCULUS</span>
              </div>

              <div className="schematic-flow-row" style={{ gap: 20 }}>
                <div className="schematic-node">
                  <span className="node-tag">Telemetry Event</span>
                  <span className="node-detail">EVSE Contactor Drop</span>
                  <span className="node-metric">StopTx at 42m</span>
                </div>
                <div className="schematic-arrow-col">
                  <span className="arrow-label">@mcp.tool triage</span>
                  <div className="arrow-line">→</div>
                  <div className="arrow-line reverse">←</div>
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
          </div>
        </article>

        {/* ===================================================================
            SHOWCASE 2 (SECOND): Clean Mobility & Smart Grid Infrastructure
            =================================================================== */}
        <article className="interest-showcase-card">
          <div className="interest-showcase-grid">
            {/* Left: Wide OCPP 1.6-J Handshake Architecture */}
            <div className="minimal-schematic" style={{ padding: '26px 28px' }}>
              <div className="schematic-header">
                <div className="schematic-title">
                  <span className="status-pulse-dot" />
                  <span>OCPP 1.6-J • Central System Handshake</span>
                </div>
                <span className="schematic-badge emerald">WSS / JSON</span>
              </div>

              <div className="schematic-flow-row" style={{ gap: 20 }}>
                <div className="schematic-node">
                  <span className="node-tag">EVSE #8042</span>
                  <span className="node-detail">CCS2 Dual Gun</span>
                  <span className="node-metric">400V • 120kW DC</span>
                </div>
                <div className="schematic-arrow-col">
                  <span className="arrow-label">Authorize.req</span>
                  <div className="arrow-line">→</div>
                  <div className="arrow-line reverse">←</div>
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
                  <span className="k">ISOLATION:</span> <span className="v">&gt; 500 kΩ</span>
                </div>
                <div className="telem-item">
                  <span className="k">GRID BALANCING:</span> <span className="v">Active</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Narrative */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                <span className="project-tag-pill emerald">Clean Mobility &amp; IoT</span>
                <span className="witty-pill">⚡ Plug &amp; Pray No More</span>
              </div>

              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: 12, color: '#FFFFFF' }}>
                Electric Mobility &amp; Smart Grid Infrastructure
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.8, marginBottom: 20 }}>
                Deep research into electric mobility, CCS2/Type-2 protocol handshakes, and smart grid balancing. My enterprise work spans telemetry integration across enterprise charging networks (including OCPP 1.6-J, OCPI 2.2 roaming, VinFast, and ElectreeFi ecosystems) to eliminate charging failure, diagnose BMS interlock drops, and ensure clean grid-aware transport.
              </p>

              <div className="project-tech-stack">
                <span className="tech-tag">OCPP 1.6-J</span>
                <span className="tech-tag">OCPI 2.2</span>
                <span className="tech-tag">BMS Interlocks</span>
                <span className="tech-tag">Smart Grid Balancing</span>
                <span className="tech-tag">ElectreeFi</span>
                <span className="tech-tag">VinFast</span>
              </div>
            </div>
          </div>
        </article>

        {/* ===================================================================
            SHOWCASE 3 (LAST): Flagship Sonic Lab Studio & Concert Piano
            =================================================================== */}
        <article className="sonic-studio-card">
          <div className="sonic-studio-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span className="status-pulse-dot" />
                <span className="text-mono" style={{ fontSize: '0.80rem', color: '#FFD38B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Interactive Music Production &amp; Acoustics Studio
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: '#FFFFFF' }}>
                Sonic Lab: Audio Synthesis &amp; Spectral Engineering
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="schematic-badge cyan" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                FL STUDIO PRODUCER
              </span>
              <a
                href="https://www.instagram.com/mewzicallyyours/"
                target="_blank"
                rel="noopener noreferrer"
                className="witty-pill"
                style={{ textDecoration: 'none', color: '#F2A67B', fontWeight: 700 }}
              >
                📸 @mewzicallyyours
              </a>
            </div>
          </div>

          <div className="sonic-studio-grid">
            {/* Left: Playable Concert Piano Console */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="text-mono" style={{ fontSize: '0.82rem', color: '#F2A67B', fontWeight: 700 }}>
                  🎹 Full 13-Key Chromatic Concert Piano (C4 – C5)
                </span>
                <span className="text-mono" style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                  WebAudio Dual-Harmonic Polyphony
                </span>
              </div>

              <SonicLabSynth onFrequencyChange={handleFrequencyChange} />
            </div>

            {/* Right: Acoustic Spectrum Rack & Intuition */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#170b1d',
                border: '1px solid var(--border-medium)',
                borderRadius: 14,
                padding: '26px 24px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span className="text-mono" style={{ fontSize: '0.80rem', fontWeight: 700, color: '#FFD38B' }}>
                    SPECTRAL FFT VISUALIZER
                  </span>
                  <span className="text-mono" style={{ fontSize: '0.74rem', color: activeFrequency ? '#34d399' : 'var(--text-dim)' }}>
                    {activeFrequency ? `${activeFrequency.toFixed(1)} Hz • ${activeNoteName}` : '48 kHz 32-bit'}
                  </span>
                </div>

                {/* Proportional Spectrum Visualizer */}
                <div className="dsp-spectrum-visual" style={{ background: '#120917', padding: '16px 18px', marginBottom: 20 }}>
                  <div className="spectrum-bars" style={{ height: 72 }}>
                    <span className="s-bar" style={{ height: activeFrequency ? '78%' : '38%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '95%' : '65%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '85%' : '90%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '65%' : '75%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '52%' : '60%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '40%' : '45%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '32%' : '30%' }} />
                    <span className="s-bar" style={{ height: activeFrequency ? '24%' : '20%' }} />
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

                <h3 style={{ fontSize: '1.12rem', fontWeight: 700, marginBottom: 8, color: '#FFFFFF' }}>
                  From Harmonics to Temporal Sequence Modeling
                </h3>
                <p style={{ fontSize: '0.90rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                  A lifelong passion for acoustic engineering and electronic music production using <strong>FL Studio Producer Edition</strong>.
                  Deconstructing complex waveforms with Fourier transforms, spectrogram filtering, and resonant biquads gave me the exact mathematical intuition needed for temporal sequence modeling, attention windows, and digital signal telemetry.
                </p>
              </div>

              {/* DSP Telemetry Strip */}
              <div className="schematic-telemetry-strip" style={{ marginTop: 'auto' }}>
                <div className="telem-item">
                  <span className="k">FILTER:</span> <span className="v">24dB/oct Biquad</span>
                </div>
                <div className="telem-item">
                  <span className="k">FFT SIZE:</span> <span className="v">256 Hanning</span>
                </div>
                <div className="telem-item">
                  <span className="k">SAMPLE RATE:</span> <span className="v">48.0 kHz 32-bit</span>
                </div>
                <div className="telem-item">
                  <span className="k">DAW ENV:</span> <span className="v">FL Studio 21</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
