/**
 * ===================================================================
 * PARITOSH MUKHERJEE // AI & ML SYSTEMS ENGINEER PORTFOLIO
 * Minimalist Interactions, Light-Mode Particles, & Witty Terminal
 * ===================================================================
 */

// --- HIGH-QUALITY WITTY TECH JOKES & CLEVER ENGINEERING PUNS ---
const TECH_JOKES = [
  "🧠 My neural network achieved 99.8% test accuracy on epoch 1, which means it either revolutionized computer science or accidentally learned the dataset row ID as a feature.",
  "🔍 Causal inference is the only engineering discipline where you spend three weeks writing do-calculus just to mathematically prove rooster crows do not, in fact, cause the sun to rise.",
  "⚡ EV charging standards (OCPP 1.6-J) prove that 14 engineers in a standards committee can turn plugging a copper wire into an asynchronous distributed consensus crisis.",
  "💳 Real-time fraud detection: where 0.9ms is a triumph, 2.0ms is an SLA breach, and 0.0ms means the database connection pool threw an unhandled null pointer exception.",
  "🤖 FastMCP: Finally giving LLMs deterministic tools so they can make calibrated, reproducible mistakes instead of hallucinating 18th-century French poetry.",
  "🎯 In machine learning, 'Explainable AI' is just an engineer drawing a circle around an arbitrary self-attention weight and nodding thoughtfully at the executive sponsor.",
  "🏥 Overfitting is like passing a board exam in cardiology by memorizing the smudge patterns and coffee stains on the answer key.",
  "🏎️ Sub-1.2ms inference latency: because if your fraud model takes 500ms to respond, the mule account has already bought crypto and boarded an international flight.",
  "☕ There are three hard problems in computer science: cache invalidation, naming variables, and off-by-one errors in your LLM context token window.",
  "🛡️ In-memory graph fraud detection: The only industry where having lots of mutual friends with your neighbors makes you legally suspicious of a synthetic mule syndicate.",
  "💾 The three stages of ML development: 1. 'It's learning!' 2. 'Wait, why is validation loss negative?' 3. 'Who touched the test split?'",
  "📦 We don't talk about the validation set from July 2023. It knows what it did.",
  "📈 A data scientist's definition of an 'outlier' is any empirical data point that threatens the narrative of their Q3 executive presentation deck.",
  "🌲 Random Forest: Because if one decision tree can't make up its mind, maybe 500 confused trees yelling at each other will produce state-of-the-art results.",
  "🔬 An ROC-AUC of 1.000 doesn't mean your model is a genius; it means your preprocessing script accidentally leaked target_label into train_features.csv.",
  "🔌 EV charging stations exist in two states: 'Transmitting Heartbeats over WSS' and 'Vendor blames Vehicle BMS while Vehicle blames Charger Firmware'.",
  "⏱️ Profiling code: spending 6 hours vectorizing a NumPy tensor operation to save 14 microseconds, while the network HTTP call takes 450 milliseconds.",
  "🎯 Unsupervised learning: Letting linear algebra wander unsupervised in a 512-dimensional vector space until it invents clusters that confirm your confirmation bias.",
  "🐳 Docker in production: 'If it works, don't update the base image. If you update the base image, update your LinkedIn status.'",
  "📉 Early Stopping: The algorithmic equivalent of walking out of the casino while you're $4 ahead before the house realizes you can't generalize.",
  "💬 'Our model is 99% confident' — translated to English: 'The softmax layer had a numerical overflow and rounded 0.9999999 to 1.0 before we noticed.'",
  "🧪 A/B testing: Proving with 95% statistical significance that changing a button color had zero impact on revenue, but caused three heated retrospectives in Slack.",
  "🎵 Audio DSP: Fourier transform is just linear algebra's way of listening to a chord and listing out the ingredients like an over-caffeinated pastry chef.",
  "🤖 LLM Prompt: 'You are an infallible, calibrated telemetry triage engineer.' — Agent: Immediately submits a PR deleting the production database with 99.9% confidence.",
  "💻 Git commit history on a Friday deployment: 'add feature' → 'fix bug' → 'actually fix bug' → 'revert fix' → 'it works now DO NOT TOUCH'."
];

