import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Bagel from '../components/Bagel';
import BagelMini from '../components/Bagel-mini';
import WhosComing from '../components/WhosComing';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    // Trigger entrance animations after mount
    requestAnimationFrame(() => setLoaded(true));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`page-wrapper ${loaded ? 'page-loaded' : ''}`}>
      <header className="header">
        <nav className="header-nav">
          <a href="https://www.tiktok.com/@simonthewang" target="_blank" rel="noreferrer" className="header-link">
            TikTok
          </a>
          <a href="https://www.instagram.com/simonthewang/" target="_blank" rel="noreferrer" className="header-link">
            Instagram
          </a>
          <span className="header-dot">·</span>
          <Link to="/chapter-1" className="header-link">
            Last Time
          </Link>
        </nav>
      </header>

      {isMobile ? <BagelMini speed={0.25} scrollWithPage={false} /> : <Bagel speed={0.25} scrollWithPage={false} />}

      <div className="hero">
        <div className="hero-content">
          <div className="hero-title">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <TypeAnimation
                sequence={['APRIL 4, 2026']}
                wrapper="div"
                cursor={true}
                repeat={0}
                style={{
                  fontFamily: 'monospace',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                }}
              />
            </h1>
          </div>
          <div className="hero-cta">
            <a
              href="https://luma.com/xnofhh2r"
              target="_blank"
              rel="noreferrer"
              className="cta-button"
            >
              Register Here 🥯
            </a>
          </div>
        </div>
      </div>

      <div className="relative" style={{ zIndex: 10, minHeight: '100vh' }}>
        <WhosComing />
      </div>

      <div style={{ height: '20vh' }} />
    </div>
  );
}

export default App;
