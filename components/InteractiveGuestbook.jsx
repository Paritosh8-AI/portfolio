'use client';

import { useState, useEffect } from 'react';

const BADGE_OPTIONS = [
  '🧠 Deep Learning',
  '⚡ Sub-1.2ms Latency',
  '🔌 FastMCP Agentic',
  '🛡️ High-QPS Fraud Defense',
  '🔬 Platt-Calibrated',
  '📦 MERN Architecture',
];

export default function InteractiveGuestbook() {
  const [endorsements, setEndorsements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbType, setDbType] = useState('connecting...');
  const [activeBadge, setActiveBadge] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    relationship: 'Engineering Peer',
    badge: '🧠 Deep Learning',
    rating: 5,
    message: '',
    githubUrl: '',
  });

  // Fetch endorsements
  const fetchEndorsements = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/endorsements?sort=${sortBy}&badge=${activeBadge}`);
      const json = await res.json();
      if (json.success) {
        setEndorsements(json.data || []);
        setDbType(json.dbType || 'in-memory');
      }
    } catch (err) {
      console.error('Failed to load endorsements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEndorsements();
  }, [sortBy, activeBadge]);

  // Handle like/clap
  const handleLike = async (id) => {
    if (likedIds.has(id)) return;

    // Optimistic UI update
    setLikedIds((prev) => new Set(prev).add(id));
    setEndorsements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item))
    );

    try {
      await fetch(`/api/endorsements/${id}/like`, { method: 'POST' });
    } catch (e) {
      console.warn('Like sync error:', e);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.name.trim() || !formData.role.trim() || !formData.message.trim()) {
      setFormError('Please fill out Name, Role, and Message.');
      return;
    }
    if (formData.message.trim().length < 10) {
      setFormError('Endorsement message must be at least 10 characters long.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/endorsements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit endorsement');
      }

      setFormSuccess('Endorsement verified and saved to database!');
      // Prepend newly created item
      setEndorsements((prev) => [data.data, ...prev]);

      // Reset form
      setFormData({
        name: '',
        role: '',
        company: '',
        relationship: 'Engineering Peer',
        badge: '🧠 Deep Learning',
        rating: 5,
        message: '',
        githubUrl: '',
      });

      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess('');
      }, 1400);
    } catch (err) {
      setFormError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'PM';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <section className="guestbook-section" id="guestbook">
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">MERN Stack • MongoDB &amp; Node.js Live Feed</div>
          <h2 className="section-title">Engineering Guestbook &amp; Peer Reviews</h2>
          <p className="section-desc">
            A full-stack CRUD endorsement board powered by MongoDB and Next.js Node API routes. Collaborators, recruiters, and engineering peers can publish signed telemetry reviews in real time.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="guestbook-header-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              className={`db-status-badge ${dbType.includes('mongodb') ? 'live' : 'fallback'}`}
              title="Database connection state"
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: dbType.includes('mongodb') ? '#10b981' : '#f59e0b',
                  boxShadow: `0 0 6px ${dbType.includes('mongodb') ? '#10b981' : '#f59e0b'}`,
                }}
              />
              <span>DB: {dbType.includes('mongodb') ? 'MongoDB Atlas (Live)' : 'In-Memory Engine (Active)'}</span>
            </span>

            {/* Sort toggles */}
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className={`filter-btn ${sortBy === 'newest' ? 'active' : ''}`}
                onClick={() => setSortBy('newest')}
              >
                Latest
              </button>
              <button
                type="button"
                className={`filter-btn ${sortBy === 'top' ? 'active' : ''}`}
                onClick={() => setSortBy('top')}
              >
                Most Liked 🔥
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span>Sign Guestbook</span>
          </button>
        </div>

        {/* Badge Filter Bar */}
        <div className="guestbook-filter-bar">
          <button
            type="button"
            className={`filter-btn ${activeBadge === 'all' ? 'active' : ''}`}
            onClick={() => setActiveBadge('all')}
          >
            All Disciplines
          </button>
          {BADGE_OPTIONS.map((badge) => (
            <button
              key={badge}
              type="button"
              className={`filter-btn ${activeBadge === badge ? 'active' : ''}`}
              onClick={() => setActiveBadge(badge)}
            >
              {badge}
            </button>
          ))}
        </div>

        {/* Grid of Endorsements */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <span className="pulse-dot" style={{ width: 14, height: 14, margin: '0 auto 12px' }} />
            <div className="text-mono" style={{ fontSize: '0.9rem' }}>
              Querying MongoDB cluster...
            </div>
          </div>
        ) : endorsements.length === 0 ? (
          <div
            className="glass-card"
            style={{ textAlign: 'center', padding: 40, marginTop: 24, color: 'var(--text-muted)' }}
          >
            <h3>No entries found under this filter</h3>
            <p style={{ marginTop: 8 }}>Be the first engineer to leave an endorsement under this category!</p>
          </div>
        ) : (
          <div className="guestbook-grid">
            {endorsements.map((entry) => (
              <article key={entry.id || entry._id} className="endorsement-card">
                <div>
                  <div className="endorsement-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="endorser-avatar">{getInitials(entry.name)}</div>
                      <div className="endorser-info">
                        <h4>{entry.name}</h4>
                        <p>
                          {entry.role}
                          {entry.company ? ` • ${entry.company}` : ''}
                        </p>
                      </div>
                    </div>
                    <div style={{ color: '#fbbf24', fontSize: '0.85rem', letterSpacing: 1 }}>
                      {'★'.repeat(entry.rating || 5)}
                    </div>
                  </div>

                  <p className="endorsement-message" style={{ marginTop: 14 }}>
                    “{entry.message}”
                  </p>
                </div>

                <div className="endorsement-footer">
                  <span className="endorsement-badge">{entry.badge || '🧠 Deep Learning'}</span>

                  <button
                    type="button"
                    className={`like-action-btn ${likedIds.has(entry.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(entry.id)}
                    title="Endorse this peer feedback"
                  >
                    <span>{likedIds.has(entry.id) ? '❤️' : '🤍'}</span>
                    <span>{entry.likes || 0}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Sign Paritosh's Engineering Guestbook</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Stored persistently in MongoDB with real-time replication.
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: '0.82rem',
                  marginBottom: 14,
                }}
              >
                ⚠️ {formError}
              </div>
            )}

            {formSuccess && (
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#15803d',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: '0.82rem',
                  marginBottom: 14,
                }}
              >
                ✓ {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Dr. Priya Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Staff ML Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                    Company / Org
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Autonomous Labs"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                    Relationship
                  </label>
                  <select
                    className="form-control"
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  >
                    <option value="Engineering Peer">Engineering Peer</option>
                    <option value="Colleague / Teammate">Colleague / Teammate</option>
                    <option value="Open Source Contributor">Open Source Contributor</option>
                    <option value="Recruiter / Hiring Lead">Recruiter / Hiring Lead</option>
                    <option value="Industry Researcher">Industry Researcher</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                  Technical Focus Badge
                </label>
                <select
                  className="form-control"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: 4 }}>
                  Endorsement Message *
                </label>
                <textarea
                  required
                  rows={4}
                  className="form-control"
                  placeholder="Share your perspective on Paritosh's low-latency systems rigor, causal FastMCP triage, or production engineering work..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Writing to MongoDB...' : 'Publish to MongoDB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
