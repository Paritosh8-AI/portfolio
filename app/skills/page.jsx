'use client';

import { useState, useMemo } from 'react';

const SKILL_CATEGORIES = [
  {
    id: 'ml',
    title: 'Machine Learning & Deep Learning',
    subtitle: 'Models, Ensembles & Calibration',
    icon: '🧠',
    color: 'var(--accent-primary-deep)',
    skills: [
      {
        name: 'TensorFlow & Keras',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Compiled graph tracing via @tf.function to compress sequence inference down to sub-1.2ms budgets.',
        keywords: ['tensorflow', 'keras', 'tf.function', 'graph', 'latency'],
      },
      {
        name: 'Sequence Modeling (CRNN + Attention)',
        badge: 'DEEP MASTERY',
        badgeClass: 'deep',
        note: 'Combining recurrent convolutions with Bahdanau attention to pinpoint nighttime velocity bursts in transaction streams.',
        keywords: ['crnn', 'attention', 'bahdanau', 'lstm', 'sequence', 'temporal'],
      },
      {
        name: 'Scikit-Learn Ensembles',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'HistGBM, Random Forests, and Multi-Layer Perceptrons blended with soft-voting for 99.67% ROC-AUC clinical safety.',
        keywords: ['scikit-learn', 'ensemble', 'histgbm', 'random forest', 'roc-auc'],
      },
      {
        name: 'Platt Probability Scaling',
        badge: 'SPECIALIZED',
        badgeClass: 'deep',
        note: 'Post-hoc calibration ensuring that an oncology prediction claiming 95% certainty really means 95% in the clinic.',
        keywords: ['platt', 'calibration', 'probability', 'oncology', 'sigmoid'],
      },
      {
        name: 'NumPy, Pandas, SciPy',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'High-performance array vectorization. Writing code that does not waste memory or choke on million-row dataframes.',
        keywords: ['numpy', 'pandas', 'scipy', 'vectorization', 'dataframes'],
      },
    ],
  },
  {
    id: 'agentic',
    title: 'Agentic AI & Model Context Protocol',
    subtitle: 'FastMCP & Causal Reasoning',
    icon: '🤖',
    color: 'var(--accent-purple)',
    skills: [
      {
        name: 'Model Context Protocol (FastMCP)',
        badge: 'ARCHITECTURAL LEAD',
        badgeClass: 'deep',
        note: 'Building autonomous MCP servers that give LLM agents deterministic tools to diagnose live infrastructure.',
        keywords: ['fastmcp', 'mcp', 'agents', 'llm', 'tools', 'protocol'],
      },
      {
        name: 'Causal DAG Inference',
        badge: 'DEEP MASTERY',
        badgeClass: 'deep',
        note: 'Directed acyclic graphs for deterministic fault attribution. Because guessing in mission-critical systems is a bad hobby.',
        keywords: ['causal', 'dag', 'inference', 'pearl', 'bayesian', 'attribution'],
      },
      {
        name: 'Multi-Party Telemetry Triage',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Correlating asynchronous EVSE logs, BMS battery signals, and cloud roaming APIs without human hair-pulling.',
        keywords: ['telemetry', 'triage', 'evse', 'bms', 'logs', 'iot'],
      },
      {
        name: 'Playwright Protocol Interception',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'Headless browser automation and telemetry payload sniffing for autonomous diagnosis verification.',
        keywords: ['playwright', 'headless', 'automation', 'interception', 'testing'],
      },
      {
        name: 'Automated Report Synthesis',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Generating executive-ready Word and Excel diagnostic breakdowns in seconds instead of human hours.',
        keywords: ['report', 'docx', 'xlsx', 'synthesis', 'automation'],
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Low-Latency Architecture',
    subtitle: 'Sub-Millisecond SLAs & APIs',
    icon: '⚡',
    color: 'var(--accent-emerald)',
    skills: [
      {
        name: 'FastAPI & Uvicorn',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'High-throughput asynchronous endpoints. Handling 800+ requests/sec with minimal memory footprint.',
        keywords: ['fastapi', 'uvicorn', 'async', 'python', 'rest'],
      },
      {
        name: 'Pydantic v2 Strict Typing',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Blazing-fast Rust-backed schema validation ensuring bad telemetry payloads get rejected at the door.',
        keywords: ['pydantic', 'validation', 'typing', 'schemas'],
      },
      {
        name: 'In-Memory Graph Topologies',
        badge: 'DEEP MASTERY',
        badgeClass: 'deep',
        note: 'Sub-millisecond multi-hop mule ring clustering and money laundering syndicate graph traversal.',
        keywords: ['graphs', 'networkx', 'in-memory', 'clustering', 'fraud'],
      },
      {
        name: 'WebSockets & Event Streaming',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'Bi-directional event streaming for live EV charger state updates and real-time fraud alert feeds.',
        keywords: ['websockets', 'streaming', 'real-time', 'events'],
      },
      {
        name: 'Next.js & Node.js Microservices',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Full-stack MERN orchestration, RESTful API route handlers, and unified serverless edge deployment.',
        keywords: ['nextjs', 'nodejs', 'react', 'mern', 'microservices'],
      },
    ],
  },
  {
    id: 'cleantech',
    title: 'EV Protocols & Telemetry',
    subtitle: 'OCPP, OCPI & BMS Hardware',
    icon: '🔌',
    color: 'var(--accent-cyan)',
    skills: [
      {
        name: 'OCPP 1.6-J State Machines',
        badge: 'DOMAIN EXPERT',
        badgeClass: 'deep',
        note: 'Decoding WebSocket state transitions (StatusNotification, StopTransaction, MeterValues) to pinpoint charger halts.',
        keywords: ['ocpp', 'evse', 'websocket', 'json', 'charging'],
      },
      {
        name: 'OCPI 2.2 Roaming Architecture',
        badge: 'DOMAIN EXPERT',
        badgeClass: 'deep',
        note: 'Triage of cross-CPO roaming token validation, tariff calculations, and eMSP gateway timeout errors.',
        keywords: ['ocpi', 'roaming', 'cpo', 'emsp', 'tariffs'],
      },
      {
        name: 'Vehicle BMS Contactors',
        badge: 'SPECIALIZED',
        badgeClass: 'deep',
        note: 'Understanding high-voltage contactor weld interlocks, pilot PWM voltage levels, and thermal derating curves.',
        keywords: ['bms', 'contactor', 'pwm', 'pilot', 'battery', 'voltage'],
      },
      {
        name: 'High-Frequency MeterValues',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Real-time kW power curve anomaly detection to catch cable resistance degradation before fires occur.',
        keywords: ['metervalues', 'power', 'telemetry', 'grid', 'anomalies'],
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Engineering Rigor',
    subtitle: 'Containers & Automated CI/CD',
    icon: '🐳',
    color: 'var(--accent-amber)',
    skills: [
      {
        name: 'Docker & Docker Compose',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'Certified "Works on My Machine" eliminator. Multi-stage container builds tailored for low footprint.',
        keywords: ['docker', 'containers', 'docker compose', 'linux'],
      },
      {
        name: 'Pytest Automated Test Suites',
        badge: 'PRODUCTION GRADE',
        badgeClass: 'production',
        note: 'Writing comprehensive unit, mock, and integration tests so bugs do not wake people up at 3 AM.',
        keywords: ['pytest', 'testing', 'unit tests', 'mocks', 'ci'],
      },
      {
        name: 'GitHub Actions CI/CD',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'Automated linting, testing, and deployment pipelines triggered on every pull request.',
        keywords: ['github actions', 'ci/cd', 'pipelines', 'deployment'],
      },
      {
        name: 'PowerShell, Bash & Linux',
        badge: 'DAILY DRIVER',
        badgeClass: 'daily',
        note: 'Fluent in terminal diagnostics, process telemetry, and automating server provisioning tasks.',
        keywords: ['bash', 'powershell', 'linux', 'terminal', 'shell'],
      },
    ],
  },
  {
    id: 'dsp',
    title: 'Audio DSP & Music Production',
    subtitle: 'Acoustics & Sound Synthesis',
    icon: '🎵',
    color: 'var(--accent-purple)',
    skills: [
      {
        name: 'FL Studio Music Synthesis',
        badge: 'PASSIONATE ARTIST',
        badgeClass: 'deep',
        note: 'Electronic sound design, FM synthesis, harmonic balancing, and creative audio mastering (@mewzicallyyours).',
        keywords: ['fl studio', 'synthesis', 'music', 'sound design'],
      },
      {
        name: 'FFT & Spectrogram Analysis',
        badge: 'DEEP MASTERY',
        badgeClass: 'deep',
        note: 'Fourier transform intuition directly bridging audio signal engineering with sequence deep learning.',
        keywords: ['fft', 'spectrogram', 'fourier', 'dsp', 'frequencies'],
      },
      {
        name: 'Subtractive & Wavetable Synthesis',
        badge: 'DEEP MASTERY',
        badgeClass: 'deep',
        note: 'Sculpting waveforms, envelope filters, and LFOs to create rich, expressive synth textures.',
        keywords: ['wavetable', 'lfo', 'oscillators', 'filters'],
      },
      {
        name: 'Web Audio API Oscillators',
        badge: 'HANDS-ON',
        badgeClass: 'daily',
        note: 'Programming real-time synthetic oscillators in pure browser JavaScript (test it in the Sonic Lab!).',
        keywords: ['webaudio', 'javascript', 'oscillators', 'browser'],
      },
    ],
  },
];

const ALL_TECH_CHIPS = [
  'Python 3.10–3.13',
  'FastMCP',
  'TensorFlow',
  'Keras',
  'Scikit-Learn',
  'FastAPI',
  'Pydantic v2',
  'Next.js 15+',
  'React 19',
  'MongoDB & Mongoose',
  'Node.js REST',
  'Docker',
  'Docker Compose',
  'OCPP 1.6-J',
  'OCPI 2.2',
  'Playwright',
  'Streamlit',
  'Plotly',
  'C#',
  'SQL',
  'FL Studio',
  'Pytest',
  'PowerShell',
  'Git',
];

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => {
      // Check category match
      const catMatch = selectedCategory === 'all' || cat.id === selectedCategory;
      if (!catMatch) return null;

      if (!searchQuery.trim()) {
        return cat;
      }

      const q = searchQuery.toLowerCase().trim();
      const matchingSkills = cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.note.toLowerCase().includes(q) ||
          s.badge.toLowerCase().includes(q) ||
          s.keywords.some((k) => k.includes(q))
      );

      if (matchingSkills.length === 0 && !cat.title.toLowerCase().includes(q)) {
        return null;
      }

      return {
        ...cat,
        skills: matchingSkills.length > 0 ? matchingSkills : cat.skills,
      };
    }).filter(Boolean);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container" style={{ paddingTop: 150, paddingBottom: 110 }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-subtitle">Real Capabilities, Zero Percentages</div>
        <h1 className="section-title">Technical Arsenal &amp; Skill Matrix</h1>
        <p className="section-desc">
          Because measuring engineering competence in arbitrary percentages like &ldquo;94% Python&rdquo; is a myth.
          Here is what I actually ship to production, why it matters, and how it holds up under real load.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '28px 32px', marginBottom: 44 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              type="button"
              className={`guestbook-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Domains ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`guestbook-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span> {cat.title.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: 260, flex: '1 1 240px', maxWidth: 360 }}>
            <input
              type="text"
              placeholder="Search skills, tools, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="guestbook-input"
              style={{ paddingLeft: 34, fontSize: '0.85rem' }}
            />
            <span
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
                fontSize: '0.9rem',
              }}
            >
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center', margin: '30px 0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔎</div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>No matching capabilities found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16 }}>
            Try adjusting your search query &ldquo;{searchQuery}&rdquo; or switch category filters.
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="skills-categories-grid">
          {filteredCategories.map((category) => (
            <div key={category.id} className="glass-card skill-category-card" style={{ height: '100%' }}>
              <div className="cat-header">
                <div className="cat-icon-frame">{category.icon}</div>
                <div>
                  <h3>{category.title}</h3>
                  <p className="text-mono" style={{ fontSize: '0.78rem', color: category.color, fontWeight: 700 }}>
                    {category.subtitle}
                  </p>
                </div>
              </div>

              <div className="skill-items-list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-item-header">
                      <span style={{ fontWeight: 700 }}>{skill.name}</span>
                      <span className={`level-badge ${skill.badgeClass}`}>{skill.badge}</span>
                    </div>
                    <div className="skill-note">{skill.note}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Tech Cloud */}
      <div className="glass-card" style={{ marginTop: 45, padding: '36px 28px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: 12 }}>Verified Production Technologies &amp; Frameworks</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: 640, margin: '0 auto 20px' }}>
          Technologies actively maintained in production microservices, agentic workflows, and telemetry pipelines.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
          {ALL_TECH_CHIPS.map((tech) => (
            <span
              key={tech}
              className="tech-tag"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => {
                setSearchQuery(tech.split(' ')[0]);
              }}
              title={`Click to filter by ${tech}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
