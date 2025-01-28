import { useState, useEffect } from 'react'
import './App.css'
import Bagel from './Bagel';
import BagelMini from './Bagel-mini';

function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://gist.github.com/gcr/1075131.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-black">
        <div className="animate-fade-in-1">BAGELS HACKS</div>
        <div className="animate-fade-in-2">
          <a href="https://luma.dev" target="_blank">
            Visit Here
          </a>
        </div>

      </div>

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 animate-fade-in-3">more coming soon...</div>



      <div className="fixed top-0 left-0 w-full h-full -z-10">
        {window.innerWidth >= 768 ? <Bagel speed={.5} /> : <BagelMini />}
      </div>
    </>
  )
}

export default App
