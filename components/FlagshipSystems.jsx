'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FlagshipSystems() {
  const [activeThumb, setActiveThumb] = useState({
    agenticev: '/assets/images/live_cms_network_pulse_rendered.png',
    upi: '/assets/images/upi_sentinel_dashboard.png',
    cancer: '/assets/images/cancer_sentinel_dashboard.png',
  });

  const agenticThumbs = [
    { src: '/assets/images/live_cms_network_pulse_rendered.png', label: 'Network Pulse' },
    { src: '/assets/images/ai_telemetry_copilot.png', label: 'AI Copilot' },
    { src: '/assets/images/batch_rca_studio.png', label: 'Batch RCA' },
  ];

  const upiThumbs = [
    { src: '/assets/images/upi_sentinel_dashboard.png', label: 'Dashboard' },
    { src: '/assets/images/upi_architecture_diagram.png', label: 'Architecture' },
    { src: '/assets/images/crnn_architecture.PNG', label: 'CRNN Layers' },
  ];

  const cancerThumbs = [
    { src: '/assets/images/cancer_sentinel_dashboard.png', label: 'Clinical Dashboard' },
    { src: '/assets/images/clinical_architecture_diagram.png', label: 'Clinical Flow' },
    { src: '/assets/images/confusion_matrix.PNG', label: 'Confusion Matrix' },
  ];

  return (
    <section style={{ padding: '40px 0 90px' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">Flagship Deployments</div>
          <h2 className="section-title">Core Systems Engineered</h2>
          <p className="section-desc">
            Production-grade AI architectures designed for mission-critical reliability, sub-millisecond budgets, and clinical safety.
          </p>
        </div>

        <div className="projects-grid">
          {/* SYSTEM 1: AgenticEV */}
          <article className="project-card-full">
            <div className="project-info-side">
              <div className="project-badge-row">
                <span className="project-tag-pill">Autonomous Diagnostics</span>
                <span className="project-tag-pill purple">FastMCP (Model Context Protocol)</span>
                <span className="project-tag-pill emerald">OCPP 1.6-J &amp; OCPI</span>
                <span className="witty-pill">⚡ 0% Existential Dread</span>
              </div>
              <h3 className="project-title">AgenticEV RCA Studio</h3>
              <p className="project-description">
                Autonomous AI-driven Root Cause Analysis (RCA) and causal inference engine for EV fast-charging networks. Triages multi-party telemetry across distributed EVSE hardware, vehicle BMS contactors, and OCPI roaming protocols. <em>Taming EV charging tantrums so drivers don't get stranded in existential dread.</em>
              </p>
              <ul className="project-highlights-list">
                <li><span className="highlight-bullet">▹</span> Resolves the 18%–25% charging failure rate across distributed hardware with deterministic attribution.</li>
                <li><span className="highlight-bullet">▹</span> Implements <strong>FastMCP (Model Context Protocol)</strong> to empower LLM agents with autonomous telemetry diagnosis tools.</li>
                <li><span className="highlight-bullet">▹</span> Generates automated executive Word/Excel synthesis reports with zero human triage required.</li>
              </ul>
              <div className="project-tech-stack">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">FastMCP</span>
                <span className="tech-tag">Causal DAGs</span>
                <span className="tech-tag">FastAPI</span>
                <span className="tech-tag">OCPP 1.6-J</span>
                <span className="tech-tag">MERN Dashboard</span>
              </div>
              <div className="project-cta-group">
                <Link href="/projects#agenticev" className="btn-primary">Deep Dive &amp; Causal Demo</Link>
                <a href="https://github.com/Paritosh8-AI/AgenticEV_RCA" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span>Repository</span>
                </a>
              </div>
            </div>

            <div className="project-media-side">
              <div className="main-preview-frame">
                <img src={activeThumb.agenticev} alt="AgenticEV Preview" />
                <div className="preview-overlay-zoom">
                  <span>Full Technical View</span>
                </div>
              </div>
              <div className="sub-previews-grid">
                {agenticThumbs.map((t) => (
                  <div
                    key={t.src}
                    className={`sub-preview-item ${activeThumb.agenticev === t.src ? 'active' : ''}`}
                    onClick={() => setActiveThumb({ ...activeThumb, agenticev: t.src })}
                  >
                    <img src={t.src} alt={t.label} />
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* SYSTEM 2: UPI Sentinel 2.0 */}
          <article className="project-card-full reverse">
            <div className="project-info-side">
              <div className="project-badge-row">
                <span className="project-tag-pill">Real-Time Defense</span>
                <span className="project-tag-pill emerald">&lt; 1.2ms SLA</span>
                <span className="project-tag-pill purple">CRNN + Attention</span>
                <span className="witty-pill">🛡️ Faster Than Your Bank's OTP</span>
              </div>
              <h3 className="project-title">UPI Sentinel 2.0</h3>
              <p className="project-description">
                Sub-millisecond inference fraud defense engine architected for high-throughput digital payment rails. Handles extreme class imbalance (&lt;0.2% fraud) using sequence-aware recurrent attention and in-memory graph mule-ring detection.
              </p>
              <ul className="project-highlights-list">
                <li><span className="highlight-bullet">▹</span> Achieved <strong>0.91 ms latency</strong> under 865 req/s sustained synthetic stress testing.</li>
                <li><span className="highlight-bullet">▹</span> Implemented Bahdanau attention to pinpoint rapid nocturnal velocity bursts across distributed merchant endpoints.</li>
                <li><span className="highlight-bullet">▹</span> Integrated in-memory graph traversal to flag multi-hop synthetic mule networks in real time.</li>
              </ul>
              <div className="project-tech-stack">
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">CRNN</span>
                <span className="tech-tag">Bahdanau Attention</span>
                <span className="tech-tag">NetworkX</span>
                <span className="tech-tag">FastAPI</span>
              </div>
              <div className="project-cta-group">
                <Link href="/projects#upisentinel" className="btn-primary">Launch Simulator</Link>
                <a href="https://github.com/Paritosh8-AI/UPI-Fraud-Detection-System" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span>Repository</span>
                </a>
              </div>
            </div>

            <div className="project-media-side">
              <div className="main-preview-frame">
                <img src={activeThumb.upi} alt="UPI Sentinel Preview" />
                <div className="preview-overlay-zoom">
                  <span>Full Technical View</span>
                </div>
              </div>
              <div className="sub-previews-grid">
                {upiThumbs.map((t) => (
                  <div
                    key={t.src}
                    className={`sub-preview-item ${activeThumb.upi === t.src ? 'active' : ''}`}
                    onClick={() => setActiveThumb({ ...activeThumb, upi: t.src })}
                  >
                    <img src={t.src} alt={t.label} />
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* SYSTEM 3: Breast Cancer Sentinel 2.0 */}
          <article className="project-card-full">
            <div className="project-info-side">
              <div className="project-badge-row">
                <span className="project-tag-pill">Healthcare AI</span>
                <span className="project-tag-pill purple">99.67% ROC-AUC</span>
                <span className="project-tag-pill emerald">Platt Calibrated</span>
                <span className="witty-pill">🔬 Zero False Negatives</span>
              </div>
              <h3 className="project-title">Breast Cancer Sentinel 2.0</h3>
              <p className="project-description">
                Clinical decision support system classifying fine needle aspirate (FNA) cytology. Uses a soft-voting ensemble (HistGBM + Random Forest + MLP) calibrated with post-hoc Platt scaling to prevent dangerous false-negative predictions.
              </p>
              <ul className="project-highlights-list">
                <li><span className="highlight-bullet">▹</span> <strong>99.67% ROC-AUC</strong> with 95.24% sensitivity on benchmark clinical cytology datasets.</li>
                <li><span className="highlight-bullet">▹</span> Post-hoc Platt probability scaling guarantees reliable, calibrated risk estimates for oncology teams.</li>
                <li><span className="highlight-bullet">▹</span> Generates Z-score radar biomarker profiles for intuitive, transparent clinical explainability.</li>
              </ul>
              <div className="project-tech-stack">
                <span className="tech-tag">Scikit-Learn</span>
                <span className="tech-tag">HistGBM</span>
                <span className="tech-tag">Platt Scaling</span>
                <span className="tech-tag">Streamlit</span>
                <span className="tech-tag">Radar XAI</span>
              </div>
              <div className="project-cta-group">
                <Link href="/projects#cancersentinel" className="btn-primary">View Clinical Blueprint</Link>
                <a href="https://github.com/Paritosh8-AI/Breast-Cancer-Prediction-System-using-Machine-Learning" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <span>Repository</span>
                </a>
              </div>
            </div>

            <div className="project-media-side">
              <div className="main-preview-frame">
                <img src={activeThumb.cancer} alt="Cancer Sentinel Preview" />
                <div className="preview-overlay-zoom">
                  <span>Full Technical View</span>
                </div>
              </div>
              <div className="sub-previews-grid">
                {cancerThumbs.map((t) => (
                  <div
                    key={t.src}
                    className={`sub-preview-item ${activeThumb.cancer === t.src ? 'active' : ''}`}
                    onClick={() => setActiveThumb({ ...activeThumb, cancer: t.src })}
                  >
                    <img src={t.src} alt={t.label} />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
