import HeroSection from '@/components/HeroSection';
import TerminalConsole from '@/components/TerminalConsole';
import FlagshipSystems from '@/components/FlagshipSystems';
import InteractiveGuestbook from '@/components/InteractiveGuestbook';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TerminalConsole />
      <FlagshipSystems />
      <InteractiveGuestbook />

      {/* Quick Skills & Connect Banner */}
      <section style={{ padding: '30px 0 80px' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
            <span className="section-subtitle" style={{ marginBottom: 12 }}>
              Production Engineering &amp; Clean Architecture
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: 10 }}>
              Ready to Explore More Systems or Leave an Endorsement?
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 640, margin: '0 auto 24px', fontSize: '0.94rem' }}>
              Check out the full technical arsenal, interactive payment fraud simulators, or get in touch for mission-critical ML systems roles.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/projects" className="btn-primary">
                View Architectural Deep Dives
              </Link>
              <Link href="/skills" className="btn-secondary">
                Inspect Skill Matrix
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
