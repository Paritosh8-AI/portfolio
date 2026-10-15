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
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '56px 40px', textAlign: 'center' }}>
            <span className="section-subtitle" style={{ marginBottom: 16 }}>
              Production Engineering &amp; Clean Architecture
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 800, marginBottom: 14 }}>
              Ready to Explore More Systems or Leave an Endorsement?
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: 680, margin: '0 auto 32px', fontSize: '1.02rem', lineHeight: 1.75 }}>
              Check out the full technical arsenal, interactive payment fraud simulators, or get in touch for mission-critical ML systems roles.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
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