function getRandomJoke() {
  return TECH_JOKES[Math.floor(Math.random() * TECH_JOKES.length)];
}

// --- SONIC LAB SYNTHESIZER ENGINE (FOR INTERESTS LAB ONLY) ---
class SynthLabAudio {
  constructor() {
    this.ctx = null;
    this.analyser = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 256;
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSynthNote(freq, type = 'sawtooth', duration = 0.45) {
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(2.5, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);

      if (this.analyser) {
        gain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      } else {
        gain.connect(this.ctx.destination);
      }

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {}
  }
}

const synthAudio = new SynthLabAudio();

// --- SUBTLE LIGHT-MODE PARTICLE CANVAS ---
function initParticleCanvas() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 20 : 38;
  const connectionDist = 120;

  const mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.5 + 1;
      this.color = Math.random() > 0.5 ? '#FF0000' : '#950101';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.2;
          this.y -= (dy / dist) * force * 1.2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = (j % 2 === 0) ? `rgba(255, 120, 172, ${alpha})` : `rgba(168, 213, 227, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}


// --- MINIMALIST CUSTOM CURSOR ---
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderRing);
  }
  renderRing();

  const interactiveElements = 'a, button, input, textarea, select, .term-chip, .synth-key, .sub-preview-item, .glass-card';
  document.querySelectorAll(interactiveElements).forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

// --- HERO ROLE ROTATOR ---
function initTypingRotator() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    'AI / ML Systems Engineer',
    'Low-Latency Deep Learning Architect',
    'Autonomous Agentic Diagnostics Builder',
    'CleanTech EV Telemetry Specialist',
    'Converting Caffeine to Sub-Millisecond SLAs'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      charIdx--;
      target.textContent = currentRole.substring(0, charIdx);
    } else {
      charIdx++;
      target.textContent = currentRole.substring(0, charIdx);
    }

    let speed = isDeleting ? 25 : 60;

    if (!isDeleting && charIdx === currentRole.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }
  type();
}

// --- SCROLL REVEAL OBSERVER ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// --- INTERACTIVE TELEMETRY & WITTY TERMINAL ---
function initTerminal() {
  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  if (!body || !input) return;

  function appendLine(html) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  const commands = {
    help: () => `
<span class="term-accent">Available Diagnostic &amp; Fun Commands:</span>
  • <span class="term-green">joke</span>          - Prints a witty, high-IQ AI &amp; systems engineering joke
  • <span class="term-green">bio</span>           - Displays Paritosh's engineering philosophy
  • <span class="term-green">skills</span>        - Prints the technical arsenal
  • <span class="term-green">projects</span>      - Lists flagship production systems
  • <span class="term-green">agentic_rca</span>   - Executes simulated FastMCP EV telemetry inference
  • <span class="term-green">fraud_check</span>   - Executes sub-1.2ms UPI CRNN Attention score calculation
  • <span class="term-green">socials</span>       - Verified social channels
  • <span class="term-green">clear</span>         - Clears the terminal screen
`,
    joke: () => `<span class="term-yellow">${getRandomJoke()}</span>`,
    pun: () => `<span class="term-yellow">${getRandomJoke()}</span>`,
    bio: () => `
<span class="term-accent">PARITOSH MUKHERJEE // SYSTEMS DOSSIER</span>
• Focus: Production-grade ML systems, causal inference, and autonomous telemetry diagnostics.
• Unofficial Motto: "If your model takes 500ms to respond, the fraudulent transaction has already bought coffee in Dubai."
• Email: <span class="term-green">paritoshmukherjee8@gmail.com</span>
• GitHub: <a href="https://github.com/Paritosh8-AI" target="_blank" class="term-accent">github.com/Paritosh8-AI</a>
`,
    skills: () => `
<span class="term-accent">TECHNICAL ARSENAL:</span>
  [Daily Driver] Python, TensorFlow, FastAPI, Docker, Pytest
  [Deep Mastery] FastMCP Tool Development, Causal DAGs, Sequence Modeling (CRNN)
  [Domain Specialization] OCPP 1.6-J, OCPI 2.2, In-Memory Graphs, FL Studio Audio DSP
`,
    projects: () => `
<span class="term-accent">FLAGSHIP SYSTEMS:</span>
  1. <span class="term-green">AgenticEV RCA Studio</span>: Causal telemetry triage for EV charging (FastMCP + OCPP)
  2. <span class="term-green">UPI Sentinel 2.0</span>: Real-time fraud defense (&lt;1.2ms SLA, CRNN + Attention)
  3. <span class="term-green">Breast Cancer Sentinel 2.0</span>: Clinical decision support (99.67% ROC-AUC, Platt Scaling)
`,
    agentic_rca: () => {
      setTimeout(() => {
        appendLine(`<span class="term-purple">[FastMCP Agent]</span> Ingesting multi-party OCPP 1.6-J event stream from EVSE #8042...`);
      }, 150);
      setTimeout(() => {
        appendLine(`<span class="term-purple">[FastMCP Agent]</span> Detected: Contactor drop during StopTransaction sequence.`);
      }, 450);
      setTimeout(() => {
        appendLine(`<span class="term-purple">[Causal DAG]</span> Traversed nodes: [Grid Voltage OK] -> [EVSE Pilot PWM Valid] -> [Vehicle BMS Interlock Trip].`);
      }, 800);
      setTimeout(() => {
        appendLine(`<span class="term-green">✓ ROOT CAUSE ATTRIBUTED:</span> Vehicle-side contactor failure (Confidence: 97.2%). Deterministic report generated.`);
      }, 1150);
      return `<span class="term-accent">Initiating AgenticEV Causal Inference Engine...</span>`;
    },
    fraud_check: () => {
      setTimeout(() => {
        appendLine(`<span class="term-accent">[UPI Sentinel]</span> Ingesting incoming transaction: ₹45,000 | New device | Distance jump: 820km`);
      }, 150);
      setTimeout(() => {
        appendLine(`<span class="term-yellow">[In-Memory Graph]</span> Mule ring traversal: 2 hops to flagged cluster.`);
      }, 400);
      setTimeout(() => {
        appendLine(`<span class="term-yellow">[CRNN + Attention]</span> Sequence window evaluated in <span class="term-green">0.91 ms</span>.`);
      }, 700);
      setTimeout(() => {
        appendLine(`<span class="term-purple">⚠️ VERDICT:</span> Risk Score 0.984 | Step-Up 2FA Mandated (Total Pipeline Latency: 1.15 ms).`);
      }, 1000);
      return `<span class="term-accent">Executing compiled @tf.function graph tracing...</span>`;
    },
    socials: () => `
<span class="term-accent">VERIFIED CHANNELS:</span>
  • GitHub:    <a href="https://github.com/Paritosh8-AI" target="_blank" class="term-green">github.com/Paritosh8-AI</a>
  • Instagram: <a href="https://www.instagram.com/mewzicallyyours/" target="_blank" class="term-pink">instagram.com/mewzicallyyours</a>
  • LinkedIn:  <a href="https://linkedin.com" target="_blank" class="term-green">Connect on LinkedIn</a>
  • Email:     <a href="mailto:paritoshmukherjee8@gmail.com" class="term-green">paritoshmukherjee8@gmail.com</a>
`,
    clear: () => {
      body.innerHTML = '';
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      input.value = '';
      if (!val) return;

      appendLine(`<span class="prompt-prefix">paritosh@engine:~$</span> ${val}`);

      if (commands[val]) {
        const res = commands[val]();
        if (res) appendLine(res);
      } else {
        appendLine(`<span class="term-yellow">Command '${val}' not found. Type 'help' for available commands or 'joke' for a witty quip!</span>`);
      }
    }
  });

  document.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd && commands[cmd]) {
        appendLine(`<span class="prompt-prefix">paritosh@engine:~$</span> ${cmd}`);
        const res = commands[cmd]();
        if (res) appendLine(res);
      }
    });
  });
}

