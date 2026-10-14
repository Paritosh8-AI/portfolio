import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Paritosh Mukherjee | AI & ML Systems Engineer | MERN Full-Stack',
  description:
    'Portfolio of Paritosh Mukherjee: AI & ML Systems Engineer specializing in sub-1.2ms sequence modeling, FastMCP autonomous causal telemetry diagnostics, and full-stack MERN production architectures.',
  keywords: [
    'Paritosh Mukherjee',
    'AI Systems Engineer',
    'Machine Learning Engineer',
    'MERN Stack',
    'FastMCP',
    'Low Latency Inference',
    'Causal Inference',
    'TensorFlow',
    'Next.js',
    'MongoDB',
  ],
  authors: [{ name: 'Paritosh Mukherjee' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Ambient Warm Gradient Orbs & Dot Grid Overlay */}
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-orb orb-1" />
          <div className="ambient-orb orb-2" />
          <div className="ambient-orb orb-3" />
        </div>
        <div className="cyber-grid-overlay" aria-hidden="true" />

        <div className="site-wrapper">
          <Navbar />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
