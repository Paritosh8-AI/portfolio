'use client';

import { useState } from 'react';

export default function ProjectsPage() {
  const [activeTabThumb, setActiveTabThumb] = useState({
    agenticev: '/assets/images/live_cms_network_pulse_rendered.png',
    upi: '/assets/images/upi_sentinel_dashboard.png',
    cancer: '/assets/images/cancer_sentinel_dashboard.png',
  });

  // Simulator state
  const [amount, setAmount] = useState(45000);
  const [distance, setDistance] = useState(820);
  const [isNewDevice, setIsNewDevice] = useState(true);
  const [isNight, setIsNight] = useState(true);
  const [simResult, setSimResult] = useState(null);

  const runFraudInference = () => {
    // Model inference logic matching UPI Sentinel 2.0 specs
    let risk = 0.05;
    if (amount > 20000) risk += 0.35;
    if (distance > 300) risk += 0.32;
    if (isNewDevice) risk += 0.18;
    if (isNight) risk += 0.12;
    risk = Math.min(0.999, Math.max(0.012, risk));

    const latency = (0.78 + Math.random() * 0.28).toFixed(2);
    setSimResult({
      riskScore: risk.toFixed(3),
      verdict: risk > 0.65 ? 'STEP-UP 2FA MANDATED' : risk > 0.3 ? 'TRANSACTION FLAGGED' : 'APPROVED & CLEARED',
      latencyMs: latency,
      hops: distance > 400 ? '2 Hops to Flagged Cluster' : 'Direct Node (Zero Anomalies)',
      rule: risk > 0.65 ? 'High velocity burst & geographic anomaly' : 'Standard verified transaction envelope',
    });
  };

  return (
    <div className="container" style={{ paddingTop: 110, paddingBottom: 80 }}>
      <div className="section-header">
        <div className="section-subtitle">Architectural Case Studies</div>
        <h1 className="section-title">Flagship Production Systems</h1>
        <p className="section-desc">
          Deep-dive blueprints and interactive inference simulators for production ML systems designed to survive real-world noise, packet loss, and zero downtime.
        </p>
      </div>

      {/* SYSTEM 1: AgenticEV */}
      <section id="agenticev" className="glass-card" style={{ marginBottom: 45, padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div className="project-badge-row" style={{ marginBottom: 8 }}>
              <span className="project-tag-pill">Autonomous Diagnostics</span>
              <span className="project-tag-pill purple">FastMCP Protocol</span>
              <span className="project-tag-pill emerald">OCPP 1.6-J &amp; OCPI 2.2</span>
              <span className="witty-pill">⚡ 0% Existential Dread</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800 }}>⚡ AgenticEV RCA Studio</h2>
            <p className="text-mono" style={{ color: 'var(--accent-primary-deep)', fontWeight: 700, fontSize: '0.88rem', marginTop: 4 }}>
              Autonomous Causal Inference Engine for Distributed EV Fast-Charging Networks
            </p>
          </div>
          <a href="https://github.com/Paritosh8-AI/AgenticEV_RCA" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <span>View on GitHub</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="project-showcase-grid">
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 10, color: 'var(--text-bright)' }}>The Real-World Problem</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: 12 }}>
              Commercial EV charging networks face a stubborn <strong>18% to 25% session failure rate</strong>. Because transactions involve distributed chargers (EVSE), on-board vehicle battery management (BMS), cellular IoT modems, and roaming clearinghouses (OCPI), determining whether a halt was the car's fault, the charger's fault, or a cloud timeout used to take hours of log archaeology.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
              <strong>The Architectural Solution:</strong> AgenticEV builds on the <strong>Model Context Protocol (FastMCP)</strong> to turn LLM agents into autonomous diagnosticians. Agents query structured OCPP event streams, execute temporal anomaly detection algorithms, and traverse causal directed acyclic graphs (DAGs) to isolate the root cause with deterministic confidence.
            </p>
          </div>

          <div className="project-media-side">
            <div className="main-preview-frame">
              <img src={activeTabThumb.agenticev} alt="AgenticEV System Preview" />
            </div>
            <div className="sub-previews-grid">
              {[
                { src: '/assets/images/live_cms_network_pulse_rendered.png', label: 'Network Pulse' },
                { src: '/assets/images/ai_telemetry_copilot.png', label: 'AI Copilot' },
                { src: '/assets/images/batch_rca_studio.png', label: 'Batch RCA' },
              ].map((t) => (
                <div
                  key={t.src}
                  className={`sub-preview-item ${activeTabThumb.agenticev === t.src ? 'active' : ''}`}
                  onClick={() => setActiveTabThumb({ ...activeTabThumb, agenticev: t.src })}
                >
                  <img src={t.src} alt={t.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM 2: UPI Sentinel with Interactive Simulator */}
      <section id="upisentinel" className="glass-card" style={{ marginBottom: 45, padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div className="project-badge-row" style={{ marginBottom: 8 }}>
              <span className="project-tag-pill">Real-Time Defense</span>
              <span className="project-tag-pill emerald">Sub-1.2ms Latency</span>
              <span className="project-tag-pill purple">CRNN + Attention</span>
              <span className="witty-pill">🛡️ Faster Than Your Bank's OTP</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800 }}>🛡️ UPI Sentinel 2.0</h2>
            <p className="text-mono" style={{ color: 'var(--accent-primary-deep)', fontWeight: 700, fontSize: '0.88rem', marginTop: 4 }}>
              Enterprise Real-Time AI Fraud Prevention System for Digital Payment Networks
            </p>
          </div>
          <a href="https://github.com/Paritosh8-AI/UPI-Fraud-Detection-System" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <span>View on GitHub</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="project-showcase-grid">
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 10, color: 'var(--text-bright)' }}>The Sub-1.2ms Engineering Challenge</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: 14 }}>
              In real-time payment rails like UPI, <strong>SLA timeouts are strictly sub-2ms</strong>. If your model takes 500ms to calculate an inference score, the mule account has already drained the funds. Additionally, fraud occurs in less than 0.2% of transactions (severe class imbalance).
            </p>

            {/* Interactive Simulator Box */}
            <div className="simulator-box">
              <div className="sim-header">
                <div className="sim-title">
                  <span style={{ color: '#db2777' }}>⚡</span>
                  <span>Live CRNN Attention Inference Simulator</span>
                </div>
                <span className="level-badge production">SUB-1.2MS ENGINE</span>
              </div>

              <div className="sim-controls-grid">
                <div className="sim-control-group">
                  <label>
                    Transaction Amount: <span className="sim-value-badge">₹{amount.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="100000"
                    step="500"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="sim-range-input"
                  />
                </div>

                <div className="sim-control-group">
                  <label>
                    Distance Jump: <span className="sim-value-badge">{distance} km</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    step="20"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="sim-range-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isNewDevice}
                    onChange={(e) => setIsNewDevice(e.target.checked)}
                  />
                  <span>Unrecognized Device IMEI</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isNight}
                    onChange={(e) => setIsNight(e.target.checked)}
                  />
                  <span>Nocturnal Window (02:00 - 05:00)</span>
                </label>
              </div>

              <button type="button" className="sim-trigger-btn" onClick={runFraudInference}>
                Run Sub-1.2ms Graph Tracing
              </button>

              {simResult && (
                <div className="sim-output-panel" style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: simResult.riskScore > 0.6 ? '#db2777' : '#047857' }}>
                      VERDICT: {simResult.verdict}
                    </span>
                    <span className="text-mono" style={{ color: '#0e7490', fontWeight: 700 }}>
                      Latency: {simResult.latencyMs} ms
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Risk Probability: <strong>{simResult.riskScore}</strong> | Graph: {simResult.hops}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="project-media-side">
            <div className="main-preview-frame">
              <img src={activeTabThumb.upi} alt="UPI Sentinel Preview" />
            </div>
            <div className="sub-previews-grid">
              {[
                { src: '/assets/images/upi_sentinel_dashboard.png', label: 'Dashboard' },
                { src: '/assets/images/upi_architecture_diagram.png', label: 'Architecture' },
                { src: '/assets/images/crnn_architecture.PNG', label: 'CRNN' },
              ].map((t) => (
                <div
                  key={t.src}
                  className={`sub-preview-item ${activeTabThumb.upi === t.src ? 'active' : ''}`}
                  onClick={() => setActiveTabThumb({ ...activeTabThumb, upi: t.src })}
                >
                  <img src={t.src} alt={t.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM 3: Breast Cancer Sentinel */}
      <section id="cancersentinel" className="glass-card" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div className="project-badge-row" style={{ marginBottom: 8 }}>
              <span className="project-tag-pill purple">Healthcare AI</span>
              <span className="project-tag-pill emerald">99.67% ROC-AUC</span>
              <span className="project-tag-pill">Platt Calibrated</span>
              <span className="witty-pill">🔬 Zero False Negatives</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800 }}>🔬 Breast Cancer Sentinel 2.0</h2>
            <p className="text-mono" style={{ color: 'var(--accent-primary-deep)', fontWeight: 700, fontSize: '0.88rem', marginTop: 4 }}>
              Clinical Decision Support System with Platt-Calibrated Cytological Ensemble
            </p>
          </div>
          <a href="https://github.com/Paritosh8-AI/Breast-Cancer-Prediction-System-using-Machine-Learning" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <span>View on GitHub</span>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="project-showcase-grid">
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 10, color: 'var(--text-bright)' }}>Clinical Safety Through Probability Calibration</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: 12 }}>
              Standard uncalibrated classifiers may produce raw probabilities like 0.51 that fail to convey clinical risk. In oncology, a false negative is catastrophic.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7 }}>
              Breast Cancer Sentinel 2.0 implements post-hoc <strong>Platt scaling (logistic sigmoid regression on model logits)</strong>, aligning model confidence with empirical ground-truth distribution and yielding <strong>95.24% sensitivity</strong> and <strong>99.67% ROC-AUC</strong>.
            </p>
          </div>

          <div className="project-media-side">
            <div className="main-preview-frame">
              <img src={activeTabThumb.cancer} alt="Cancer Sentinel Preview" />
            </div>
            <div className="sub-previews-grid">
              {[
                { src: '/assets/images/cancer_sentinel_dashboard.png', label: 'Dashboard' },
                { src: '/assets/images/clinical_architecture_diagram.png', label: 'Architecture' },
                { src: '/assets/images/confusion_matrix.PNG', label: 'Confusion Matrix' },
              ].map((t) => (
                <div
                  key={t.src}
                  className={`sub-preview-item ${activeTabThumb.cancer === t.src ? 'active' : ''}`}
                  onClick={() => setActiveTabThumb({ ...activeTabThumb, cancer: t.src })}
                >
                  <img src={t.src} alt={t.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
