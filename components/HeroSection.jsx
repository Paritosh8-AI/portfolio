'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { generateFreshInfiniteJoke, INITIAL_JOKE } from '@/lib/infiniteWitEngine';

const ROLES = [
  'AI / ML Systems Engineer',
  'Sub-1.2ms Latency Architect',
  'FastMCP Causal Inference Specialist',
  'Real-Time Fraud Defense Lead',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Infinite non-repeating stream (NO CYCLING: no deck array, no modulo wrap-around)
  const [currentJoke, setCurrentJoke] = useState(INITIAL_JOKE);
  const [jokeFade, setJokeFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  // Set of already seen joke signatures to guarantee zero repeats across the entire session
  const seenSignaturesRef = useRef(new Set());

  // On client mount, synthesize a fresh joke immediately so every visitor gets a unique first impression
  useEffect(() => {
    const firstJoke = generateFreshInfiniteJoke(seenSignaturesRef.current);
    setCurrentJoke(firstJoke);
  }, []);

  // Smooth typing effect
  useEffect(() => {
    const currentFull = ROLES[roleIndex];
    let timer;

    if (!isDeleting && displayedRole.length < currentFull.length) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFull.slice(0, displayedRole.length + 1));
      }, 70);
    } else if (!isDeleting && displayedRole.length === currentFull.length) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayedRole.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRole(currentFull.slice(0, displayedRole.length - 1));
      }, 35);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  // Generates the next completely fresh joke from the infinite procedural engine (NO CYCLING)
  const generateNextJoke = useCallback(() => {
    setJokeFade(false);
    setTimeout(() => {
      const nextJoke = generateFreshInfiniteJoke(seenSignaturesRef.current);
      setCurrentJoke(nextJoke);
      setJokeFade(true);

      // Reset auto-timer so the user gets the full 18 seconds for the new joke
      setTimerKey((k) => k + 1);
    }, 180);
  }, []);

  // Auto-generate next joke every 18 seconds if user is idle and not actively reading / hovering
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      generateNextJoke();
    }, 18000);

    return () => clearInterval(interval);
  }, [generateNextJoke, isPaused, timerKey]);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Text & Pitch */}
          <div className="hero-content">
            <div className="hero-greeting">
              <span className="status-pill">
                <span className="pulse-dot" />
                Converting caffeine into sub-millisecond inference latencies
              </span>
              <span className="witty-pill">☕ Loss &lt; 0.01</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="name-highlight">Paritosh Mukherjee</span>
            </h1>

            <div className="hero-role-typing">
              <span className="text-mono" style={{ color: 'var(--accent-primary-deep)', fontWeight: 700 }}>
                &gt;
              </span>
              <span id="typing-text">{displayedRole || 'AI / ML Systems Engineer'}</span>
              <span className="typing-cursor" />
            </div>

            <p className="hero-description">
              I architect <strong>production-grade deep learning systems</strong>, <strong>autonomous agentic diagnostics engines</strong>, and full-stack MERN cloud applications. My work bridges mathematical theory and real-world execution: sub-millisecond inference latencies, class-imbalance resilience, and deterministic causal reasoning across distributed telemetry streams.
            </p>

            {/* Witty Joke Card - Infinite Procedural Generation with Pause-on-Hover */}
            <div
              className="hero-witty-quote"
              onClick={generateNextJoke}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              title="Click to generate next witty quip (Infinite supply, no cycling)"
            >
              <div className="quote-header-mini">
                <span className="quote-tag">⚡ PRODUCTION WIT • {currentJoke.category}</span>
                <button
                  type="button"
                  className="quote-shuffle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    generateNextJoke();
                  }}
                  aria-label="Generate Next Quip (Infinite Supply)"
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Next Quip ∞</span>
                </button>
              </div>
              <div
                id="hero-quote-text"
                style={{
                  opacity: jokeFade ? 1 : 0,
                  transition: 'opacity 0.22s ease',
                }}
              >
                “{currentJoke.text}”
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="hero-actions">
              <Link href="/projects" className="btn-primary">
                <span>Explore Systems</span>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/guestbook" className="btn-secondary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>MERN Guestbook</span>
              </Link>
              <a href="#telemetry-console" className="btn-secondary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 17l6-6-6-6M12 19h8" />
                </svg>
                <span>Shell</span>
              </a>
            </div>

            {/* Production KPI Metrics */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <div className="stat-value indigo">&lt; 1.2 ms</div>
                <div className="stat-label">Inference Latency SLA</div>
              </div>
              <div className="stat-item">
                <div className="stat-value cyan">99.67%</div>
                <div className="stat-label">Ensemble ROC-AUC</div>
              </div>
              <div className="stat-item">
                <div className="stat-value emerald">100%</div>
                <div className="stat-label">Deterministic Causal RCA</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Architecture Widget */}
          <div className="hero-code-card">
            <div className="code-card-header">
              <div className="code-card-dots">
                <span className="dot-btn red" />
                <span className="dot-btn yellow" />
                <span className="dot-btn green" />
              </div>
              <div className="text-mono" style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                paritosh_system_core.py
              </div>
              <span className="level-badge production">STABLE NODE</span>
            </div>

            <div className="code-card-body">
              <div>
                <span className="code-kw">from</span> fastmcp <span className="code-kw">import</span> FastMCP
              </div>
              <div>
                <span className="code-kw">import</span> tensorflow <span className="code-kw">as</span> tf
              </div>
              <div style={{ height: 6 }} />
              <div>
                <span className="code-comment"># Paritosh's Golden Production Rule:</span>
              </div>
              <div>
                <span className="code-comment">
                  # In theory, there is no difference between theory and production. In production, there is.
                </span>
              </div>
              <div>
                <span className="code-kw">class</span> <span className="code-fn">AutonomousEngineer</span>:
              </div>
              <div style={{ paddingLeft: 16 }}>
                <span className="code-prop">name</span> = <span className="code-str">"Paritosh Mukherjee"</span>
              </div>
              <div style={{ paddingLeft: 16 }}>
                <span className="code-prop">stack</span> = [<span className="code-str">"MERN"</span>, <span className="code-str">"FastMCP"</span>, <span className="code-str">"TensorFlow"</span>]
              </div>
              <div style={{ paddingLeft: 16 }}>
                <span className="code-prop">tolerance_for_blocking_io</span> = <span className="code-str">"0.0ms"</span>
              </div>
              <div style={{ height: 6 }} />
              <div>
                <span className="code-comment"># Sub-1.2ms sequence graph tracing</span>
              </div>
              <div style={{ paddingLeft: 16 }}>
                <span className="code-kw">@tf.function</span>
              </div>
              <div style={{ paddingLeft: 16 }}>
                <span className="code-kw">def</span> <span className="code-fn">intercept_fraud</span>(<span className="code-prop">txn_stream</span>):
              </div>
              <div style={{ paddingLeft: 32 }}>
                <span className="code-kw">return</span> crnn_attention_layer(txn_stream)
              </div>
              <div style={{ height: 6 }} />
              <div>
                <span className="code-comment"># FastMCP autonomous causal attribution</span>
              </div>
              <div style={{ paddingLeft: 16 }}>
                <span className="code-kw">async def</span> <span className="code-fn">triage_ev_fault</span>(<span className="code-prop">ocpp_events</span>):
              </div>
              <div style={{ paddingLeft: 32 }}>
                <span className="code-kw">return await</span> causal_dag.attribute(ocpp_events)
              </div>
            </div>

            <div
              style={{
                background: '#1f0e27',
                borderTop: '1px solid #80426E',
                padding: '12px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="pulse-dot" />
                <span className="text-mono" style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.78rem' }}>
                  Live MERN Inference Engine
                </span>
              </div>
              <span className="text-mono" style={{ color: '#94A3B8', fontSize: '0.74rem' }}>
                FastMCP • Next.js • Mongo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
