import { useEffect, useState } from 'react';
import './App.css';
import Bagel from './Bagel';
import BagelMini from './Bagel-mini';
import Schedule from './Schedule';
import Countdown from './Countdown';
import Sponsors from './Sponsors';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://gist.github.com/gcr/1075131.js";
    script.async = true;
    document.body.appendChild(script);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const returnPoint =  
  window.innerWidth >= 768 ? 
  .90 * window.innerHeight : 
  .80 * window.innerHeight;

  const moveSpeed = window.innerWidth >= 768 ? 0.9 : 0.3

  const scale = window.innerWidth >= 768 ? 
  Math.max(0.5, 1 - scrollY/100000) : 
  Math.max(0.5, 1 - scrollY/100000);

  const bagelStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: 
    `translateX(${scrollY > returnPoint ? returnPoint + (scrollY - returnPoint) * -moveSpeed : scrollY * moveSpeed}px) scale(${scale})`,
  };

  return (
    <>
      <div style={{...bagelStyle, position: 'fixed' as const}}>
        {window.innerWidth >= 768 ? <Bagel speed={0.25} /> : <BagelMini speed={0.25} />}
      </div>
      
      <div className="flex items-center justify-center h-[90vh] p-5" style={{ zIndex: 1 }}>
        <div className="text-center bg-black/50">
          <div className="text-white mb-20">
            <Countdown />
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
        {window.innerWidth >= 768 ?
        <div className="text-lg text-gray-400 animate-fade-in-1 -ml-[50vw]">
          <Schedule />
        </div>
        :
        <div className="text-lg text-gray-400 animate-fade-in-1 sm:-ml-[50vw]">
          <Schedule />
        </div>
        }

        {/* Sponsors */}
        <div className="mt-[20vh] pb-20 animate-fade-in-2">
          <Sponsors className="pt-30 pb-20 animate-fade-in-2" />
        </div>
      </div>
    </>
  );
}

export default App;