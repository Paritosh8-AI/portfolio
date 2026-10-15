'use client';

import { useState, useRef, useEffect } from 'react';

const INITIAL_LINES = [
  '<span class="term-muted">Paritosh AI Diagnostics Shell v2.4.0 (Node.js/Next.js Runtime)</span>',
  '<span class="term-muted">Connected to: In-Memory / MongoDB Atlas Causal Ingestion Pipeline.</span>',
  '<span class="term-accent">Type "help" to view diagnostic commands, or try "guestbook" to inspect live peer reviews.</span>',
];

export default function TerminalConsole() {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (cmdToRun) => {
    const rawCmd = (cmdToRun !== undefined ? cmdToRun : inputVal).trim();
    if (!rawCmd) return;

    if (rawCmd.toLowerCase() === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    }

    // Append input line
    setLines((prev) => [...prev, `<span class="prompt-prefix">visitor@paritosh-node:~$</span> ${rawCmd}`]);
    setInputVal('');
    setLoading(true);

    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: rawCmd }),
      });
      const data = await res.json();
      if (data.output) {
        setLines((prev) => [...prev, data.output]);
      }
    } catch (err) {
      setLines((prev) => [...prev, `<span class="term-yellow">Network/API Error: ${err.message}</span>`]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand();
    }
  };

  const chips = [
    { label: 'inbox', cmd: 'inbox' },
    { label: 'joke', cmd: 'joke' },
    { label: 'guestbook', cmd: 'guestbook' },
    { label: 'telemetry', cmd: 'telemetry' },
    { label: 'agentic_rca', cmd: 'agentic_rca' },
    { label: 'fraud_check', cmd: 'fraud_check' },
    { label: 'skills', cmd: 'skills' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <section className="terminal-section" id="telemetry-console">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">Real-Time Autonomous Shell</div>
          <h2 className="section-title">Interactive Telemetry &amp; Diagnostics Console</h2>
          <p className="section-desc">
            Execute simulated inference pipelines or query the MongoDB database directly through this interactive Node.js terminal.
          </p>
        </div>

        <div className="terminal-window">
          {/* Header */}
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="term-btn red" />
              <span className="term-btn yellow" />
              <span className="term-btn green" />
            </div>
            <div className="terminal-title">
              <span style={{ color: '#FF0000' }}>⚡</span>
              <span>paritosh@node-telemetry: ~ (bash / REST)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: '#10b981' }}>
              <span className="status-pulse-dot" style={{ width: 6, height: 6 }} />
              <span className="text-mono">READY</span>
            </div>
          </div>

          {/* Body */}
          <div className="terminal-body" ref={terminalBodyRef}>
            {lines.map((line, idx) => (
              <div key={idx} className="terminal-line" dangerouslySetInnerHTML={{ __html: line }} />
            ))}

            <div className="terminal-input-row">
              <span className="prompt-prefix">visitor@paritosh-node:~$</span>
              <input
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={loading ? 'Processing telemetry...' : 'Type "help", "guestbook", "joke"...'}
                disabled={loading}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Chips */}
          <div className="terminal-chips">
            <span style={{ fontSize: '0.72rem', color: '#71717a', marginRight: 4, fontFamily: 'var(--font-mono)' }}>
              Quick Commands:
            </span>
            {chips.map((chip) => (
              <button
                key={chip.cmd}
                type="button"
                className="term-chip"
                onClick={() => handleCommand(chip.cmd)}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
