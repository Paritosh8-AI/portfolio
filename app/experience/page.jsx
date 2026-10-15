'use client';

import { useState, useEffect } from 'react';

export default function ExperiencePage() {
  const [telemetry, setTelemetry] = useState(null);
  const [loadingTelem, setLoadingTelem] = useState(true);

  useEffect(() => {
    fetch('/api/telemetry')
      .then((res) => res.json())
      .then((data) => {
        setTelemetry(data);
        setLoadingTelem(false);
      })
      .catch((err) => {
        console.warn('Telemetry fetch error:', err);
        setLoadingTelem(false);
      });
  }, []);

  return (
    <div className="container" style={{ paddingTop: 150, paddingBottom: 110 }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-subtitle">Systems Evolution</div>
        <h1 className="section-title">Engineering Journey &amp; Philosophy</h1>
        <p className="section-desc">
          How production constraints shaped my architectural approach to autonomous agents, low-latency deep learning, and mission-critical telemetry.
        </p>
      </div>

      {/* Core Engineering Axioms Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
          marginBottom: 70,
        }}
      >
        <div className="glass-card" style={{ padding: '34px 28px' }}>
          <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>⚖️</div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 8, color: '#F2A67B' }}>
            1. Deterministic Causality
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            In production hardware and banking networks, an alert without an explanation is useless. I build systems that link statistical anomalies to verifiable causal dependencies, preventing hallucinations and giving operators instant confidence.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '34px 28px' }}>
          <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>⚡</div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 8, color: '#34d399' }}>
            2. Latency as a First-Class Citizen
          </h3>
          <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            High accuracy at 500ms latency is unacceptable on instant payment rails. By compiling with <code>@tf.function</code> graph execution and in-memory indexes, UPI Sentinel processes complex sequence windows in under 1.2ms.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '34px 28px' }}>
          <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>🎯</div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: 8, color: '#FFD38B' }}>
            3. Calibrated Probabilities
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Standard neural network softmax probabilities are notoriously overconfident. In clinical cytology and fraud risk, post-hoc Platt scaling ensures that a 95% confidence prediction corresponds to a true 95% empirical outcome.
          </p>
        </div>
      </div>

      {/* Chronological Journey Timeline */}
      <div className="timeline-container">
        {/* Entry 1 */}
        <div className="timeline-entry">
          <div className="timeline-node-dot"></div>
          <div className="glass-card timeline-card">
            <div className="timeline-meta">
              <span className="timeline-date">2024 — PRESENT</span>
              <span className="level-badge production">PRODUCTION DEPLOYMENT</span>
              <span className="witty-pill">🤖 FastMCP Overlord</span>
            </div>
            <h3 className="timeline-role">Agentic Telemetry &amp; Causal Inference Architecture</h3>
            <div className="timeline-org">FastMCP Protocol • Distributed EV Infrastructure • Production Deployments</div>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Conceived, designed, and deployed <strong>AgenticEV RCA Studio</strong>. Engineered custom FastMCP tool interfaces allowing LLMs to autonomously ingest, parse, and diagnose multi-party IoT telemetry streams across OCPP 1.6-J and OCPI roaming protocols. Eliminated hours of manual triage by synthesizing automated executive Word/Excel RCA reports.
            </p>
          </div>
        </div>

        {/* Entry 2 */}
        <div className="timeline-entry">
          <div className="timeline-node-dot" style={{ borderColor: 'var(--accent-emerald)' }}></div>
          <div className="glass-card timeline-card">
            <div className="timeline-meta">
              <span className="timeline-date">2023 — 2024</span>
              <span className="level-badge deep">HIGH FREQUENCY</span>
              <span className="witty-pill">🛡️ 0.89ms Inference Speedrun</span>
            </div>
            <h3 className="timeline-role">High-Frequency Sequence Modeling &amp; In-Memory Graph Defense</h3>
            <div className="timeline-org">UPI Sentinel 2.0 • TensorFlow &amp; Docker • Low-Latency Engineering</div>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Architected <strong>UPI Sentinel 2.0</strong> to protect high-throughput digital payment rails. Solved extreme class imbalance (&lt;0.2% positive fraud rate) via CRNN sequence modeling with Bahdanau attention and in-memory graph mule-ring traversal. Slashed inference latency down to &lt;1.2ms with ~865 req/s throughput.
            </p>
          </div>
        </div>

        {/* Entry 3 */}
        <div className="timeline-entry">
          <div className="timeline-node-dot" style={{ borderColor: 'var(--accent-purple)' }}></div>
          <div className="glass-card timeline-card">
            <div className="timeline-meta">
              <span className="timeline-date">2023</span>
              <span className="level-badge specialized">CLINICAL HEALTHCARE</span>
              <span className="witty-pill">🔬 Platt-Calibrated</span>
            </div>
            <h3 className="timeline-role">Clinical Diagnostic Ensembles &amp; XAI Biomarker Calibration</h3>
            <div className="timeline-org">Breast Cancer Sentinel 2.0 • Scikit-Learn • Platt Scaling</div>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Built a soft-voting ensemble (HistGBM + Random Forest + MLP) reaching 99.67% ROC-AUC and 95.24% sensitivity on fine needle aspirate (FNA) cytology. Implemented post-hoc Platt scaling calibration to prevent fatal false negatives and provided oncologists with intuitive Z-score radar biomarker explainability.
            </p>
          </div>
        </div>

        {/* Entry 4 */}
        <div className="timeline-entry">
          <div className="timeline-node-dot"></div>
          <div className="glass-card timeline-card">
            <div className="timeline-meta">
              <span className="timeline-date">2022 — 2023</span>
              <span className="level-badge daily">CLEANTECH TELEMATICS</span>
              <span className="witty-pill">🔌 Protocol Archaeology</span>
            </div>
            <h3 className="timeline-role">Distributed Telematics &amp; Electric Vehicle Protocol Analysis</h3>
            <div className="timeline-org">VinFast, ElectreeFi, Charge_IN • OCPP 1.6-J &amp; OCPI 2.2</div>
            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Conducted exhaustive telemetry reverse engineering of EV charging handshakes, analyzing pilot PWM signaling, BMS contactor interlocks, and roaming clearinghouse bottlenecks across global EV fleet operators. Laid the foundation for autonomous causal diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Live MERN Node.js Telemetry Card */}
      <div className="glass-card" style={{ marginTop: 45, padding: '32px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.3rem' }}>⚡</span>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Live Node.js / MERN Telemetry Stream</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                Direct telemetry metrics fetched from <code>/api/telemetry</code>
              </p>
            </div>
          </div>
          <span className="status-pill">
            <span className="pulse-dot"></span>
            {loadingTelem ? 'POLLING...' : 'STREAM ACTIVE'}
          </span>
        </div>

        {telemetry && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              background: 'rgba(82, 45, 96, 0.35)',
              padding: 18,
              borderRadius: 12,
              border: '1px solid var(--border-medium)',
            }}
          >
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Server Runtime
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: 4 }}>
                Node {telemetry.runtime?.nodeVersion || 'v24'} ({telemetry.runtime?.platform})
              </div>
            </div>
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Uptime
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: 4, color: 'var(--accent-emerald)' }}>
                {telemetry.runtime?.uptimeSeconds ? `${telemetry.runtime.uptimeSeconds}s` : 'Continuous'}
              </div>
            </div>
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Heap Used / Total
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: 4 }}>
                {telemetry.memory?.heapUsedMB} MB / {telemetry.memory?.heapTotalMB} MB
              </div>
            </div>
            <div>
              <div className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Database Status
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: 4, color: 'var(--accent-primary-deep)' }}>
                {telemetry.database?.engine === 'mongodb' ? 'MongoDB Cluster Connected' : 'In-Memory DB Store (Zero Setup)'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live GitHub Stats Integration */}
      <div className="glass-card" style={{ marginTop: 24, padding: '36px 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: 6 }}>📈 GitHub Engineering Telemetry</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 22 }}>
          Live public telemetry from{' '}
          <a
            href="https://github.com/Paritosh8-AI"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-primary-deep)', textDecoration: 'none', fontWeight: 700 }}
          >
            @Paritosh8-AI
          </a>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
          <img
            src="https://github-readme-stats.vercel.app/api?username=Paritosh8-AI&show_icons=true&theme=default&hide_border=true&count_private=true&hide_rank=true"
            alt="Paritosh GitHub Stats"
            style={{
              maxWidth: '100%',
              borderRadius: 12,
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=Paritosh8-AI&layout=compact&theme=default&hide_border=true"
            alt="Top Languages"
            style={{
              maxWidth: '100%',
              borderRadius: 12,
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
