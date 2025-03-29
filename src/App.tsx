import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Set the launch date - example: 30 days from now
  const calculateTimeLeft = () => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);
    
    const difference = +launchDate - +new Date();
    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    setIsSubscribed(true);
    setEmail('');
  };
  
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="content">
          <h1 className="title">EPIC EVENT</h1>
          <p className="subtitle">The most anticipated event of the year is coming soon</p>
          
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
          
          <div className="signup-container">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit}>
                <h3>Be the first to know when we launch</h3>
                <div className="form-group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  <button type="submit" className="btn-notify">Notify Me</button>
                </div>
              </form>
            ) : (
              <div className="success-message">
                <h3>Thank you for subscribing!</h3>
                <p>We'll notify you when we launch.</p>
              </div>
            )}
          </div>
          
          <div className="social-links">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default App;