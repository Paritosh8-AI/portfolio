'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const NOTES = [
  { note: 'C4', key: 'A', freq: 261.63 },
  { note: 'D4', key: 'S', freq: 293.66 },
  { note: 'E4', key: 'D', freq: 329.63 },
  { note: 'F4', key: 'F', freq: 349.23 },
  { note: 'G4', key: 'G', freq: 392.00 },
  { note: 'A4', key: 'H', freq: 440.00 },
  { note: 'B4', key: 'J', freq: 493.88 },
];

export default function SonicLabSynth() {
  const [waveform, setWaveform] = useState('sawtooth');
  const [activeNote, setActiveNote] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [currentFreq, setCurrentFreq] = useState(null);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Initialize Web Audio safely on first interaction
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;

        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        setIsAudioReady(true);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  // Play a single synthesized note
  const playNote = useCallback((freq, noteName) => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = waveform;
      osc.frequency.setValueAtTime(freq, now);

      // 24dB/oct resonant filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(2.8, now);

      // Exponential decay envelope
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);

      if (analyserRef.current) {
        gain.connect(analyserRef.current);
        analyserRef.current.connect(ctx.destination);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start(now);
      osc.stop(now + 0.5);

      setActiveNote(noteName);
      setCurrentFreq(freq);

      setTimeout(() => {
        setActiveNote((prev) => (prev === noteName ? null : prev));
      }, 350);
    } catch (e) {
      console.warn('Web Audio synthesis error:', e);
    }
  }, [initAudio, waveform]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      const target = NOTES.find((n) => n.key === key);
      if (target) {
        e.preventDefault();
        playNote(target.freq, target.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  // Oscilloscope canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      animFrameIdRef.current = requestAnimationFrame(render);

      const width = canvas.width;
      const height = canvas.height;

      // Dark oscilloscope display background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 120, 172, 0.08)';
      ctx.beginPath();
      for (let x = 0; x < width; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const analyser = analyserRef.current;
      if (!analyser) {
        // Draw resting idle pulse line
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 120, 172, 0.4)';
        ctx.beginPath();
        const midY = height / 2;
        ctx.moveTo(0, midY);
        ctx.lineTo(width, midY);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FF78AC';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FF78AC';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <div className="sonic-lab-container" style={{ marginTop: 20 }}>
      {/* Waveform Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <span className="text-mono" style={{ fontSize: '0.84rem', color: 'var(--accent-primary-deep)', fontWeight: 700 }}>
            🎹 Interactive Sonic Pad (Click Keys or Play &lsquo;A&rsquo; through &lsquo;J&rsquo; on your keyboard)
          </span>
          {currentFreq && (
            <span className="text-mono" style={{ marginLeft: 12, fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              [{currentFreq.toFixed(1)} Hz]
            </span>
          )}
        </div>

        <div className="synth-knob-group" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>Waveform:</label>
          <select
            value={waveform}
            onChange={(e) => setWaveform(e.target.value)}
            className="form-control"
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              width: 'auto',
              background: '#ffffff',
              borderRadius: 8,
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
            }}
          >
            <option value="sawtooth">Sawtooth (Cyber Lead)</option>
            <option value="square">Square (Retro Pulse)</option>
            <option value="triangle">Triangle (Deep Melodic)</option>
            <option value="sine">Sine (Pure Harmonic)</option>
          </select>
        </div>
      </div>

      {/* Real-time Oscilloscope Canvas */}
      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-subtle)', marginBottom: 14 }}>
        <canvas ref={canvasRef} width={640} height={95} style={{ display: 'block', width: '100%', height: '95px' }} />
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 10,
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255, 120, 172, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {isAudioReady ? 'DSP 24dB/OCT ACTIVE' : 'CLICK ANY KEY TO ENGAGE'}
        </div>
      </div>

      {/* 7 Playable Keyboard Keys */}
      <div className="synth-keys-grid">
        {NOTES.map((n) => (
          <div
            key={n.note}
            className={`synth-key ${activeNote === n.note ? 'active' : ''}`}
            onClick={() => playNote(n.freq, n.note)}
            title={`Play ${n.note} (${n.freq}Hz) - Press '${n.key}' on keyboard`}
            style={{
              userSelect: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <span>
              {n.note} ({n.key})
            </span>
          </div>
        ))}
      </div>

      <div className="synth-controls-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
        <span className="text-mono" style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Audio engine powered by Web Audio API Oscillators &amp; dynamic Biquad lowpass filtering.
        </span>
        <span className="status-pill" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
          <span className="pulse-dot"></span>
          LIVE DSP READY
        </span>
      </div>
    </div>
  );
}
