import { useEffect, useState } from 'react';
import '../App.css';
import Bagel from '../components/Bagel';
import BagelMini from '../components/Bagel-mini';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchStyle, setGlitchStyle] = useState({});
  const [glitchCount, setGlitchCount] = useState(0);

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

    // Glitch effect timer with shorter duration and less frequency
    const glitchInterval = setInterval(() => {
      // Lower probability (10% chance) for less frequent glitches
      if (Math.random() < 0.3) {
        setGlitchActive(true);
        setGlitchCount(prev => prev + 1);
        
        // Generate random glitch style
        const newGlitchStyle = generateGlitchStyle();
        setGlitchStyle(newGlitchStyle);
        
        // Turn off glitch after shorter random duration
        setTimeout(() => {
          setGlitchActive(false);
        }, Math.random() * 300 + 100); // 100-400ms duration (shorter)
      }
    }, 500); // Check less frequently (every 2 seconds)

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(glitchInterval);
    };
  }, []);

  // More subtle glitch style generator
  const generateGlitchStyle = () => {
    const colors = [
      'rgba(255, 0, 0, 0.4)',    // Red (less opaque)
      'rgba(0, 255, 0, 0.4)',    // Green (less opaque)
      'rgba(0, 0, 255, 0.4)',    // Blue (less opaque)
      'rgba(255, 255, 0, 0.4)',  // Yellow (less opaque)
      'rgba(0, 255, 255, 0.4)',  // Cyan (less opaque)
      'rgba(255, 0, 255, 0.4)',  // Magenta (less opaque)
    ];
    
    // Fewer color blocks (1-2)
    const numBlocks = Math.floor(Math.random() * 2) + 1;
    let boxShadow = '';
    
    for (let i = 0; i < numBlocks; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Smaller offsets for more subtle effect
      const xOffset = Math.floor(Math.random() * 15 - 7);
      const yOffset = Math.floor(Math.random() * 15 - 7);
      const blur = Math.floor(Math.random() * 5);
      const spread = Math.floor(Math.random() * 8);
      
      boxShadow += `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}${i < numBlocks - 1 ? ', ' : ''}`;
    }
    
    // Smaller translations
    const translateX = Math.random() * 5 - 2.5;
    const translateY = Math.random() * 5 - 2.5;
    
    return {
      filter: `hue-rotate(${Math.random() * 180}deg) contrast(${1 + Math.random() * 0.5})`,
      boxShadow,
      transform: `translate(${translateX}px, ${translateY}px)`,
      position: 'relative',
      zIndex: 5,
    };
  };

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
    transition: glitchActive ? 'none' : 'transform 0.3s ease-out',
    transform: 
    `translateX(${scrollY > returnPoint ? returnPoint + (scrollY - returnPoint) * -moveSpeed : scrollY * moveSpeed}px) scale(${scale})`,
    ...(glitchActive ? glitchStyle : {}),
  };

  // Enhanced CSS for more subtle glitch animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glitch-anim {
        0% { 
          transform: translate(-2px, -2px);
        }
        20% { 
          transform: translate(2px, 2px);
        }
        40% { 
          transform: translate(-2px, 2px);
        }
        60% { 
          transform: translate(2px, -2px);
        }
        80% { 
          transform: translate(-2px, 2px);
        }
        100% { 
          transform: translate(2px, -2px);
        }
      }
      
      .glitch-effect {
        position: relative;
        overflow: visible !important;
      }
      
      .glitch-effect::before,
      .glitch-effect::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      }
      
      .glitch-effect::before {
        left: -2px;
        animation: glitch-anim 0.3s infinite linear alternate-reverse;
        background-color: rgba(255, 0, 0, 0.2);
        opacity: 0.5;
      }
      
      .glitch-effect::after {
        left: 2px;
        animation: glitch-anim 0.3s infinite linear alternate;
        background-color: rgba(0, 255, 255, 0.2);
        opacity: 0.5;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* White container - directly in the main structure */}
      <div className="w-full bg-white text-black p-2 text-center z-high animate-fade-in-1 h-[5vh] w-[50vw] content-container">
        <a href="/chapter-1" rel="noreferrer" className="hover:underline font-bold">
        Check out our last hackathon
        </a>
      </div>

      {/* Badge */}
      {/* <div className="fixed top-0 right-0 w-10 h-10 bg-white text-black p-2 text-center z-20 animate-fade-in-1">
        <img src="/badge.png" alt="BagelHack Badge" className="w-full h-full object-contain" />
      </div> */}

      <div 
        style={bagelStyle} 
        className={glitchActive ? 'glitch-effect' : ''}
        key={`bagel-container-${glitchCount}`}
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
            <a href="https://lu.ma/qz0v7wrq" target="_blank" rel="noreferrer">
              Register Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;