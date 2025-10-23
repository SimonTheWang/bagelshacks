import { useEffect, useState } from 'react';
import '../App.css';
import Bagel from '../components/Bagel';
import BagelMini from '../components/Bagel-mini';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set initial window dimensions
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);

    const script = document.createElement('script');
    script.src = "https://gist.github.com/gcr/1075131.js";
    script.async = true;
    document.body.appendChild(script);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;
  
  const returnPoint = isMobile ? 
    0.80 * windowHeight : 
    0.90 * windowHeight;

  const moveSpeed = isMobile ? 0.3 : 0.9;

  const scale = Math.max(0.5, 1 - scrollY/100000);

  const bagelStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.3s ease-out',
    transform: 
    `translateX(${scrollY > returnPoint ? returnPoint + (scrollY - returnPoint) * -moveSpeed : scrollY * moveSpeed}px) scale(${scale})`,
  };

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
          <a 
            href="/chapter-1" 
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
            last time
          </a>
        </div>
      </header>

      <div 
        style={bagelStyle}
      >
        {isMobile ? <BagelMini speed={0.25} /> : <Bagel speed={0.25} />}
      </div>
      
      <div className="flex items-center justify-center h-[85vh] p-5" style={{ zIndex: 1 }}>
        <div className="text-center bg-black/50">
          <div className="text-white mb-20">
            {/* <Countdown /> */}
            <h1>
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
                  whiteSpace: 'pre'
                }}
              />
            </h1>
          </div>
          <div className="animate-fade-in-2 mt-20">
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
              Register Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
