'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Interests', href: '/interests' },
    { name: 'Experience', href: '/experience' },
    { name: 'Guestbook', href: '/guestbook' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="site-header">
        <nav className="nav-pill-container" aria-label="Main Navigation">
          <Link href="/" className="nav-brand" style={{ textDecoration: 'none' }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#F2A67B',
                display: 'inline-block',
                boxShadow: '0 0 12px #F2A67B',
              }}
            />
            <span>Paritosh.ai</span>
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className={`nav-link-item ${isActive ? 'active' : ''}`}>
                  <Link href={link.href}>{link.name}</Link>
                </div>
              );
            })}
          </div>

          <div className="nav-actions">
            <a
              href="https://github.com/Paritosh8-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="github-pill-btn"
              title="GitHub Profile"
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Paritosh8-AI</span>
            </a>

            <button
              type="button"
              className="mobile-nav-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle navigation drawer"
            >
              {isMobileOpen ? (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <div key={link.href} className="nav-link-item">
            <Link href={link.href} onClick={() => setIsMobileOpen(false)}>
              {link.name}
            </Link>
          </div>
        ))}
        <div style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
          <a
            href="https://github.com/Paritosh8-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setIsMobileOpen(false)}
          >
            GitHub (@Paritosh8-AI)
          </a>
        </div>
      </div>
    </>
  );
}