// --- INTERACTIVE UPI FRAUD SIMULATOR ---
function initUpiSimulator() {
  const amtInput = document.getElementById('sim-upi-amount');
  const velInput = document.getElementById('sim-upi-vel');
  const distInput = document.getElementById('sim-upi-dist');
  const muleSelect = document.getElementById('sim-upi-mule');
  const runBtn = document.getElementById('sim-upi-run');
  const outputBox = document.getElementById('sim-upi-output');

  if (!amtInput || !outputBox) return;

  function updateDisplayValues() {
    const amtVal = document.getElementById('val-upi-amount');
    const velVal = document.getElementById('val-upi-vel');
    const distVal = document.getElementById('val-upi-dist');
    if (amtVal) amtVal.textContent = `₹${Number(amtInput.value).toLocaleString()}`;
    if (velVal) velVal.textContent = `${velInput.value} txn/hr`;
    if (distVal) distVal.textContent = `${distInput.value} km`;
  }

  [amtInput, velInput, distInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateDisplayValues);
  });
  updateDisplayValues();

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      outputBox.innerHTML = '<span class="text-mono" style="color:var(--accent-primary-deep); font-weight:700;">Evaluating sequence with compiled @tf.function...</span>';

      setTimeout(() => {
        const amt = parseFloat(amtInput.value);
        const vel = parseFloat(velInput.value);
        const dist = parseFloat(distInput.value);
        const mule = muleSelect.value;

        let riskScore = 0.05;
        if (amt > 25000) riskScore += 0.28;
        if (vel > 10) riskScore += 0.32;
        if (dist > 500) riskScore += 0.25;
        if (mule === 'high') riskScore += 0.35;
        else if (mule === 'medium') riskScore += 0.15;

        riskScore = Math.min(0.994, Math.max(0.012, riskScore));
        const latency = (0.78 + Math.random() * 0.35).toFixed(2);

        let verdict = '';
        let badgeColor = '#059669';
        if (riskScore > 0.65) {
          verdict = 'FRAUD SUSPECTED // STEP-UP AUTH REQUIRED';
          badgeColor = '#dc2626';
        } else if (riskScore > 0.35) {
          verdict = 'ELEVATED VELOCITY // OTP CHALLENGE';
          badgeColor = '#d97706';
        } else {
          verdict = 'CLEAN TRANSACTION // INSTANT CLEARANCE';
        }

        outputBox.innerHTML = `
<div style="margin-bottom:6px;"><strong style="color: ${badgeColor};">▶ VERDICT: ${verdict}</strong></div>
<div>• Anomaly Risk Score: <strong>${(riskScore * 100).toFixed(1)}%</strong></div>
<div>• Mule Graph Analysis: <strong>${mule.toUpperCase()}</strong></div>
<div>• Pipeline Inference Latency: <strong style="color: #059669;">${latency} ms</strong> (Well within &lt;1.2ms SLA budget!)</div>
`;
      }, 300);
    });
  }
}

