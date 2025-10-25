import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Bagel from '../components/Bagel';
import BagelMini from '../components/Bagel-mini';
import WhosComing from '../components/WhosComing';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window dimensions
    setWindowWidth(window.innerWidth);

    const script = document.createElement('script');
    script.src = "https://gist.github.com/gcr/1075131.js";
    script.async = true;
    document.body.appendChild(script);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <>
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 shadow-sm" 
        style={{ 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #e0e0e0', 
          zIndex: 9999, 
          padding: isMobile ? '0.75rem 1rem' : '1rem 2rem' 
        }}
      >
        <div 
          className="flex items-center justify-center" 
          style={{ 
            gap: isMobile ? '0.5rem' : '1rem', 
            fontFamily: 'system-ui, -apple-system, sans-serif', 
            fontSize: isMobile ? '0.75rem' : '0.875rem', 
            letterSpacing: '0.01em',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}
        >
          <a 
            href="https://www.tiktok.com/@simonthewang" 
            target="_blank" 
            rel="noreferrer" 
            className="transition-all"
            style={{ 
              color: '#1a1a1a', 
              fontWeight: 700, 
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
              padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1a1a1a';
            }}
          >
            Tiktok
          </a>
          <a 
            href="https://www.instagram.com/simonthewang/"
            target="_blank" 
            rel="noreferrer" 
            className="transition-all"
            style={{ 
              color: '#1a1a1a', 
              fontWeight: 700, 
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
              padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1a1a1a';
            }}
          >
            IG
          </a>
          <span style={{ color: '#d1d5db', margin: isMobile ? '0 0.2rem' : '0 0.5rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>•</span>
          <span style={{ 
            color: '#6b7280', 
            fontWeight: 600, 
            fontStyle: 'italic', 
            padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 1rem',
            whiteSpace: 'nowrap'
          }}>
            <a href="https://aerial-chemistry-647.notion.site/BAGELHACKS-II-29084364faef80389836d8cc11d97dc6?pvs=74" target="_blank" rel="noreferrer">
            Build in Public
            </a>
          </span>
          <span style={{ color: '#d1d5db', margin: isMobile ? '0 0.2rem' : '0 0.5rem', fontSize: isMobile ? '0.875rem' : '1rem' }}>•</span>
          <Link 
            to="/chapter-1"
            className="transition-all"
            style={{ 
              color: '#1a1a1a', 
              fontWeight: 700, 
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
              padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 1rem',
              borderRadius: '6px',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1a1a1a';
            }}
          >
            last time
          </Link>
        </div>
      </header>

      {isMobile ? <BagelMini speed={0.25} scrollWithPage={false} /> : <Bagel speed={0.25} scrollWithPage={false} />}

      <div className="flex items-center justify-center h-[85vh] px-4" style={{ zIndex: 1 }}>
        <div className="text-center p-8 rounded-lg max-w-4xl w-full">
          <div className="text-white mb-16">
            {/* <Countdown /> */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <TypeAnimation
                sequence={[
                  'COMING SOON',
                  2000,
                  '',
                  500,
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                style={{ 
                  fontFamily: 'monospace',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
                  whiteSpace: 'nowrap',
                  overflow: 'visible'
                }}
              />
            </h1>
          </div>
          <div className="mt-16">
            <a 
              href="https://luma.com/xnofhh2r" 
              target="_blank" 
              rel="noreferrer"
              style={{
                color: '#ffffff',
                fontSize: isMobile ? '1rem' : '1.25rem',
                fontWeight: 700,
                textDecoration: 'underline',
                textUnderlineOffset: isMobile ? '4px' : '6px',
                textDecorationThickness: '2px',
                padding: isMobile ? '0.65rem 1.5rem' : '0.75rem 2rem',
                border: '2px solid #ffffff',
                borderRadius: '8px',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                touchAction: 'manipulation'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Register Here 🥯
            </a>
          </div>
        </div>
      </div>

      {/* Who's Coming Section */}
      <div className="relative" style={{ zIndex: 10, minHeight: '100vh' }}>
        <WhosComing />
      </div>

      {/* Spacer for better layout */}
      <div style={{ height: '20vh' }}></div>
    </>
  );
}

export default App;
