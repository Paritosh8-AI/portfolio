'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// Full 13-key Chromatic Octave (C4 through C5)
const WHITE_KEYS = [
  { note: 'C4', key: 'A', freq: 261.63 },
  { note: 'D4', key: 'S', freq: 293.66 },
  { note: 'E4', key: 'D', freq: 329.63 },
  { note: 'F4', key: 'F', freq: 349.23 },
  { note: 'G4', key: 'G', freq: 392.00 },
  { note: 'A4', key: 'H', freq: 440.00 },
  { note: 'B4', key: 'J', freq: 493.88 },
  { note: 'C5', key: 'K', freq: 523.25 },
];

const BLACK_KEYS = [
  { note: 'C#4', key: 'W', freq: 277.18, left: '8.75%' },
  { note: 'D#4', key: 'E', freq: 311.13, left: '21.25%' },
  { note: 'F#4', key: 'T', freq: 369.99, left: '46.25%' },
  { note: 'G#4', key: 'Y', freq: 415.30, left: '58.75%' },
  { note: 'A#4', key: 'U', freq: 466.16, left: '71.25%' },
];

const ALL_KEYS = [...WHITE_KEYS, ...BLACK_KEYS];

const PRESETS = [
  { id: 'rhodes', label: '🎹 Rhodes E-Piano', desc: 'Warm bell-like electric piano harmonics' },
  { id: 'synth', label: '⚡ Analog Synth Lead', desc: 'Resonant 24dB retro sawtooth lead' },
  { id: 'chime', label: '🌙 Harmonic Chime', desc: 'Pristine pure sine wave with bell decay' },
  { id: 'pad', label: '🌊 Ambient Warm Pad', desc: 'Deep filtered square wave with soft warmth' },
];

