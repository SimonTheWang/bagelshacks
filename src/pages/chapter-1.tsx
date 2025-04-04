import { useEffect, useState } from 'react';
import '../App.css';
import Bagel from '../components/Bagel';
import BagelMini from '../components/Bagel-mini';
import Schedule from '../components/Schedule';
import Sponsors from '../components/Sponsors';

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
    transform: 
    `translateX(${scrollY > returnPoint ? returnPoint + (scrollY - returnPoint) * -moveSpeed : scrollY * moveSpeed}px) scale(${scale})`,
  };

  return (
    <>

      
      {/* White container - directly in the main structure */}
      <div className="w-full bg-white text-black p-2 text-center z-high animate-fade-in-1 h-[5vh] w-[50vw] content-container">
        <a href="https://trails.pixieset.com/bagelhacks/" target="_blank" rel="noreferrer" className="hover:underline font-bold">
        Pictures from the event are up!
        </a>
      </div>

      {/* Badge */}
      {/* <div className="fixed top-0 right-0 w-10 h-10 bg-white text-black p-2 text-center z-20 animate-fade-in-1">
        <img src="/badge.png" alt="BagelHack Badge" className="w-full h-full object-contain" />
      </div> */}


      <div style={bagelStyle}>
        {isMobile ? <BagelMini speed={0.25} /> : <Bagel speed={0.25} />}
      </div>
      
      <div className="flex items-center justify-center h-[85vh] p-5" style={{ zIndex: 1 }}>
        <div className="text-center bg-black/50">
          <div className="text-white mb-20">
            {/* <Countdown /> */}
            <h1>Chapter 1</h1>
          </div>
          <div className="animate-fade-in-2 mt-20">
            <a href="https://lu.ma/23wr4dkt" target="_blank" rel="noreferrer">
              Register Here
            </a>
          </div>
        </div>
      </div>
      
      {/* Container for Schedule and Sponsors */}
      <div className="flex flex-col items-center justify-center z-10">
        {/* Schedule */}
        <div className={`text-lg text-gray-400 animate-fade-in-1 ${isMobile ? '' : '-ml-[50vw]'}`}>
          <Schedule />
        </div>

        {/* Sponsors */}
        <div className="mt-[20vh] pb-20 animate-fade-in-2">
          <Sponsors className="pt-30 pb-20 animate-fade-in-2" />
        </div>
      </div>
    </>
  );
}

export default App;