// --- INTERACTIVE SONIC LAB SYNTHESIZER ---
function initSonicLab() {
  const keys = document.querySelectorAll('.synth-key');
  const canvas = document.getElementById('synth-oscilloscope');
  const typeSelect = document.getElementById('synth-waveform');
  if (!keys.length || !canvas) return;

  const notes = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88
  };

  keys.forEach(key => {
    const noteName = key.getAttribute('data-note');
    key.addEventListener('click', () => {
      synthAudio.ensureContext();
      const wave = typeSelect ? typeSelect.value : 'sawtooth';
      synthAudio.playSynthNote(notes[noteName] || 440, wave, 0.45);
      key.classList.add('playing');
      setTimeout(() => key.classList.remove('playing'), 220);
    });
  });

  const keyMap = { 'a': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4', 'g': 'G4', 'h': 'A4', 'j': 'B4' };
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap[key] && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      const note = keyMap[key];
      const targetBtn = document.querySelector(`.synth-key[data-note="${note}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
  });

  const ctx = canvas.getContext('2d');
  function drawOscilloscope() {
    requestAnimationFrame(drawOscilloscope);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!synthAudio.analyser) {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      return;
    }

    const bufferLength = synthAudio.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    synthAudio.analyser.getByteTimeDomainData(dataArray);

    ctx.lineWidth = 2.2;
    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }
  drawOscilloscope();
}

// --- SUB-PREVIEW SWAPPER & LIGHTBOX ---
function initMediaPreviews() {
  document.querySelectorAll('.sub-preview-item').forEach(item => {
    item.addEventListener('click', () => {
      const parentCard = item.closest('.project-media-side');
      if (!parentCard) return;

      const mainImg = parentCard.querySelector('.main-preview-frame img');
      const clickedSrc = item.querySelector('img').getAttribute('src');

      if (mainImg && clickedSrc) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.setAttribute('src', clickedSrc);
          mainImg.style.opacity = '1';
        }, 150);
      }

      parentCard.querySelectorAll('.sub-preview-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.main-preview-frame').forEach(frame => {
      frame.addEventListener('click', () => {
        const img = frame.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.classList.add('active');
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }
}

// --- TOAST NOTIFICATIONS & COPY UTILITIES ---
function showToast(msg) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initCopyButtons() {
  document.querySelectorAll('.copy-pill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy') || 'paritoshmukherjee8@gmail.com';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`✓ Copied "${textToCopy}" to clipboard!`);
      });
    });
  });
}

// --- SMOOTH PAGE CURTAIN TRANSITIONS ---
function initPageTransitions() {
  const curtain = document.querySelector('.page-curtain');
  if (!curtain) return;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#') && href.endsWith('.html')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        curtain.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    }
  });
}

// --- MOBILE DRAWER NAVIGATION ---
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

// --- HERO QUOTE CYCLER (WITTY ENGINEERING JOKES) ---
function initHeroQuoteCycler() {
  const quoteText = document.getElementById('hero-quote-text');
  const shuffleBtn = document.getElementById('quote-shuffle-btn');
  const quoteCard = document.getElementById('hero-witty-card');
  if (!quoteText) return;

  let currentIndex = 0;

  function cycleJoke() {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * TECH_JOKES.length);
    } while (nextIndex === currentIndex && TECH_JOKES.length > 1);

    currentIndex = nextIndex;
    quoteText.style.opacity = '0';
    setTimeout(() => {
      // Extract the joke text cleanly without emoji prefix for hero quote elegance
      const fullJoke = TECH_JOKES[currentIndex];
      const match = fullJoke.match(/^(\p{Extended_Pictographic}|\S+)\s+(.+)$/u);
      const textOnly = match ? match[2] : fullJoke;
      quoteText.textContent = `“${textOnly}”`;
      quoteText.style.opacity = '1';
    }, 180);
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      cycleJoke();
    });
  }

  if (quoteCard) {
    quoteCard.addEventListener('click', () => {
      cycleJoke();
    });
  }
}

// --- LENIS INERTIA-DAMPED ULTRA-SMOOTH SCROLL ---
function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration matching reference site
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
    infinite: false,
  });

  window.lenisInstance = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smooth anchor navigation for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -50, duration: 1.35 });
        }
      }
    });
  });
}

// --- INITIALIZE ALL ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initParticleCanvas();
  initCustomCursor();
  initTypingRotator();
  initScrollReveal();
  initTerminal();
  initHeroQuoteCycler();
  initUpiSimulator();
  initSonicLab();
  initMediaPreviews();
  initCopyButtons();
  initPageTransitions();
  initMobileNav();
});

