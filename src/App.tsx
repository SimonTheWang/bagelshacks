import { useEffect, useState } from 'react';
import './App.css';
import Bagel from './Bagel';
import BagelMini from './Bagel-mini';
import Schedule from './Schedule';
import Countdown from './Countdown';
                        

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

  const bagelStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: `translateX(${scrollY * 0.8}px) scale(${Math.max(0.5, 1 - scrollY/100000)})`,
  };

  return (
    <>
      <div style={{...bagelStyle, position: 'fixed' as const}}>
        {window.innerWidth >= 768 ? <Bagel speed={0.25} /> : <BagelMini speed={0.25} />}
      </div>


      <div className="relative flex items-center justify-center h-[90vh] p-10" style={{ zIndex: 1 }}>
        <div className="text-center bg-black/50">
        <div className="text-white mb-20">
          <Countdown />
          </div>
          <div className="animate-fade-in-2 mt-20">
            <a href="https://lu.ma/23wr4dkt" target="_blank">
              Visit Here
            </a>
          </div>
        </div>
      </div>
<div className="relative flex items-center justify-center h-[10vh]" style={{ zIndex: 1 }}>

</div>
      <div className="relative bottom-4 left transform -translate-x-1/2 text-sm text-gray-400 animate-fade-in-3">
        <Schedule />
      </div>
    </>
  );
}

export default App;