export default function SonicLabSynth({ onFrequencyChange }) {
  const [preset, setPreset] = useState('rhodes');
  const [activeNote, setActiveNote] = useState(null);
  const [currentFreq, setCurrentFreq] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [volume, setVolume] = useState(0.28);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const activeKeysPressedRef = useRef(new Set());

  // Initialize Web Audio API context safely upon user interaction
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        const ctx = new AudioCtxClass();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.85;
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize and play note with anti-pop envelope
  const playNote = useCallback((freq, noteName) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    setIsAudioReady(true);
    setActiveNote(noteName);
    setCurrentFreq(freq);
    if (onFrequencyChange) {
      onFrequencyChange(freq, noteName);
    }

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Configure preset sound design
      if (preset === 'rhodes') {
        osc.type = 'triangle';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.Q.setValueAtTime(1.8, now);

        // Smooth anti-pop envelope: 15ms linear attack, musical exponential decay
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
        osc.stop(now + 0.8);
      } else if (preset === 'synth') {
        osc.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, now);
        filter.Q.setValueAtTime(3.5, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(volume * 0.85, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        osc.stop(now + 0.65);
      } else if (preset === 'chime') {
        osc.type = 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3600, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(volume * 1.1, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
        osc.stop(now + 1.0);
      } else {
        // Ambient pad
        osc.type = 'square';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, now);
        filter.Q.setValueAtTime(2.2, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(volume * 0.75, now + 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
        osc.stop(now + 0.75);
      }

      osc.frequency.setValueAtTime(freq, now);
      osc.connect(filter);
      filter.connect(gain);

      if (analyserRef.current) {
        gain.connect(analyserRef.current);
        analyserRef.current.connect(ctx.destination);
      } else {
        gain.connect(ctx.destination);
      }

      osc.start(now);

      setTimeout(() => {
        setActiveNote((prev) => (prev === noteName ? null : prev));
      }, 300);
    } catch (e) {
      console.warn('WebAudio playback notice:', e);
    }
  }, [getAudioContext, onFrequencyChange, preset, volume]);

  // Global physical keyboard listener (A, W, S, E, D, F, T, G, Y, H, U, J, K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      const key = e.key.toUpperCase();

      if (!activeKeysPressedRef.current.has(key)) {
        const match = ALL_KEYS.find((k) => k.key === key);
        if (match) {
          e.preventDefault();
          activeKeysPressedRef.current.add(key);
          playNote(match.freq, match.note);
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      activeKeysPressedRef.current.delete(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playNote]);

  // Oscilloscope canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      animFrameIdRef.current = requestAnimationFrame(render);

      const width = canvas.width;
      const height = canvas.height;

      // Dark canvas display
      ctx.fillStyle = '#120917';
      ctx.fillRect(0, 0, width, height);

      // Delicate berry grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(128, 66, 110, 0.28)';
      ctx.beginPath();
      for (let x = 0; x < width; x += 32) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 22) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      const analyser = analyserRef.current;
      const bufferLength = analyser ? analyser.frequencyBinCount : 0;
      const dataArray = bufferLength ? new Uint8Array(bufferLength) : null;

      let isSignalActive = false;
      if (analyser && dataArray) {
        analyser.getByteTimeDomainData(dataArray);
        for (let i = 0; i < bufferLength; i += 8) {
          if (Math.abs(dataArray[i] - 128) > 3) {
            isSignalActive = true;
            break;
          }
        }
      }

      if (!isSignalActive) {
        // Draw resting gentle ambient wave line
        phase += 0.03;
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = 'rgba(242, 166, 123, 0.45)';
        ctx.beginPath();
        const midY = height / 2;
        for (let x = 0; x < width; x += 4) {
          const y = midY + Math.sin(x * 0.02 + phase) * 3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        return;
      }

      // Draw active synthesized laser waveform
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = '#FFD38B';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#FFD38B';
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
    <div className="piano-studio-component">
      {/* Oscilloscope Rack Screen */}
      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border-medium)', marginBottom: 18 }}>
        <canvas ref={canvasRef} width={640} height={92} className="oscilloscope-canvas" style={{ margin: 0 }} />

        {/* Oscilloscope Header Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="status-pulse-dot" style={{ width: 6, height: 6 }} />
            <span className="text-mono" style={{ fontSize: '0.72rem', color: '#FFD38B', fontWeight: 700 }}>
              {isAudioReady ? (currentFreq ? `${currentFreq.toFixed(1)} Hz • ${activeNote}` : 'DSP ACTIVE (IDLE)') : 'READY TO PLAY'}
            </span>
          </div>
          <span className="text-mono" style={{ fontSize: '0.68rem', color: '#D1BED6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {PRESETS.find((p) => p.id === preset)?.label}
          </span>
        </div>
      </div>

      {/* Preset & Volume Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
          marginBottom: 16,
          padding: '10px 14px',
          background: 'rgba(82, 45, 96, 0.25)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Instrument:
          </label>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            style={{
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              background: '#1f0e27',
              color: '#FDF6EC',
              borderRadius: 6,
              border: '1px solid var(--border-medium)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="text-mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            Vol:
          </span>
          <input
            type="range"
            min="0.05"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: 80, accentColor: '#F2A67B', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* 🎹 Realistic 13-Key Concert Piano Keyboard */}
      <div className="piano-keyboard-case">
        <div className="piano-felt-strip" />

        <div className="piano-keys-surface">
          {/* 8 Natural White Ivory Keys */}
          {WHITE_KEYS.map((key) => {
            const isPressed = activeNote === key.note;
            return (
              <div
                key={key.note}
                className={`piano-white-key ${isPressed ? 'active' : ''}`}
                onClick={() => playNote(key.freq, key.note)}
                title={`Play ${key.note} (${key.freq} Hz) • Press key '${key.key}'`}
              >
                <span className="note-label">{key.note}</span>
                <span className="shortcut-badge">{key.key}</span>
              </div>
            );
          })}

          {/* 5 Accidental Black Ebony Keys */}
          {BLACK_KEYS.map((key) => {
            const isPressed = activeNote === key.note;
            return (
              <div
                key={key.note}
                className={`piano-black-key ${isPressed ? 'active' : ''}`}
                style={{ left: key.left }}
                onClick={() => playNote(key.freq, key.note)}
                title={`Play ${key.note} (${key.freq} Hz) • Press key '${key.key}'`}
              >
                <span className="note-label">{key.note}</span>
                <span className="shortcut-badge">{key.key}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Play Helper Tip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 14,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <span className="text-mono" style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          💡 <strong style={{ color: '#F2A67B' }}>Pro-Tip:</strong> Click keys or use keys{' '}
          <code style={{ color: '#FFD38B' }}>A W S E D F T G Y H U J K</code> on your keyboard.
        </span>

        <span className="status-pill" style={{ padding: '3px 12px', fontSize: '0.74rem' }}>
          <span className="pulse-dot" />
          <span>48kHz WebAudio Synthesizer</span>
        </span>
      </div>
    </div>
  );
}
