import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-03-22T09:00:00'); // March 22nd, 2024 at 9:00 AM

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="text-2xl font-bold mb-2">Time Until BagelsHacks</div>
      <div className="flex justify-center space-x-4">
        <div className="mx-2">
          <div className="text-4xl font-bold">{timeLeft.days}</div>
          <div className="text-sm mt-2">Days</div>
        </div>
        <div className="mx-2">
          <div className="text-4xl font-bold">{timeLeft.hours}</div>
          <div className="text-sm mt-2">Hrs</div>
        </div>
        <div className="mx-2">
          <div className="text-4xl font-bold">{timeLeft.minutes}</div>
          <div className="text-sm mt-2">Mins</div>
        </div>
        <div className="mx-2">
          <div className="text-4xl font-bold">{timeLeft.seconds}</div>
          <div className="text-sm mt-2">Secs</div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
