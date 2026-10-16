'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Engineering Role',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('paritoshmukherjee8@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to transmit message.');
      }

      setSubmittedData(data.data);
      setStatusMessage({
        type: 'success',
        text: 'Your message has been received! I typically reply within 24 hours.',
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        category: 'Engineering Role',
        subject: '',
        message: '',
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'An error occurred while transmitting your message.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 140, paddingBottom: 80 }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-subtitle">Direct Communication Line</div>
        <h1 className="section-title">Connect &amp; Initiate Collaboration</h1>
        <p className="section-desc">
          Open for AI/ML Systems Engineering roles, production telemetry consulting, or discussing causal inference in distributed systems.
        </p>
      </div>

      {/* Two-Column Cohesive Layout */}
      <div className="contact-split-layout" style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Left Column: Direct Verified Channels */}
        <div className="contact-card-surface">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <span className="status-pill">
              <span className="pulse-dot"></span>
              Inbox Ingestion: Active
            </span>
            <span className="witty-pill">☕ Response Time &lt; 24h</span>
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 10, color: 'var(--text-bright)' }}>
            Let&apos;s Build Robust Intelligence
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: 24 }}>
            Whether you have an ambitious AI/ML systems engineering role, need low-latency deep learning architecture, or want to discuss causal inference in distributed EV and financial networks, my verified communication channels are open.
          </p>

          <div className="contact-channels-grid" style={{ marginBottom: 24 }}>
            {/* Email */}
            <div className="contact-channel-item">
              <div className="channel-left">
                <div className="channel-icon" style={{ color: 'var(--accent-primary-deep)' }}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                  </svg>
                </div>
                <div className="channel-text">
                  <h4>Direct Email</h4>
                  <p>paritoshmukherjee8@gmail.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  className="copy-pill-btn"
                  onClick={handleCopyEmail}
                  title="Copy Email to Clipboard"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
                <a
                  href="mailto:paritoshmukherjee8@gmail.com"
                  className="copy-pill-btn"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Send →
                </a>
              </div>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/Paritosh8-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="channel-left">
                <div className="channel-icon">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div className="channel-text">
                  <h4>GitHub Profile</h4>
                  <p>github.com/Paritosh8-AI</p>
                </div>
              </div>
              <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-primary-deep)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Visit ↗
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/paritosh-mukherjee-471399360"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="channel-left">
                <div className="channel-icon" style={{ color: 'var(--accent-primary)' }}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div className="channel-text">
                  <h4>LinkedIn</h4>
                  <p>Connect with Paritosh Mukherjee</p>
                </div>
              </div>
              <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-primary-deep)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Connect ↗
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/mewzicallyyours/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="channel-left">
                <div className="channel-icon" style={{ color: 'var(--accent-primary)' }}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="channel-text">
                  <h4>Instagram</h4>
                  <p>@mewzicallyyours • Audio synthesis, music &amp; visuals</p>
                </div>
              </div>
              <span className="text-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Connect ↗
              </span>
            </a>
          </div>

          {/* Telemetry Strip */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: 20,
              borderTop: '1px solid var(--border-subtle)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
            }}
          >
            <div>
              <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                SLA
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-bright)', marginTop: 2 }}>
                &lt; 24h
              </div>
            </div>
            <div>
              <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Timezone
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-bright)', marginTop: 2 }}>
                IST (UTC +5:30)
              </div>
            </div>
            <div>
              <div className="text-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Focus
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-bright)', marginTop: 2 }}>
                AI Systems
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Transmission */}
        <div className="contact-card-surface">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 4, color: 'var(--text-bright)' }}>
                Send a Direct Message
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                Dispatches directly into my verified communication queue.
              </p>
            </div>
            <span className="status-pill" style={{ fontSize: '0.74rem' }}>
              <span className="pulse-dot"></span>
              Live Delivery
            </span>
          </div>

          {statusMessage && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: 10,
                marginBottom: 20,
                fontSize: '0.9rem',
                backgroundColor: statusMessage.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(242, 166, 123, 0.15)',
                color: statusMessage.type === 'success' ? '#34d399' : '#FFD38B',
                border: `1px solid ${statusMessage.type === 'success' ? '#059669' : '#F2A67B'}`,
              }}
            >
              {statusMessage.text}
              {submittedData && (
                <div style={{ marginTop: 8, fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  Message Reference ID: <code>{submittedData.id}</code>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              <div>
                <label className="contact-field-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Alex Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="contact-input-field"
                />
              </div>

              <div>
                <label className="contact-field-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="contact-input-field"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
              <div>
                <label className="contact-field-label">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="contact-input-field"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="Engineering Role">Full-Time AI/ML Systems Role</option>
                  <option value="Telemetry Consulting">Telemetry / FastMCP Consulting</option>
                  <option value="ML Architecture">Low-Latency Architecture Advisory</option>
                  <option value="Collaboration">Open-Source Collaboration</option>
                  <option value="General">General Technical Inquiry</option>
                </select>
              </div>

              <div>
                <label className="contact-field-label">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Opportunity at NextGen AI"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="contact-input-field"
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="contact-field-label" style={{ marginBottom: 0 }}>
                  Message Content *
                </label>
                <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  {formData.message.length} / 2000
                </span>
              </div>
              <textarea
                required
                rows={5}
                maxLength={2000}
                placeholder="Share details on your project, role specifications, or telemetry challenge..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="contact-input-field"
                style={{ resize: 'vertical', minHeight: 120 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{
                  minWidth: 170,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {submitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
